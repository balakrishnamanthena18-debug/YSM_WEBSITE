'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth/session';
import {
  findUserByEmail,
  getAllCourses,
  getCourseById,
  getCourseBySlug,
  createCourse,
  updateCourse,
  duplicateCourse,
  deleteCourse,
  canDeleteCourse,
  getCategories,
  getAllInstructors,
  createEnrollment,
  revokeEnrollment,
  createSection,
  createLesson,
  updateLesson,
  deleteLesson,
  logAuditAction,
  toggleCouponActive,
  refundOrder,
  getLiveBatchById,
  createLiveBatch,
  updateLiveBatch,
  deleteLiveBatch,
  recordAttendance,
} from '@/lib/db';
import {
  Course,
  CourseStatus,
  LiveBatch,
  BatchStatus,
  CreateCourseInput,
  UpdateCourseInput,
  CoursePricingInput,
} from '@/lib/db/schema';
import { parseAndValidateYouTubeUrl } from '@/lib/video/youtube';

export async function createCourseAction(input: CreateCourseInput) {
  const admin = await requireRole(['admin', 'instructor']);

  if (!input.title || !input.title.trim()) {
    return { success: false, error: 'Course title is required.' };
  }

  // Generate URL-safe slug if not provided
  const baseSlug = (input.slug || input.title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  if (!baseSlug) {
    return { success: false, error: 'Valid course slug could not be determined.' };
  }

  // Ensure slug uniqueness
  const existingWithSlug = getCourseBySlug(baseSlug);
  if (existingWithSlug) {
    return {
      success: false,
      error: `A course with slug "${baseSlug}" already exists. Please choose a unique slug.`,
    };
  }

  // Validate pricing
  const regularPrice = Math.max(0, Number(input.regularPrice) || 0);
  const sellingPrice = Math.max(0, Number(input.sellingPrice) || 0);

  if (input.discountEnabled && sellingPrice > regularPrice) {
    return {
      success: false,
      error: 'Selling price cannot exceed regular price when discount is enabled.',
    };
  }

  const discountPercentage =
    regularPrice > 0 ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0;

  // Resolve category
  const categories = getCategories();
  const category = categories.find((c) => c.id === input.categoryId) || categories[0];

  // Resolve instructor
  const instructors = getAllInstructors();
  const instructor =
    instructors.find((i) => i.id === input.instructorId) ||
    instructors.find((i) => i.id === admin.id) ||
    instructors[0];

  const now = new Date().toISOString();
  const courseId = `crs_${baseSlug.replace(/[^a-z0-9]/g, '_')}_${Date.now().toString().slice(-4)}`;

  const durationVal = input.durationValue || 8;
  const durationUnit = input.durationUnit || 'Weeks';
  const durationString = `${durationVal} ${durationUnit}`;

  const status: CourseStatus = input.status || 'draft';
  const isPublished = status === 'published';

  const newCourse: Course = {
    id: courseId,
    slug: baseSlug,
    title: input.title.trim(),
    subtitle: input.subtitle?.trim() || 'ISO 9001:2015 Accredited IT Training & Certification',
    description: input.description.trim(),
    overviewParagraphs: [input.description.trim()],
    categoryId: category.id,
    categorySlug: category.slug,
    categoryName: category.name,
    deliveryType: input.deliveryType || 'LIVE_INSTRUCTOR_LED',
    duration: durationString,
    durationValue: durationVal,
    durationUnit,
    skillLevel: input.skillLevel || 'Intermediate',
    trainingMode: input.deliveryType === 'RECORDED_SELF_PACED' ? 'Recorded Self-Paced & 24/7 LMS' : 'Instructor-Led Live & Practical Labs',
    price: regularPrice,
    regularPrice,
    discountPrice: sellingPrice,
    sellingPrice,
    discountPercentage,
    discountEnabled: input.discountEnabled ?? true,
    validityType: input.validityType || 'lifetime',
    validityDuration: input.validityDuration || 365,
    validityDurationUnit: 'Days',
    language: input.language || 'English',
    thumbnailUrl: input.thumbnailUrl || '/logos/tools/python.svg',
    bannerUrl: '/images/hero/Modern Open-Plan Office with City Views.png',
    promoVideoUrl: input.promotionalVideoUrl || 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
    promotionalVideoUrl: input.promotionalVideoUrl || 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
    rating: 5.0,
    reviewsCount: 0,
    studentsCount: 0,
    isPublished,
    status,
    isFeatured: false,
    instructorId: instructor.id,
    instructorName: instructor.name,
    instructorTitle: instructor.title,
    instructorBio: instructor.bio,
    instructorAvatarUrl: instructor.avatarUrl,
    tags: input.tags || [],
    toolsCovered: input.tags || [],
    prerequisites: ['Basic computer proficiency and eager willingness to learn.'],
    learningOutcomes: ['Complete mastery of core architecture and industry projects.'],
    featureBadges: ['Expert-led Training', 'Practical Labs', 'ISO 9001:2015 Certified'],
    certificateEligible: true,
    displayOrder: getAllCourses().length + 1,
    seoTitle: input.seoTitle || `${input.title.trim()} Training | YSM Infotech`,
    seoDescription: input.seoDescription || input.description.trim().slice(0, 160),
    createdAt: now,
    updatedAt: now,
  };

  createCourse(newCourse);

  logAuditAction(admin.id, 'COURSE_CREATED', 'Course', newCourse.id, {
    title: newCourse.title,
    slug: newCourse.slug,
    price: regularPrice,
    sellingPrice,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath('/courses');

  return { success: true, course: newCourse };
}

export async function updateCourseAction(courseId: string, input: UpdateCourseInput) {
  const admin = await requireRole(['admin', 'instructor']);
  const course = getCourseById(courseId);
  if (!course) {
    return { success: false, error: 'Target course not found.' };
  }

  const patch: Partial<Course> = {};

  if (input.title !== undefined) {
    if (!input.title.trim()) return { success: false, error: 'Title cannot be empty.' };
    patch.title = input.title.trim();
  }

  if (input.slug !== undefined) {
    const cleanSlug = input.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!cleanSlug) return { success: false, error: 'Invalid slug.' };
    if (cleanSlug !== course.slug) {
      const existing = getCourseBySlug(cleanSlug);
      if (existing && existing.id !== courseId) {
        return { success: false, error: `Slug "${cleanSlug}" is already in use by another course.` };
      }
      patch.slug = cleanSlug;
    }
  }

  if (input.subtitle !== undefined) patch.subtitle = input.subtitle.trim();
  if (input.description !== undefined) {
    patch.description = input.description.trim();
    patch.overviewParagraphs = [input.description.trim()];
  }

  if (input.categoryId !== undefined) {
    const category = getCategories().find((c) => c.id === input.categoryId);
    if (category) {
      patch.categoryId = category.id;
      patch.categorySlug = category.slug;
      patch.categoryName = category.name;
    }
  }

  if (input.deliveryType !== undefined) {
    patch.deliveryType = input.deliveryType;
    patch.trainingMode =
      input.deliveryType === 'RECORDED_SELF_PACED'
        ? 'Recorded Self-Paced & 24/7 LMS'
        : 'Instructor-Led Live & Practical Labs';
  }

  if (input.skillLevel !== undefined) patch.skillLevel = input.skillLevel;
  if (input.language !== undefined) patch.language = input.language.trim();

  // Duration handling
  if (input.durationValue !== undefined || input.durationUnit !== undefined) {
    const val = input.durationValue !== undefined ? input.durationValue : course.durationValue || 8;
    const unit = input.durationUnit || course.durationUnit || 'Weeks';
    patch.durationValue = val;
    patch.durationUnit = unit;
    patch.duration = `${val} ${unit}`;
  } else if (input.duration !== undefined) {
    patch.duration = input.duration.trim();
  }

  // Pricing handling
  const regPrice = input.regularPrice !== undefined ? Number(input.regularPrice) : course.regularPrice ?? course.price;
  const sellPrice = input.sellingPrice !== undefined ? Number(input.sellingPrice) : course.sellingPrice ?? course.discountPrice;
  const discountEnabled = input.discountEnabled !== undefined ? input.discountEnabled : course.discountEnabled ?? true;

  if (regPrice < 0 || sellPrice < 0) {
    return { success: false, error: 'Course prices must be non-negative.' };
  }
  if (discountEnabled && sellPrice > regPrice) {
    return { success: false, error: 'Selling price cannot exceed regular price when discount is enabled.' };
  }

  patch.regularPrice = regPrice;
  patch.price = regPrice;
  patch.sellingPrice = sellPrice;
  patch.discountPrice = sellPrice;
  patch.discountEnabled = discountEnabled;
  patch.discountPercentage = regPrice > 0 ? Math.round(((regPrice - sellPrice) / regPrice) * 100) : 0;
  if (input.discountStartsAt !== undefined) patch.discountStartsAt = input.discountStartsAt;
  if (input.discountEndsAt !== undefined) patch.discountEndsAt = input.discountEndsAt;

  // Validity handling
  if (input.validityType !== undefined) patch.validityType = input.validityType;
  if (input.validityDuration !== undefined) patch.validityDuration = Number(input.validityDuration);

  // Instructor handling
  if (input.instructorId !== undefined) {
    const instructor = getAllInstructors().find((i) => i.id === input.instructorId);
    if (instructor) {
      patch.instructorId = instructor.id;
      patch.instructorName = instructor.name;
      patch.instructorTitle = instructor.title;
      patch.instructorBio = instructor.bio;
      patch.instructorAvatarUrl = instructor.avatarUrl;
    }
  }

  // Media handling
  if (input.thumbnailUrl !== undefined) patch.thumbnailUrl = input.thumbnailUrl.trim();
  if (input.promotionalVideoUrl !== undefined) {
    patch.promotionalVideoUrl = input.promotionalVideoUrl.trim();
    patch.promoVideoUrl = input.promotionalVideoUrl.trim();
  }

  // Status & SEO
  if (input.status !== undefined) {
    patch.status = input.status;
    patch.isPublished = input.status === 'published';
  }
  if (input.tags !== undefined) {
    patch.tags = input.tags;
    patch.toolsCovered = input.tags;
  }
  if (input.seoTitle !== undefined) patch.seoTitle = input.seoTitle.trim();
  if (input.seoDescription !== undefined) patch.seoDescription = input.seoDescription.trim();

  const updated = updateCourse(courseId, patch);

  logAuditAction(admin.id, 'COURSE_UPDATED', 'Course', courseId, {
    updatedFields: Object.keys(patch),
    regularPrice: patch.regularPrice,
    sellingPrice: patch.sellingPrice,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${courseId}/edit`);
  revalidatePath('/courses');
  if (course.slug) revalidatePath(`/courses/${course.slug}`);
  if (patch.slug) revalidatePath(`/courses/${patch.slug}`);

  return { success: true, course: updated };
}

export async function updateCoursePricingAction(courseId: string, pricing: CoursePricingInput) {
  const admin = await requireRole(['admin', 'instructor']);
  const course = getCourseById(courseId);
  if (!course) {
    return { success: false, error: 'Course not found.' };
  }

  const regularPrice = Math.max(0, Number(pricing.regularPrice) || 0);
  const sellingPrice = Math.max(0, Number(pricing.sellingPrice) || 0);
  const discountEnabled = pricing.discountEnabled ?? true;

  if (discountEnabled && sellingPrice > regularPrice) {
    return {
      success: false,
      error: 'Selling price cannot exceed regular price when discount is enabled.',
    };
  }

  const discountPercentage =
    regularPrice > 0 ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0;

  const updated = updateCourse(courseId, {
    regularPrice,
    price: regularPrice,
    sellingPrice,
    discountPrice: sellingPrice,
    discountPercentage,
    discountEnabled,
    discountStartsAt: pricing.discountStartsAt,
    discountEndsAt: pricing.discountEndsAt,
  });

  logAuditAction(admin.id, 'COURSE_PRICING_UPDATED', 'Course', courseId, {
    oldRegular: course.regularPrice ?? course.price,
    newRegular: regularPrice,
    oldSelling: course.sellingPrice ?? course.discountPrice,
    newSelling: sellingPrice,
    discountPercentage,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${courseId}/edit`);
  revalidatePath('/courses');
  if (course.slug) revalidatePath(`/courses/${course.slug}`);

  return { success: true, course: updated };
}

export async function toggleCoursePublishAction(courseId: string, targetStatus?: CourseStatus) {
  const admin = await requireRole(['admin', 'instructor']);
  const course = getCourseById(courseId);
  if (!course) throw new Error('Course not found');

  const newStatus: CourseStatus =
    targetStatus || (course.isPublished ? 'draft' : 'published');
  const isPublished = newStatus === 'published';

  updateCourse(courseId, { status: newStatus, isPublished });
  logAuditAction(admin.id, 'COURSE_PUBLISH_TOGGLED', 'Course', courseId, {
    status: newStatus,
    isPublished,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath(`/admin/courses/${courseId}/edit`);
  revalidatePath('/courses');
  if (course.slug) revalidatePath(`/courses/${course.slug}`);

  return { success: true, status: newStatus, isPublished };
}

export async function archiveCourseAction(courseId: string) {
  const admin = await requireRole(['admin', 'instructor']);
  const course = getCourseById(courseId);
  if (!course) return { success: false, error: 'Course not found.' };

  const updated = updateCourse(courseId, { status: 'archived', isPublished: false });
  logAuditAction(admin.id, 'COURSE_ARCHIVED', 'Course', courseId, { title: course.title });

  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  return { success: true, course: updated };
}

export async function duplicateCourseAction(courseId: string) {
  const admin = await requireRole(['admin', 'instructor']);
  const course = getCourseById(courseId);
  if (!course) return { success: false, error: 'Course not found.' };

  const duplicated = duplicateCourse(courseId);
  if (!duplicated) return { success: false, error: 'Failed to duplicate course.' };

  logAuditAction(admin.id, 'COURSE_DUPLICATED', 'Course', duplicated.id, {
    sourceCourseId: courseId,
    duplicatedSlug: duplicated.slug,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath('/courses');

  return { success: true, course: duplicated };
}

export async function deleteCourseAction(courseId: string, force = false) {
  const admin = await requireRole(['admin']);
  const course = getCourseById(courseId);
  if (!course) return { success: false, error: 'Course not found.' };

  const check = canDeleteCourse(courseId);
  if (!check.canDelete && !force) {
    return {
      success: false,
      error: check.message,
      canForce: false,
      enrolledCount: check.enrolledCount,
    };
  }

  const res = deleteCourse(courseId, force);
  if (!res.success) return { success: false, error: res.error || 'Failed to delete course.' };

  logAuditAction(admin.id, 'COURSE_DELETED', 'Course', courseId, { title: course.title });

  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  revalidatePath('/courses');

  return { success: true };
}

export async function manualEnrollStudentAction(studentEmail: string, courseId: string) {
  const admin = await requireRole(['admin']);
  const student = findUserByEmail(studentEmail);
  if (!student) {
    return { success: false, error: 'Student with this email address was not found.' };
  }

  const course = getCourseById(courseId);
  if (!course) {
    return { success: false, error: 'Target course not found.' };
  }

  const enrollment = createEnrollment(student.id, course.id, 'manual_admin');
  logAuditAction(admin.id, 'MANUAL_ENROLLMENT_GRANTED', 'Enrollment', enrollment.id, {
    studentEmail,
    courseTitle: course.title,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/students');
  return { success: true };
}

export async function revokeStudentEnrollmentAction(studentId: string, courseId: string) {
  const admin = await requireRole(['admin']);
  const res = revokeEnrollment(studentId, courseId, admin.id);
  revalidatePath('/admin/students');
  return { success: res };
}

export async function addCourseSectionAction(courseId: string, title: string) {
  const admin = await requireRole(['admin', 'instructor']);
  const section = createSection({
    id: `sec_${courseId}_${Date.now()}`,
    courseId,
    title,
    displayOrder: 99,
    isPublished: true,
    createdAt: new Date().toISOString(),
  });

  logAuditAction(admin.id, 'SECTION_CREATED', 'CourseSection', section.id, { title });
  revalidatePath(`/admin/courses/${courseId}/curriculum`);
  return { success: true, section };
}

export interface AddLessonInput {
  sectionId: string;
  courseId: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  durationMinutes: number;
  isFreePreview: boolean;
  isRequired?: boolean;
  isPublished?: boolean;
  position?: number;
}

export async function addLessonAction(
  sectionIdOrInput: string | AddLessonInput,
  courseId?: string,
  title?: string,
  durationMinutes?: number,
  isPreview?: boolean,
  videoUrl?: string
) {
  const admin = await requireRole(['admin', 'instructor']);

  // Normalize parameters (supports both object signature and positional signature)
  const input: AddLessonInput =
    typeof sectionIdOrInput === 'object'
      ? sectionIdOrInput
      : {
          sectionId: sectionIdOrInput,
          courseId: courseId!,
          title: title!,
          youtubeUrl: videoUrl || 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
          durationMinutes: durationMinutes || 15,
          isFreePreview: Boolean(isPreview),
          isRequired: true,
          isPublished: true,
        };

  if (!input.title || !input.title.trim()) {
    return { success: false, error: 'Lesson title is required.' };
  }

  // Strict server-side YouTube URL validation & ID extraction
  const ytResult = parseAndValidateYouTubeUrl(input.youtubeUrl);
  if (!ytResult.valid || !ytResult.videoId) {
    return {
      success: false,
      error: ytResult.error || 'Invalid YouTube video URL. Please provide a valid YouTube link.',
    };
  }

  const durationSeconds = Math.max(1, input.durationMinutes || 15) * 60;
  const now = new Date().toISOString();

  const lesson = createLesson({
    id: `les_${input.sectionId}_${Date.now()}`,
    sectionId: input.sectionId,
    courseId: input.courseId,
    title: input.title.trim(),
    description: input.description?.trim(),
    videoProvider: 'youtube',
    videoId: ytResult.videoId,
    videoUrl: ytResult.normalizedUrl,
    durationSeconds,
    lessonType: 'video',
    isFreePreview: Boolean(input.isFreePreview),
    isPreview: Boolean(input.isFreePreview),
    isRequired: input.isRequired ?? true,
    isPublished: input.isPublished ?? true,
    position: input.position ?? 99,
    displayOrder: input.position ?? 99,
    createdAt: now,
    updatedAt: now,
  });

  logAuditAction(admin.id, 'LESSON_CREATED', 'Lesson', lesson.id, {
    title: lesson.title,
    videoId: ytResult.videoId,
    courseId: input.courseId,
  });

  revalidatePath(`/admin/courses/${input.courseId}/curriculum`);
  revalidatePath(`/learning/courses/${input.courseId}`);
  return { success: true, lesson };
}

export async function updateLessonAction(
  lessonId: string,
  courseId: string,
  updates: {
    title?: string;
    description?: string;
    youtubeUrl?: string;
    durationMinutes?: number;
    isFreePreview?: boolean;
    isRequired?: boolean;
    isPublished?: boolean;
    position?: number;
  }
) {
  const admin = await requireRole(['admin', 'instructor']);

  const patch: Partial<Parameters<typeof updateLesson>[1]> = {
    updatedAt: new Date().toISOString(),
  };

  if (updates.title !== undefined) patch.title = updates.title.trim();
  if (updates.description !== undefined) patch.description = updates.description.trim();
  if (updates.durationMinutes !== undefined) {
    patch.durationSeconds = Math.max(1, updates.durationMinutes) * 60;
  }
  if (updates.isFreePreview !== undefined) {
    patch.isFreePreview = updates.isFreePreview;
    patch.isPreview = updates.isFreePreview;
  }
  if (updates.isRequired !== undefined) patch.isRequired = updates.isRequired;
  if (updates.isPublished !== undefined) patch.isPublished = updates.isPublished;
  if (updates.position !== undefined) {
    patch.position = updates.position;
    patch.displayOrder = updates.position;
  }

  if (updates.youtubeUrl) {
    const ytResult = parseAndValidateYouTubeUrl(updates.youtubeUrl);
    if (!ytResult.valid || !ytResult.videoId) {
      return { success: false, error: ytResult.error || 'Invalid YouTube URL.' };
    }
    patch.videoProvider = 'youtube';
    patch.videoId = ytResult.videoId;
    patch.videoUrl = ytResult.normalizedUrl;
  }

  const updated = updateLesson(lessonId, patch);
  logAuditAction(admin.id, 'LESSON_UPDATED', 'Lesson', lessonId, updates);

  revalidatePath(`/admin/courses/${courseId}/curriculum`);
  revalidatePath(`/learning/courses/${courseId}`);
  return { success: true, lesson: updated };
}

export async function deleteLessonAction(lessonId: string, courseId: string) {
  const admin = await requireRole(['admin', 'instructor']);
  deleteLesson(lessonId);
  logAuditAction(admin.id, 'LESSON_DELETED', 'Lesson', lessonId);
  revalidatePath(`/admin/courses/${courseId}/curriculum`);
  return { success: true };
}

export async function toggleCouponStatusAction(couponId: string) {
  const admin = await requireRole(['admin']);
  const updated = toggleCouponActive(couponId);
  if (!updated) {
    return { success: false, error: 'Coupon code not found.' };
  }
  logAuditAction(admin.id, 'COUPON_STATUS_TOGGLED', 'Coupon', couponId, {
    code: updated.code,
    isActive: updated.isActive,
  });
  revalidatePath('/admin/coupons');
  return { success: true, coupon: updated };
}

export async function refundOrderAction(orderId: string, reason?: string) {
  const admin = await requireRole(['admin']);
  try {
    const refunded = refundOrder(orderId, admin.id, reason);
    revalidatePath('/admin/orders');
    revalidatePath('/admin/students');
    revalidatePath('/learning');
    return { success: true, order: refunded };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Refund processing failed.',
    };
  }
}

// -------------------------------------------------------------
// LIVE BATCHES & SCHEDULE MANAGEMENT ACTIONS
// -------------------------------------------------------------

export async function createLiveBatchAction(
  courseId: string,
  input: {
    title: string;
    batchCode?: string;
    startDate: string;
    endDate: string;
    scheduleDescription: string;
    timeZone?: string;
    meetingPlatform?: 'zoom' | 'google_meet' | 'microsoft_teams' | 'custom';
    meetingLink?: string;
    meetingId?: string;
    meetingPasscode?: string;
    instructorId?: string;
    maxCapacity?: number;
    status?: BatchStatus;
    isPublished?: boolean;
    notes?: string;
  }
) {
  const admin = await requireRole(['admin']);
  const course = getCourseById(courseId);
  if (!course) {
    return { success: false, error: 'Course not found.' };
  }

  if (!input.title || !input.title.trim()) {
    return { success: false, error: 'Batch title is required.' };
  }
  if (!input.startDate || !input.endDate) {
    return { success: false, error: 'Start date and end date are required.' };
  }
  if (!input.scheduleDescription || !input.scheduleDescription.trim()) {
    return { success: false, error: 'Schedule and timing description is required.' };
  }

  const instructors = getAllInstructors();
  const instructor =
    instructors.find((i) => i.id === input.instructorId) ||
    instructors.find((i) => i.id === course.instructorId) ||
    instructors[0];

  const batchCode =
    input.batchCode?.trim() ||
    `BAT-${course.slug.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  const created = createLiveBatch({
    courseId,
    courseTitle: course.title,
    batchCode,
    title: input.title.trim(),
    startDate: input.startDate,
    endDate: input.endDate,
    scheduleDescription: input.scheduleDescription.trim(),
    timeZone: input.timeZone || 'Asia/Kolkata (IST)',
    meetingPlatform: input.meetingPlatform || 'google_meet',
    meetingLink: input.meetingLink?.trim() || undefined,
    meetingId: input.meetingId?.trim() || undefined,
    meetingPasscode: input.meetingPasscode?.trim() || undefined,
    instructorId: instructor.id,
    instructorName: instructor.name,
    maxCapacity: Number(input.maxCapacity) || 30,
    status: input.status || 'upcoming',
    isPublished: input.isPublished ?? true,
    notes: input.notes?.trim() || undefined,
  });

  logAuditAction(admin.id, 'BATCH_CREATED', 'LiveBatch', created.id, {
    courseId,
    courseTitle: course.title,
    batchCode: created.batchCode,
    title: created.title,
  });

  revalidatePath(`/admin/courses/${courseId}/batches`);
  revalidatePath('/admin/courses');
  revalidatePath('/learning');
  return { success: true, batch: created };
}

export async function updateLiveBatchAction(batchId: string, updates: Partial<LiveBatch>) {
  const admin = await requireRole(['admin']);
  const existing = getLiveBatchById(batchId);
  if (!existing) {
    return { success: false, error: 'Live batch not found.' };
  }

  const updated = updateLiveBatch(batchId, updates);
  if (!updated) {
    return { success: false, error: 'Failed to update live batch.' };
  }

  logAuditAction(admin.id, 'BATCH_UPDATED', 'LiveBatch', batchId, {
    courseId: updated.courseId,
    batchCode: updated.batchCode,
  });

  revalidatePath(`/admin/courses/${updated.courseId}/batches`);
  revalidatePath('/admin/courses');
  revalidatePath('/learning');
  return { success: true, batch: updated };
}

export async function deleteLiveBatchAction(batchId: string, force = false) {
  const admin = await requireRole(['admin']);
  const existing = getLiveBatchById(batchId);
  if (!existing) {
    return { success: false, error: 'Live batch not found.' };
  }

  const res = deleteLiveBatch(batchId, force);
  if (!res.success) {
    return res;
  }

  logAuditAction(admin.id, 'BATCH_DELETED', 'LiveBatch', batchId, {
    courseId: existing.courseId,
    batchCode: existing.batchCode,
  });

  revalidatePath(`/admin/courses/${existing.courseId}/batches`);
  revalidatePath('/admin/courses');
  revalidatePath('/learning');
  return { success: true };
}

export async function toggleBatchPublishAction(batchId: string) {
  await requireRole(['admin']);
  const batch = getLiveBatchById(batchId);
  if (!batch) {
    return { success: false, error: 'Batch not found.' };
  }

  const updated = updateLiveBatch(batchId, { isPublished: !batch.isPublished });
  revalidatePath(`/admin/courses/${batch.courseId}/batches`);
  revalidatePath('/admin/courses');
  return { success: true, isPublished: updated?.isPublished };
}

export async function recordBatchAttendanceAction(
  batchId: string,
  records: Array<{
    studentId: string;
    sessionDate: string;
    sessionTopic: string;
    status: 'present' | 'absent' | 'excused';
  }>
) {
  const admin = await requireRole(['admin']);
  const batch = getLiveBatchById(batchId);
  if (!batch) {
    return { success: false, error: 'Batch not found.' };
  }

  const payload = records.map((r) => ({
    ...r,
    markedByInstructorId: admin.id,
  }));

  const res = recordAttendance(batchId, payload);
  revalidatePath(`/admin/courses/${batch.courseId}/batches`);
  revalidatePath('/learning');
  return res;
}

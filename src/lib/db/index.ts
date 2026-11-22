import fs from 'node:fs';
import path from 'node:path';
import {
  LMSDatabase,
  User,
  Course,
  CourseDeliveryType,
  CourseStatus,
  CourseCategory,
  CourseSection,
  Lesson,
  Enrollment,
  LessonProgress,
  CourseProgress,
  Order,
  OrderItem,
  Payment,
  Quiz,
  QuizAttempt,
  Assignment,
  AssignmentSubmission,
  Review,
  Certificate,
  Coupon,
  LiveBatch,
  BatchEnrollment,
  AttendanceRecord,
} from './schema';
import { createInitialSeed } from './seed';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'ysm_lms_database.json');
const BAK_FILE = path.join(DATA_DIR, 'ysm_lms_database.json.bak');

// In-memory cache for fast read access with timestamp-based invalidation
let cachedDb: LMSDatabase | null = null;
let lastLoadedMtime = 0;

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Load database from disk or initialize with seed data.
 * Checks file modification time to ensure multi-process concurrency consistency.
 */
export function getDatabase(): LMSDatabase {
  ensureDataDirectory();

  if (!fs.existsSync(DB_FILE)) {
    // If backup exists, recover from backup first before resorting to seed
    if (fs.existsSync(BAK_FILE)) {
      try {
        const bakRaw = fs.readFileSync(BAK_FILE, 'utf-8');
        cachedDb = JSON.parse(bakRaw) as LMSDatabase;
        saveDatabase(cachedDb);
        return cachedDb;
      } catch (e) {
        console.error('Backup recovery failed:', e);
      }
    }
    const initialData = createInitialSeed();
    saveDatabase(initialData);
    cachedDb = initialData;
    return cachedDb;
  }

  try {
    const stat = fs.statSync(DB_FILE);
    if (cachedDb && stat.mtimeMs <= lastLoadedMtime) {
      return cachedDb;
    }

    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    cachedDb = JSON.parse(raw) as LMSDatabase;
    if (!cachedDb.liveBatches) cachedDb.liveBatches = [];
    if (!cachedDb.batchEnrollments) cachedDb.batchEnrollments = [];
    if (!cachedDb.attendanceRecords) cachedDb.attendanceRecords = [];
    lastLoadedMtime = stat.mtimeMs;
    return cachedDb;
  } catch (err) {
    console.error('Failed to read LMS database file, attempting backup recovery:', err);
    if (fs.existsSync(BAK_FILE)) {
      try {
        const bakRaw = fs.readFileSync(BAK_FILE, 'utf-8');
        cachedDb = JSON.parse(bakRaw) as LMSDatabase;
        if (!cachedDb.liveBatches) cachedDb.liveBatches = [];
        if (!cachedDb.batchEnrollments) cachedDb.batchEnrollments = [];
        if (!cachedDb.attendanceRecords) cachedDb.attendanceRecords = [];
        return cachedDb;
      } catch (bakErr) {
        console.error('Backup read also failed:', bakErr);
      }
    }
    // Fail gracefully with in-memory cache if available rather than wiping data
    if (cachedDb) return cachedDb;
    throw new Error(`LMS database file is corrupted and unreadable: ${err instanceof Error ? err.message : String(err)}`);
  }
}

/**
 * Persist database to disk using atomic rename and rolling backup to prevent corruption.
 */
export function saveDatabase(db: LMSDatabase): void {
  ensureDataDirectory();
  cachedDb = db;

  // Create rolling backup of current database file if present
  if (fs.existsSync(DB_FILE)) {
    try {
      fs.copyFileSync(DB_FILE, BAK_FILE);
    } catch {
      // Non-fatal if backup copy fails
    }
  }

  const tempFile = `${DB_FILE}.${Date.now()}.${Math.random().toString(36).substring(2, 6)}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);

  try {
    lastLoadedMtime = fs.statSync(DB_FILE).mtimeMs;
  } catch {
    lastLoadedMtime = Date.now();
  }
}

// -------------------------------------------------------------
// USER OPERATIONS
// -------------------------------------------------------------

export function findUserByEmail(email: string): User | undefined {
  const db = getDatabase();
  const normalized = email.toLowerCase().trim();
  return db.users.find((u) => u.email.toLowerCase() === normalized);
}

export function findUserById(id: string): User | undefined {
  const db = getDatabase();
  return db.users.find((u) => u.id === id);
}

export function createUser(user: User): User {
  const db = getDatabase();
  db.users.push(user);
  if (user.role === 'student') {
    db.studentProfiles.push({
      id: `prof_${user.id}`,
      userId: user.id,
      completedCoursesCount: 0,
      certificatesCount: 0,
      updatedAt: new Date().toISOString(),
    });
  }
  saveDatabase(db);
  return user;
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const db = getDatabase();
  const idx = db.users.findIndex((u) => u.id === id);
  if (idx === -1) return undefined;
  db.users[idx] = { ...db.users[idx], ...updates, updatedAt: new Date().toISOString() };
  saveDatabase(db);
  return db.users[idx];
}

export function getAllUsers(): User[] {
  const db = getDatabase();
  return db.users;
}

// -------------------------------------------------------------
// COURSE & CATEGORY OPERATIONS
// -------------------------------------------------------------

/**
 * Normalizes course fields for complete backward and forward compatibility.
 * Keeps regularPrice & price, sellingPrice & discountPrice, and status & isPublished synchronized.
 */
export function normalizeCourse(c: Course): Course {
  const regularPrice = c.regularPrice ?? c.price ?? 9999;
  const sellingPrice = c.sellingPrice ?? c.discountPrice ?? Math.round(regularPrice * 0.5);
  const discountPercentage =
    c.discountPercentage ??
    (regularPrice > 0 ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0);
  const status: CourseStatus = c.status ?? (c.isPublished ? 'published' : 'draft');
  const isPublished = status === 'published';

  return {
    ...c,
    deliveryType: c.deliveryType || 'LIVE_INSTRUCTOR_LED',
    regularPrice,
    sellingPrice,
    price: regularPrice,
    discountPrice: sellingPrice,
    discountPercentage,
    discountEnabled: c.discountEnabled ?? true,
    status,
    isPublished,
    validityType: c.validityType ?? 'lifetime',
    validityDuration: c.validityDuration ?? 365,
    validityDurationUnit: c.validityDurationUnit ?? 'Days',
    language: c.language ?? 'English',
    promotionalVideoUrl: c.promotionalVideoUrl || c.promoVideoUrl,
    promoVideoUrl: c.promoVideoUrl || c.promotionalVideoUrl,
    seoTitle: c.seoTitle || `${c.title} Training & Certification | YSM Infotech`,
    seoDescription: c.seoDescription || c.description.slice(0, 160),
    tags: c.tags || c.toolsCovered || [],
  };
}

export function getAllCourses(): Course[] {
  const db = getDatabase();
  return db.courses.map(normalizeCourse).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getPublishedCourses(): Course[] {
  const db = getDatabase();
  return db.courses
    .map(normalizeCourse)
    .filter((c) => c.isPublished && c.status !== 'archived')
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getCourseBySlug(slug: string): Course | undefined {
  const db = getDatabase();
  const normalized = slug.toLowerCase().trim();
  const course = db.courses.find((c) => c.slug.toLowerCase() === normalized);
  return course ? normalizeCourse(course) : undefined;
}

export function getCourseById(id: string): Course | undefined {
  const db = getDatabase();
  const course = db.courses.find((c) => c.id === id);
  return course ? normalizeCourse(course) : undefined;
}

export function getCategories(): CourseCategory[] {
  const db = getDatabase();
  return db.categories.sort((a, b) => a.displayOrder - b.displayOrder);
}

export function createCourse(course: Course): Course {
  const db = getDatabase();
  const normalized = normalizeCourse(course);
  db.courses.push(normalized);
  saveDatabase(db);
  return normalized;
}

export function updateCourse(id: string, updates: Partial<Course>): Course | undefined {
  const db = getDatabase();
  const idx = db.courses.findIndex((c) => c.id === id);
  if (idx === -1) return undefined;

  const current = db.courses[idx];

  // Synchronize regularPrice/price and sellingPrice/discountPrice
  const regularPrice =
    updates.regularPrice !== undefined
      ? updates.regularPrice
      : updates.price !== undefined
      ? updates.price
      : current.regularPrice ?? current.price;

  const sellingPrice =
    updates.sellingPrice !== undefined
      ? updates.sellingPrice
      : updates.discountPrice !== undefined
      ? updates.discountPrice
      : current.sellingPrice ?? current.discountPrice;

  const discountPercentage =
    updates.discountPercentage !== undefined
      ? updates.discountPercentage
      : regularPrice > 0
      ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100)
      : 0;

  const status: CourseStatus =
    updates.status !== undefined
      ? updates.status
      : updates.isPublished !== undefined
      ? updates.isPublished
        ? 'published'
        : 'draft'
      : current.status ?? (current.isPublished ? 'published' : 'draft');
  const isPublished = status === 'published';

  const merged: Course = {
    ...current,
    ...updates,
    regularPrice,
    sellingPrice,
    price: regularPrice,
    discountPrice: sellingPrice,
    discountPercentage,
    status,
    isPublished,
    updatedAt: new Date().toISOString(),
  };

  db.courses[idx] = merged;
  saveDatabase(db);
  return normalizeCourse(merged);
}

export function duplicateCourse(courseId: string): Course | undefined {
  const db = getDatabase();
  const source = db.courses.find((c) => c.id === courseId);
  if (!source) return undefined;

  const now = new Date().toISOString();
  const baseSlug = source.slug.replace(/-copy(-\d+)?$/, '');
  const timestamp = Date.now().toString().slice(-4);
  const newSlug = `${baseSlug}-copy-${timestamp}`;
  const newId = `crs_${newSlug.replace(/[^a-z0-9]/g, '_')}`;

  const duplicatedCourse: Course = normalizeCourse({
    ...source,
    id: newId,
    slug: newSlug,
    title: `${source.title} (Copy)`,
    isPublished: false,
    status: 'draft',
    studentsCount: 0,
    reviewsCount: 0,
    rating: 5.0,
    displayOrder: db.courses.length + 1,
    createdAt: now,
    updatedAt: now,
  });

  db.courses.push(duplicatedCourse);

  // Clone all sections and lessons (preserving full curriculum and YouTube video IDs)
  const sourceSections = db.sections.filter((s) => s.courseId === courseId);
  for (const sec of sourceSections) {
    const newSectionId = `sec_${newId}_${Math.random().toString(36).substring(2, 7)}`;
    const clonedSection: CourseSection = {
      ...sec,
      id: newSectionId,
      courseId: newId,
      createdAt: now,
    };
    db.sections.push(clonedSection);

    const sourceLessons = db.lessons.filter((l) => l.sectionId === sec.id);
    for (const les of sourceLessons) {
      const clonedLesson: Lesson = {
        ...les,
        id: `les_${newSectionId}_${Math.random().toString(36).substring(2, 7)}`,
        sectionId: newSectionId,
        courseId: newId,
        createdAt: now,
        updatedAt: now,
      };
      db.lessons.push(clonedLesson);
    }
  }

  saveDatabase(db);
  return duplicatedCourse;
}

export function canDeleteCourse(
  courseId: string
): { canDelete: boolean; enrolledCount: number; message?: string } {
  const db = getDatabase();
  const enrollments = db.enrollments.filter((e) => e.courseId === courseId);
  if (enrollments.length > 0) {
    return {
      canDelete: false,
      enrolledCount: enrollments.length,
      message: `Course has ${enrollments.length} active or historical student enrollments. For data integrity, archive the course instead of deleting.`,
    };
  }
  return { canDelete: true, enrolledCount: 0 };
}

export function deleteCourse(
  courseId: string,
  force = false
): { success: boolean; error?: string } {
  const db = getDatabase();
  const check = canDeleteCourse(courseId);
  if (!check.canDelete && !force) {
    return { success: false, error: check.message };
  }

  const initialCount = db.courses.length;
  db.courses = db.courses.filter((c) => c.id !== courseId);
  db.sections = db.sections.filter((s) => s.courseId !== courseId);
  db.lessons = db.lessons.filter((l) => l.courseId !== courseId);
  db.quizzes = db.quizzes.filter((q) => q.courseId !== courseId);
  db.assignments = db.assignments.filter((a) => a.courseId !== courseId);

  if (db.courses.length !== initialCount) {
    saveDatabase(db);
    return { success: true };
  }
  return { success: false, error: 'Course not found.' };
}

export interface InstructorViewRecord {
  id: string; // User ID
  name: string;
  email: string;
  title: string;
  bio: string;
  expertise: string[];
  avatarUrl?: string;
  assignedCourseIds: string[];
}

export function getAllInstructors(): InstructorViewRecord[] {
  const db = getDatabase();
  const instructorUsers = db.users.filter((u) => u.role === 'instructor' || u.role === 'admin');

  return instructorUsers.map((u) => {
    const profile = db.instructorProfiles.find((p) => p.userId === u.id);
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      title:
        profile?.title ||
        (u.role === 'admin' ? 'Master Academic Director & Enterprise Architect' : 'Senior Corporate Faculty'),
      bio:
        profile?.bio ||
        'Senior technology professional with deep industry expertise in enterprise deployments.',
      expertise: profile?.expertise || ['Artificial Intelligence', 'Data Engineering', 'Cloud DevOps'],
      avatarUrl: u.avatarUrl,
      assignedCourseIds:
        profile?.assignedCourseIds ||
        db.courses.filter((c) => c.instructorId === u.id).map((c) => c.id),
    };
  });
}

// -------------------------------------------------------------
// SECTIONS & LESSONS OPERATIONS
// -------------------------------------------------------------

export function getSectionsByCourseId(courseId: string): CourseSection[] {
  const db = getDatabase();
  return db.sections.filter((s) => s.courseId === courseId).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getLessonsByCourseId(courseId: string): Lesson[] {
  const db = getDatabase();
  return db.lessons.filter((l) => l.courseId === courseId).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getLessonsBySectionId(sectionId: string): Lesson[] {
  const db = getDatabase();
  return db.lessons.filter((l) => l.sectionId === sectionId).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getLessonById(id: string): Lesson | undefined {
  const db = getDatabase();
  return db.lessons.find((l) => l.id === id);
}

export function createSection(section: CourseSection): CourseSection {
  const db = getDatabase();
  db.sections.push(section);
  saveDatabase(db);
  return section;
}

export function updateSection(id: string, updates: Partial<CourseSection>): CourseSection | undefined {
  const db = getDatabase();
  const idx = db.sections.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  db.sections[idx] = { ...db.sections[idx], ...updates };
  saveDatabase(db);
  return db.sections[idx];
}

export function deleteSection(id: string): boolean {
  const db = getDatabase();
  db.sections = db.sections.filter((s) => s.id !== id);
  db.lessons = db.lessons.filter((l) => l.sectionId !== id);
  saveDatabase(db);
  return true;
}

export function createLesson(lesson: Lesson): Lesson {
  const db = getDatabase();
  db.lessons.push(lesson);
  saveDatabase(db);
  return lesson;
}

export function updateLesson(id: string, updates: Partial<Lesson>): Lesson | undefined {
  const db = getDatabase();
  const idx = db.lessons.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  db.lessons[idx] = { ...db.lessons[idx], ...updates };
  saveDatabase(db);
  return db.lessons[idx];
}

export function deleteLesson(id: string): boolean {
  const db = getDatabase();
  db.lessons = db.lessons.filter((l) => l.id !== id);
  saveDatabase(db);
  return true;
}

// -------------------------------------------------------------
// ENROLLMENT & ACCESS PERMISSIONS
// -------------------------------------------------------------

export function hasCourseAccess(studentId: string, courseId: string): boolean {
  const db = getDatabase();
  const user = db.users.find((u) => u.id === studentId);
  if (user && (user.role === 'admin' || user.role === 'instructor')) {
    return true; // Admins and Instructors have universal preview/instruction access
  }
  let needsSave = false;
  const hasValid = db.enrollments.some((e) => {
    if (e.studentId !== studentId || e.courseId !== courseId) return false;
    if (e.status !== 'active') return false;
    // Strict backend enforcement of expiration date
    if (e.expiresAt && new Date(e.expiresAt).getTime() <= Date.now()) {
      e.status = 'expired';
      needsSave = true;
      return false;
    }
    return true;
  });
  if (needsSave) {
    saveDatabase(db);
  }
  return hasValid;
}

export function getAuthorizedLessonsForCourse(
  courseId: string,
  studentId?: string | null
): Lesson[] {
  const db = getDatabase();
  const isEnrolled = studentId ? hasCourseAccess(studentId, courseId) : false;

  return db.lessons
    .filter((l) => l.courseId === courseId && l.isPublished !== false)
    .sort((a, b) => (a.position ?? a.displayOrder) - (b.position ?? b.displayOrder))
    .map((lesson) => {
      const isFree = Boolean(lesson.isFreePreview || lesson.isPreview);
      if (isEnrolled || isFree) {
        return {
          ...lesson,
          isFreePreview: isFree,
          isPreview: isFree,
          isRequired: lesson.isRequired ?? true,
          position: lesson.position ?? lesson.displayOrder,
          videoProvider: lesson.videoProvider || 'youtube',
        };
      }

      // Security: Strip protected video IDs and URLs from unenrolled users
      return {
        ...lesson,
        isFreePreview: false,
        isPreview: false,
        isRequired: lesson.isRequired ?? true,
        position: lesson.position ?? lesson.displayOrder,
        videoProvider: lesson.videoProvider || 'youtube',
        videoId: undefined,
        videoUrl: undefined,
      };
    });
}

export function getEnrollmentsByStudentId(studentId: string): Enrollment[] {
  const db = getDatabase();
  return db.enrollments.filter((e) => e.studentId === studentId && e.status === 'active');
}

export function getAllEnrollments(): Enrollment[] {
  const db = getDatabase();
  return db.enrollments;
}

export function createEnrollment(
  studentId: string,
  courseId: string,
  source: Enrollment['source'] = 'purchase'
): Enrollment {
  const db = getDatabase();

  // Prevent duplicate enrollment
  const existing = db.enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
  if (existing) {
    if (existing.status !== 'active') {
      existing.status = 'active';
      existing.enrolledAt = new Date().toISOString();
      saveDatabase(db);
    }
    return existing;
  }

  const enrollmentId = `enr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const courseLessons = db.lessons.filter((l) => l.courseId === courseId);
  const course = db.courses.find((c) => c.id === courseId);

  // Compute expiration timestamp for fixed duration policies
  let expiresAt: string | undefined = undefined;
  if (course && course.validityType === 'fixed_duration' && course.validityDuration) {
    const durationDays =
      course.validityDurationUnit === 'Years'
        ? course.validityDuration * 365
        : course.validityDurationUnit === 'Months'
        ? course.validityDuration * 30
        : course.validityDuration;
    const expDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
    expiresAt = expDate.toISOString();
  }

  // Find active published batch if LIVE_INSTRUCTOR_LED
  const deliveryType: CourseDeliveryType = course?.deliveryType || 'LIVE_INSTRUCTOR_LED';
  let batchId: string | undefined = undefined;
  if (deliveryType === 'LIVE_INSTRUCTOR_LED') {
    const activeBatch = (db.liveBatches || []).find(
      (b) => b.courseId === courseId && b.isPublished && (b.status === 'upcoming' || b.status === 'ongoing')
    );
    if (activeBatch) {
      batchId = activeBatch.id;
      activeBatch.enrolledCount = (activeBatch.enrolledCount || 0) + 1;
      if (!db.batchEnrollments) db.batchEnrollments = [];
      db.batchEnrollments.push({
        id: `benr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        batchId: activeBatch.id,
        studentId,
        courseId,
        enrolledAt: new Date().toISOString(),
        status: 'active',
        attendanceRate: 100,
      });
    }
  }

  const newEnrollment: Enrollment = {
    id: enrollmentId,
    studentId,
    courseId,
    deliveryType,
    batchId,
    source,
    status: 'active',
    enrolledAt: new Date().toISOString(),
    expiresAt,
    completionPercentage: 0,
    lastAccessedAt: new Date().toISOString(),
  };

  db.enrollments.push(newEnrollment);

  // Initialize Course Progress
  const existingProgress = db.courseProgress.find((cp) => cp.studentId === studentId && cp.courseId === courseId);
  if (!existingProgress) {
    db.courseProgress.push({
      id: `cp_${enrollmentId}`,
      enrollmentId,
      studentId,
      courseId,
      completedLessonsCount: 0,
      totalLessonsCount: courseLessons.length,
      progressPercentage: 0,
      lastLessonId: courseLessons[0]?.id,
      isCompleted: false,
      updatedAt: new Date().toISOString(),
    });
  }

  // Update course student counter
  if (course) {
    course.studentsCount += 1;
  }

  // Create welcome notification
  db.notifications.push({
    id: `notif_${Date.now()}`,
    userId: studentId,
    title: `Enrolled in ${course?.title || 'New Course'}!`,
    message: 'Welcome aboard! Your course curriculum and labs are now accessible.',
    type: 'enrollment',
    isRead: false,
    link: `/learning/courses/${courseId}`,
    createdAt: new Date().toISOString(),
  });

  saveDatabase(db);
  return newEnrollment;
}

export function revokeEnrollment(studentId: string, courseId: string, adminUserId?: string): boolean {
  const db = getDatabase();
  const enrollment = db.enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
  if (!enrollment) return false;

  enrollment.status = 'suspended';

  if (adminUserId) {
    logAuditAction(adminUserId, 'REVOKE_ENROLLMENT', 'Enrollment', enrollment.id, {
      studentId,
      courseId,
    });
  }

  saveDatabase(db);
  return true;
}

// -------------------------------------------------------------
// PROGRESS & COMPLETION TRACKING
// -------------------------------------------------------------

export function getCourseProgress(studentId: string, courseId: string): CourseProgress | undefined {
  const db = getDatabase();
  return db.courseProgress.find((cp) => cp.studentId === studentId && cp.courseId === courseId);
}

export function getLessonProgress(studentId: string, lessonId: string): LessonProgress | undefined {
  const db = getDatabase();
  return db.lessonProgress.find((lp) => lp.studentId === studentId && lp.lessonId === lessonId);
}

export function markLessonComplete(studentId: string, courseId: string, lessonId: string): CourseProgress {
  const db = getDatabase();
  const now = new Date().toISOString();

  // 1. Update or create LessonProgress
  let lp = db.lessonProgress.find((p) => p.studentId === studentId && p.lessonId === lessonId);
  if (!lp) {
    lp = {
      id: `lp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      enrollmentId: `enr_${studentId}_${courseId}`,
      studentId,
      courseId,
      lessonId,
      isCompleted: true,
      videoProgressSeconds: 0,
      completedAt: now,
      lastWatchedAt: now,
    };
    db.lessonProgress.push(lp);
  } else {
    lp.isCompleted = true;
    lp.completedAt = now;
    lp.lastWatchedAt = now;
  }

  // 2. Recalculate CourseProgress
  const courseLessons = db.lessons.filter((l) => l.courseId === courseId);
  const completedLessons = db.lessonProgress.filter(
    (p) => p.studentId === studentId && p.courseId === courseId && p.isCompleted
  );

  let cp = db.courseProgress.find((p) => p.studentId === studentId && p.courseId === courseId);
  const progressPct = Math.round((completedLessons.length / Math.max(courseLessons.length, 1)) * 100);
  const isAllCompleted = completedLessons.length >= courseLessons.length && courseLessons.length > 0;

  if (!cp) {
    cp = {
      id: `cp_${studentId}_${courseId}`,
      enrollmentId: `enr_${studentId}_${courseId}`,
      studentId,
      courseId,
      completedLessonsCount: completedLessons.length,
      totalLessonsCount: courseLessons.length,
      progressPercentage: progressPct,
      lastLessonId: lessonId,
      isCompleted: isAllCompleted,
      completedAt: isAllCompleted ? now : undefined,
      updatedAt: now,
    };
    db.courseProgress.push(cp);
  } else {
    cp.completedLessonsCount = completedLessons.length;
    cp.totalLessonsCount = courseLessons.length;
    cp.progressPercentage = progressPct;
    cp.lastLessonId = lessonId;
    cp.isCompleted = isAllCompleted;
    if (isAllCompleted && !cp.completedAt) {
      cp.completedAt = now;
    }
    cp.updatedAt = now;
  }

  // 3. Update Enrollment completion percentage
  const enrollment = db.enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
  if (enrollment) {
    enrollment.completionPercentage = progressPct;
    enrollment.lastAccessedAt = now;
    if (isAllCompleted && !enrollment.completedAt) {
      enrollment.completedAt = now;
      enrollment.status = 'completed';

      // Auto-issue Certificate if eligible
      const user = db.users.find((u) => u.id === studentId);
      const course = db.courses.find((c) => c.id === courseId);
      if (user && course && course.certificateEligible) {
        issueCertificate(studentId, courseId);
      }
    }
  }

  saveDatabase(db);
  return cp;
}

export function saveVideoProgress(
  studentId: string,
  courseId: string,
  lessonId: string,
  seconds: number
): void {
  const db = getDatabase();
  const now = new Date().toISOString();

  let lp = db.lessonProgress.find((p) => p.studentId === studentId && p.lessonId === lessonId);
  if (!lp) {
    lp = {
      id: `lp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      enrollmentId: `enr_${studentId}_${courseId}`,
      studentId,
      courseId,
      lessonId,
      isCompleted: false,
      videoProgressSeconds: seconds,
      lastWatchedAt: now,
    };
    db.lessonProgress.push(lp);
  } else {
    lp.videoProgressSeconds = seconds;
    lp.lastWatchedAt = now;
  }

  const cp = db.courseProgress.find((p) => p.studentId === studentId && p.courseId === courseId);
  if (cp) {
    cp.lastLessonId = lessonId;
    cp.updatedAt = now;
  }

  saveDatabase(db);
}

// -------------------------------------------------------------
// ORDERS & PAYMENTS (E-COMMERCE)
// -------------------------------------------------------------

export function createOrder(
  studentId: string,
  items: Array<{ courseId: string; price?: number; discountPrice?: number }>,
  couponCode?: string
): Order {
  const db = getDatabase();
  const user = db.users.find((u) => u.id === studentId);
  if (!user) throw new Error('Student user not found.');

  if (!items || items.length === 0) {
    throw new Error('Cannot create an order with an empty cart.');
  }

  const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const orderNumber = `YSM-ORD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  let subtotal = 0;
  let total = 0;

  const orderItems: OrderItem[] = items.map((it) => {
    const course = db.courses.find((c) => c.id === it.courseId);
    if (!course) {
      throw new Error(`Course with ID "${it.courseId}" not found in catalog.`);
    }
    // Strictly compute prices server-side from catalog
    const itemPrice = course.regularPrice ?? course.price;
    const itemDiscount = course.sellingPrice ?? course.discountPrice ?? itemPrice;
    subtotal += itemPrice;
    total += itemDiscount;

    return {
      id: `oit_${Math.random().toString(36).substring(2, 9)}`,
      orderId,
      courseId: it.courseId,
      courseTitle: course.title,
      courseSlug: course.slug || '',
      price: itemPrice,
      discountPrice: itemDiscount,
    };
  });

  let discountFromCoupon = 0;
  let validatedCouponCode: string | undefined = undefined;

  if (couponCode && couponCode.trim()) {
    const code = couponCode.trim().toUpperCase();
    const coupon = db.coupons.find((c) => c.code.toUpperCase() === code);
    if (!coupon) {
      throw new Error(`Invalid coupon code "${code}".`);
    }
    if (!coupon.isActive) {
      throw new Error(`Coupon "${code}" is no longer active.`);
    }
    if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) {
      throw new Error(`Coupon "${code}" has expired.`);
    }
    if (coupon.usageLimit && (coupon.timesUsed || 0) >= coupon.usageLimit) {
      throw new Error(`Coupon "${code}" usage limit has been reached.`);
    }
    if (coupon.minOrderValue && total < coupon.minOrderValue) {
      throw new Error(`Coupon "${code}" requires a minimum order total of ₹${coupon.minOrderValue.toLocaleString('en-IN')}.`);
    }
    if (coupon.discountType === 'percentage') {
      discountFromCoupon = Math.round((total * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discountFromCoupon > coupon.maxDiscount) {
        discountFromCoupon = coupon.maxDiscount;
      }
    } else {
      discountFromCoupon = coupon.discountValue;
    }
    coupon.timesUsed = (coupon.timesUsed || 0) + 1;
    validatedCouponCode = code;
  }

  const finalPayable = Math.max(0, total - discountFromCoupon);

  const order: Order = {
    id: orderId,
    orderNumber,
    studentId: user.id,
    studentName: user.name,
    studentEmail: user.email,
    studentPhone: user.phone,
    items: orderItems,
    subtotalAmount: subtotal,
    discountAmount: subtotal - finalPayable,
    totalAmount: finalPayable,
    status: 'pending',
    paymentMethod: 'razorpay',
    couponCode: validatedCouponCode,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.orders.push(order);
  saveDatabase(db);
  return order;
}

export function refundOrder(
  orderId: string,
  adminUserId?: string,
  reason?: string
): Order {
  const db = getDatabase();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) throw new Error('Order not found.');
  if (order.status === 'refunded') return order;

  order.status = 'refunded';
  order.updatedAt = new Date().toISOString();

  // Find associated payment
  const payment = db.payments.find((p) => p.orderId === order.id);
  if (payment) {
    payment.status = 'refunded';
    payment.updatedAt = new Date().toISOString();
  }

  // Access Revocation Policy: Suspend all course enrollments granted under this order
  for (const item of order.items) {
    revokeEnrollment(order.studentId, item.courseId, adminUserId);
  }

  if (adminUserId) {
    logAuditAction(adminUserId, 'ORDER_REFUNDED', 'Order', order.id, {
      orderNumber: order.orderNumber,
      amount: order.totalAmount,
      reason: reason || 'Customer refund requested',
    });
  }

  saveDatabase(db);
  return order;
}

export function recordPaymentAndFulfill(
  orderId: string,
  razorpayPaymentId: string,
  razorpayOrderId?: string,
  razorpaySignature?: string
): Order {
  const db = getDatabase();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) throw new Error('Order not found.');

  // Idempotency: If already completed, return existing order
  if (order.status === 'completed') {
    return order;
  }

  const now = new Date().toISOString();

  // Record Payment
  const payment: Payment = {
    id: `pay_${razorpayPaymentId}`,
    orderId: order.id,
    studentId: order.studentId,
    amount: order.totalAmount,
    currency: 'INR',
    provider: 'razorpay',
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    status: 'captured',
    createdAt: now,
    updatedAt: now,
  };
  db.payments.push(payment);

  // Update Order Status
  order.status = 'completed';
  order.paymentId = payment.id;
  order.updatedAt = now;

  // Fulfill Course Enrollments
  for (const item of order.items) {
    createEnrollment(order.studentId, item.courseId, 'purchase');
  }

  // Audit log
  logAuditAction(order.studentId, 'ORDER_COMPLETED', 'Order', order.id, {
    orderNumber: order.orderNumber,
    amount: order.totalAmount,
    paymentId: payment.id,
  });

  saveDatabase(db);
  return order;
}

export function getOrderById(orderId: string): Order | undefined {
  const db = getDatabase();
  return db.orders.find((o) => o.id === orderId);
}

export function getOrdersByStudentId(studentId: string): Order[] {
  const db = getDatabase();
  return db.orders.filter((o) => o.studentId === studentId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getAllOrders(): Order[] {
  const db = getDatabase();
  return db.orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// -------------------------------------------------------------
// COUPON & DISCOUNT OPERATIONS
// -------------------------------------------------------------

export function getAllCoupons(): Coupon[] {
  const db = getDatabase();
  return db.coupons || [];
}

export function getCouponByCode(code: string): Coupon | undefined {
  const db = getDatabase();
  return db.coupons?.find((c) => c.code.toUpperCase() === code.toUpperCase());
}

export function toggleCouponActive(couponId: string): Coupon | undefined {
  const db = getDatabase();
  const coupon = db.coupons?.find((c) => c.id === couponId);
  if (!coupon) return undefined;
  coupon.isActive = !coupon.isActive;
  saveDatabase(db);
  return coupon;
}

// -------------------------------------------------------------
// CERTIFICATES
// -------------------------------------------------------------

export function getCertificate(studentId: string, courseId: string): Certificate | undefined {
  const db = getDatabase();
  return db.certificates.find((c) => c.studentId === studentId && c.courseId === courseId);
}

export function getCertificatesByStudentId(studentId: string): Certificate[] {
  const db = getDatabase();
  return db.certificates.filter((c) => c.studentId === studentId);
}

export function issueCertificate(studentId: string, courseId: string): Certificate {
  const db = getDatabase();
  const existing = db.certificates.find((c) => c.studentId === studentId && c.courseId === courseId);
  if (existing) return existing;

  const user = db.users.find((u) => u.id === studentId);
  const course = db.courses.find((c) => c.id === courseId);
  if (!user || !course) throw new Error('Student or Course not found for certificate issuance.');

  const certYear = new Date().getFullYear();
  const certNumber = `YSM-CERT-${certYear}-${Math.floor(100000 + Math.random() * 900000)}`;
  const verificationCode = `V-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const cert: Certificate = {
    id: `cert_${Date.now()}`,
    certificateNumber: certNumber,
    studentId: user.id,
    studentName: user.name,
    courseId: course.id,
    courseTitle: course.title,
    issuedAt: new Date().toISOString(),
    verificationCode,
    accreditationBadge: 'ISO 9001:2015 Accredited',
  };

  db.certificates.push(cert);

  // Notify student
  db.notifications.push({
    id: `notif_${Date.now()}`,
    userId: user.id,
    title: `Certificate Issued: ${course.title}!`,
    message: `Congratulations! Your official completion certificate (${certNumber}) is ready to download.`,
    type: 'certificate',
    isRead: false,
    link: `/learning/certificates`,
    createdAt: new Date().toISOString(),
  });

  saveDatabase(db);
  return cert;
}

// -------------------------------------------------------------
// QUIZZES & ASSIGNMENTS
// -------------------------------------------------------------

export function getQuizByLessonId(lessonId: string): Quiz | undefined {
  const db = getDatabase();
  return db.quizzes.find((q) => q.lessonId === lessonId);
}

export function submitQuizAttempt(
  quizId: string,
  studentId: string,
  courseId: string,
  answers: Record<string, number[]>
): QuizAttempt {
  const db = getDatabase();
  const quiz = db.quizzes.find((q) => q.id === quizId);
  if (!quiz) throw new Error('Quiz not found.');

  let totalPoints = 0;
  let earnedPoints = 0;

  for (const question of quiz.questions) {
    totalPoints += question.points;
    const selected = answers[question.id] || [];
    const isCorrect =
      selected.length === question.correctAnswers.length &&
      selected.every((val) => question.correctAnswers.includes(val));

    if (isCorrect) {
      earnedPoints += question.points;
    }
  }

  const percentage = Math.round((earnedPoints / Math.max(totalPoints, 1)) * 100);
  const passed = percentage >= quiz.passPercentage;

  const attempt: QuizAttempt = {
    id: `att_${Date.now()}`,
    quizId,
    studentId,
    courseId,
    score: earnedPoints,
    totalPoints,
    percentage,
    passed,
    answers,
    submittedAt: new Date().toISOString(),
  };

  db.quizAttempts.push(attempt);
  saveDatabase(db);
  return attempt;
}

export function getAssignmentByLessonId(lessonId: string): Assignment | undefined {
  const db = getDatabase();
  return db.assignments.find((a) => a.lessonId === lessonId);
}

export function submitAssignment(
  assignmentId: string,
  lessonId: string,
  studentId: string,
  courseId: string,
  submissionText: string,
  fileUrl?: string,
  fileName?: string
): AssignmentSubmission {
  const db = getDatabase();
  const sub: AssignmentSubmission = {
    id: `asub_${Date.now()}`,
    assignmentId,
    lessonId,
    studentId,
    courseId,
    submissionText,
    fileUrl,
    fileName,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
  };

  db.assignmentSubmissions.push(sub);
  saveDatabase(db);
  return sub;
}

// -------------------------------------------------------------
// REVIEWS
// -------------------------------------------------------------

export function getReviewsByCourseId(courseId: string): Review[] {
  const db = getDatabase();
  return db.reviews.filter((r) => r.courseId === courseId && r.isApproved);
}

export function createReview(
  courseId: string,
  studentId: string,
  rating: number,
  comment: string
): Review {
  const db = getDatabase();
  const user = db.users.find((u) => u.id === studentId);
  if (!user) throw new Error('Student not found.');

  const review: Review = {
    id: `rev_${Date.now()}`,
    courseId,
    studentId,
    studentName: user.name,
    rating: Math.max(1, Math.min(5, rating)),
    comment,
    isApproved: true, // auto-approve verified enrolled student
    createdAt: new Date().toISOString(),
  };

  db.reviews.push(review);

  // Recalculate average course rating
  const courseReviews = db.reviews.filter((r) => r.courseId === courseId && r.isApproved);
  const avg = courseReviews.reduce((acc, r) => acc + r.rating, 0) / courseReviews.length;
  const course = db.courses.find((c) => c.id === courseId);
  if (course) {
    course.rating = parseFloat(avg.toFixed(1));
    course.reviewsCount = courseReviews.length;
  }

  saveDatabase(db);
  return review;
}

// -------------------------------------------------------------
// AUDIT & ADMIN DASHBOARD STATS
// -------------------------------------------------------------

export function logAuditAction(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  details?: Record<string, unknown>
): void {
  const db = getDatabase();
  const user = db.users.find((u) => u.id === userId);

  db.auditLogs.unshift({
    id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId,
    userEmail: user?.email || 'system@ysminfotech.com',
    action,
    entityType,
    entityId,
    details,
    createdAt: new Date().toISOString(),
  });

  // Keep last 500 audit entries
  if (db.auditLogs.length > 500) {
    db.auditLogs = db.auditLogs.slice(0, 500);
  }

  saveDatabase(db);
}

export function getAdminDashboardStats() {
  const db = getDatabase();

  const totalStudents = db.users.filter((u) => u.role === 'student').length;
  const totalInstructors = db.users.filter((u) => u.role === 'instructor').length;
  const totalPublishedCourses = db.courses.filter((c) => c.isPublished).length;
  const totalDraftCourses = db.courses.filter((c) => !c.isPublished).length;
  const totalEnrollments = db.enrollments.filter((e) => e.status === 'active').length;
  const completedOrders = db.orders.filter((o) => o.status === 'completed');
  const totalRevenue = completedOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const pendingOrders = db.orders.filter((o) => o.status === 'pending');

  return {
    totalStudents,
    totalInstructors,
    totalPublishedCourses,
    totalDraftCourses,
    totalEnrollments,
    totalOrders: db.orders.length,
    completedOrdersCount: completedOrders.length,
    pendingOrdersCount: pendingOrders.length,
    totalRevenue,
    recentOrders: db.orders.slice(0, 6),
    recentEnrollments: db.enrollments.slice(0, 6),
    recentAuditLogs: db.auditLogs.slice(0, 8),
  };
}

// -------------------------------------------------------------
// LIVE BATCHES & SCHEDULE MANAGEMENT
// -------------------------------------------------------------

export function getLiveBatches(courseId?: string): LiveBatch[] {
  const db = getDatabase();
  const batches = db.liveBatches || [];
  if (!courseId) return batches;
  return batches.filter((b) => b.courseId === courseId);
}

export function getLiveBatchById(batchId: string): LiveBatch | undefined {
  const db = getDatabase();
  return (db.liveBatches || []).find((b) => b.id === batchId);
}

export function createLiveBatch(
  input: Omit<LiveBatch, 'id' | 'createdAt' | 'updatedAt' | 'enrolledCount'> & { id?: string }
): LiveBatch {
  const db = getDatabase();
  if (!db.liveBatches) db.liveBatches = [];

  const course = db.courses.find((c) => c.id === input.courseId);
  const now = new Date().toISOString();
  const batchId = input.id || `bat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  const newBatch: LiveBatch = {
    ...input,
    id: batchId,
    courseTitle: input.courseTitle || course?.title || 'Specialized Track',
    enrolledCount: 0,
    status: input.status || 'upcoming',
    isPublished: input.isPublished ?? true,
    timeZone: input.timeZone || 'Asia/Kolkata (IST)',
    meetingPlatform: input.meetingPlatform || 'google_meet',
    createdAt: now,
    updatedAt: now,
  };

  db.liveBatches.push(newBatch);
  saveDatabase(db);
  return newBatch;
}

export function updateLiveBatch(batchId: string, updates: Partial<LiveBatch>): LiveBatch | undefined {
  const db = getDatabase();
  if (!db.liveBatches) db.liveBatches = [];

  const idx = db.liveBatches.findIndex((b) => b.id === batchId);
  if (idx === -1) return undefined;

  const current = db.liveBatches[idx];
  const updated: LiveBatch = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  db.liveBatches[idx] = updated;
  saveDatabase(db);
  return updated;
}

export function deleteLiveBatch(batchId: string, force = false): { success: boolean; error?: string } {
  const db = getDatabase();
  if (!db.liveBatches) db.liveBatches = [];

  const idx = db.liveBatches.findIndex((b) => b.id === batchId);
  if (idx === -1) return { success: false, error: 'Batch not found.' };

  const enrollmentsCount = (db.batchEnrollments || []).filter((be) => be.batchId === batchId).length;
  if (enrollmentsCount > 0 && !force) {
    return {
      success: false,
      error: `Cannot delete batch with ${enrollmentsCount} enrolled students. Transfer students or archive instead.`,
    };
  }

  db.liveBatches.splice(idx, 1);
  if (db.batchEnrollments) {
    db.batchEnrollments = db.batchEnrollments.filter((be) => be.batchId !== batchId);
  }
  if (db.attendanceRecords) {
    db.attendanceRecords = db.attendanceRecords.filter((ar) => ar.batchId !== batchId);
  }

  saveDatabase(db);
  return { success: true };
}

export function getBatchEnrollments(batchId?: string, studentId?: string): BatchEnrollment[] {
  const db = getDatabase();
  let list = db.batchEnrollments || [];
  if (batchId) list = list.filter((be) => be.batchId === batchId);
  if (studentId) list = list.filter((be) => be.studentId === studentId);
  return list;
}

export function enrollStudentInBatch(batchId: string, studentId: string, courseId: string): BatchEnrollment {
  const db = getDatabase();
  if (!db.batchEnrollments) db.batchEnrollments = [];

  const existing = db.batchEnrollments.find((be) => be.batchId === batchId && be.studentId === studentId);
  if (existing) return existing;

  const newEnrollment: BatchEnrollment = {
    id: `benr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    batchId,
    studentId,
    courseId,
    enrolledAt: new Date().toISOString(),
    status: 'active',
    attendanceRate: 100,
  };

  db.batchEnrollments.push(newEnrollment);

  const batch = (db.liveBatches || []).find((b) => b.id === batchId);
  if (batch) {
    batch.enrolledCount = (batch.enrolledCount || 0) + 1;
  }

  saveDatabase(db);
  return newEnrollment;
}

export function getAttendanceRecords(batchId: string, studentId?: string): AttendanceRecord[] {
  const db = getDatabase();
  let list = (db.attendanceRecords || []).filter((ar) => ar.batchId === batchId);
  if (studentId) list = list.filter((ar) => ar.studentId === studentId);
  return list;
}

export function recordAttendance(
  batchId: string,
  records: Array<{
    studentId: string;
    sessionDate: string;
    sessionTopic: string;
    status: 'present' | 'absent' | 'excused';
    markedByInstructorId: string;
  }>
): { success: boolean; count: number } {
  const db = getDatabase();
  if (!db.attendanceRecords) db.attendanceRecords = [];

  let count = 0;
  const now = new Date().toISOString();

  for (const rec of records) {
    const existingIdx = db.attendanceRecords.findIndex(
      (ar) => ar.batchId === batchId && ar.studentId === rec.studentId && ar.sessionDate === rec.sessionDate
    );

    if (existingIdx !== -1) {
      db.attendanceRecords[existingIdx].status = rec.status;
      db.attendanceRecords[existingIdx].sessionTopic = rec.sessionTopic;
    } else {
      db.attendanceRecords.push({
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        batchId,
        studentId: rec.studentId,
        sessionDate: rec.sessionDate,
        sessionTopic: rec.sessionTopic,
        status: rec.status,
        markedByInstructorId: rec.markedByInstructorId,
        createdAt: now,
      });
    }
    count++;
  }

  saveDatabase(db);
  return { success: true, count };
}

export function getStudentLiveTraining(studentId: string) {
  const db = getDatabase();
  const enrollments = db.enrollments.filter(
    (e) => e.studentId === studentId && e.status === 'active'
  );

  return enrollments
    .map((enr) => {
      const course = db.courses.find((c) => c.id === enr.courseId);
      if (!course || course.deliveryType === 'RECORDED_SELF_PACED') return null;

      const batch =
        (db.liveBatches || []).find((b) => b.id === enr.batchId) ||
        (db.liveBatches || []).find((b) => b.courseId === course.id);

      const studentAttendance = (db.attendanceRecords || []).filter(
        (ar) => ar.batchId === batch?.id && ar.studentId === studentId
      );
      const totalSessions = studentAttendance.length;
      const presentSessions = studentAttendance.filter((ar) => ar.status === 'present').length;
      const attendanceRate = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 100;

      return {
        enrollment: enr,
        course,
        batch,
        attendanceRate,
        totalSessions,
        presentSessions,
      };
    })
    .filter(Boolean);
}

export function getStudentELearning(studentId: string) {
  const db = getDatabase();
  const enrollments = db.enrollments.filter(
    (e) => e.studentId === studentId && e.status === 'active'
  );

  return enrollments
    .map((enr) => {
      const course = db.courses.find((c) => c.id === enr.courseId);
      if (!course || course.deliveryType === 'LIVE_INSTRUCTOR_LED') return null;

      const progress = db.courseProgress.find(
        (cp) => cp.studentId === studentId && cp.courseId === enr.courseId
      );
      const totalLessons = db.lessons.filter((l) => l.courseId === enr.courseId).length;
      const completedLessons = db.lessonProgress.filter(
        (lp) => lp.studentId === studentId && lp.courseId === enr.courseId && lp.isCompleted
      ).length;

      return {
        enrollment: enr,
        course,
        progress,
        totalLessons,
        completedLessons,
        completionPercentage: Math.round((completedLessons / Math.max(totalLessons, 1)) * 100),
      };
    })
    .filter(Boolean);
}

/**
 * YSM INFOTECH — COMPLETE LMS & COURSE COMMERCE PLATFORM
 * Core Relational Entity Definitions & Schema Types
 */

export type UserRole = 'guest' | 'student' | 'instructor' | 'admin';

export type CourseDeliveryType = 'LIVE_INSTRUCTOR_LED' | 'RECORDED_SELF_PACED';

export type BatchStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface LiveBatch {
  id: string;
  courseId: string;
  courseTitle?: string;
  batchCode: string; // e.g. "BAT-AI-2026-01"
  title: string; // e.g. "Morning Executive Cohort A"
  startDate: string; // ISO date e.g. "2026-12-01"
  endDate: string; // ISO date e.g. "2026-12-30"
  scheduleDescription: string; // e.g. "Mon-Fri • 07:00 AM - 08:30 AM IST"
  timeZone: string; // e.g. "Asia/Kolkata (IST)"
  meetingPlatform: 'zoom' | 'google_meet' | 'microsoft_teams' | 'custom';
  meetingLink?: string; // Meeting Join URL (hidden unless enrolled or admin)
  meetingId?: string;
  meetingPasscode?: string;
  instructorId: string;
  instructorName: string;
  maxCapacity: number; // e.g. 30
  enrolledCount: number;
  status: BatchStatus;
  isPublished: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BatchEnrollment {
  id: string;
  batchId: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
  attendanceRate: number; // e.g. 95 (percentage)
}

export interface AttendanceRecord {
  id: string;
  batchId: string;
  studentId: string;
  sessionDate: string; // "2026-12-01"
  sessionTopic: string;
  status: 'present' | 'absent' | 'excused';
  markedByInstructorId: string;
  createdAt: string;
}

export type EnrollmentSource =
  | 'purchase'
  | 'manual_admin'
  | 'complimentary'
  | 'promotion';

export type EnrollmentStatus = 'active' | 'suspended' | 'completed' | 'expired';

export type LessonType = 'video' | 'text' | 'pdf' | 'quiz' | 'assignment';

export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type PaymentStatus =
  | 'created'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'refunded';

export type QuestionType = 'mcq' | 'multiple' | 'true_false';

export type NotificationType =
  | 'enrollment'
  | 'payment'
  | 'announcement'
  | 'assessment'
  | 'certificate'
  | 'system';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  completedCoursesCount: number;
  certificatesCount: number;
  updatedAt: string;
}

export interface InstructorProfile {
  id: string;
  userId: string;
  title: string;
  bio: string;
  expertise: string[];
  assignedCourseIds: string[];
  updatedAt: string;
}

export interface CourseCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  displayOrder: number;
}

export type CourseSkillLevel = 'Beginner' | 'Medium' | 'Intermediate' | 'Advanced' | 'All Levels';
export type CourseStatus = 'published' | 'draft' | 'archived';
export type CourseValidityType = 'lifetime' | 'fixed_duration';
export type CourseDurationUnit = 'Days' | 'Weeks' | 'Months' | 'Hours';
export type CourseValidityUnit = 'Days' | 'Months' | 'Years';

export interface CreateCourseInput {
  title: string;
  slug?: string;
  subtitle?: string;
  description: string;
  categoryId: string;
  deliveryType?: CourseDeliveryType;
  skillLevel?: CourseSkillLevel;
  language?: string;
  durationValue?: number;
  durationUnit?: CourseDurationUnit;
  regularPrice: number;
  sellingPrice: number;
  discountEnabled?: boolean;
  validityType?: CourseValidityType;
  validityDuration?: number;
  instructorId?: string;
  thumbnailUrl?: string;
  promotionalVideoUrl?: string;
  status?: CourseStatus;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdateCourseInput {
  title?: string;
  slug?: string;
  subtitle?: string;
  description?: string;
  categoryId?: string;
  deliveryType?: CourseDeliveryType;
  skillLevel?: CourseSkillLevel;
  language?: string;
  durationValue?: number;
  durationUnit?: CourseDurationUnit;
  duration?: string;
  regularPrice?: number;
  sellingPrice?: number;
  discountPercentage?: number;
  discountEnabled?: boolean;
  discountStartsAt?: string;
  discountEndsAt?: string;
  validityType?: CourseValidityType;
  validityDuration?: number;
  instructorId?: string;
  thumbnailUrl?: string;
  promotionalVideoUrl?: string;
  status?: CourseStatus;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface CoursePricingInput {
  regularPrice: number;
  sellingPrice: number;
  discountEnabled?: boolean;
  discountStartsAt?: string;
  discountEndsAt?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overviewParagraphs: string[];
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  deliveryType: CourseDeliveryType; // 'LIVE_INSTRUCTOR_LED' | 'RECORDED_SELF_PACED'
  duration: string;
  durationValue?: number;
  durationUnit?: CourseDurationUnit;
  skillLevel: CourseSkillLevel;
  trainingMode: string;
  price: number; // in INR (regular price)
  regularPrice?: number; // Alias for price
  discountPrice: number; // in INR (current selling price)
  sellingPrice?: number; // Alias for discountPrice
  discountPercentage?: number; // Auto-calculated e.g. 50
  discountEnabled?: boolean;
  discountStartsAt?: string;
  discountEndsAt?: string;
  validityType?: CourseValidityType; // 'lifetime' | 'fixed_duration'
  validityDuration?: number; // e.g. 180 (days/months)
  validityDurationUnit?: CourseValidityUnit;
  thumbnailUrl: string;
  bannerUrl: string;
  promoVideoUrl?: string;
  promotionalVideoUrl?: string; // Standardized promotional video URL
  rating: number; // e.g. 4.8
  reviewsCount: number;
  studentsCount: number;
  isPublished: boolean;
  status?: CourseStatus; // 'published' | 'draft' | 'archived'
  isFeatured: boolean;
  instructorId: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio?: string;
  instructorAvatarUrl?: string;
  instructorIds?: string[];
  language?: string; // e.g. 'English', 'Hindi / English'
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  toolsCovered: string[];
  featureBadges: string[];
  certificateEligible: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseSection {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
}

export type VideoProvider = 'youtube' | 'vimeo' | 'cloudflare' | 'custom' | 'mp4';

export interface Lesson {
  id: string;
  sectionId: string;
  courseId: string;
  title: string;
  description?: string;
  videoProvider?: VideoProvider; // defaults to 'youtube'
  videoId?: string; // normalized YouTube 11-char ID
  videoUrl?: string; // full YouTube URL or embed URL
  durationSeconds: number; // for video/estimated read time
  lessonType: LessonType;
  contentText?: string; // Rich article / markdown
  isFreePreview?: boolean; // Accessible to guests without purchase
  isPreview: boolean; // Backwards-compatible alias for isFreePreview
  isRequired?: boolean; // Required for 100% course completion
  isPublished: boolean;
  position?: number; // Ordering sequence
  displayOrder: number; // Backwards-compatible alias for position
  dripDays?: number; // Days after enrollment when available
  createdAt: string;
  updatedAt?: string;
}

export interface LessonResource {
  id: string;
  lessonId: string;
  courseId: string;
  title: string;
  fileUrl: string;
  fileType: string; // 'pdf', 'zip', 'ipynb', etc.
  fileSizeMb?: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  deliveryType?: CourseDeliveryType;
  batchId?: string; // Linked cohort batch if LIVE_INSTRUCTOR_LED
  source: EnrollmentSource;
  status: EnrollmentStatus;
  enrolledAt: string;
  expiresAt?: string;
  completionPercentage: number;
  lastAccessedAt?: string;
  completedAt?: string;
}

export interface LessonProgress {
  id: string;
  enrollmentId: string;
  studentId: string;
  courseId: string;
  lessonId: string;
  isCompleted: boolean;
  videoProgressSeconds: number;
  completedAt?: string;
  lastWatchedAt: string;
}

export interface CourseProgress {
  id: string;
  enrollmentId: string;
  studentId: string;
  courseId: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  progressPercentage: number;
  lastLessonId?: string;
  isCompleted: boolean;
  completedAt?: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string; // YSM-ORD-XXXXXX
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  items: OrderItem[];
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number; // Final payable in INR
  status: OrderStatus;
  paymentMethod: string;
  paymentId?: string;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  deliveryType?: CourseDeliveryType;
  batchId?: string;
  price: number;
  discountPrice: number;
}

export interface Payment {
  id: string;
  orderId: string;
  studentId: string;
  amount: number;
  currency: 'INR';
  provider: 'razorpay' | 'manual';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: PaymentStatus;
  rawPayload?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Refund {
  id: string;
  paymentId: string;
  orderId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'completed' | 'rejected';
  processedByAdminId?: string;
  processedAt?: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string; // e.g. "DIWALI20", "AI50"
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  timesUsed: number;
  isActive: boolean;
  courseId?: string; // If course-specific, or undefined for global
  expiresAt?: string;
  createdAt: string;
}

export interface CouponRedemption {
  id: string;
  couponId: string;
  studentId: string;
  orderId: string;
  redeemedAt: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  courseId: string;
  title: string;
  passPercentage: number; // e.g. 70
  timeLimitMinutes?: number;
  questions: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  prompt: string;
  type: QuestionType;
  options: string[];
  correctAnswers: number[]; // Indices of correct options
  explanation?: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  courseId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, number[]>; // questionId -> selectedIndices
  submittedAt: string;
}

export interface Assignment {
  id: string;
  lessonId: string;
  courseId: string;
  title: string;
  instructions: string;
  maxPoints: number;
  deadlineDays?: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  lessonId: string;
  studentId: string;
  courseId: string;
  submissionText: string;
  fileUrl?: string;
  fileName?: string;
  status: 'submitted' | 'graded';
  score?: number;
  feedback?: string;
  gradedByInstructorId?: string;
  submittedAt: string;
  gradedAt?: string;
}

export interface Review {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  rating: number; // 1 to 5
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string; // YSM-CERT-YYYY-XXXX
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  verificationCode: string;
  accreditationBadge: string; // ISO 9001:2015
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  courseId: string;
  instructorId: string;
  instructorName: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

/**
 * Root Database Document Structure
 */
export interface LMSDatabase {
  users: User[];
  studentProfiles: StudentProfile[];
  instructorProfiles: InstructorProfile[];
  categories: CourseCategory[];
  courses: Course[];
  liveBatches: LiveBatch[];
  batchEnrollments: BatchEnrollment[];
  attendanceRecords: AttendanceRecord[];
  sections: CourseSection[];
  lessons: Lesson[];
  resources: LessonResource[];
  enrollments: Enrollment[];
  lessonProgress: LessonProgress[];
  courseProgress: CourseProgress[];
  orders: Order[];
  payments: Payment[];
  refunds: Refund[];
  coupons: Coupon[];
  couponRedemptions: CouponRedemption[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  assignments: Assignment[];
  assignmentSubmissions: AssignmentSubmission[];
  reviews: Review[];
  certificates: Certificate[];
  notifications: Notification[];
  announcements: Announcement[];
  auditLogs: AuditLog[];
}

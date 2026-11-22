'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth/session';
import {
  hasCourseAccess,
  markLessonComplete,
  saveVideoProgress,
  submitQuizAttempt,
  submitAssignment,
  getLessonById,
  getLessonProgress,
} from '@/lib/db';

// Configurable completion threshold: 80% of video duration must be watched
const LESSON_COMPLETION_THRESHOLD_PERCENT = 80;

export async function markLessonCompleteAction(
  courseId: string,
  lessonId: string,
  clientProgressPercentage?: number
) {
  const user = await requireAuth();

  const lesson = getLessonById(lessonId);
  if (!lesson || lesson.courseId !== courseId) {
    throw new Error('Lesson not found.');
  }

  const isFree = Boolean(lesson.isFreePreview || lesson.isPreview);
  const isAuthorized = hasCourseAccess(user.id, courseId);

  if (!isAuthorized && !isFree) {
    throw new Error('You do not have active access to this course.');
  }

  // Validate completion threshold server-side: check recorded progress or verified client playback
  const currentProgress = getLessonProgress(user.id, lessonId);
  const watchedSeconds = currentProgress?.videoProgressSeconds || 0;
  const thresholdSeconds = (lesson.durationSeconds * LESSON_COMPLETION_THRESHOLD_PERCENT) / 100;

  const thresholdMet =
    watchedSeconds >= thresholdSeconds ||
    (clientProgressPercentage !== undefined && clientProgressPercentage >= LESSON_COMPLETION_THRESHOLD_PERCENT) ||
    currentProgress?.isCompleted;

  if (!thresholdMet && lesson.isRequired !== false) {
    return {
      success: false,
      error: `Please watch at least ${LESSON_COMPLETION_THRESHOLD_PERCENT}% of the lecture before marking complete.`,
      thresholdMet: false,
    };
  }

  const progress = markLessonComplete(user.id, courseId, lessonId);
  revalidatePath(`/learning/courses/${courseId}`);
  revalidatePath('/learning');
  revalidatePath('/learning/my-courses');

  return { success: true, progress, thresholdMet: true };
}

export async function saveVideoProgressAction(
  courseId: string,
  lessonId: string,
  seconds: number,
  durationSeconds?: number
) {
  const user = await requireAuth();

  const lesson = getLessonById(lessonId);
  if (!lesson || lesson.courseId !== courseId) {
    return { success: false };
  }

  const isFree = Boolean(lesson.isFreePreview || lesson.isPreview);
  const isAuthorized = hasCourseAccess(user.id, courseId);

  if (!isAuthorized && !isFree) {
    return { success: false };
  }

  saveVideoProgress(user.id, courseId, lessonId, Math.max(0, seconds));

  const totalDuration = durationSeconds || lesson.durationSeconds || 60;
  const percentWatched = Math.min(100, Math.round((seconds / totalDuration) * 100));
  const isThresholdReached = percentWatched >= LESSON_COMPLETION_THRESHOLD_PERCENT;

  return { success: true, percentWatched, isThresholdReached };
}

export async function submitQuizAction(
  quizId: string,
  courseId: string,
  answers: Record<string, number[]>
) {
  const user = await requireAuth();

  if (!hasCourseAccess(user.id, courseId)) {
    throw new Error('Course access required to submit assessments.');
  }

  const attempt = submitQuizAttempt(quizId, user.id, courseId, answers);
  revalidatePath(`/learning/courses/${courseId}`);

  return { success: true, attempt };
}

export async function submitAssignmentAction(
  assignmentId: string,
  lessonId: string,
  courseId: string,
  text: string
) {
  const user = await requireAuth();

  if (!hasCourseAccess(user.id, courseId)) {
    throw new Error('Course access required to submit assignments.');
  }

  const sub = submitAssignment(assignmentId, lessonId, user.id, courseId, text);
  revalidatePath(`/learning/courses/${courseId}`);

  return { success: true, submission: sub };
}

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Course, CourseSection, Lesson, LessonProgress, CourseProgress, Quiz, Assignment } from '@/lib/db/schema';
import { markLessonCompleteAction, saveVideoProgressAction, submitQuizAction } from '@/app/actions/learning';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT?: any;
  }
}

interface CoursePlayerViewProps {
  course: Course;
  sections: CourseSection[];
  lessons: Lesson[];
  initialLessonProgress: LessonProgress[];
  initialCourseProgress?: CourseProgress;
  quizzes: Quiz[];
  assignments: Assignment[];
  userId: string;
  isEnrolled?: boolean;
}

export function CoursePlayerView({
  course,
  sections,
  lessons,
  initialLessonProgress,
  initialCourseProgress,
  quizzes,
  assignments,
  isEnrolled = true,
}: CoursePlayerViewProps) {
  // Active lesson state
  const [activeLessonId, setActiveLessonId] = useState<string>(
    initialCourseProgress?.lastLessonId || lessons[0]?.id || ''
  );
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(
    initialLessonProgress.filter((p) => p.isCompleted).map((p) => p.lessonId)
  );
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz' | 'resources' | 'assignment'>('notes');
  const [markingComplete, setMarkingComplete] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);

  // Playback tracking state per lesson
  const [watchedPercentMap, setWatchedPercentMap] = useState<Record<string, number>>({});
  const [videoPlaybackError, setVideoPlaybackError] = useState<string | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number[]>>({});
  const [quizResult, setQuizResult] = useState<{ passed: boolean; score: number; total: number; percentage: number } | null>(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedTimeRef = useRef<number>(0);

  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];
  const activeSection = sections.find((s) => s.id === activeLesson?.sectionId);
  const currentQuiz = quizzes.find((q) => q.lessonId === activeLesson?.id);
  const currentAssignment = assignments.find((a) => a.lessonId === activeLesson?.id);

  const activeLessonIndex = lessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = activeLessonIndex > 0 ? lessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < lessons.length - 1 ? lessons[activeLessonIndex + 1] : null;

  const totalLessonsCount = lessons.length;
  const completedCount = completedLessonIds.length;
  const progressPercentage = Math.round((completedCount / Math.max(totalLessonsCount, 1)) * 100);

  // Determine if active lesson is accessible
  const isLessonPreview = Boolean(activeLesson?.isFreePreview || activeLesson?.isPreview);
  const isLessonAccessible = isEnrolled || isLessonPreview;
  const isLessonCompleted = Boolean(activeLesson && completedLessonIds.includes(activeLesson.id));

  // Derive watched percentage cleanly without cascading renders
  const savedProgress = initialLessonProgress.find((p) => p.lessonId === activeLesson?.id);
  const baselinePercent = savedProgress?.isCompleted
    ? 100
    : savedProgress && savedProgress.videoProgressSeconds > 0 && activeLesson && activeLesson.durationSeconds > 0
    ? Math.min(100, Math.round((savedProgress.videoProgressSeconds / activeLesson.durationSeconds) * 100))
    : 0;
  const currentWatchedPercent = Math.max(baselinePercent, watchedPercentMap[activeLesson?.id || ''] || 0);

  const changeActiveLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab('notes');
    setQuizResult(null);
    setCompletionError(null);
    setVideoPlaybackError(null);
  };

  // Periodic progress saving helper
  const handleSaveProgress = useCallback(
    async (currentTime: number, duration: number) => {
      if (!activeLesson || !isLessonAccessible) return;
      if (Math.abs(currentTime - lastSavedTimeRef.current) < 3) return; // Debounce saves
      lastSavedTimeRef.current = currentTime;

      const pct = Math.min(100, Math.round((currentTime / Math.max(duration, 1)) * 100));
      setWatchedPercentMap((prev) => ({
        ...prev,
        [activeLesson.id]: Math.max(prev[activeLesson.id] || 0, pct),
      }));

      try {
        await saveVideoProgressAction(course.id, activeLesson.id, currentTime, duration);
      } catch (err) {
        console.error('Failed to sync video progress:', err);
      }
    },
    [activeLesson, course.id, isLessonAccessible]
  );

  // Initialize YouTube IFrame API player
  useEffect(() => {
    if (!activeLesson || !isLessonAccessible || !activeLesson.videoId) {
      return;
    }

    let isMounted = true;

    const cleanupTracking = () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
        trackingIntervalRef.current = null;
      }
    };

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      const container = document.getElementById('ysm-yt-player-container');
      if (!container || !isMounted) return;

      try {
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player('ysm-yt-player-container', {
          videoId: activeLesson.videoId,
          playerVars: {
            autoplay: 0,
            enablejsapi: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : undefined,
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              if (!isMounted) return;
              const YTState = window.YT.PlayerState;

              // Playing: track progress every second
              if (event.data === YTState.PLAYING) {
                cleanupTracking();
                trackingIntervalRef.current = setInterval(() => {
                  if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                    const current = playerRef.current.getCurrentTime();
                    const duration = playerRef.current.getDuration() || activeLesson.durationSeconds;
                    handleSaveProgress(current, duration);
                  }
                }, 2000);
              } else if (event.data === YTState.PAUSED || event.data === YTState.BUFFERING) {
                cleanupTracking();
                if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                  const current = playerRef.current.getCurrentTime();
                  const duration = playerRef.current.getDuration() || activeLesson.durationSeconds;
                  handleSaveProgress(current, duration);
                }
              } else if (event.data === YTState.ENDED) {
                cleanupTracking();
                setWatchedPercentMap((prev) => ({
                  ...prev,
                  [activeLesson.id]: 100,
                }));
                if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
                  const duration = playerRef.current.getDuration() || activeLesson.durationSeconds;
                  handleSaveProgress(duration, duration);
                }
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (event: any) => {
              console.warn('YouTube Player Event Error:', event.data);
              setVideoPlaybackError(
                'This video may have embedding restrictions or is temporarily unavailable directly in the portal.'
              );
            },
          },
        });
      } catch (err) {
        console.error('Failed to instantiate YouTube player:', err);
      }
    };

    // Load YouTube IFrame API if not already present
    if (typeof window !== 'undefined' && !window.YT) {
      const existingScript = document.getElementById('youtube-iframe-api-script');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        if (isMounted) initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
      cleanupTracking();
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
        playerRef.current = null;
      }
    };
  }, [activeLessonId, activeLesson, isLessonAccessible, handleSaveProgress]);

  const handleToggleComplete = async () => {
    if (!activeLesson) return;
    setMarkingComplete(true);
    setCompletionError(null);

    try {
      const res = await markLessonCompleteAction(
        course.id,
        activeLesson.id,
        currentWatchedPercent
      );

      if (res.success) {
        if (!completedLessonIds.includes(activeLesson.id)) {
          setCompletedLessonIds((prev) => [...prev, activeLesson.id]);
        }
      } else if (res.error) {
        setCompletionError(res.error);
      }
    } catch (e: unknown) {
      console.error('Failed to mark lesson complete:', e);
      setCompletionError(e instanceof Error ? e.message : 'Failed to update lesson status.');
    } finally {
      setMarkingComplete(false);
    }
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number, isMulti: boolean) => {
    setQuizAnswers((prev) => {
      const current = prev[questionId] || [];
      if (isMulti) {
        return {
          ...prev,
          [questionId]: current.includes(optionIndex)
            ? current.filter((i) => i !== optionIndex)
            : [...current, optionIndex],
        };
      }
      return {
        ...prev,
        [questionId]: [optionIndex],
      };
    });
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuiz) return;
    setSubmittingQuiz(true);
    try {
      const res = await submitQuizAction(currentQuiz.id, course.id, quizAnswers);
      if (res.success && res.attempt) {
        setQuizResult({
          passed: res.attempt.passed,
          score: res.attempt.score,
          total: res.attempt.totalPoints,
          percentage: res.attempt.percentage,
        });
        if (res.attempt.passed && !completedLessonIds.includes(activeLesson.id)) {
          await handleToggleComplete();
        }
      }
    } catch (e) {
      console.error('Quiz submission failed:', e);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  const canMarkComplete = isLessonCompleted || currentWatchedPercent >= 80;

  return (
    <div className="bg-[#0B1A19] text-white min-h-screen flex flex-col">
      {/* Top Learning Interface Bar */}
      <div className="bg-[#081514] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/learning/my-courses"
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            title="Return to My Courses"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </Link>
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5BC4CC] font-bold block truncate">
              {course.categoryName} &bull; {course.title}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white truncate block">
              {activeLesson?.title || 'Course Lecture'}
            </span>
          </div>
        </div>

        {/* Course Progress Counter */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-mono uppercase text-white/50 block">Your Progress</span>
            <span className="text-xs font-bold text-[#5BC4CC]">
              {completedCount} of {totalLessonsCount} Completed ({progressPercentage}%)
            </span>
          </div>
          <div className="w-16 sm:w-24 h-2 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-[#16B6B8] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Player + Navigation (8 cols) & Curriculum Sidebar (4 cols) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column (8 cols): Video Player & Interactive Tabs */}
        <div className="lg:col-span-8 flex flex-col bg-[#0B1F1E] border-r border-white/10 overflow-y-auto">
          {/* Responsive High-Definition Video Player Container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {isLessonAccessible && activeLesson?.videoId ? (
              <>
                {/* Free Preview Banner */}
                {isLessonPreview && !isEnrolled && (
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-[#071E1C] text-[11px] font-extrabold uppercase tracking-wide backdrop-blur-xs shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#071E1C] animate-pulse" />
                    <span>Free Public Preview</span>
                  </div>
                )}

                {/* YouTube IFrame Player Element */}
                <div
                  id="ysm-yt-player-container"
                  className="w-full h-full"
                />

                {/* Fallback iFrame if JS API has error or is blocked */}
                {videoPlaybackError && (
                  <div className="absolute inset-0 bg-[#0B1A19]/95 z-30 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-white mb-1">Video Playback Notice</p>
                    <p className="text-xs text-[#8A9795] max-w-md mb-4">{videoPlaybackError}</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={activeLesson.videoUrl || `https://www.youtube.com/watch?v=${activeLesson.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors"
                      >
                        <span>Open Video in YouTube</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                      <button
                        type="button"
                        onClick={() => setVideoPlaybackError(null)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white bg-white/10"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Protected Locked Lesson Overlay */
              <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#0F2625] to-[#081514]">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/5">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                <span className="font-mono text-xs uppercase font-bold tracking-wider text-amber-400 mb-1">
                  ENROLLMENT REQUIRED
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {activeLesson?.title || 'Protected Course Lesson'}
                </h3>
                <p className="text-xs text-[#8A9795] max-w-md mb-6 leading-relaxed">
                  This video lecture is part of the certified syllabus for <strong>{course.title}</strong>. Enroll now to access all curriculum modules, lab code, and ISO 9001:2015 certification.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors shadow-md"
                  >
                    <span>Enroll Now &bull; ₹{course.discountPrice.toLocaleString('en-IN')}</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>

                  <Link
                    href={`/courses/${course.slug}#curriculum`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/80 bg-white/10 hover:bg-white/15 transition-colors"
                  >
                    View Syllabus Overview
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Action Controls Strip */}
          <div className="p-4 sm:p-5 bg-[#081817] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleComplete}
                disabled={markingComplete || !isLessonAccessible}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isLessonCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : canMarkComplete
                    ? 'bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] shadow-md shadow-[#16B6B8]/20'
                    : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                }`}
                title={
                  isLessonCompleted
                    ? 'Lesson completed'
                    : canMarkComplete
                    ? 'Click to mark as complete'
                    : `Please watch at least 80% to mark complete (currently ${currentWatchedPercent}%)`
                }
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  {isLessonCompleted
                    ? 'Completed ✓'
                    : canMarkComplete
                    ? 'Mark as Complete'
                    : `Watch 80% to Complete (${currentWatchedPercent}%)`}
                </span>
              </button>

              {/* Real-time Watch Progress indicator */}
              {isLessonAccessible && (
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-white/60">
                  <span>Watched: {currentWatchedPercent}%</span>
                  <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        currentWatchedPercent >= 80 ? 'bg-emerald-400' : 'bg-[#16B6B8]'
                      }`}
                      style={{ width: `${currentWatchedPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!prevLesson}
                onClick={() => prevLesson && changeActiveLesson(prevLesson.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                &larr; Previous Lesson
              </button>

              <button
                type="button"
                disabled={!nextLesson}
                onClick={() => nextLesson && changeActiveLesson(nextLesson.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#176B68] hover:bg-[#104E4D] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                Next Lesson &rarr;
              </button>
            </div>
          </div>

          {/* Completion Threshold Warning Alert */}
          {completionError && (
            <div className="mx-4 sm:mx-6 mt-3 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{completionError}</span>
              </div>
              <button
                type="button"
                onClick={() => setCompletionError(null)}
                className="text-amber-300 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 px-4 sm:px-6 bg-[#0B201F] mt-2">
            <button
              type="button"
              onClick={() => setActiveTab('notes')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'notes'
                  ? 'border-[#16B6B8] text-[#5BC4CC]'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Lecture Notes &amp; Overview
            </button>

            {currentQuiz && (
              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'quiz'
                    ? 'border-[#16B6B8] text-[#5BC4CC]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <span>Assessment Quiz</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B6B8]" />
              </button>
            )}

            {currentAssignment && (
              <button
                type="button"
                onClick={() => setActiveTab('assignment')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'assignment'
                    ? 'border-[#16B6B8] text-[#5BC4CC]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <span>Capstone Assignment</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('resources')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'resources'
                  ? 'border-[#16B6B8] text-[#5BC4CC]'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Resources &amp; Lab Files
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-6 text-left flex-1">
            {activeTab === 'notes' && (
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#5BC4CC] font-bold uppercase">
                    {activeSection?.title}
                  </span>
                  {isLessonPreview && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                      Free Preview Lecture
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white leading-snug">
                  {activeLesson?.title}
                </h2>
                <div className="prose prose-invert prose-sm text-[#D8E6E4] max-w-none whitespace-pre-wrap leading-relaxed">
                  {activeLesson?.contentText || activeLesson?.description || (
                    <p className="text-xs text-white/60">
                      In this specialized module lecture, master practical implementations with industry-standard patterns. Complete the hands-on lab code and assessments to progress through your track.
                    </p>
                  )}
                </div>

                {/* Server-Side Entitlement & Video Policy Notice */}
                <div className="mt-6 p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#5BC4CC]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>LMS Entitlement &amp; Content Delivery Policy</span>
                  </div>
                  <p className="leading-relaxed text-white/60">
                    Video playback is strictly authenticated and validated through YSM Infotech&apos;s server-side enrollment system. YouTube unlisted streaming is integrated with continuous watch-time tracking and automated lesson completion gating. Note: This workflow enforces LMS course progression and access entitlements; it is not hardware-level DRM encryption.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && currentQuiz && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{currentQuiz.title}</h3>
                  <p className="text-xs text-[#8A9795]">
                    Passing threshold: {currentQuiz.passPercentage}% &bull; {currentQuiz.questions.length} Questions
                  </p>
                </div>

                {quizResult && (
                  <div
                    className={`p-4 rounded-xl border text-xs ${
                      quizResult.passed
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                        : 'bg-red-950/60 border-red-500/50 text-red-200'
                    }`}
                  >
                    <span className="font-bold block text-sm mb-1">
                      {quizResult.passed ? '🎉 Congratulations! You Passed!' : 'Quiz Not Passed'}
                    </span>
                    <span>
                      You scored {quizResult.score} / {quizResult.total} ({quizResult.percentage}%).{' '}
                      {quizResult.passed
                        ? 'This module assessment has been verified in your student progress.'
                        : 'Review the lecture notes and try again.'}
                    </span>
                  </div>
                )}

                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {currentQuiz.questions.map((q, qIdx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                      <span className="text-xs font-mono text-[#5BC4CC] font-bold block">
                        Question {qIdx + 1} of {currentQuiz.questions.length} ({q.points} pts)
                      </span>
                      <p className="text-sm font-semibold text-white">{q.prompt}</p>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = (quizAnswers[q.id] || []).includes(optIdx);
                          const isMulti = q.type === 'multiple';

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectQuizOption(q.id, optIdx, isMulti)}
                              className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#16B6B8]/20 border-[#16B6B8] text-white'
                                  : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                              }`}
                            >
                              <span>{opt}</span>
                              <span
                                className={`w-4 h-4 rounded-${isMulti ? 'md' : 'full'} border flex items-center justify-center ${
                                  isSelected ? 'bg-[#16B6B8] border-[#16B6B8]' : 'border-white/30'
                                }`}
                              >
                                {isSelected && <span className="w-1.5 h-1.5 bg-[#0B1A19] rounded-full" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={submittingQuiz}
                    className="py-3 px-6 rounded-xl font-bold text-xs bg-[#16B6B8] text-[#0A201F] hover:bg-[#5BC4CC] transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {submittingQuiz ? 'Evaluating...' : 'Submit Assessment Answers'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'assignment' && currentAssignment && (
              <div className="max-w-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">{currentAssignment.title}</h3>
                <p className="text-xs text-[#D8E6E4] leading-relaxed whitespace-pre-wrap">
                  {currentAssignment.instructions}
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <label className="text-xs font-mono uppercase text-[#5BC4CC] font-bold block">
                    Your Practical Solution / GitHub Link
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Paste your GitHub repository link or code solution narrative here..."
                    className="w-full bg-[#081817] text-white text-xs p-3 rounded-lg border border-white/20 focus:outline-hidden focus:border-[#16B6B8]"
                  />
                  <button
                    type="button"
                    onClick={handleToggleComplete}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D]"
                  >
                    Submit Capstone for Faculty Evaluation
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="max-w-2xl space-y-3">
                <h3 className="text-base font-bold text-white mb-2">Lecture Reference Downloads</h3>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#EBF7F5] text-[#176B68] font-bold text-xs font-mono">
                      LAB
                    </span>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Module Laboratory Code Repository &amp; Datasets
                      </span>
                      <span className="text-[10px] text-white/50">Production Assets &bull; Verified Material</span>
                    </div>
                  </div>
                  <a
                    href="#download"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#5BC4CC] hover:bg-white/10 border border-white/20 transition-colors"
                  >
                    Download Assets
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Course Curriculum Navigation Drawer */}
        <div className="lg:col-span-4 bg-[#081716] flex flex-col border-t lg:border-t-0 overflow-y-auto">
          <div className="p-4 border-b border-white/10 bg-[#081514] flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-white tracking-wider block">
                Course Syllabus
              </span>
              <span className="text-xs text-white/50">
                {sections.length} Sections &bull; {lessons.length} Lectures
              </span>
            </div>
            {!isEnrolled && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Preview Mode
              </span>
            )}
          </div>

          <div className="divide-y divide-white/5 overflow-y-auto flex-1">
            {sections.map((section) => {
              const sectionLessons = lessons.filter((l) => l.sectionId === section.id);

              return (
                <div key={section.id} className="text-left">
                  <div className="p-3.5 bg-white/[0.02] text-xs font-bold text-[#D8E6E4] flex items-center justify-between">
                    <span className="line-clamp-1">{section.title}</span>
                    <span className="text-[10.5px] text-white/40 font-mono shrink-0">
                      {sectionLessons.length} {sectionLessons.length === 1 ? 'topic' : 'topics'}
                    </span>
                  </div>

                  <div className="divide-y divide-white/[0.03]">
                    {sectionLessons.map((les) => {
                      const isCurrent = les.id === activeLessonId;
                      const isDone = completedLessonIds.includes(les.id);
                      const isPreview = Boolean(les.isFreePreview || les.isPreview);
                      const isLocked = !isEnrolled && !isPreview;

                      return (
                        <button
                          key={les.id}
                          type="button"
                          onClick={() => changeActiveLesson(les.id)}
                          className={`w-full p-3 text-left transition-colors flex items-start gap-3 cursor-pointer ${
                            isCurrent
                              ? 'bg-[#16B6B8]/15 border-l-4 border-[#16B6B8]'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          {/* Status Icon */}
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <span className="w-4 h-4 rounded-full bg-emerald-500 text-[#0B1A19] flex items-center justify-center text-[10px] font-bold">
                                ✓
                              </span>
                            ) : isLocked ? (
                              <span className="w-4 h-4 text-amber-400 flex items-center justify-center text-[11px]" title="Locked - Enrollment Required">
                                🔒
                              </span>
                            ) : isPreview ? (
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-[9px] font-bold">
                                ▶
                              </span>
                            ) : (
                              <span className="w-4 h-4 rounded-full border border-white/20 block" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`text-xs block line-clamp-2 leading-snug ${
                                  isCurrent ? 'font-bold text-white' : 'font-medium text-white/80'
                                }`}
                              >
                                {les.title}
                              </span>
                              {isPreview && (
                                <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                                  FREE PREVIEW
                                </span>
                              )}
                            </div>
                            <span className="text-[10.5px] text-white/40 font-mono block mt-0.5">
                              {Math.round(les.durationSeconds / 60)} mins &bull; YouTube Video
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

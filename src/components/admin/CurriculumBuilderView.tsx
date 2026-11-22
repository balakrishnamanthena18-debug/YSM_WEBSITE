'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course, CourseSection, Lesson } from '@/lib/db/schema';
import {
  addCourseSectionAction,
  addLessonAction,
  updateLessonAction,
  deleteLessonAction,
} from '@/app/actions/admin';
import {
  parseAndValidateYouTubeUrl,
  getYouTubeThumbnailUrl,
} from '@/lib/video/youtube';

interface CurriculumBuilderViewProps {
  course: Course;
  initialSections: CourseSection[];
  initialLessons: Lesson[];
}

export function CurriculumBuilderView({
  course,
  initialSections,
  initialLessons,
}: CurriculumBuilderViewProps) {
  const [sections, setSections] = useState(initialSections);
  const [lessons, setLessons] = useState(initialLessons);

  // New section state
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [addingSection, setAddingSection] = useState(false);

  // Add lesson modal state
  const [targetSectionId, setTargetSectionId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonDuration, setLessonDuration] = useState('15');
  const [lessonYoutubeUrl, setLessonYoutubeUrl] = useState('');
  const [lessonIsPreview, setLessonIsPreview] = useState(false);
  const [lessonIsRequired, setLessonIsRequired] = useState(true);
  const [lessonIsPublished, setLessonIsPublished] = useState(true);
  const [lessonPosition, setLessonPosition] = useState('1');
  const [addingLesson, setAddingLesson] = useState(false);
  const [addLessonError, setAddLessonError] = useState<string | null>(null);

  // Edit lesson modal state
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDuration, setEditDuration] = useState('15');
  const [editYoutubeUrl, setEditYoutubeUrl] = useState('');
  const [editIsPreview, setEditIsPreview] = useState(false);
  const [editIsRequired, setEditIsRequired] = useState(true);
  const [editIsPublished, setEditIsPublished] = useState(true);
  const [editPosition, setEditPosition] = useState('1');
  const [updatingLesson, setUpdatingLesson] = useState(false);
  const [editLessonError, setEditLessonError] = useState<string | null>(null);

  const [deletingLessonId, setDeletingLessonId] = useState<string | null>(null);

  // Client-side YouTube validation previews
  const addYtValidation = lessonYoutubeUrl.trim()
    ? parseAndValidateYouTubeUrl(lessonYoutubeUrl)
    : null;

  const editYtValidation = editYoutubeUrl.trim()
    ? parseAndValidateYouTubeUrl(editYoutubeUrl)
    : null;

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    setAddingSection(true);
    try {
      const res = await addCourseSectionAction(course.id, newSectionTitle.trim());
      if (res.success && res.section) {
        setSections((prev) => [...prev, res.section!]);
        setNewSectionTitle('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAddingSection(false);
    }
  };

  const handleOpenAddLesson = (sectionId: string) => {
    setTargetSectionId(sectionId);
    setLessonTitle('');
    setLessonDescription('');
    setLessonDuration('15');
    setLessonYoutubeUrl('');
    setLessonIsPreview(false);
    setLessonIsRequired(true);
    setLessonIsPublished(true);
    const existingCount = lessons.filter((l) => l.sectionId === sectionId).length;
    setLessonPosition(String(existingCount + 1));
    setAddLessonError(null);
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetSectionId || !lessonTitle.trim()) return;

    // Validate YouTube URL before submission
    const validation = parseAndValidateYouTubeUrl(lessonYoutubeUrl);
    if (!validation.valid || !validation.videoId) {
      setAddLessonError(validation.error || 'Please enter a valid YouTube video link or Video ID.');
      return;
    }

    setAddingLesson(true);
    setAddLessonError(null);

    try {
      const duration = parseInt(lessonDuration, 10) || 15;
      const position = parseInt(lessonPosition, 10) || 1;

      const res = await addLessonAction({
        sectionId: targetSectionId,
        courseId: course.id,
        title: lessonTitle.trim(),
        description: lessonDescription.trim() || undefined,
        youtubeUrl: lessonYoutubeUrl.trim(),
        durationMinutes: duration,
        isFreePreview: lessonIsPreview,
        isRequired: lessonIsRequired,
        isPublished: lessonIsPublished,
        position,
      });

      if (res.success && res.lesson) {
        setLessons((prev) => [...prev, res.lesson!]);
        setTargetSectionId(null);
        setLessonTitle('');
        setLessonDescription('');
        setLessonYoutubeUrl('');
      } else if (res.error) {
        setAddLessonError(res.error);
      }
    } catch (err) {
      console.error(err);
      setAddLessonError('Failed to add lesson. Please check server logs.');
    } finally {
      setAddingLesson(false);
    }
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setEditTitle(lesson.title);
    setEditDescription(lesson.description || '');
    setEditDuration(String(Math.round(lesson.durationSeconds / 60) || 15));
    setEditYoutubeUrl(
      lesson.videoId
        ? `https://www.youtube.com/watch?v=${lesson.videoId}`
        : lesson.videoUrl || ''
    );
    setEditIsPreview(Boolean(lesson.isFreePreview || lesson.isPreview));
    setEditIsRequired(lesson.isRequired ?? true);
    setEditIsPublished(lesson.isPublished ?? true);
    setEditPosition(String(lesson.position || lesson.displayOrder || 1));
    setEditLessonError(null);
  };

  const handleUpdateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson || !editTitle.trim()) return;

    if (editYoutubeUrl.trim()) {
      const validation = parseAndValidateYouTubeUrl(editYoutubeUrl);
      if (!validation.valid) {
        setEditLessonError(validation.error || 'Please enter a valid YouTube URL.');
        return;
      }
    }

    setUpdatingLesson(true);
    setEditLessonError(null);

    try {
      const durationMinutes = parseInt(editDuration, 10) || 15;
      const position = parseInt(editPosition, 10) || 1;

      const res = await updateLessonAction(editingLesson.id, course.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        youtubeUrl: editYoutubeUrl.trim(),
        durationMinutes,
        isFreePreview: editIsPreview,
        isRequired: editIsRequired,
        isPublished: editIsPublished,
        position,
      });

      if (res.success && res.lesson) {
        setLessons((prev) =>
          prev.map((l) => (l.id === editingLesson.id ? res.lesson! : l))
        );
        setEditingLesson(null);
      } else if (res.error) {
        setEditLessonError(res.error);
      }
    } catch (err) {
      console.error(err);
      setEditLessonError('Failed to update lesson.');
    } finally {
      setUpdatingLesson(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Are you sure you want to remove this lesson from the curriculum?')) return;
    setDeletingLessonId(lessonId);
    try {
      const res = await deleteLessonAction(lessonId, course.id);
      if (res.success) {
        setLessons((prev) => prev.filter((l) => l.id !== lessonId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingLessonId(null);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Top Breadcrumb & Header */}
      <div>
        <nav className="flex items-center gap-2 text-xs text-[#586765] font-mono mb-2">
          <Link href="/admin/courses" className="hover:text-[#176B68]">
            Courses
          </Link>
          <span>&rsaquo;</span>
          <span className="text-[#111817] font-bold">{course.title}</span>
          <span>&rsaquo;</span>
          <span className="text-[#176B68]">Curriculum Builder</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3ECEA]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111817]">
              Curriculum Builder &bull; YouTube Video Manager
            </h1>
            <p className="text-xs text-[#586765] mt-1">
              Structure learning modules, paste YouTube video URLs with instant validation, and manage preview permissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/courses/${course.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#176B68] bg-[#EBF7F5] border border-[#16B6B8]/30 hover:bg-[#D7EFEA] transition-colors"
            >
              <span>View Public Page</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>

            <Link
              href={`/learning/courses/${course.id}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#176B68] hover:bg-[#104E4D] transition-colors"
            >
              <span>Open in Student Player</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Section List & Creator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Sections & Lessons */}
        <div className="lg:col-span-2 space-y-6">
          {sections.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-[#E3ECEA] p-10 text-center">
              <p className="text-sm font-semibold text-[#586765] mb-2">
                No sections defined for this course yet.
              </p>
              <p className="text-xs text-[#586765]/80">
                Use the right-hand panel to create your first curriculum section.
              </p>
            </div>
          ) : (
            sections.map((section, sIdx) => {
              const secLessons = lessons
                .filter((l) => l.sectionId === section.id)
                .sort((a, b) => (a.position || a.displayOrder || 0) - (b.position || b.displayOrder || 0));

              return (
                <div
                  key={section.id}
                  className="bg-white rounded-2xl border border-[#E3ECEA] overflow-hidden shadow-xs"
                >
                  {/* Section Title Header */}
                  <div className="p-4 sm:p-5 bg-[#F8FAFA] border-b border-[#E3ECEA] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-[#176B68]/10 text-[#176B68] text-xs font-bold flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <h3 className="font-bold text-sm text-[#111817] truncate">
                        {section.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#586765] shrink-0">
                        ({secLessons.length} lessons)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenAddLesson(section.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#176B68] bg-white border border-[#176B68]/30 hover:bg-[#EBF7F5] transition-colors shrink-0 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      <span>Add Lesson</span>
                    </button>
                  </div>

                  {/* Lessons Under This Section */}
                  <div className="divide-y divide-[#E3ECEA]">
                    {secLessons.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[#586765]">
                        No lessons in this section yet. Click &ldquo;Add Lesson&rdquo; to insert YouTube lectures.
                      </div>
                    ) : (
                      secLessons.map((lesson, lIdx) => (
                        <div
                          key={lesson.id}
                          className="p-4 flex items-center justify-between gap-4 hover:bg-[#F8FAFA] transition-colors"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Lesson Number */}
                            <span className="text-xs font-mono text-[#586765] w-5 text-right shrink-0">
                              {lesson.position || lIdx + 1}.
                            </span>

                            {/* Small YouTube Video Thumbnail */}
                            <div className="relative w-16 h-10 rounded-md overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300">
                              {lesson.videoId ? (
                                <Image
                                  src={getYouTubeThumbnailUrl(lesson.videoId, 'default')}
                                  alt={lesson.title}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-400">
                                  No Vid
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                <span className="font-semibold text-xs text-[#111817] truncate">
                                  {lesson.title}
                                </span>

                                {lesson.isFreePreview && (
                                  <span className="text-[9.5px] font-bold font-mono px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase shrink-0">
                                    Free Preview
                                  </span>
                                )}

                                {!lesson.isPublished && (
                                  <span className="text-[9.5px] font-bold font-mono px-2 py-0.2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase shrink-0">
                                    Draft
                                  </span>
                                )}

                                {lesson.isRequired === false && (
                                  <span className="text-[9.5px] font-mono px-2 py-0.2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase shrink-0">
                                    Optional
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 text-[11px] font-mono text-[#586765]">
                                <span>{Math.round(lesson.durationSeconds / 60)} mins</span>
                                <span>&bull;</span>
                                <span className="text-[#176B68]">
                                  YouTube: {lesson.videoId || 'Not set'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons: Edit & Delete */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleOpenEditLesson(lesson)}
                              className="p-1.5 rounded-lg text-[#176B68] hover:bg-[#EBF7F5] transition-colors cursor-pointer"
                              title="Edit Lesson & YouTube URL"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>

                            <button
                              type="button"
                              disabled={deletingLessonId === lesson.id}
                              onClick={() => handleDeleteLesson(lesson.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Lesson"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column (1 col): Section Creator & Guide */}
        <div className="space-y-6">
          {/* Create Section Card */}
          <div className="bg-white rounded-2xl border border-[#E3ECEA] p-5 shadow-xs">
            <h3 className="font-bold text-sm text-[#111817] mb-1">
              Add New Module Section
            </h3>
            <p className="text-xs text-[#586765] mb-4">
              Create a thematic chapter header (e.g. &ldquo;Module 3: Advanced Optimization&rdquo;).
            </p>
            <form onSubmit={handleAddSection} className="space-y-3">
              <input
                type="text"
                placeholder="e.g. Module 4: Neural Architecture Design"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                required
              />
              <button
                type="submit"
                disabled={addingSection || !newSectionTitle.trim()}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {addingSection ? 'Creating...' : '+ Create Section'}
              </button>
            </form>
          </div>

          {/* YouTube Video Hosting Guidance */}
          <div className="bg-[#0B201F] text-white rounded-2xl p-5 border border-white/10 space-y-3">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#5BC4CC] font-bold">
              YOUTUBE VIDEO HOSTING
            </span>
            <h4 className="text-sm font-bold">Supported URL Formats</h4>
            <p className="text-xs text-[#D8E6E4] leading-relaxed">
              Standard formats are validated and converted to normalized 11-char IDs:
            </p>
            <ul className="text-[11px] font-mono text-[#5BC4CC] space-y-1">
              <li>&bull; youtube.com/watch?v=VIDEO_ID</li>
              <li>&bull; youtu.be/VIDEO_ID</li>
              <li>&bull; youtube.com/embed/VIDEO_ID</li>
            </ul>
            <p className="text-[11px] text-[#A6C4C2] pt-1">
              Raw iframe HTML and external domains are blocked for security.
            </p>
          </div>
        </div>
      </div>

      {/* Add Lesson Modal */}
      {targetSectionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E3ECEA] my-8">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E3ECEA]">
              <div>
                <h3 className="font-bold text-base text-[#111817]">
                  Add Lesson to Curriculum
                </h3>
                <p className="text-xs text-[#586765]">Paste YouTube lecture link and configure lesson access.</p>
              </div>
              <button
                type="button"
                onClick={() => setTargetSectionId(null)}
                className="text-[#586765] hover:text-[#111817] p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {addLessonError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {addLessonError}
              </div>
            )}

            <form onSubmit={handleAddLesson} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Implementing Vector Search Pipelines"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  Description / Lesson Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Overview of concepts covered, prerequisite dependencies, or key takeaways..."
                  value={lessonDescription}
                  onChange={(e) => setLessonDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                />
              </div>

              {/* YouTube Video URL */}
              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  YouTube Video URL or Embed URL *
                </label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=kqtD5dpn9C8 or youtu.be/kqtD5dpn9C8"
                  value={lessonYoutubeUrl}
                  onChange={(e) => setLessonYoutubeUrl(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  required
                />

                {/* Real-time YouTube validation preview */}
                {addYtValidation && (
                  <div className="mt-2 p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
                    {addYtValidation.valid && addYtValidation.videoId ? (
                      <>
                        <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-neutral-300">
                          <Image
                            src={getYouTubeThumbnailUrl(addYtValidation.videoId, 'hqdefault')}
                            alt="YouTube Preview"
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                            <span>✓ Valid YouTube Video</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#586765] block truncate">
                            Video ID: {addYtValidation.videoId}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-rose-600 font-medium">
                        ⚠ {addYtValidation.error}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Duration & Position */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Position (Order)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={lessonPosition}
                    onChange={(e) => setLessonPosition(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>
              </div>

              {/* Toggles: Free Preview, Required, Published */}
              <div className="space-y-2 pt-2 border-t border-[#E3ECEA]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lessonIsPreview}
                    onChange={(e) => setLessonIsPreview(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176B68] focus:ring-[#176B68]"
                  />
                  <span className="text-xs font-medium text-[#111817]">
                    Free Public Preview (allow unenrolled visitors to watch)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lessonIsRequired}
                    onChange={(e) => setLessonIsRequired(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176B68] focus:ring-[#176B68]"
                  />
                  <span className="text-xs font-medium text-[#111817]">
                    Required for Course Completion (80% watch threshold enforced)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lessonIsPublished}
                    onChange={(e) => setLessonIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176B68] focus:ring-[#176B68]"
                  />
                  <span className="text-xs font-medium text-[#111817]">
                    Published (visible in syllabus)
                  </span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E3ECEA]">
                <button
                  type="button"
                  onClick={() => setTargetSectionId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#586765] hover:bg-[#F8FAFA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingLesson || !lessonTitle.trim() || !addYtValidation?.valid}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {addingLesson ? 'Adding...' : 'Add YouTube Lesson'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Lesson Modal */}
      {editingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E3ECEA] my-8">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E3ECEA]">
              <div>
                <h3 className="font-bold text-base text-[#111817]">
                  Edit Lesson &bull; {editingLesson.title}
                </h3>
                <p className="text-xs text-[#586765]">Update lecture details, YouTube video URL, and visibility settings.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingLesson(null)}
                className="text-[#586765] hover:text-[#111817] p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {editLessonError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {editLessonError}
              </div>
            )}

            <form onSubmit={handleUpdateLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  Description / Lesson Notes
                </label>
                <textarea
                  rows={2}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111817] mb-1">
                  YouTube Video URL or Embed URL
                </label>
                <input
                  type="text"
                  value={editYoutubeUrl}
                  onChange={(e) => setEditYoutubeUrl(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  required
                />

                {editYtValidation && (
                  <div className="mt-2 p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
                    {editYtValidation.valid && editYtValidation.videoId ? (
                      <>
                        <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-neutral-300">
                          <Image
                            src={getYouTubeThumbnailUrl(editYtValidation.videoId, 'hqdefault')}
                            alt="YouTube Preview"
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold text-emerald-700">
                            ✓ Valid YouTube Video
                          </span>
                          <span className="text-[10px] font-mono text-[#586765] block truncate">
                            Video ID: {editYtValidation.videoId}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-rose-600 font-medium">
                        ⚠ {editYtValidation.error}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111817] mb-1">
                    Position (Order)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={editPosition}
                    onChange={(e) => setEditPosition(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E3ECEA] focus:outline-none focus:border-[#176B68]"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E3ECEA]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsPreview}
                    onChange={(e) => setEditIsPreview(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176B68] focus:ring-[#176B68]"
                  />
                  <span className="text-xs font-medium text-[#111817]">
                    Free Public Preview (allow unenrolled visitors to watch)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsRequired}
                    onChange={(e) => setEditIsRequired(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176B68] focus:ring-[#176B68]"
                  />
                  <span className="text-xs font-medium text-[#111817]">
                    Required for Course Completion (80% watch threshold enforced)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsPublished}
                    onChange={(e) => setEditIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176B68] focus:ring-[#176B68]"
                  />
                  <span className="text-xs font-medium text-[#111817]">
                    Published (visible in syllabus)
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E3ECEA]">
                <button
                  type="button"
                  onClick={() => setEditingLesson(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#586765] hover:bg-[#F8FAFA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingLesson || !editTitle.trim() || (Boolean(editYoutubeUrl) && !editYtValidation?.valid)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#176B68] text-white hover:bg-[#104E4D] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {updatingLesson ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

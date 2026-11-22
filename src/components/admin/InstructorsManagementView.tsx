'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InstructorViewRecord } from '@/lib/db';
import { Course } from '@/lib/db/schema';

interface InstructorsManagementViewProps {
  instructors: InstructorViewRecord[];
  courses: Course[];
}

export function InstructorsManagementView({
  instructors,
  courses,
}: InstructorsManagementViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstructors = instructors.filter((inst) => {
    const q = searchTerm.toLowerCase();
    const matchName = inst.name.toLowerCase().includes(q);
    const matchEmail = inst.email.toLowerCase().includes(q);
    const matchTitle = inst.title.toLowerCase().includes(q);
    const matchSkill = inst.expertise.some((e) => e.toLowerCase().includes(q));
    return matchName || matchEmail || matchTitle || matchSkill;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#586765] block">
            Accredited Faculty
          </span>
          <span className="text-3xl font-extrabold text-[#111817] mt-1 block">
            {instructors.length}
          </span>
          <p className="text-xs text-[#586765] mt-1">
            Senior industry practitioners &amp; academic leads
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#586765] block">
            Assigned Specialized Tracks
          </span>
          <span className="text-3xl font-extrabold text-[#176B68] mt-1 block">
            {courses.length}
          </span>
          <p className="text-xs text-[#586765] mt-1">
            Active curricula under faculty supervision
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E3ECEA] shadow-xs">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#586765] block">
            Quality Assurance Standard
          </span>
          <span className="text-2xl font-extrabold text-[#0D7D7F] mt-1 block">
            ISO 9001:2015
          </span>
          <p className="text-xs text-[#586765] mt-1">
            Rigorous pedagogy &amp; 1-on-1 practical lab mentor support
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3ECEA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#586765]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search instructors by name, title, or domain expertise..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E3ECEA] bg-[#F8FAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16B6B8] focus:border-transparent transition-all"
          />
        </div>
        <div className="text-xs text-[#586765] font-mono">
          Showing {filteredInstructors.length} of {instructors.length} faculty members
        </div>
      </div>

      {/* Instructor Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInstructors.map((inst) => {
          const assignedCourses = courses.filter(
            (c) =>
              c.instructorId === inst.id ||
              inst.assignedCourseIds?.includes(c.id) ||
              c.instructorName === inst.name
          );

          return (
            <div
              key={inst.id}
              className="bg-white rounded-2xl border border-[#E3ECEA] p-6 shadow-xs hover:border-[#16B6B8]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F0F5F4]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#081716] to-[#176B68] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                      {inst.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-[#111817]">{inst.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EBF7F5] text-[#176B68] border border-[#16B6B8]/20">
                          Active Faculty
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#176B68] mt-0.5">{inst.title}</p>
                      <p className="text-[11px] text-[#586765] font-mono">{inst.email}</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="py-3.5 text-xs text-[#4A5568] leading-relaxed">
                  {inst.bio}
                </div>

                {/* Domain Expertise */}
                <div className="py-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#586765] block mb-1.5">
                    Domain Specializations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-[#F0F5F4] text-[#111817] border border-[#E3ECEA]"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assigned Courses */}
              <div className="mt-4 pt-4 border-t border-[#F0F5F4]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#586765]">
                    Assigned Courses ({assignedCourses.length})
                  </span>
                  <Link
                    href="/admin/courses"
                    className="text-[11px] font-bold text-[#176B68] hover:underline"
                  >
                    Manage Assignments &rarr;
                  </Link>
                </div>
                {assignedCourses.length > 0 ? (
                  <div className="space-y-1.5">
                    {assignedCourses.slice(0, 3).map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#F8FAFA] border border-[#E3ECEA]/80"
                      >
                        <span className="font-semibold text-[#111817] truncate max-w-[240px]">
                          {c.title}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ₹{c.price.toLocaleString('en-IN')}
                          </span>
                          <Link
                            href={`/admin/courses/${c.id}/edit`}
                            className="text-[11px] font-bold text-[#176B68] hover:text-[#081716]"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    ))}
                    {assignedCourses.length > 3 && (
                      <span className="text-[10.5px] text-[#586765] block italic pl-1">
                        + {assignedCourses.length - 3} more assigned courses
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-[#586765] italic">
                    No courses currently assigned. Assign via course editor.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

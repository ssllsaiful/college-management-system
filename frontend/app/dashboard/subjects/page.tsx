'use client';

import { useState, useEffect } from 'react';
import { BookOpen, FlaskConical, Briefcase, Users, Globe } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
}

// Static grouping definitions
const SUBJECT_GROUPS = [
  {
    label: 'Common (All Groups)',
    color: 'purple',
    icon: Globe,
    codes: ['101', '107', '275'],
  },
  {
    label: 'Science Group',
    color: 'blue',
    icon: FlaskConical,
    codes: ['174', '176', '178', '265'],
  },
  {
    label: 'Business Studies Group',
    color: 'amber',
    icon: Briefcase,
    codes: ['253', '277', '292', '109'],
  },
  {
    label: 'Humanities Group',
    color: 'emerald',
    icon: Users,
    codes: ['269', '153', '267', '121', '150', '125', '122'],
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; icon: string; header: string }> = {
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: 'text-purple-600',
    header: 'bg-purple-100 border-purple-200',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: 'text-blue-600',
    header: 'bg-blue-100 border-blue-200',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: 'text-amber-600',
    header: 'bg-amber-100 border-amber-200',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: 'text-emerald-600',
    header: 'bg-emerald-100 border-emerald-200',
  },
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/subjects/')
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch subjects', err);
        setLoading(false);
      });
  }, []);

  const getSubjectsByGroup = (codes: string[]) =>
    codes.map(code => subjects.find(s => s.code === code)).filter(Boolean) as Subject[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Subject List</h1>
        {!loading && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {subjects.length} subjects total
          </span>
        )}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
          Loading subjects...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUBJECT_GROUPS.map(group => {
            const groupSubjects = getSubjectsByGroup(group.codes);
            const colors = COLOR_MAP[group.color];
            const Icon = group.icon;

            return (
              <div
                key={group.label}
                className={`rounded-xl border ${colors.border} overflow-hidden shadow-sm`}
              >
                {/* Group Header */}
                <div className={`px-4 py-3 flex items-center gap-2 border-b ${colors.header}`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                  <h2 className={`font-semibold ${colors.text}`}>{group.label}</h2>
                  <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full border ${colors.badge}`}>
                    {groupSubjects.length} subjects
                  </span>
                </div>

                {/* Subject Rows */}
                <div className="divide-y divide-gray-100 bg-white">
                  {groupSubjects.length === 0 ? (
                    <p className="p-4 text-sm text-gray-400 italic">No subjects found.</p>
                  ) : (
                    groupSubjects.map(subject => (
                      <div key={subject.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-800">{subject.name}</span>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${colors.badge}`}>
                          {subject.code}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

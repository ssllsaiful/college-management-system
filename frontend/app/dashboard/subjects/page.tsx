'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
}

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-500" />
          <h2 className="font-semibold text-gray-700">All Available Subjects</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <th className="p-4">Subject Code</th>
                <th className="p-4">Subject Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-gray-500">Loading subjects...</td>
                </tr>
              ) : subjects.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-gray-500">No subjects found.</td>
                </tr>
              ) : (
                subjects.map(subject => (
                  <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono font-medium text-blue-600">{subject.code || '-'}</td>
                    <td className="p-4 font-medium text-gray-900">{subject.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

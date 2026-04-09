'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
}

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  roll_number: string;
  subjects: number[]; // Array of primary keys
  fourth_subject: number | null; // Primary key
}

export default function StudentSubjectsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both simultaneously
    Promise.all([
      fetch('http://127.0.0.1:8000/api/students/').then(res => res.json()),
      fetch('http://127.0.0.1:8000/api/subjects/').then(res => res.json())
    ])
      .then(([studentsData, subjectsData]) => {
        setStudents(studentsData);
        setSubjects(subjectsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data', err);
        setLoading(false);
      });
  }, []);

  // Helper to get subject name from ID
  const getSubjectName = (id: number) => {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.name : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Subjects list</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-500" />
          <h2 className="font-semibold text-gray-700">Student Course Distribution</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                <th className="p-4">Name</th>
                <th className="p-4">Roll</th>
                <th className="p-4">Subjects (List Order)</th>
                <th className="p-4">4th Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Loading student subjects...</td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No students found.</td>
                </tr>
              ) : (
                students.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">
                        {student.full_name || `${student.first_name} ${student.last_name}`}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-medium text-gray-700">{student.roll_number}</td>
                    
                    <td className="p-4">
                      {student.subjects && student.subjects.length > 0 ? (
                         <div className="flex flex-wrap gap-2">
                           {student.subjects.map(subId => (
                             <span key={subId} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">
                               {getSubjectName(subId)}
                             </span>
                           ))}
                         </div>
                      ) : (
                        <span className="text-gray-400 italic text-sm">No subjects assigned</span>
                      )}
                    </td>

                    <td className="p-4">
                      {student.fourth_subject ? (
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded border border-emerald-100 font-medium">
                          {getSubjectName(student.fourth_subject)}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic text-sm">None</span>
                      )}
                    </td>
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

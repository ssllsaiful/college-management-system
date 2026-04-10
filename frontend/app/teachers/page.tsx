'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Home as HomeIcon, Info, BookOpen, Bell, Users, Image as ImageIcon, Building2, Briefcase, Mail, ArrowLeft } from 'lucide-react';

interface Teacher {
  id: number;
  pds_id: string;
  name: string;
  designation: string;
  subject: string;
  phone: string;
  email: string;
  profile_picture: string | null;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/teachers/')
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch teachers', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50">

      {/* Content */}
      <main className="max-w-7xl mx-auto px-2 md:px-6 py-6 md:py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-[#1e3a8a] text-white py-4 px-6">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 md:w-6 md:h-6" /> শিক্ষক মন্ডলী (Teacher Directory)
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-[#1e3a8a] mx-auto mb-4"></div>
              Loading teachers information...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-100 text-[#1e3a8a] text-xs md:text-sm uppercase font-bold">
                    <th className="px-2 md:px-4 py-4 border-b text-center">ক্রমিক নং</th>
                    <th className="px-2 md:px-4 py-4 border-b text-center">ছবি</th>
                    <th className="px-2 md:px-4 py-4 border-b text-left">পিডিএস আইডি</th>
                    <th className="px-2 md:px-4 py-4 border-b text-left">নাম</th>
                    <th className="px-2 md:px-4 py-4 border-b text-left">পদবি</th>
                    <th className="px-2 md:px-4 py-4 border-b text-left">বিষয়</th>
                    <th className="px-2 md:px-4 py-4 border-b text-left">মোবাইল নাম্বার</th>
                    <th className="px-2 md:px-4 py-4 border-b text-left">ই-মেইল</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teachers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-10 text-center text-gray-500 italic text-sm">
                        No teacher information available at the moment.
                      </td>
                    </tr>
                  ) : (
                    teachers.map((teacher, index) => (
                      <tr key={teacher.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-4 py-4 text-center font-medium text-gray-600 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-center min-w-[140px]">
                          {teacher.profile_picture ? (
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-2 border-gray-200 mx-auto relative overflow-visible">
                              <img 
                                src={teacher.profile_picture} 
                                alt={teacher.name} 
                                className="w-full h-full object-cover object-top rounded-lg transition-all duration-300 hover:scale-125 md:hover:scale-150 hover:z-50 hover:shadow-2xl cursor-zoom-in relative"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-gray-200 mx-auto text-gray-400">
                              <Users size={32} className="md:w-12 md:h-12" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-xs md:text-sm font-mono text-blue-700 font-semibold">
                          {teacher.pds_id}
                        </td>
                        <td className="px-4 py-4 font-bold text-gray-900 text-sm md:text-base">
                          {teacher.name}
                        </td>
                        <td className="px-4 py-4 text-xs md:text-sm text-gray-700">
                          {teacher.designation}
                        </td>
                        <td className="px-4 py-4 text-xs md:text-sm text-gray-700">
                          {teacher.subject}
                        </td>
                        <td className="px-4 py-4 text-xs md:text-sm font-medium text-gray-800">
                          {teacher.phone}
                        </td>
                        <td className="px-4 py-4 text-xs md:text-sm text-blue-600 hover:underline">
                          <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}

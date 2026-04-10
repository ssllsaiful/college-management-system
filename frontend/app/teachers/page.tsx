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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-[#1e3a8a] hover:text-blue-700 transition font-semibold text-sm md:text-base">
              <ArrowLeft size={18} className="md:w-5 md:h-5" /> <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
          <div className="text-center flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-[#1e3a8a]">SOUTH POINT SCHOOL & COLLEGE</h1>
            <p className="text-xs md:text-sm text-gray-600">Teachers Information Directory</p>
          </div>
          <div className="w-16 md:w-32"></div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#1e5aa8] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex items-center gap-6 md:gap-8 py-3 md:py-4 text-xs md:text-sm font-medium">
            <Link href="/" className="flex items-center gap-2 hover:text-yellow-300">
              <HomeIcon size={18} /> Home
            </Link>
            <span className="flex items-center gap-2 text-yellow-300 border-b-2 border-yellow-300 pb-1">
              <Users size={18} /> Teachers
            </span>
          </div>
        </div>
      </nav>

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

      {/* Footer (Optional, matches home style) */}
      <footer className="bg-[#1a2532] text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2026 South Point School & College. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

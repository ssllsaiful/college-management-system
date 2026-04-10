'use client';
import Link from "next/link";
import { ArrowLeft, Bell, FileText, Download } from 'lucide-react';

export default function NoticesPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <Link href="/" className="flex items-center gap-2 text-[#1e3a8a] text-sm md:text-base hover:text-blue-700 transition font-semibold">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-[#1e3a8a]">CLUBS & ACTIVITIES</h1>
          <div className="hidden md:block w-32"></div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-4">
          {[
            { date: "April 10, 2026", title: "Holiday Notice for Eid-ul-Fitr", category: "Holiday" },
            { date: "April 05, 2026", title: "HSC Model Test Schedule - May 2026", category: "Exam" },
            { date: "March 28, 2026", title: "Admission Notice for Class XI", category: "Admission" },
            { date: "March 15, 2026", title: "Notice regarding New Identity Cards", category: "General" },
          ].map((notice, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-blue-300 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">{notice.title}</h3>
                  <p className="text-sm text-gray-500">{notice.date} • {notice.category}</p>
                </div>
              </div>
              <Download size={20} className="text-gray-400 group-hover:text-blue-600 transition" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

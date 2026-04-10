'use client';
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, ShieldCheck } from 'lucide-react';

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <Link href="/" className="flex items-center gap-2 text-[#1e3a8a] text-sm md:text-base hover:text-blue-700 transition font-semibold">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-[#1e3a8a]">ACADEMIC PROGRAMS</h1>
          <div className="hidden md:block w-32"></div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          {[
            { title: "Curriculum", icon: BookOpen, text: "We follow the national curriculum with integrated digital learning materials." },
            { title: "Class Routine", icon: Clock, text: "Standardized class hours designed for optimal student engagement." },
            { title: "Exam Schedule", icon: Calendar, text: "Transparent and timely schedules for all yearly assessments." },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div className="bg-blue-50 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                <item.icon size={28} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

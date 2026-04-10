'use client';
import Link from "next/link";
import { ArrowLeft, Building2, Coffee, Bus, Terminal } from 'lucide-react';

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <Link href="/" className="flex items-center gap-2 text-[#1e3a8a] text-sm md:text-base hover:text-blue-700 transition font-semibold">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-[#1e3a8a]">CAREER OPPORTUNITIES</h1>
          <div className="hidden md:block w-32"></div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {[
          { name: "Science Laboratories", icon: Terminal, desc: "Modern labs equipped with latest technology for Physics, Chemistry, and Biology." },
          { name: "Central Library", icon: Building2, desc: "Rich collection of books, journals, and digital resources for research." },
          { name: "Transport System", icon: Bus, desc: "College-owned buses covering all major routes for students and staff." },
          { name: "Student Canteen", icon: Coffee, desc: "Hygienic and healthy food options served in a clean environment." },
        ].map((facility, i) => (
          <div key={i} className="flex gap-6 items-start">
            <div className="bg-[#1e3a8a] p-5 rounded-2xl text-white shadow-lg">
              <facility.icon size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{facility.name}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{facility.desc}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

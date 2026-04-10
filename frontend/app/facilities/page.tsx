'use client';
import Link from "next/link";
import { ArrowLeft, Building2, Coffee, Bus, Terminal } from 'lucide-react';

export default function FacilitiesPage() {
  return (
    <div className="bg-gray-50 uppercase">
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

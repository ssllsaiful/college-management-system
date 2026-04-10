'use client';

import Link from "next/link";
import { Home as HomeIcon, Info, ArrowLeft, Users, Calendar, Award } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="bg-gray-50">

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* History Section */}
        <section className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3 text-[#1e3a8a]">
            <Award className="w-6 h-6 md:w-8 md:h-8" />
            <h2 className="text-2xl md:text-3xl font-bold italic">Our Glorious History</h2>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700 space-y-4 text-sm md:text-base">
            <p>
              South Point School & College was established in 2003 with a vision to provide world-class education rooted in national values. 
              Starting with just a handful of students, it has grown into one of the premier educational institutions in the region.
            </p>
            <p>
              Over the last two decades, our institution has consistently produced top achievers in national board exams (SSC & HSC) and has 
              been recognized for its excellence in extracurricular activities, especially in sports and cultural competitions.
            </p>
          </div>
        </section>

        {/* Leadership Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* President Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition duration-300">
            <div className="bg-[#1e3a8a] py-3 md:py-4 px-6 text-white text-center">
              <h3 className="text-lg md:text-xl font-bold">The President</h3>
            </div>
            <div className="p-6 md:p-8 text-center space-y-4">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full mx-auto flex items-center justify-center border-4 border-blue-50">
                <Users size={40} className="text-blue-200" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900">Engr. M.A. Rashid</h4>
                <p className="text-blue-600 font-medium text-sm md:text-base">President of Governing Body</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-500 text-xs md:text-sm">
                <Calendar size={14} /> Joining Date: January 15, 2018
              </div>
              <p className="text-gray-600 text-xs md:text-sm italic">
                "Education is the backbone of a nation, and we are committed to building a strong foundation for our future leaders."
              </p>
            </div>
          </div>

          {/* Principal Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition duration-300">
            <div className="bg-[#1e5aa8] py-3 md:py-4 px-6 text-white text-center">
              <h3 className="text-lg md:text-xl font-bold">The Principal</h3>
            </div>
            <div className="p-6 md:p-8 text-center space-y-4">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full mx-auto flex items-center justify-center border-4 border-blue-50">
                <Users size={40} className="text-blue-200" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-900">Dr. Hamida Akhter</h4>
                <p className="text-blue-600 font-medium text-sm md:text-base">Principal</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-500 text-xs md:text-sm">
                <Calendar size={14} /> Joining Date: June 1, 2021
              </div>
              <p className="text-gray-600 text-xs md:text-sm italic">
                "Our mission is to nurture talent and foster character growth through a balanced academic and creative environment."
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <section className="bg-blue-900 rounded-2xl md:rounded-3xl p-8 md:p-12 text-white text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">Our Vision</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            "To be a leading center of excellence that empowers students with knowledge, skills, and integrity to thrive in a global society."
          </p>
        </section>
      </main>

    </div>
  );
}

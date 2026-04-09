'úse client'

import Image from "next/image";

import { Calendar, Info, BookOpen, Bell, Users, Image as ImageIcon, Building2, Briefcase, Mail, Home as HomeIcon } from 'lucide-react';
import Link from "next/link";

export default function Home() {
  return (
   <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Bar */}
      <div className="bg-[#1a2532] text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div>📞 0241081531, 01754412344</div>
            <div>✉️ spsc2002@gmail.com</div>
          </div>
          <div className="flex items-center gap-4">
            <div>Established 2003</div>
            <div>EIN: 108040</div>
           <Link href="/login">
            <button className="bg-yellow-400 text-blue-900 font-semibold px-4 py-1.5 rounded-md hover:bg-yellow-300 transition">Log in</button>
           </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 relative">
              <img
                src="/logo.jpg"
                alt="South Point School & College Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1e3a8a]">SOUTH POINT SCHOOL & COLLEGE</h1>
              <p className="text-sm text-gray-600">“শিক্ষা নিয়ে গড়ব দেশ লাল সবুজের বাংলাদেশ”</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Chairman&apos;s Message
            </button>
            <button className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Founder Principal&apos;s Message
            </button>
          </div>
        </div>
      </header>

      {/* Notice Bar */}
      <div className="bg-[#6b4e31] text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 text-sm overflow-x-auto whitespace-nowrap">
          <div className="bg-white text-[#6b4e31] font-bold px-4 py-1 rounded">NOTICE</div>
          <div>Diploma in Quranic Arabic</div>
          <div>Holiday Notice for Ramadan</div>
          <div>Notice for Rules and Regulations</div>
          <div>Notice for Discipline-2026</div>
          <div>Notice for Holiday</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#1e5aa8] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 py-4 text-sm font-medium">
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <HomeIcon size={18} /> Home
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <Info size={18} /> About Us
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <BookOpen size={18} /> Academics
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <Bell size={18} /> Notices
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <Users size={18} /> Clubs
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <ImageIcon size={18} /> Gallery
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <Building2 size={18} /> Facilities
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <Briefcase size={18} /> Career
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-yellow-300">
              <Mail size={18} /> Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-4">
        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-full text-lg transition">
          English Medium
        </button>
        <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-full text-lg transition">
          Bangla & English Version
        </button>
        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-full text-lg transition">
          College
        </button>
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-full text-lg transition">
          Online Payment
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Image Section */}
        <div className="lg:col-span-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&h=700&auto=format&fit=crop"
              alt="South Point School & College Students Parade"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <p className="text-white text-2xl font-bold text-center">
                সাউথ পয়েন্ট স্কুল এন্ড কলেজ স্কাউট
              </p>
            </div>
          </div>
        </div>

        {/* Notice Board */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-xl h-full">
            <div className="bg-blue-600 text-white text-xl font-bold py-4 px-6 rounded-t-2xl flex items-center gap-2">
              NOTICE BOARD
            </div>

            <div className="divide-y">
              {[
                { date: "17th JAN", title: "সংগীত ক্লাস", day: "17 January 2026" },
                { date: "28th DEC", title: "Notice for SSC Candidate-2026", day: "28 December 2025" },
                { date: "4th DEC", title: "সংস্কৃতি ও ক্রীড়া উৎসব-২০২৫", day: "04 December 2025" },
                { date: "4th DEC", title: "বার্ষিক ক্রীড়া প্রতিযোগিতা", day: "04 December 2025" },
                { date: "3rd DEC", title: "সংস্কৃতি ও ক্রীড়া উৎসব", day: "03 December 2025" },
              ].map((notice, i) => (
                <div key={i} className="p-5 hover:bg-gray-50 flex gap-4 group cursor-pointer">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <div className="text-2xl font-bold">{notice.date.split(' ')[0]}</div>
                    <div className="text-xs tracking-widest">{notice.date.split(' ')[1]}</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {notice.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{notice.day}</p>
                  </div>
                  <div className="text-blue-600 self-center">→</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

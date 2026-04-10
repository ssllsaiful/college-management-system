'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 flex flex-col gap-6">
      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row gap-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 md:py-6 rounded-2xl md:rounded-full text-base md:text-lg transition shadow-md">
          School Section
        </button>
        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 md:py-6 rounded-2xl md:rounded-full text-base md:text-lg transition shadow-md">
          College Section
        </button>
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 md:py-6 rounded-2xl md:rounded-full text-base md:text-lg transition shadow-md">
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

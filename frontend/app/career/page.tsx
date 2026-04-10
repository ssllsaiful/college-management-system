'use client';
import Link from "next/link";
import { ArrowLeft, Briefcase, FileCheck, Send } from 'lucide-react';

export default function CareerPage() {
  return (
    <div className="bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center space-y-8">
          <div className="bg-amber-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-amber-600">
            <Briefcase size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Join Our Team</h2>
            <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
              We are looking for dedicated educators and professionals who are passionate about shaping the next generation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { role: "Lecturer (Physics)", type: "Full Time" },
              { role: "Assistant Teacher (English)", type: "Full Time" },
            ].map((job, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-2xl hover:border-blue-400 transition cursor-pointer">
                <h4 className="font-bold text-lg text-[#1e3a8a]">{job.role}</h4>
                <p className="text-sm text-gray-500">{job.type}</p>
                <button className="mt-4 text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                  Apply Now <Send size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

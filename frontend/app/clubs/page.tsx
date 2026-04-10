'use client';
import Link from "next/link";
import { ArrowLeft, Users, Music, Trophy, Microscope } from 'lucide-react';

export default function ClubsPage() {
  return (
    <div className="bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { name: "Scout Club", info: "Building character and leadership through outdoor activities.", icon: ShieldCheck },
          { name: "Cultural Club", info: "Promoting music, drama, and traditional arts.", icon: Music },
          { name: "Sports Club", info: "Regular tournaments in Football, Cricket, and Badminton.", icon: Trophy },
          { name: "Science Club", info: "Fostering innovation through experiments and science fairs.", icon: Microscope },
        ].map((club, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6 hover:shadow-md transition">
            <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
              {club.icon && <club.icon size={36} />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{club.name}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{club.info}</p>
              <button className="mt-4 text-blue-600 font-semibold hover:underline">Learn More →</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
// Add ShieldCheck for Scout
import { ShieldCheck } from 'lucide-react';

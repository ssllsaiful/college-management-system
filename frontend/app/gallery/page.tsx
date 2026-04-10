'use client';
import Link from "next/link";
import { ArrowLeft, ImageIcon, PlayCircle } from 'lucide-react';

export default function GalleryPage() {
  return (
    <div className="bg-gray-50 uppercase">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative aspect-square bg-gray-200 rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
              <img 
                src={`https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400&h=400&auto=format&fit=crop&sig=${i}`}
                alt="Event"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <PlayCircle className="text-white w-12 h-12" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

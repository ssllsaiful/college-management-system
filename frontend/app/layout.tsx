import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { 
  Calendar, Info, BookOpen, Bell, Users, Image as ImageIcon, 
  Building2, Briefcase, Mail, Home as HomeIcon, ChevronDown, Clock, Search, LogIn
} from 'lucide-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A. Aziz School & College",
  description: "Official portal of A. Aziz School & College",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        {/* Persistent Header Block */}
        <div className="sticky top-0 z-[100] shadow-md">
          {/* Top Bar */}
          <div className="bg-[#1a2532] text-white text-[11px] md:text-xs py-2">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
                  <span className="text-yellow-400">📞</span> 0241081531, 01754412344
                </div>
                <div className="hidden md:flex items-center gap-1.5 opacity-90 hover:opacity-100 transition border-l border-white/20 pl-6">
                  <Mail size={12} className="text-yellow-400" /> spsc2002@gmail.com
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-8 font-medium">
                <div className="flex items-center gap-1.5 opacity-80 uppercase tracking-wider">
                  <Calendar size={12} className="text-yellow-400" /> Established 2003
                </div>
                <div className="flex items-center gap-1.5 opacity-80 uppercase tracking-wider">
                  <Building2 size={12} className="text-yellow-400" /> EIIN: 108040
                </div>
                <Link href="/login" className="bg-yellow-400 text-[#1a2532] px-3 py-1 rounded font-bold hover:bg-white transition flex items-center gap-1 ml-2">
                  <LogIn size={14} /> Log in
                </Link>
              </div>
            </div>
          </div>

          {/* Main Identity Header */}
          <header className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6 group">
                <Link href="/" className="w-16 h-16 md:w-24 md:h-24 relative block transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </Link>
                <div className="space-y-1">
                  <h1 className="text-xl md:text-3xl font-black text-[#1e3a8a] tracking-tight leading-none">
                    SOUTH POINT SCHOOL & COLLEGE
                  </h1>
                  <p className="text-xs md:text-sm text-gray-500 font-medium italic opacity-80">
                    “শিক্ষা নিয়ে গড়ব দেশ লাল সবুজের বাংলাদেশ”
                  </p>
                </div>
              </div>

              <div className="flex gap-2 md:gap-4">
                <button className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-xs font-bold text-[#1e3a8a] border-2 border-slate-100 rounded-xl hover:bg-slate-50 hover:border-blue-200 transition-all shadow-sm">
                  <Users size={16} className="text-orange-400" /> Chairman&apos;s Message
                </button>
                <button className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-xs font-bold text-[#1e3a8a] border-2 border-slate-100 rounded-xl hover:bg-slate-50 hover:border-blue-200 transition-all shadow-sm">
                  <Users size={16} className="text-orange-400" /> Founder Principal&apos;s Message
                </button>
              </div>
            </div>
          </header>

          {/* Notice & Navigation Bar Group */}
          <div className="bg-[#1e5aa8] shadow-lg">
            {/* Notice Marquee */}
            <div className="bg-[#6b4e31]/95 text-white border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 md:gap-8 h-10 md:h-12 overflow-hidden">
                <div className="bg-white text-[#6b4e31] text-[10px] md:text-xs font-black px-4 py-1.5 rounded-md uppercase whitespace-nowrap shadow-inner">
                  LATEST NOTICE
                </div>
                <div className="flex items-center gap-8 text-[11px] md:text-sm font-medium animate-marquee whitespace-nowrap">
                  <span>🚀 Diploma in Quranic Arabic Admission Open 2026</span>
                  <span className="opacity-50">•</span>
                  <span>📅 Holiday Notice for Ramadan - Classes Resume April 15</span>
                  <span className="opacity-50">•</span>
                  <span>📜 Notice for Rules and Regulations for HSC Examinees</span>
                  <span className="opacity-50">•</span>
                  <span>⚽ Annual Sports Competition Results Published</span>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="max-w-7xl mx-auto px-4 md:px-6 relative group/nav">
              <div className="flex items-center justify-center md:justify-start gap-1 md:gap-2 py-1 md:py-0 overflow-x-auto no-scrollbar scroll-smooth">
                {[
                  { name: "Home", icon: HomeIcon, href: "/" },
                  { name: "About Us", icon: Info, href: "/about-us", dropdown: true },
                  { name: "Teachers", icon: Users, href: "/teachers" },
                  { name: "Academics", icon: BookOpen, href: "/academics", dropdown: true },
                  { name: "Notices", icon: Bell, href: "/notices" },
                  { name: "Clubs", icon: Users, href: "/clubs" },
                  { name: "Gallery", icon: ImageIcon, href: "/gallery", dropdown: true },
                  { name: "Facilities", icon: Building2, href: "/facilities", dropdown: true },
                  { name: "Career", icon: Briefcase, href: "/career" },
                  { name: "Contact", icon: Mail, href: "/contact" },
                ].map((item, idx) => (
                  <Link 
                    key={idx}
                    href={item.href} 
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-3 md:py-5 text-[11px] md:text-[14px] font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all border-b-2 border-transparent hover:border-yellow-400 whitespace-nowrap group animate-in fade-in slide-in-from-top-2"
                  >
                    <item.icon size={16} className="text-white/60 group-hover:text-yellow-400 transition" />
                    {item.name}
                    {item.dropdown && <ChevronDown size={14} className="opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition" />}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Global Page Wrapper */}
        <div className="relative min-h-screen">
          {children}
        </div>

        {/* Global Footer (Optional) */}
        <footer className="bg-[#1a2532] text-white/60 py-12 text-center text-sm border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <p className="mb-2">© 2026 South Point School & College. All rights reserved.</p>
            <div className="flex justify-center gap-6 opacity-40 hover:opacity-100 transition">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Users, Settings, FileText, BarChart3, LogOut, BookOpen } from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Students List', href: '/dashboard/students', icon: Users },
  { name: 'Student Subject List', href: '/dashboard/student-subjects', icon: FileText },
  { name: 'Subject List', href: '/dashboard/subjects', icon: BookOpen },
  { name: 'Fee Payments', href: '/dashboard/fees', icon: FileText },
  { name: 'Exams & Marks', href: '/dashboard/exams', icon: BarChart3 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar - Desktop fixed, Mobile overlay */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A2B4A] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-[#1A2B4A]">
          <div className=''>
            <h2 className="text-xl font-semibold text-white">CMS Admin</h2>
            <p className='text-[#99A1AF]'>Control Panel</p>
          </div>
   
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
               <div className='border border-1  border-gray-700'></div>
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                  isActive ? 'bg-gray-800 text-white border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} className="mr-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="absolute bottom-0 w-full">
            <Link
              href="/login"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut size={20} className="mr-4" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </div>

      

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
    

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

 
    </div>
  );
}
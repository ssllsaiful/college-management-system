'use client';
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#1e3a8a] hover:text-blue-700 transition font-semibold">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-[#1e3a8a]">CONTACT US</h1>
          <div className="w-32"></div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 leading-relaxed">
              Have questions about admission or our programs? Feel free to reach out to us. Our administration team is ready to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Email Address", value: "spsc2002@gmail.com", icon: Mail },
              { label: "Phone Number", value: "01754412344", icon: Phone },
              { label: "Campus Location", value: "Dhaka, Bangladesh", icon: MapPin },
              { label: "Office Hours", value: "Sat - Thu: 8 AM - 4 PM", icon: Clock },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-blue-600 flex-shrink-0">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.label}</h4>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Tell us how we can help..."></textarea>
            </div>
            <button className="w-full bg-[#1e3a8a] text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

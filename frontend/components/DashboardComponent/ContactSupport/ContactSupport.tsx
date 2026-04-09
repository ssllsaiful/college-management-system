// app/support/page.tsx  (or wherever your dashboard lives)
// "use client" because we need state + interactivity

"use client";

import { useState } from "react";

// Fake ticket data (replace with your real data fetching)
const initialTickets = [
  {
    id: "TK-5001",
    email: "john.doe@email.com",
    subject: "Unable to run simulation",
    status: "New",
    date: "2026-02-06",
    message: "Hi, I'm trying to run simulation but I keep getting an error message. Can you help?",
  },
  {
    id: "TK-5002",
    email: "sarah.smith@email.com",
    subject: "Premium upgrade not working",
    status: "Replied",
    date: "2026-02-05",
    message: "...", // you can add full message later
  },
  // Add more as needed...
];

type Ticket = (typeof initialTickets)[number];

export default function ContactSupport() {
  const [tickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const openModal = (ticket: Ticket) => setSelectedTicket(ticket);
  const closeModal = () => setSelectedTicket(null);

  return (
    <div className="min-h-screen ">
      <div className="max-w-9xl mx-auto">
        {/* Header */}
        <h1 className="text-[30px] font-bold mb-2">Contact & Support</h1>
        <p className="text-gray-600 mb-6">Manage user support messages and inquiries</p>

        {/* Alert box */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-5 py-4 rounded-lg mb-6 flex items-center gap-3">
          <span className="text-xl">📧</span>
          <span>
            <strong>You have open support messages awaiting response.</strong>
          </span>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by email, subject, or ticket ID..."
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">All</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Open</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Replied</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Closed</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => openModal(ticket)} // optional: click anywhere on row
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ticket.status === "New"
                          ? "bg-red-100 text-red-800"
                          : ticket.status === "Open"
                          ? "bg-blue-100 text-blue-800"
                          : ticket.status === "Replied"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent row click if you want only button
                        openModal(ticket);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal - appears when clicking View */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Support Message {selectedTicket.id}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">User Email</p>
                    <p className="mt-1">{selectedTicket.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="mt-1">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedTicket.status === "New"
                            ? "bg-red-100 text-red-800"
                            : selectedTicket.status === "Open"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedTicket.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Subject</p>
                    <p className="mt-1">{selectedTicket.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date Submitted</p>
                    <p className="mt-1">{selectedTicket.date}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">User Message</p>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="whitespace-pre-wrap">{selectedTicket.message}</p>
                  </div>
                </div>

                {/* Reply box */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Send Reply</p>
                  <textarea
                    className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your reply here..."
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2">
                  <span>Send Reply</span>
                  <span>➤</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronUp, ChevronDown, Filter, Plus, Pencil, X, Loader2 } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
}

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  father_name: string;
  mother_name: string;
  mobile: string;
  email: string;
  session: string;
  class_name: string;
  group: string;
  roll_number: string;
  admission_date: string;
  subjects: number[];
  fourth_subject: number | null;
  note: string;
}

const EMPTY_FORM: Omit<Student, 'id' | 'full_name' | 'admission_date'> = {
  first_name: '',
  last_name: '',
  father_name: '',
  mother_name: '',
  mobile: '',
  email: '',
  session: '',
  class_name: 'XI',
  group: 'Science',
  roll_number: '',
  subjects: [],
  fourth_subject: null,
  note: '',
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [formError, setFormError] = useState('');

  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [sessionFilter, setSessionFilter] = useState('');
  const [sortField, setSortField] = useState<keyof Student>('roll_number');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const fetchStudents = () => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/students/')
      .then(res => res.json())
      .then(data => { setStudents(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchStudents();
    fetch('http://127.0.0.1:8000/api/subjects/')
      .then(res => res.json())
      .then(data => setAllSubjects(data));
  }, []);

  const openAdd = () => {
    setEditingStudent(null);
    setForm({ ...EMPTY_FORM });
    setFormError('');
    setShowModal(true);
  };

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    setForm({
      first_name: student.first_name,
      last_name: student.last_name,
      father_name: student.father_name,
      mother_name: student.mother_name,
      mobile: student.mobile,
      email: student.email,
      session: student.session,
      class_name: student.class_name,
      group: student.group,
      roll_number: student.roll_number,
      subjects: student.subjects || [],
      fourth_subject: student.fourth_subject,
      note: student.note,
    });
    setFormError('');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.first_name || !form.roll_number || !form.session) {
      setFormError('First Name, Roll Number, and Session are required.');
      return;
    }
    setSaving(true);
    setFormError('');

    const url = editingStudent
      ? `http://127.0.0.1:8000/api/students/${editingStudent.id}/`
      : 'http://127.0.0.1:8000/api/students/';
    const method = editingStudent ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowModal(false);
        fetchStudents();
      } else {
        const data = await res.json();
        setFormError(JSON.stringify(data));
      }
    } catch {
      setFormError('Failed to connect to server.');
    } finally {
      setSaving(false);
    }
  };

  const toggleSubject = (id: number) => {
    setForm(f => ({
      ...f,
      subjects: f.subjects.includes(id)
        ? f.subjects.filter(s => s !== id)
        : [...f.subjects, id],
    }));
  };

  const handleSort = (field: keyof Student) => {
    if (sortField === field) setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDirection('asc'); }
  };

  const filtered = students.filter(s =>
    (s.full_name?.toLowerCase().includes(search.toLowerCase()) || s.roll_number?.toLowerCase().includes(search.toLowerCase())) &&
    (groupFilter ? s.group === groupFilter : true) &&
    (sessionFilter ? s.session === sessionFilter : true)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortField] ?? '';
    const bv = b[sortField] ?? '';
    return av < bv ? (sortDirection === 'asc' ? -1 : 1) : av > bv ? (sortDirection === 'asc' ? 1 : -1) : 0;
  });

  const uniqueSessions = Array.from(new Set(students.map(s => s.session)));
  const uniqueGroups = Array.from(new Set(students.map(s => s.group)));

  const SortIcon = ({ field }: { field: keyof Student }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 text-gray-300" />;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50 rounded-t-xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search by name or roll number..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div className="flex gap-3">
            {[{ val: groupFilter, set: setGroupFilter, opts: uniqueGroups, def: 'All Groups' },
              { val: sessionFilter, set: setSessionFilter, opts: uniqueSessions, def: 'All Sessions' }].map(({ val, set, opts, def }) => (
              <div key={def} className="relative">
                <select value={val} onChange={e => set(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm">
                  <option value="">{def}</option>
                  {opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                {([['roll_number', 'Roll'], ['first_name', 'Name'], ['group', 'Group'], ['session', 'Session']] as [keyof Student, string][]).map(([field, label]) => (
                  <th key={field} className="p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort(field)}>
                    <div className="flex items-center gap-1">{label} <SortIcon field={field} /></div>
                  </th>
                ))}
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading students...</td></tr>
              ) : sorted.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No students found.</td></tr>
              ) : sorted.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4 font-mono font-medium text-gray-900">{student.roll_number}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{student.full_name || `${student.first_name} ${student.last_name}`}</div>
                    <div className="text-xs text-gray-400">{student.email || student.mobile}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      student.group === 'Science' ? 'bg-blue-100 text-blue-800' :
                      student.group === 'Commerce' ? 'bg-amber-100 text-amber-800' :
                      'bg-purple-100 text-purple-800'}`}>
                      {student.group}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">{student.session}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(student)}
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors font-medium">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl text-sm text-gray-500 text-right">
          Showing {sorted.length} of {students.length} students
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{formError}</div>
              )}

              {/* Personal Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-1 border-b">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                    <input className={inputClass} value={form.first_name} onChange={e => setForm(f => ({...f, first_name: e.target.value}))} placeholder="First name" />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input className={inputClass} value={form.last_name} onChange={e => setForm(f => ({...f, last_name: e.target.value}))} placeholder="Last name" />
                  </div>
                  <div>
                    <label className={labelClass}>Father's Name</label>
                    <input className={inputClass} value={form.father_name} onChange={e => setForm(f => ({...f, father_name: e.target.value}))} placeholder="Father's name" />
                  </div>
                  <div>
                    <label className={labelClass}>Mother's Name</label>
                    <input className={inputClass} value={form.mother_name} onChange={e => setForm(f => ({...f, mother_name: e.target.value}))} placeholder="Mother's name" />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-1 border-b">Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Mobile</label>
                    <input className={inputClass} value={form.mobile} onChange={e => setForm(f => ({...f, mobile: e.target.value}))} placeholder="01XXXXXXXXX" />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" className={inputClass} value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="email@example.com" />
                  </div>
                </div>
              </div>

              {/* Academic */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-1 border-b">Academic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className={labelClass}>Session <span className="text-red-500">*</span></label>
                    <input className={inputClass} value={form.session} onChange={e => setForm(f => ({...f, session: e.target.value}))} placeholder="2025-26" />
                  </div>
                  <div>
                    <label className={labelClass}>Class</label>
                    <select className={inputClass} value={form.class_name} onChange={e => setForm(f => ({...f, class_name: e.target.value}))}>
                      <option value="XI">Class XI</option>
                      <option value="XII">Class XII</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Group</label>
                    <select className={inputClass} value={form.group} onChange={e => setForm(f => ({...f, group: e.target.value}))}>
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Roll Number <span className="text-red-500">*</span></label>
                    <input className={inputClass} value={form.roll_number} onChange={e => setForm(f => ({...f, roll_number: e.target.value}))} placeholder="Roll no." />
                  </div>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-1 border-b">Subjects</h3>
                {allSubjects.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No subjects found in database.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {allSubjects.map(sub => (
                      <label key={sub.id} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
                        form.subjects.includes(sub.id)
                          ? 'bg-blue-50 border-blue-400 text-blue-800 font-medium'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}>
                        <input type="checkbox" className="accent-blue-600"
                          checked={form.subjects.includes(sub.id)}
                          onChange={() => toggleSubject(sub.id)} />
                        {sub.name}
                        {sub.code && <span className="text-xs text-gray-400">({sub.code})</span>}
                      </label>
                    ))}
                  </div>
                )}
                <div>
                  <label className={labelClass}>4th (Optional) Subject</label>
                  <select className={inputClass} value={form.fourth_subject ?? ''} onChange={e => setForm(f => ({...f, fourth_subject: e.target.value ? Number(e.target.value) : null}))}>
                    <option value="">-- None --</option>
                    {allSubjects.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Note */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-1 border-b">Remarks</h3>
                <textarea rows={3} className={inputClass} value={form.note} onChange={e => setForm(f => ({...f, note: e.target.value}))} placeholder="Any notes or remarks..." />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors font-medium text-sm">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-sm">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? 'Saving...' : editingStudent ? 'Save Changes' : 'Add Student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

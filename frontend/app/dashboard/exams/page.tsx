'use client';

import { useState, useEffect } from 'react';
import { Search, Save, Loader2, CheckCircle2, AlertCircle, User, BookOpen, Calculator, Calendar, GraduationCap, X, ChevronRight, Filter, ClipboardList } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
}

interface AcademicSession {
  id: number;
  name: string;
  is_active: boolean;
}

interface Student {
  id: number;
  full_name: string;
  roll_number: string;
  session: string;
  class_name: string;
  group: string;
  subjects: number[];
  fourth_subject: number | null;
}

interface Exam {
  id: number;
  name: string;
  exam_type: string;
  session: string;
}

interface MarkRecord {
  subject_id: number;
  cq_marks: string;
  mcq_marks: string;
  lab_marks: string;
  is_absent: boolean;
  full_marks: string;
}

export default function ExamsMarksPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [academicSessions, setAcademicSessions] = useState<AcademicSession[]>([]);
  
  // Filters & Search
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [searchRoll, setSearchRoll] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  // Marking State
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [marks, setMarks] = useState<Record<number, MarkRecord>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examRes, studentRes, subjectRes, sessionRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/exams/'),
          fetch('http://127.0.0.1:8000/api/students/'),
          fetch('http://127.0.0.1:8000/api/subjects/'),
          fetch('http://127.0.0.1:8000/api/academic-sessions/')
        ]);
        
        const examData = await examRes.json();
        const studentData = await studentRes.json();
        const subjectData = await subjectRes.json();
        const sessionData = await sessionRes.json();
        
        setExams(examData);
        setAllStudents(studentData);
        setAllSubjects(subjectData);
        setAcademicSessions(Array.isArray(sessionData) ? sessionData : []);
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update filtered list based on session/search
  useEffect(() => {
    let list = allStudents.filter(s => !selectedSession || s.session === selectedSession);
    if (searchRoll) {
      list = list.filter(s => s.roll_number.toLowerCase().includes(searchRoll.toLowerCase()));
    }
    
    // Sort by roll number numerically
    list.sort((a, b) => {
      const rollA = parseInt(a.roll_number.replace(/\D/g, '')) || 0;
      const rollB = parseInt(b.roll_number.replace(/\D/g, '')) || 0;
      return rollA - rollB;
    });

    setFilteredStudents(list.slice(0, 10));
  }, [allStudents, selectedSession, searchRoll]);

  // Load student for marking
  const selectStudent = async (student: Student) => {
    if (!selectedExamId) {
      alert("Please select an exam first.");
      return;
    }
    setSaving(false);
    setMessage(null);
    setActiveStudent(student);
    
    // Fetch existing marks
    try {
      const marksRes = await fetch(`http://127.0.0.1:8000/api/marks/?student=${student.id}&exam=${selectedExamId}`);
      const existingMarks = await marksRes.json();
      
      const marksMap: Record<number, MarkRecord> = {};
      const studentSubjectIds = [...(student.subjects || [])];
      if (student.fourth_subject) studentSubjectIds.push(student.fourth_subject);

      studentSubjectIds.forEach(subId => {
        const existing = existingMarks.find((m: any) => m.subject === subId);
        marksMap[subId] = {
          subject_id: subId,
          cq_marks: existing ? String(existing.cq_marks) : '0',
          mcq_marks: existing ? String(existing.mcq_marks) : '0',
          lab_marks: existing ? String(existing.lab_marks) : '0',
          is_absent: existing ? existing.is_absent : false,
          full_marks: existing ? String(existing.full_marks) : '100',
        };
      });
      setMarks(marksMap);
    } catch (err) {
      console.error("Failed to fetch existing marks", err);
    }
  };

  const handleSaveMarks = async () => {
    if (!activeStudent || !selectedExamId) return;
    setSaving(true);
    setMessage(null);

    const marksPayload = Object.entries(marks).map(([subId, record]) => ({
      student: activeStudent.id,
      exam: selectedExamId,
      subject: parseInt(subId),
      cq_marks: parseFloat(record.cq_marks) || 0,
      mcq_marks: parseFloat(record.mcq_marks) || 0,
      lab_marks: parseFloat(record.lab_marks) || 0,
      full_marks: parseFloat(record.full_marks) || 100,
      is_absent: record.is_absent,
    }));

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/marks/bulk_save/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marks: marksPayload }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Marks saved successfully!' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save marks. Please check inputs.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection failed.' });
    } finally {
      setSaving(false);
    }
  };

  const updateMark = (subId: number, field: keyof MarkRecord, value: any) => {
    setMarks(prev => ({
      ...prev,
      [subId]: { ...prev[subId], [field]: value }
    }));
  };

  const calculateTotal = (record: MarkRecord) => {
    if (record.is_absent) return 'ABS';
    const sum = (parseFloat(record.cq_marks) || 0) + (parseFloat(record.mcq_marks) || 0) + (parseFloat(record.lab_marks) || 0);
    return sum.toFixed(2);
  };

  const currentExams = exams.filter(e => e.session === selectedSession);

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header & Main Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-auto">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Exams & Marks Portal</h1>
            <p className="text-gray-400 text-sm font-medium">Select an exam and search student roll to enter marks.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
             <div className="relative group w-full sm:w-48">
              <select 
                className="w-full bg-gray-50 border border-gray-200 py-2.5 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold appearance-none cursor-pointer"
                value={selectedSession} 
                onChange={e => { setSelectedSession(e.target.value); setSelectedExamId(null); setActiveStudent(null); }}
              >
                <option value="">SESSION</option>
                {academicSessions.map(s => <option key={s.id} value={s.name}>{s.name} {s.is_active ? '(Active)' : ''}</option>)}
              </select>
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative group w-full sm:w-64">
              <select 
                className="w-full bg-gray-50 border border-gray-200 py-2.5 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold appearance-none cursor-pointer disabled:opacity-50"
                value={selectedExamId || ''} 
                disabled={!selectedSession}
                onChange={e => setSelectedExamId(Number(e.target.value))}
              >
                <option value="">SELECT EXAM</option>
                {currentExams.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
              </select>
              <BookOpen className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="ROLL NUMBER" 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold placeholder:text-gray-300" 
                value={searchRoll}
                onChange={e => setSearchRoll(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-bold">{message.text}</span>
        </div>
      )}

      {/* Marking Content */}
      {!activeStudent ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <ClipboardList size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Ready to enter marks?</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">First select a session and exam at the top, then search for a student by roll number or pick one from the list below.</p>
          </div>
          
          {selectedSession && filteredStudents.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-6">
              {filteredStudents.map(s => (
                <button 
                  key={s.id}
                  onClick={() => selectStudent(s)}
                  className="p-3 border border-gray-100 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                >
                  <div className="text-[10px] font-black text-gray-400 group-hover:text-blue-500 uppercase tracking-widest">Roll #{s.roll_number}</div>
                  <div className="text-xs font-bold text-gray-900 truncate">{s.full_name}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <User size={28} />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-2xl font-black text-gray-900">{activeStudent.full_name}</h2>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><span className="text-blue-600">Roll:</span> #{activeStudent.roll_number}</span>
                  <span className="flex items-center gap-1.5"><span className="text-blue-600">Group:</span> {activeStudent.group}</span>
                  <span className="flex items-center gap-1.5"><span className="text-blue-600">Session:</span> {activeStudent.session}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveStudent(null)}
                className="px-5 py-2.5 bg-gray-50 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm"
              >
                Change Student
              </button>
              <button 
                onClick={handleSaveMarks}
                disabled={saving}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black px-8 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-100 text-sm uppercase tracking-wide"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save All Marks
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="p-5 pl-8"><div className="flex items-center gap-2"><ClipboardList size={14}/> Subject Name</div></th>
                  <th className="p-5">CQ Marks</th>
                  <th className="p-5">MCQ Marks</th>
                  <th className="p-5">Lab Marks</th>
                  <th className="p-5 text-center">Absent?</th>
                  <th className="p-5 text-right pr-8"><div className="flex items-center justify-end gap-2"><Calculator size={14}/> Total</div></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Object.entries(marks).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-20 text-center text-gray-400 italic">No subjects found for this student.</td>
                  </tr>
                ) : Object.entries(marks).map(([subId, record]) => {
                  const subject = allSubjects.find(s => s.id === parseInt(subId));
                  if (!subject) return null;
                  
                  return (
                    <tr key={subId} className={`group transition-all ${record.is_absent ? 'bg-gray-50/50' : 'hover:bg-blue-50/20'}`}>
                      <td className="p-5 pl-8">
                        <div className={`font-bold text-sm transition-colors ${record.is_absent ? 'text-gray-400' : 'text-gray-800 group-hover:text-blue-700'}`}>
                          {subject.name}
                        </div>
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Code: {subject.code}</div>
                      </td>
                      <td className="p-5">
                        <input 
                          type="number" 
                          step="0.01"
                          className="w-28 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-30" 
                          value={record.cq_marks} 
                          disabled={record.is_absent}
                          onChange={e => updateMark(parseInt(subId), 'cq_marks', e.target.value)} 
                        />
                      </td>
                      <td className="p-5">
                        <input 
                          type="number" 
                          step="0.01"
                          className="w-28 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-30" 
                          value={record.mcq_marks} 
                          disabled={record.is_absent}
                          onChange={e => updateMark(parseInt(subId), 'mcq_marks', e.target.value)} 
                        />
                      </td>
                      <td className="p-5">
                        <input 
                          type="number" 
                          step="0.01"
                          className="w-28 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-30" 
                          value={record.lab_marks} 
                          disabled={record.is_absent}
                          onChange={e => updateMark(parseInt(subId), 'lab_marks', e.target.value)} 
                        />
                      </td>
                      <td className="p-5 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={record.is_absent} 
                            onChange={e => updateMark(parseInt(subId), 'is_absent', e.target.checked)} 
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="p-5 text-right pr-8">
                        <div className={`text-sm font-black transition-colors ${
                          record.is_absent ? 'text-rose-500' : 'text-blue-700'
                        }`}>
                          {calculateTotal(record)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            <div className="p-6 bg-gray-50 border-t border-gray-50 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <span>* Subjects are pulled automatically from student enrollment record.</span>
              <span>CMS Dynamic Marking v1.0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

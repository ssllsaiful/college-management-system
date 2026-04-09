'use client';

import { useState, useEffect } from 'react';
import { Search, Save, Loader2, CheckCircle2, AlertCircle, User, BookOpen, Calculator } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  code: string;
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
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [rollNumber, setRollNumber] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [marks, setMarks] = useState<Record<number, MarkRecord>>({});
  
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fetch initial data
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/exams/')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setExams(data);
        if (data.length > 0) setSelectedExamId(data[0].id);
      })
      .catch(() => console.error("Could not fetch exams"));

    fetch('http://127.0.0.1:8000/api/subjects/')
      .then(res => res.json())
      .then(data => setAllSubjects(data));
  }, []);

  const handleSearchStudent = async () => {
    if (!rollNumber) return;
    setSearching(true);
    setStudent(null);
    setMarks({});
    setMessage(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/students/?roll_number=${rollNumber}`);
      const data = await res.json();
      
      if (data.length > 0) {
        const foundStudent = data[0];
        setStudent(foundStudent);
        
        // Fetch existing marks for this student and exam
        if (selectedExamId) {
          const marksRes = await fetch(`http://127.0.0.1:8000/api/marks/?student=${foundStudent.id}&exam=${selectedExamId}`);
          const existingMarks = await marksRes.json();
          
          const marksMap: Record<number, MarkRecord> = {};
          
          // Initialize for all student subjects
          const studentSubjectIds = [...(foundStudent.subjects || [])];
          if (foundStudent.fourth_subject) studentSubjectIds.push(foundStudent.fourth_subject);

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
        }
      } else {
        setMessage({ type: 'error', text: 'Student not found with this roll number.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to connect to server.' });
    } finally {
      setSearching(false);
    }
  };

  const updateMark = (subId: number, field: keyof MarkRecord, value: any) => {
    setMarks(prev => ({
      ...prev,
      [subId]: { ...prev[subId], [field]: value }
    }));
  };

  const handleSaveMarks = async () => {
    if (!student || !selectedExamId) return;
    setSaving(true);
    setMessage(null);

    try {
      const savePromises = Object.entries(marks).map(async ([subId, record]) => {
        // Find if record exists
        const checkRes = await fetch(`http://127.0.0.1:8000/api/marks/?student=${student.id}&exam=${selectedExamId}&subject=${subId}`);
        const existing = await checkRes.json();
        
        const payload = {
          student: student.id,
          exam: selectedExamId,
          subject: parseInt(subId),
          cq_marks: parseFloat(record.cq_marks) || 0,
          mcq_marks: parseFloat(record.mcq_marks) || 0,
          lab_marks: parseFloat(record.lab_marks) || 0,
          full_marks: parseFloat(record.full_marks) || 100,
          is_absent: record.is_absent,
        };

        const method = existing.length > 0 ? 'PUT' : 'POST';
        const url = existing.length > 0 
          ? `http://127.0.0.1:8000/api/marks/${existing[0].id}/` 
          : `http://127.0.0.1:8000/api/marks/`;

        return fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      });

      const results = await Promise.all(savePromises);
      if (results.every(r => r.ok)) {
        setMessage({ type: 'success', text: 'All marks saved successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Some marks failed to save. Please check inputs.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection failed.' });
    } finally {
      setSaving(false);
    }
  };

  const calculateTotal = (record: MarkRecord) => {
    if (record.is_absent) return 'ABS';
    const sum = (parseFloat(record.cq_marks) || 0) + (parseFloat(record.mcq_marks) || 0) + (parseFloat(record.lab_marks) || 0);
    return sum.toFixed(2);
  };

  const inputClass = "w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exams & Marks Portal</h1>
          <p className="text-gray-500 text-sm">Select an exam and search student roll to enter marks.</p>
        </div>
        
        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Select Exam</label>
            <select 
              className="bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-sm font-medium"
              value={selectedExamId || ''} 
              onChange={e => setSelectedExamId(Number(e.target.value))}
            >
              <option value="">-- Choose Exam --</option>
              {exams.map(ex => <option key={ex.id} value={ex.id}>{ex.name} ({ex.session})</option>)}
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Roll Number</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Ex. 25301" 
                className="pl-9 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm w-40"
                value={rollNumber}
                onChange={e => setRollNumber(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearchStudent()}
              />
            </div>
          </div>

          <button 
            onClick={handleSearchStudent}
            disabled={searching || !rollNumber || !selectedExamId}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-xl transition shadow-sm h-[40px] flex items-center gap-2"
          >
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Search
          </button>
        </div>
      </div>

      {message && (
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {student && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{student.full_name}</h2>
                <div className="flex gap-3 text-xs text-gray-500 font-medium">
                  <span>Roll: <span className="text-blue-600">#{student.roll_number}</span></span>
                  <span>Group: <span className="text-emerald-600">{student.group}</span></span>
                  <span>Session: {student.session}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleSaveMarks}
              disabled={saving}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-emerald-200"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save All Marks
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="p-4 pl-6 flex items-center gap-2"><BookOpen size={14}/> Subject Name</th>
                  <th className="p-4">CQ Marks</th>
                  <th className="p-4">MCQ Marks</th>
                  <th className="p-4">LAB Marks</th>
                  <th className="p-4 text-center">Absent?</th>
                  <th className="p-4 text-right pr-6 flex items-center justify-end gap-2"><Calculator size={14}/> Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Object.keys(marks).length === 0 ? (
                  <tr><td colSpan={6} className="p-12 text-center text-gray-400 italic">No subject data found for this student.</td></tr>
                ) : Object.entries(marks).map(([subId, record]) => {
                  const subject = allSubjects.find(s => s.id === parseInt(subId));
                  if (!subject) return null;
                  
                  return (
                    <tr key={subId} className={`hover:bg-blue-50/30 transition-colors ${record.is_absent ? 'opacity-50 bg-gray-50/50' : ''}`}>
                      <td className="p-4 pl-6">
                        <div className="font-bold text-gray-800">{subject.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">CODE: {subject.code}</div>
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          className={inputClass} 
                          disabled={record.is_absent}
                          value={record.cq_marks} 
                          onChange={e => updateMark(parseInt(subId), 'cq_marks', e.target.value)} 
                        />
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          className={inputClass} 
                          disabled={record.is_absent}
                          value={record.mcq_marks} 
                          onChange={e => updateMark(parseInt(subId), 'mcq_marks', e.target.value)} 
                        />
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          className={inputClass} 
                          disabled={record.is_absent}
                          value={record.lab_marks} 
                          onChange={e => updateMark(parseInt(subId), 'lab_marks', e.target.value)} 
                        />
                      </td>
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                          checked={record.is_absent} 
                          onChange={e => updateMark(parseInt(subId), 'is_absent', e.target.checked)} 
                        />
                      </td>
                      <td className="p-4 text-right pr-6">
                        <span className={`text-sm font-black ${record.is_absent ? 'text-red-500' : 'text-blue-700'}`}>
                          {calculateTotal(record)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-gray-50/50 flex justify-between items-center text-xs text-gray-400 px-6">
            <span>* Subjects are pulled automatically from student enrollment record.</span>
            <span className="font-medium text-gray-500">CMS Dynamic Marking v1.0</span>
          </div>
        </div>
      )}
      
      {!student && !searching && (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Calculator className="text-gray-300" size={32} />
          </div>
          <h3 className="text-gray-900 font-bold">Ready to grade?</h3>
          <p className="text-gray-400 text-sm max-w-xs text-center mt-1">Enter a roll number and select an exam to start entering marks for a student.</p>
        </div>
      )}
    </div>
  );
}

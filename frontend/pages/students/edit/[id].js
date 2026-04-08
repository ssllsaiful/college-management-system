import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getJSON, putJSON } from '../../../lib/api';

export default function EditStudent() {
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    
    // Fetch subjects
    getJSON('/subjects/')
      .then(setSubjects)
      .catch((err) => setError('Failed to load subjects: ' + err.message));

    // Fetch the specific student
    getJSON(`/students/${id}/`)
      .then((data) => {
        // null fourth_subject should be managed properly
        setStudent({
          ...data,
          fourth_subject: data.fourth_subject || '',
        });
      })
      .catch((err) => setError('Failed to load student: ' + err.message));
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === 'subjects') {
      const subjectId = Number(value);
      setStudent((prev) => ({
        ...prev,
        subjects: checked
          ? [...prev.subjects, subjectId]
          : prev.subjects.filter((sId) => sId !== subjectId),
      }));
      return;
    }
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const payload = { ...student };
      // if fourth_subject is empty string, make it null for foreign key
      if (!payload.fourth_subject) payload.fourth_subject = null;

      await putJSON(`/students/${id}/`, payload);
      setSuccess('Student updated successfully.');
      setTimeout(() => router.push('/students'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!student && !error) return <main className="container"><p>Loading...</p></main>;

  return (
    <main className="container list-page">
      <nav className="breadcrumb">
        <Link href="/students">← Back to Student List</Link>
      </nav>
      <div className="header-actions">
        <h1>Edit Student: {student?.full_name}</h1>
      </div>
      
      {error && <div className="alert">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      {student && (
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            First Name
            <input name="first_name" value={student.first_name} onChange={handleChange} required />
          </label>
          <label>
            Last Name
            <input name="last_name" value={student.last_name || ''} onChange={handleChange} />
          </label>
          <label>
            Father's Name
            <input name="father_name" value={student.father_name || ''} onChange={handleChange} />
          </label>
          <label>
            Mother's Name
            <input name="mother_name" value={student.mother_name || ''} onChange={handleChange} />
          </label>
          <label>
            Roll Number
            <input name="roll_number" value={student.roll_number} onChange={handleChange} required />
          </label>
          <label>
            Session
            <input name="session" value={student.session} onChange={handleChange} required />
          </label>
          <label>
            Class
            <select name="class_name" value={student.class_name} onChange={handleChange}>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </label>
          <label>
            Group
            <select name="group" value={student.group} onChange={handleChange}>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </label>
          <label>
            Mobile
            <input name="mobile" value={student.mobile || ''} onChange={handleChange} />
          </label>
          <label>
            Email
            <input name="email" type="email" value={student.email || ''} onChange={handleChange} />
          </label>
          
          <label className="full-width">
            Fourth Subject
            <select name="fourth_subject" value={student.fourth_subject || ''} onChange={handleChange}>
              <option value="">-- None --</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </label>
          
          <fieldset className="subject-group full-width">
            <legend>Select Elective Subjects</legend>
            <div className="checkbox-grid">
              {subjects.map((subject) => (
                <label key={subject.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="subjects"
                    value={subject.id}
                    checked={student.subjects.includes(subject.id)}
                    onChange={handleChange}
                  />
                  {subject.name} ({subject.code})
                </label>
              ))}
            </div>
          </fieldset>
          
          <label className="full-width">
            Note
            <textarea name="note" value={student.note || ''} onChange={handleChange} />
          </label>
          
          <div className="full-width">
            <button type="submit" className="btn-primary">Update Student Info</button>
          </div>
        </form>
      )}

      <style jsx>{`
        .list-page {
          max-width: 900px;
          margin: 2rem auto;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .header-actions {
          margin-bottom: 2rem;
        }
        .header-actions h1 {
          color: #2b3674;
          margin: 0;
        }
        .breadcrumb {
          margin-bottom: 1rem;
        }
        .breadcrumb a {
          color: #4318ff;
          font-weight: 500;
          text-decoration: none;
        }
        .btn-primary {
          background: #4318ff;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          background: #3311cc;
        }
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        fieldset {
          border: 1px solid #e0e5f2;
          padding: 1.5rem;
          border-radius: 10px;
        }
        legend {
          color: #2b3674;
          font-weight: bold;
        }
      `}</style>
    </main>
  );
}

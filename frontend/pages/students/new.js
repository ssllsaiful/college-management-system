import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getJSON, postJSON } from '../../lib/api';

const initialState = {
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
  fourth_subject: '',
  subjects: [],
  note: '',
};

export default function NewStudent() {
  const [student, setStudent] = useState(initialState);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getJSON('/subjects/')
      .then(setSubjects)
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === 'subjects') {
      const id = Number(value);
      setStudent((prev) => ({
        ...prev,
        subjects: checked
          ? [...prev.subjects, id]
          : prev.subjects.filter((subjectId) => subjectId !== id),
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
      await postJSON('/students/', student);
      setSuccess('Student created successfully.');
      setStudent(initialState);
      router.push('/students');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container">
      <h1>Add New Student</h1>
      <p>
        <Link href="/students">Back to student list</Link>
      </p>
      {error && <div className="alert">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          First Name
          <input name="first_name" value={student.first_name} onChange={handleChange} required />
        </label>
        <label>
          Last Name
          <input name="last_name" value={student.last_name} onChange={handleChange} />
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
          <input name="mobile" value={student.mobile} onChange={handleChange} />
        </label>
        <label>
          Email
          <input name="email" type="email" value={student.email} onChange={handleChange} />
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
          <textarea name="note" value={student.note} onChange={handleChange} />
        </label>
        <div className="full-width">
          <button type="submit" className="btn-primary">Save Student</button>
        </div>
      </form>

      <style jsx>{`
        .form-grid {
          max-width: 900px;
          margin: 2rem auto;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
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

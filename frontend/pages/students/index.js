import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getJSON } from '../../lib/api';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getJSON('/students/')
      .then(setStudents)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="container list-page">
      <nav className="breadcrumb">
        <Link href="/">← Back to Dashboard</Link>
      </nav>
      <div className="header-actions">
        <h1>Student Directory</h1>
        <Link href="/students/new" className="btn-primary">+ Add New Student</Link>
      </div>
      {error && <div className="alert">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Class</th>
            <th>Group</th>
            <th>Session</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.roll_number}</td>
              <td><strong>{student.full_name}</strong></td>
              <td><span className="badge badge-class">{student.class_name}</span></td>
              <td><span className="badge badge-group">{student.group}</span></td>
              <td>{student.session}</td>
              <td>{student.mobile}</td>
              <td>
                <Link href={`/students/edit/${student.id}`} className="btn-edit">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .list-page {
          max-width: 1100px;
          margin: 2rem auto;
        }
        .header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: #3311cc;
        }
        .btn-edit {
          color: #4318ff;
          background: #f4f7fe;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .btn-edit:hover {
          background: #e0e5f2;
        }
        .badge {
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .badge-class {
          background: #ffebe6;
          color: #ff5e3a;
        }
        .badge-group {
          background: #e6f6ff;
          color: #0084ff;
        }
        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          background: white;
        }
        th {
          background: #f4f7fe;
          color: #a3aed1;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
          padding: 1rem;
        }
        td {
          padding: 1rem;
          border-bottom: 1px solid #f4f7fe;
          color: #2b3674;
        }
        tr:last-child td {
          border-bottom: none;
        }
      `}</style>
    </main>
  );
}

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getJSON } from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allStudents, setAllStudents] = useState([]);
  const [subjectsMap, setSubjectsMap] = useState({});
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  useEffect(() => {
    Promise.all([
      getJSON('/dashboard/'),
      getJSON('/students/'),
      getJSON('/subjects/')
    ])
      .then(([dashboardData, studentsData, subjectsData]) => {
        setStats(dashboardData);
        setAllStudents(studentsData);
        
        const subMap = {};
        subjectsData.forEach(s => { subMap[s.id] = s.name; });
        setSubjectsMap(subMap);
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo">EduManage</div>
        <nav>
          <Link href="/">Dashboard</Link>
          <Link href="/students">Students</Link>
          <Link href="/students/new">Admissions</Link>
        </nav>
        <div className="sidebar-student-list">
          <h4>Students List</h4>
          {allStudents.map(student => (
            <div key={student.id} className="sidebar-student">
              <button 
                className={`student-tab ${expandedStudentId === student.id ? 'active' : ''}`}
                onClick={() => setExpandedStudentId(prev => prev === student.id ? null : student.id)}
              >
                <span className="roll-badge">{student.roll_number}</span> {student.full_name}
                <span className="chevron">{expandedStudentId === student.id ? '▲' : '▼'}</span>
              </button>
              
              {expandedStudentId === student.id && (
                <div className="student-details-panel">
                  <ol className="sidebar-subjects">
                    {student.subjects.map(sId => (
                      <li key={sId}>{subjectsMap[sId]}</li>
                    ))}
                    {student.fourth_subject && (
                      <li className="fourth-sub">{subjectsMap[student.fourth_subject]} <small>(4th sub)</small></li>
                    )}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="main-content container">
        <header className="header">
          <h1>Welcome, Admin</h1>
          <p>Here is the overview of the college operations.</p>
        </header>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : !stats ? (
          <p className="alert">Error loading dashboard stats.</p>
        ) : (
          <div className="dashboard-content">
            <div className="stat-cards">
              <div className="stat-card primary-gradient">
                <h3>Total Students</h3>
                <div className="value">{stats.total_students}</div>
              </div>
              <div className="stat-card success-gradient">
                <h3>Total Fees Collected</h3>
                <div className="value">৳ {stats.total_fees}</div>
              </div>
              <div className="stat-card secondary-gradient">
                <h3>Ongoing Exams</h3>
                <div className="value">0</div>
              </div>
            </div>

            <div className="grid-2">
              <section className="card list-card">
                <h2>Group Distribution</h2>
                <ul className="group-list">
                  {stats.group_distribution.map((g, i) => (
                    <li key={i}>
                      <span className="group-name">{g.group}</span>
                      <span className="group-count">{g.count} Students</span>
                      <div className="bar" style={{ width: `${(g.count / stats.total_students) * 100}%` }}></div>
                    </li>
                  ))}
                  {stats.group_distribution.length === 0 && <p>No data available</p>}
                </ul>
              </section>

              <section className="card list-card">
                <h2>Recent Admissions</h2>
                <ul className="recent-students">
                  {stats.recent_students.map(s => (
                    <li key={s.id}>
                      <div className="avatar">{s.full_name.charAt(0)}</div>
                      <div className="info">
                        <strong>{s.full_name}</strong>
                        <span>Class {s.class_name} | {s.group}</span>
                      </div>
                      <Link href={`/students/edit/${s.id}`} className="edit-link">
                        Edit
                      </Link>
                    </li>
                  ))}
                  {stats.recent_students.length === 0 && <p>No recent admissions</p>}
                </ul>
              </section>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #f4f7fe;
        }
        .sidebar {
          width: 250px;
          background: #ffffff;
          padding: 2rem 1.5rem;
          box-shadow: 2px 0 10px rgba(0,0,0,0.05);
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #2b3674;
          margin-bottom: 2rem;
          text-align: center;
        }
        .sidebar nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sidebar nav a {
          text-decoration: none;
          color: #a3aed1;
          font-weight: 600;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .sidebar nav a:hover {
          background: #f4f7fe;
          color: #4318ff;
        }
        .sidebar {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .sidebar-student-list {
          margin-top: 2rem;
          border-top: 1px solid #f4f7fe;
          padding-top: 1rem;
        }
        .sidebar-student-list h4 {
          color: #a3aed1;
          font-size: 0.85rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .sidebar-student {
          margin-bottom: 0.5rem;
        }
        .student-tab {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          border: none;
          color: #2b3674;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .student-tab:hover {
          background: #f4f7fe;
          color: #4318ff;
        }
        .student-tab.active {
          background: #4318ff;
          color: white;
        }
        .roll-badge {
          background: rgba(163, 174, 209, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.8rem;
          margin-right: 6px;
        }
        .student-tab.active .roll-badge {
          background: rgba(255, 255, 255, 0.2);
        }
        .chevron {
          font-size: 0.7rem;
        }
        .student-details-panel {
          background: #f9fafc;
          border-radius: 8px;
          padding: 1rem 0;
          margin-top: 0.25rem;
          border-left: 2px solid #4318ff;
        }
        .sidebar-subjects {
          margin: 0;
          padding-left: 2rem;
          color: #4a5568;
          font-size: 0.85rem;
        }
        .sidebar-subjects li {
          margin-bottom: 0.4rem;
        }
        .sidebar-subjects .fourth-sub {
          color: #4318ff;
          font-weight: 500;
        }
        .main-content {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .header h1 {
          color: #2b3674;
          font-size: 2rem;
          margin-bottom: 0.2rem;
        }
        .header p {
          color: #a3aed1;
          margin-bottom: 2rem;
        }
        .stat-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          padding: 1.5rem;
          border-radius: 20px;
          color: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }
        .stat-card h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
          opacity: 0.9;
        }
        .stat-card .value {
          font-size: 2.2rem;
          font-weight: 800;
          margin-top: 0.5rem;
        }
        .primary-gradient {
          background: linear-gradient(135deg, #4318ff 0%, #868cff 100%);
        }
        .success-gradient {
          background: linear-gradient(135deg, #05cd99 0%, #43e97b 100%);
        }
        .secondary-gradient {
          background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
          gap: 1.5rem;
        }
        .list-card {
          border-radius: 20px;
          padding: 1.5rem;
          border: none;
        }
        .list-card h2 {
          margin-top: 0;
          color: #2b3674;
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .group-list, .recent-students {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .group-list li {
          margin-bottom: 1rem;
          position: relative;
        }
        .group-list .group-name {
          font-weight: 600;
          color: #2b3674;
        }
        .group-list .group-count {
          float: right;
          color: #a3aed1;
          font-size: 0.9rem;
        }
        .group-list .bar {
          height: 6px;
          background: #4318ff;
          border-radius: 3px;
          margin-top: 0.5rem;
          transition: width 0.5s ease;
        }
        .recent-students li {
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f4f7fe;
        }
        .recent-students li:last-child {
          border-bottom: none;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f4f7fe;
          color: #4318ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin-right: 1rem;
        }
        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .info strong {
          color: #2b3674;
        }
        .info span {
          color: #a3aed1;
          font-size: 0.85rem;
        }
        .edit-link {
          color: #4318ff;
          font-size: 0.9rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

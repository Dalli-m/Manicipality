import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data - replace with API calls in production
  const [reports, setReports] = useState([
    { id: 1, type: 'Pothole', location: 'Main Street', status: 'Pending' },
    { id: 2, type: 'Garbage', location: 'Central Park', status: 'In Progress' }
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'Town Hall Meeting', date: '2024-03-15' }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const updateReportStatus = (id, newStatus) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: newStatus } : report
    ));
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Barelias Municipality Admin</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <div className="admin-container">
        <nav className="admin-sidebar">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => setActiveTab('reports')}
          >
            Citizen Reports
          </button>
          <button
            className={activeTab === 'events' ? 'active' : ''}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
        </nav>

        <main className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-overview">
              <div className="stats-card">
                <h3>Pending Reports</h3>
                <p>{reports.filter(r => r.status === 'Pending').length}</p>
              </div>
              <div className="stats-card">
                <h3>Upcoming Events</h3>
                <p>{events.length}</p>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="reports-list">
              <h2>Citizen Reports</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.type}</td>
                      <td>{report.location}</td>
                      <td>
                        <select 
                          value={report.status}
                          onChange={(e) => updateReportStatus(report.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                      <td>
                        <button className="action-btn view-btn">View</button>
                        <button className="action-btn delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="events-management">
              <h2>Events Management</h2>
              <button className="add-event-btn">+ Add New Event</button>
              <div className="events-list">
                {events.map(event => (
                  <div key={event.id} className="event-card">
                    <h3>{event.title}</h3>
                    <p>Date: {event.date}</p>
                    <div className="event-actions">
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="user-management">
              <h2>User Accounts</h2>
              <div className="user-filters">
                <input type="text" placeholder="Search users..." />
                <select>
                  <option>All Users</option>
                  <option>Admins</option>
                  <option>Citizens</option>
                </select>
              </div>
              {/* User list would go here */}
              <p>User management functionality coming soon</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
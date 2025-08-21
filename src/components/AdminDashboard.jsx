import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load mock data on component mount
  useEffect(() => {
    setLoading(true);
    
    // Check localStorage for saved data
    const savedReports = localStorage.getItem('citizen_reports');
    const savedEvents = localStorage.getItem('municipal_events');
    
    setReports(savedReports ? JSON.parse(savedReports) : [
      { id: 1, type: 'Pothole', location: 'Main Street', status: 'Pending', createdAt: new Date().toISOString() },
      { id: 2, type: 'Garbage', location: 'Central Park', status: 'In Progress', createdAt: new Date().toISOString() }
    ]);
    
    setEvents(savedEvents ? JSON.parse(savedEvents) : [
      { id: 1, title: 'Town Hall Meeting', date: '2024-03-15', location: 'City Hall' }
    ]);
    
    setLoading(false);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('citizen_reports', JSON.stringify(reports));
    localStorage.setItem('municipal_events', JSON.stringify(events));
  }, [reports, events]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const updateReportStatus = (id, newStatus) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: newStatus } : report
    ));
  };

  const deleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== id));
    }
  };

  const addNewEvent = () => {
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([
      ...events,
      {
        id: newId,
        title: 'New Event',
        date: new Date().toISOString().split('T')[0],
        location: 'To be determined'
      }
    ]);
  };

  const deleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

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
                <p>{events.filter(e => new Date(e.date) >= new Date()).length}</p>
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
                    <th>Date</th>
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
                      <td>{new Date(report.createdAt).toLocaleDateString()}</td>
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
                        <button 
                          className="action-btn view-btn"
                          onClick={() => alert(`Viewing report #${report.id}`)}
                        >
                          View
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => deleteReport(report.id)}
                        >
                          Delete
                        </button>
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
              <button 
                className="add-event-btn"
                onClick={addNewEvent}
              >
                + Add New Event
              </button>
              <div className="events-list">
                {events.map(event => (
                  <div key={event.id} className="event-card">
                    <h3>{event.title}</h3>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Location: {event.location}</p>
                    <div className="event-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => alert(`Editing event #${event.id}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteEvent(event.id)}
                      >
                        Delete
                      </button>
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
                <input 
                  type="text" 
                  placeholder="Search users..."
                  disabled
                />
                <select disabled>
                  <option>All Users</option>
                  <option>Admins</option>
                  <option>Citizens</option>
                </select>
              </div>
              <div className="mock-user-table">
                <p>User management panel (mock view)</p>
                <div className="mock-user-row">
                  <span>Admin User</span>
                  <span>admin@barelias.gov</span>
                  <button className="mock-action-btn">Edit</button>
                </div>
                <div className="mock-user-row">
                  <span>Test Citizen</span>
                  <span>citizen@example.com</span>
                  <button className="mock-action-btn">Edit</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
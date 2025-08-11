import React, { useState } from 'react';
import './TrashSchedule.css';

const TrashSchedule = () => {
  const [showSchedule, setShowSchedule] = useState(false);

  const scheduleData = [
    { day: 'Monday', type: 'Recycling', area: 'North District' },
    { day: 'Tuesday', type: 'General Waste', area: 'Central District' },
    { day: 'Wednesday', type: 'Yard Waste', area: 'South District' },
    { day: 'Thursday', type: 'Recycling', area: 'East District' },
    { day: 'Friday', type: 'General Waste', area: 'West District' }
  ];

  return (
    <section className="trash-schedule-section">
      <button 
        className="schedule-toggle-btn"
        onClick={() => setShowSchedule(!showSchedule)}
      >
        <i className="fas fa-trash-alt"></i> {showSchedule ? 'Hide' : 'View'} Trash Schedule
      </button>

      {showSchedule && (
        <div className="schedule-container">
          <h3>Weekly Collection Schedule</h3>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Type</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.type}</td>
                  <td>{item.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="schedule-notes">
            <h4>Important Notes:</h4>
            <ul>
              <li>Collections start at 7:00 AM</li>
              <li>Holidays may affect schedule</li>
              <li>Bins must be out by 6:30 AM</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrashSchedule;
// src/pages/Dashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css'; // Ensure you have this CSS file

// Dummy data for demonstration
const user = {
  name: 'Irfan',
  skills: ['JavaScript', 'React', 'Node.js'],
  notifications: [
    'You have a new skill request!',
    'Your skill exchange with Jane Doe has been approved.',
  ],
};

function Dashboard() {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">SkillSwap</Link>
        </div>
        <ul className="navbar-nav">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-overview">
          <h2>Your Skills</h2>
          <ul>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
        <section className="dashboard-notifications">
          <h2>Notifications</h2>
          <ul>
            {user.notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

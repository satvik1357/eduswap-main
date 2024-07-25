import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Import UserContext
import '../styles/ProfilePage.css';
import logo from '../images/logo.jpg'; // Update the path to your logo

const ProfilePage = () => {
  const { user } = useContext(UserContext); // Use UserContext to get user

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">EduSwap</Link>
        </div>
        <ul className="navbar-nav">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
      <div className="profile-content">
        <header className="profile-header">
          <div className="profile-image-container">
            <img src={logo} alt="Profile" className="profile-image" />
          </div>
          <div className="profile-info">
            <h1>{user.displayName}</h1>
            <h2>{user.email}</h2>
          </div>
        </header>
        <main className="profile-main">
          <section className="profile-section">
            <h3>Skills</h3>
            {/* Add skills here */}
          </section>
          <section className="profile-section">
            <h3>Experience</h3>
            {/* Add experience here */}
          </section>
          <section className="profile-section">
            <h3>Certifications</h3>
            {/* Add certifications here */}
          </section>
          <section className="profile-section">
            <h3>Projects</h3>
            {/* Add projects here */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;

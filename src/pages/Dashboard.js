import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Import UserContext
import '../styles/Dashboard.css'; // Ensure you have this CSS file

const images = [
  '/images/EduSwap.png', // Replace with your image URLs
  '/images/image1.png',
  '/images/image.png',
];

function Dashboard() {
  const { user } = useContext(UserContext); // Use UserContext to get user
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
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
      <header className="dashboard-header">
        <h1>Welcome, {user.displayName}!</h1>
        <div className="image-slider">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? 'visible' : 'hidden'}
            />
          ))}
        </div>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-overview">
          <h2>Your Skills</h2>
          {/* Add skills here */}
        </section>
        <section className="dashboard-notifications">
          <h2>Notifications</h2>
          {/* Add notifications here */}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

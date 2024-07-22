import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/HomePage.css'; // Ensure the path is correct

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to the Skill Swapping Platform</h1>
      <p>Connect with your peers to exchange skills and knowledge!</p>
      <div className="home-buttons">
        <Link className="home-link" to="/login">Login</Link>
        <Link className="home-link" to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default HomePage;

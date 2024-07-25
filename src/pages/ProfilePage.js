import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import '../styles/ProfilePage.css';
import logo from '../images/logo.jpg'; // Update the path to your logo

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    skills: [],
    experience: [],
    certifications: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfile({
              name: currentUser.displayName || 'User',
              title: userData.title || '',
              skills: userData.skills || [],
              experience: userData.experience || [],
              certifications: userData.certifications || [],
              projects: userData.projects || []
            });
          } else {
            setError('Profile data not found.');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Failed to fetch user data.');
        }
      } else {
        setProfile(null);
        setError('No user is signed in.');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
            <h1>{profile.name}</h1>
            <h2>{profile.title}</h2>
          </div>
        </header>
        <main className="profile-main">
          <section className="profile-section">
            <h3>Skills</h3>
            <ul>
              {profile.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
          <section className="profile-section">
            <h3>Experience</h3>
            <ul>
              {profile.experience.map((exp, index) => (
                <li key={index}>
                  <strong>{exp.role}</strong> at <em>{exp.company}</em> ({exp.duration})
                </li>
              ))}
            </ul>
          </section>
          <section className="profile-section">
            <h3>Certifications</h3>
            <ul>
              {profile.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
          <section className="profile-section">
            <h3>Projects</h3>
            <ul>
              {profile.projects.map((proj, index) => (
                <li key={index}>
                  <strong>{proj.title}</strong>: {proj.description}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;

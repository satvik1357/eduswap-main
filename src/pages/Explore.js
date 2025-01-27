import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '../styles/Explore.css';
import defaultProfileImage from '../images/default-profile.png';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const auth = getAuth();
      const db = getFirestore();

      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter(user => user.id !== currentUser.uid);

            // Assign random ratings
            usersList.forEach(user => {
              user.rating = (Math.random() * (5 - 4) + 4).toFixed(1);
              user.image = defaultProfileImage;
            });

            setProfiles(usersList);
            setFilteredProfiles(usersList);
            setLoading(false);
          } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users.');
            setLoading(false);
          }
        } else {
          setError('No user is signed in.');
          setLoading(false);
        }
      });
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      let lastScrollTop = 0;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === '') {
      setFilteredProfiles(profiles);
    } else {
      const filtered = profiles.filter(profile =>
        profile.name.toLowerCase().includes(query) ||
        profile.skills.some(skill => skill.toLowerCase().includes(query))
      );
      setFilteredProfiles(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="explore">
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
      <header className="explore-header">
        <h1>Explore Profiles</h1>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for name or skills..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button>Search</button>
        <Link to="/advanced-search">Advanced Search</Link>
      </div>
      <main className="explore-main freelancers-container">
        {filteredProfiles.map((profile, index) => (
          <div key={index} className="freelancer-box">
            <img src={profile.image} alt={`${profile.name}`} className="profile-image" onClick={() => alert(`Showing detailed profile for ${profile.name}`)} />
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
            <div className="rating">{'⭐'.repeat(Math.floor(profile.rating))} ({profile.rating})</div>
            <div className="skills">
              {profile.skills.map((skill, i) => (
                <span key={i} className="skill">{skill}</span>
              ))}
            </div>
            <p><i className="fas fa-briefcase"></i> {profile.projects ? profile.projects.length : 0} completed projects</p>
            <div className="buttons">
              <button className="button view-profile" onClick={() => alert(`Showing detailed profile for ${profile.name}`)}>View Profile</button>
              <button className="button hire-now">Request</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Explore;

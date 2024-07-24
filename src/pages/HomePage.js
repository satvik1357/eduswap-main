import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Ensure the path is correct

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTHV4JqbAHcwPJj73fwrOaYy0EvXr-Gy4",
  authDomain: "eduswap-e77c1.firebaseapp.com",
  projectId: "eduswap-e77c1",
  storageBucket: "eduswap-e77c1.appspot.com",
  messagingSenderId: "1082655214516",
  appId: "1:1082655214516:web:dab6b7de61ed76bc0180e1",
  measurementId: "G-58ZWKKCQWP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function HomePage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const domain = email.split('@')[1];
        
        if (domain !== 'vishnu.edu.in') {
          signOut(auth)
            .then(() => {
              alert('Only vishnu.edu.in email addresses are allowed.');
            })
            .catch((error) => {
              console.error('Error signing out: ', error);
            });
        } else {
          console.log('User signed in: ', user);
          navigate('/dashboard'); // Redirect to dashboard on successful login
        }
      })
      .catch((error) => {
        console.error('Error signing in: ', error);
      });
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Skill Swapping Platform</h1>
      <p>Connect with your peers to exchange skills and knowledge!</p>
      <div className="home-buttons">
        <button className="home-link" onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default HomePage;

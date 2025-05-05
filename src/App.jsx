import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Offers from './Offers.jsx';
import Home from './Home.jsx';
import UserProfile from './UserProfile';
import { LikedCarsProvider } from './LikedCarsContext';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-backgroundLight dark:bg-backgroundDark text-textLight dark:text-textDark transition-colors duration-300">
      <nav className="bg-primary p-4 shadow-md dark:bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            Car Marketplace
          </Link>
          <div className="space-x-4 flex items-center">
            <Link to="/" className="text-white hover:text-accent dark:hover:text-accent">
              Home
            </Link>
            <Link to="/offers" className="text-white hover:text-accent dark:hover:text-accent">
              Offers
            </Link>
            <Link to="/add" className="text-white hover:text-accent dark:hover:text-accent">
              Add Car
            </Link>
            <Link to="/profile" className="text-white hover:text-accent dark:hover:text-accent">
              Profile
            </Link>
            <button
              onClick={toggleTheme}
              className="bg-secondary text-white px-3 py-1 rounded hover:bg-accent dark:bg-gray-600 dark:hover:bg-accent transition-colors"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <LikedCarsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<div className="bg-white dark:bg-gray-700 text-textLight dark:text-textDark p-6 rounded-lg shadow-md">Add Car Page (TBD)</div>} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </LikedCarsProvider>
      </div>
    </div>
  );
}

export default App;
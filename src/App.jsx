import { useState, useEffect } from 'react';
   import { Routes, Route, Link } from 'react-router-dom';

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


   }

   export default App;
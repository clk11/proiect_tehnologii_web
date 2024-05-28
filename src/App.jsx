import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Announcements from './pages/Announcements/Announcements.jsx';
import Gallery from './pages/Gallery.jsx';
import Teams from './pages/Teams/Teams.jsx';
import Contact from './pages/Contact.jsx';
import NavBar from './layout/NavBar.jsx';
import Login from './pages/Login.jsx';
import customAxios from './server/utils/customAxios.js';

const AuthContext = React.createContext();

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  useEffect(() => {
    if (window.location.pathname === "/")
      setNavbarVisible(false);
    else
      setNavbarVisible(true);
    const fetch = async () => {
      try {
        await customAxios.get("/session");
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    };
    fetch();
  }, []);

  return (
    <Router>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <NavBar setNavbarVisible={setNavbarVisible} navbarVisible={navbarVisible}>
          <Routes>
            <Route path="/" element={<Home setNavbarVisible={setNavbarVisible} />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/contact" element={<Contact />} />
            {!isAuth && <Route path="/login" element={<Login />} />}
          </Routes>
        </NavBar>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;

export { AuthContext };

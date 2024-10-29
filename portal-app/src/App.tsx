import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Login from './pages/auth/Login';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProfile from './components/CreateProfile';
import Home from './pages/Home';
import CreateProfile2 from './components/CreateProfile2';
import MyDates from './pages/MyDates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-profile" element={<CreateProfile2 />} />
        <Route path="/dates/:id" element={<MyDates />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;

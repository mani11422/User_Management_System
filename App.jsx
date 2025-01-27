import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddEditUser from './pages/AddEditUser';
import Navbar from './components/Navbar';
import './styles.css';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-user" element={<AddEditUser />} />
      <Route path="/edit-user/:id" element={<AddEditUser />} />
    </Routes>
  </Router>
);

export default App;

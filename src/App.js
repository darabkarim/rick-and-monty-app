import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterGridPage from './pages/CharacterGridPage';
import CharacterProfilePage from './pages/CharacterProfilePage';
import './App.css'

const App = () => {
  return (
    <>
    <h3 className='text-center my-3'>Rick and Morty Search App</h3>
    <Router>
      <Routes>
        <Route path="/" element={<CharacterGridPage />} />
        <Route path="/character/:id" element={<CharacterProfilePage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';
import EmployeeDetails from './components/EmployeeDetails';
import Navbar from './components/Navbar';
import StripeImage from './components/StripeImage';
import { FavoritesProvider } from './context/FavoritesContext';
import { SearchProvider } from './context/SearchContext';
import './App.css';

function App() {
  return (
    <FavoritesProvider>
      <SearchProvider>
        <Router>
          <div className="App">
            <Navbar />
            <StripeImage />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employee" element={<EmployeeDetails />} />
              <Route path="/favs" element={<Favorites />} />
              <Route path="/favorites" element={<Favorites />} /> 
            </Routes>
          </div>
        </Router>
      </SearchProvider>
    </FavoritesProvider>
  );
}

export default App;

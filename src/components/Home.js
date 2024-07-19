import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import EmployeeList from './EmployeeList';
import { SearchContext } from '../context/SearchContext';

function Home() {
  const { query, setQuery, employees, setEmployees } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchEmployees = async (searchQuery) => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${searchQuery}`);
      setEmployees(response.data.results);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setQuery(searchQuery);
      searchEmployees(searchQuery);
    } else if (!query && employees.length === 0) {
      searchEmployees('');
    }
  }, [searchParams]);

  const handleSearch = () => {
    setSearchParams({ search: query });
    searchEmployees(query);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">Employee App</h1>
      <div className="flex justify-center my-4">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search by company" 
          className="p-2 border border-gray-300 rounded-l"
        />
        <button 
          onClick={handleSearch} 
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Search
        </button>
      </div>
      <EmployeeList employees={employees} />
    </div>
  );
}

export default Home;

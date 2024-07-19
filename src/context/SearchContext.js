import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [employees, setEmployees] = useState([]);

  return (
    <SearchContext.Provider value={{ query, setQuery, employees, setEmployees }}>
      {children}
    </SearchContext.Provider>
  );
};

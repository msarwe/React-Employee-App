import React, { useContext, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

function EmployeeList({ employees }) {
  const { favorites, addFavorite } = useContext(FavoritesContext);
  const [addedToFavorites, setAddedToFavorites] = useState({});
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newAddedToFavorites = {};
    employees.forEach((employee, index) => {
      if (favorites.some(fav => fav.login.uuid === employee.login.uuid)) {
        newAddedToFavorites[employee.login.uuid] = true;
      }
    });
    setAddedToFavorites(newAddedToFavorites);
  }, [employees, favorites]);

  const handleAddFavorite = (employee) => {
    addFavorite(employee);
    setAddedToFavorites((prevState) => ({
      ...prevState,
      [employee.login.uuid]: true,
    }));
  };

  const company = searchParams.get('search') || '';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee, index) => (
        <div key={employee.login.uuid} className="bg-white shadow-md rounded-lg p-4">
          <img src={employee.picture.large} alt={employee.name.first} className="rounded-full w-24 h-24 mx-auto" />
          <h2 className="text-center text-xl font-bold my-2">{employee.name.first} {employee.name.last}</h2>
          <p className="text-center text-gray-600">Age: {employee.dob.age}</p>
          <p className="text-center text-gray-600">Location: {employee.location.city}, {employee.location.country}</p>
          <div className="text-center my-2">
            <Link to={`/employee/?company=${company}&index=${index}`} state={{ employee }} className="text-blue-500">Show More Details</Link>
          </div>
          {addedToFavorites[employee.login.uuid] ? (
            <button className="w-full bg-gray-500 text-white py-2 rounded mt-2" disabled>Added to Favorites</button>
          ) : (
            <button onClick={() => handleAddFavorite(employee)} className="w-full bg-green-500 text-white py-2 rounded mt-2">Add to Favorites</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;

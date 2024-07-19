import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

function Favorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite, index) => (
          <div key={favorite.login.uuid} className="bg-white shadow-md rounded-lg p-4">
            <img src={favorite.picture.large} alt={favorite.name.first} className="rounded-full w-24 h-24 mx-auto" />
            <h2 className="text-center text-xl font-bold my-2">{favorite.name.first} {favorite.name.last}</h2>
            <p className="text-center text-gray-600">Age: {favorite.dob.age}</p>
            <p className="text-center text-gray-600">Location: {favorite.location.city}, {favorite.location.country}</p>
            <div className="text-center my-2">
              <Link to={`/employee/?company=${favorite.company}&index=${index}`} state={{ employee: favorite, isFavoritePage: true }} className="text-blue-500">Show More Details</Link>
            </div>
            <button onClick={() => removeFavorite(favorite.login.uuid)} className="w-full bg-red-500 text-white py-2 rounded mt-2">Remove from Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

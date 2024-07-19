import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FavoritesContext } from '../context/FavoritesContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

function EmployeeDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [employee, setEmployee] = useState(location.state?.employee);
  const [isFavorite, setIsFavorite] = useState(false);
  const isFavoritePage = location.state?.isFavoritePage || false;

  const company = searchParams.get('company');
  const index = searchParams.get('index');

  useEffect(() => {
    if (!employee && company && index !== null) {
      const fetchEmployee = async () => {
        try {
          const response = await axios.get(`https://randomuser.me/api/?results=10&seed=${company}`);
          setEmployee(response.data.results[parseInt(index)]);
        } catch (error) {
          console.error('Error fetching employee details:', error);
        }
      };
      fetchEmployee();
    }
  }, [company, index, employee]);

  useEffect(() => {
    if (employee) {
      const isFav = favorites.some(fav => fav.login.uuid === employee.login.uuid);
      setIsFavorite(isFav);
    }
  }, [employee, favorites]);

  const handleAddFavorite = () => {
    addFavorite(employee);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(employee.login.uuid);
    setIsFavorite(false);
    alert('Employee has been removed from favorites.');
    navigate('/favs');
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <button onClick={() => navigate(isFavoritePage ? '/favs' : -1)} className="bg-gray-500 text-white p-2 rounded my-4">Back</button>
      <div className="bg-white shadow-md rounded-lg p-4 employee-details">
        <img src={employee.picture.large} alt={employee.name.first} className="rounded-full w-24 h-24 mx-auto" />
        <h2 className="text-center text-xl font-bold my-2">{employee.name.first} {employee.name.last}</h2>
        <p className="text-center text-gray-600">Email: {employee.email}</p>
        <p className="text-center text-gray-600">Phone: {employee.phone}</p>
        <p className="text-center text-gray-600">Address: {employee.location.street.number} {employee.location.street.name}, {employee.location.city}, {employee.location.country}</p>
        <div className="my-4">
          <MapContainer center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}>
              <Popup>{employee.location.city}</Popup>
            </Marker>
          </MapContainer>
        </div>
        {isFavoritePage ? (
          <button onClick={handleRemoveFavorite} className="w-full bg-red-500 text-white py-2 rounded mt-2">Remove from Favorites</button>
        ) : isFavorite ? (
          <button className="w-full bg-gray-500 text-white py-2 rounded mt-2" disabled>Added to Favorites</button>
        ) : (
          <button onClick={handleAddFavorite} className="w-full bg-green-500 text-white py-2 rounded mt-2">Add to Favorites</button>
        )}
      </div>
    </div>
  );
}

export default EmployeeDetails;

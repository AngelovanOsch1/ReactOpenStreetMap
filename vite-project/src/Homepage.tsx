import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Homepage() {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [distance, setDistance] = useState('');
  const [errorLocation1, setErrorLocation1] = useState('');
  const [errorLocation2, setErrorLocation2] = useState('');

  const calculateDistance = async () => {
    setErrorLocation1('');
    setErrorLocation2('');

    if (!location1) {
      setErrorLocation1('This field is required');
    }
    if (!location2) {
      setErrorLocation2('This field is required');
    }

    if (location1 && location2) {
      try {
        const response1 = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${location1}`
        );
        const response2 = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${location2}`
        );

        const data1 = response1.data[0];
        const data2 = response2.data[0];

        if (data1 && data2) {
          const lat1 = parseFloat(data1.lat);
          const lon1 = parseFloat(data1.lon);
          const lat2 = parseFloat(data2.lat);
          const lon2 = parseFloat(data2.lon);

          const calculatedDistance = calculateHaversine(lat1, lon1, lat2, lon2);
          setDistance(calculatedDistance.toFixed(2));
          
        } else {
          setDistance('Location not found');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Oops, something went wrong');
      }
    }
  };

  const calculateHaversine = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div>
      <h1>Distance Calculator</h1>
      <input
        type='text'
        placeholder='Location 1'
        value={location1}
        onChange={(e) => {
          setLocation1(e.target.value);
          setErrorLocation1('');
        }}
      />
      {errorLocation1 && <p style={{ color: 'red' }}>{errorLocation1}</p>}
      <input
        type='text'
        placeholder='Location 2'
        value={location2}
        onChange={(e) => {
          setLocation2(e.target.value);
          setErrorLocation2('');
        }}
      />
      {errorLocation2 && <p style={{ color: 'red' }}>{errorLocation2}</p>}
      <button onClick={calculateDistance}>Calculate Distance</button>
      {distance !== '' && <p>Distance: {distance} kilometers</p>}
      <ToastContainer />
    </div>
  );
}

export default Homepage;

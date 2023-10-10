import { useState } from 'react';
import axios from 'axios';
import Card from './Card';

function Homepage() {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [distance, setDistance] = useState('');

  const calculateDistance = async () => {
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

        const distance = calculateHaversine(lat1, lon1, lat2, lon2);
        setDistance(distance.toFixed(2));
      } else {
        setDistance('Location not found');
      }
    } catch (error) {
      console.error('Error:', error);
      setDistance('An error occurred');
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
    <>
      <Card />
    </>
  );
}

export default Homepage;

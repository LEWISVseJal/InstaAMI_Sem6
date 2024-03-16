import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './UserStats.css';

const UserStats = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/');
        const createdAtValues = response.data.map(stat => stat.createdAt);
        console.log('Fetched createdAt values:', createdAtValues);
        const registrations = countUserRegistrations(createdAtValues);
        setRegistrationData(registrations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching createdAt values:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const countUserRegistrations = (createdAtList) => {
    const registrations = {
      "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0,
      "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0
    };

    createdAtList.forEach((createdAt) => {
      const month = new Date(createdAt).toLocaleString('en-US', { month: 'short' });
      registrations[month]++;
    });

    return Object.values(registrations);
  };

  return (
    <div className='UserStats'>
      <h1>User Registrations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Registrations',
                data: registrationData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default UserStats;

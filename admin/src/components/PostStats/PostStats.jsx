import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './PostStats.css';

const PostStats = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/post/postlist');
        const postData = response.data.posts || []; 
        const createdAtValues = postData.map(post => post.createdAt);
        console.log('Fetched createdAt values:', createdAtValues);
        const postsByMonth = countPostsByMonth(createdAtValues);
        setPostData(postsByMonth);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post list:', error);
        setLoading(false);
      }
    };
    

    fetchData();
  }, []);

  const countPostsByMonth = (createdAtList) => {
    const postCounts = {
      "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0,
      "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0
    };

    createdAtList.forEach((createdAt) => {
      const month = new Date(createdAt).toLocaleString('en-US', { month: 'short' });
      postCounts[month]++;
    });

    return Object.values(postCounts);
  };

  return (
    <div className='PostStats'>
      <h1>Post Creation Stats</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Post Count',
                data: postData,
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

export default PostStats;

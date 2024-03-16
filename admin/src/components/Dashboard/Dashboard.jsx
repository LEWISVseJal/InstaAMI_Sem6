import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import UserStats from '../UserStats/UserStats';
import PostStats from '../PostStats/PostStats';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/user/');
        const users = userResponse.data;

        const totalCount = users.length;
        const adminCount = users.filter(user => user.isAdmin).length;
        const userCount = totalCount - adminCount;

        setUserCount(userCount);
        setAdminCount(adminCount);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    const fetchPostCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post/postlist');
        setPostCount(response.data.posts.length);
      } catch (error) {
        console.error('Error fetching post count:', error);
      }
    };

    fetchCounts();
    fetchPostCount();
  }, []);

  return (
    <div className="Dashboard">
      <div className="Welcome">
        <h3>Welcome Admin &#128526;!!!</h3>
      </div>
      <div className="StatsContainer">
        <div className="StatBlock">
          <h2>No. of Admins</h2>
          <h1>{adminCount}</h1>
        </div>
        <div className="StatBlock">
          <h2>No. of Users</h2>
          <h1>{userCount}</h1>
        </div>
        <div className="StatBlock">
          <h2>No. of Post's</h2>
          <h1>{postCount}</h1>
        </div>
      </div>
      <div className="analyticsContainer">
        <UserStats />
        <PostStats />
      </div>
    </div>
  );
};

export default Dashboard;

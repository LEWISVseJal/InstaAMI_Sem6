import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Dashboard from '../../components/Dashboard/Dashboard';


const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Dashboard />
    </div>
  );
};

export default Home;

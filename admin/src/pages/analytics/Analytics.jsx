import React from 'react'
import Header from '../../components/Header/Header'
import UserStats from '../../components/UserStats/UserStats'
import PostStats from '../../components/PostStats/PostStats'
import "./Analytics.css"

const Analytics = () => {
  return (
    <div className='Analytics'>
        <Header />
        <h1>Analytics</h1>
        <div className="statsContainer">
          <UserStats />
          <PostStats />
        </div>
    </div>
  )
}

export default Analytics
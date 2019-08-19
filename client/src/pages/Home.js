import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='login'>Log in</Link> to see a list of users
    </div>
  )
}

export default Home;
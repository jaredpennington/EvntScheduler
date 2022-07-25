import React from 'react';
import {Link} from "react-router-dom";

// starting page when the user is not logged in.
// this page will describe the app and explain how to get started.

const Home = () => {
  return (
    <>
    <div className='getting-centered'>
    <p className=''>Use EVNT to plan everything!</p>
    <div className='flex'>
      
      <Link to="/login">
      <button className='getting-started'>
        Login
        </button>
        </Link>

        <Link to="/signup">
      <button 
      className='getting-started'>
        Sign Up
        </button>
        </Link>
    </div>
    </div>
    </>
  )
}

export default Home


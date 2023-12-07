import React from 'react';
import Math from '../components/math/Math';
import HomeMenu from '../components/menu/HomeMenu';

const Home = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center p-6 "
      style={{  minHeight: 'inherit',background:"#fff"}}
    >
      <div className='w-24 h-24 rounded-3xl overflow-hidden bg-gray-500 mb-8'>
        <img className='w-64' alt='logo' src='/img/espoch_logo.jpg'/>
      </div>
      <h1 className='mb-8 '><b>CALCULADORA</b> de Teoria de Colas</h1>
      <HomeMenu />
    </div>
  );
};

export default Home;

import React from 'react';
import Math from '../components/math/Math';
import HomeMenu from '../components/menu/HomeMenu';

const Home = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center p-6 "
      style={{  minHeight: 'inherit',background:"#fff"}}
     
    >
      <div className='w-16 h-16 bg-gray-500 mb-8'>
        <img className='w-64' alt='logo' src='https://www.espoch.edu.ec/images/Comunicacion/2021/MARZO%202021/Actualizaci%C3%B3n/M.png'/>
      </div>
      <h1 className='mb-8 '><b>CALCULADORA</b> de Teoria de Colas</h1>
      <HomeMenu />
    </div>
  );
};

export default Home;

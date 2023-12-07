import React from 'react';
import Math from '../components/math/Math';
import HomeMenu from '../components/menu/HomeMenu';
import { GithubIcon } from '../components/Icons/social';

const Home = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center p-6 "
      style={{ minHeight: 'inherit', background: '#fff' }}
    >
      <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-500 mb-8">
        <img className="w-64" alt="logo" src="/img/espoch_logo.jpg" />
      </div>
      <h1 className="font-bold">Calculadora de Teoria de Colas</h1>
      <h2 className="mb-8 ">Queueing Theory Calculator</h2>
      <HomeMenu />
      <a
        className="mt-8 text-sm flex gap-3 items-center bg-gray-100 rounded-full py-2 pl-2 pr-4 border"
        href="https://github.com/richardnarvaez/calculadora-teoria-colas-js"
      >
        <span>
          <GithubIcon />
        </span>
        Open Source | Richard Vinueza 2022
      </a>
    </div>
  );
};

export default Home;

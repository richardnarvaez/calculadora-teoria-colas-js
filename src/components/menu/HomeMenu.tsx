import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../config/name.routes';

const HomeMenu = () => {
  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-xl  border border-gray-300 overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:gap-0">
      <div className='col-span-1 md:col-span-2 p-4 text-center font-bold border-b bg-gray-100'>
        SIMPLE
      </div>
      <TheoryOption
        title="M/M/1"
        infinito={true}
        subtitle="PICS - Población infinita canal simple"
        route={Routes.m_m_1}
        position={1}
      />
     
      <TheoryOption
        title="M/M/1/M/M"
        subtitle="PFCS - Población finita canal simple"
        route={Routes.m_m_1_m_m}
        position={3}
      />
      <div className='col-span-1 md:col-span-2  p-4 text-center font-bold border-b border-t bg-gray-100'>
        MULTIPLE
      </div>
       <TheoryOption
        title="M/M/k"
        infinito={true}
        subtitle="PICM - Población infinita canal multiple"
        route={Routes.m_m_k}
        position={2}
      />
      <TheoryOption
        title="M/M/k/M/M"
        subtitle="PFCM - Población finita canal multiple"
        route={Routes.m_m_k_m_m}
        position={4}
      />
    </div>
  );
};

const TheoryOption = ({ title, subtitle, route, position, infinito }: any) => {
 
  return (
    <Link to={route}>
       
      
      <div className={"p-4 md:p-8 w-ful hover:bg-gray-100 flex items-center"}>
       
          <div className='bg-gray-100 rounded-full p-2 shadow border'>
          {
            infinito ? 
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48'><path d="M10.6 35Q6.1 35 3.05 31.725Q0 28.45 0 23.9Q0 19.4 3.075 16.2Q6.15 13 10.6 13Q12.4 13 14.075 13.6Q15.75 14.2 17.05 15.45L21.7 19.95L19.6 22.05L15.15 17.7Q14.25 16.8 13.075 16.4Q11.9 16 10.6 16Q7.4 16 5.2 18.325Q3 20.65 3 23.9Q3 27.2 5.2 29.6Q7.4 32 10.6 32Q11.85 32 13.025 31.6Q14.2 31.2 15.15 30.35L30.95 15.45Q32.25 14.2 33.925 13.6Q35.6 13 37.35 13Q41.8 13 44.9 16.2Q48 19.4 48 23.9Q48 28.45 44.925 31.725Q41.85 35 37.35 35Q35.6 35 33.9 34.425Q32.2 33.85 30.95 32.6L26.4 28.1L28.5 26L32.85 30.35Q33.7 31.2 34.9 31.6Q36.1 32 37.35 32Q40.6 32 42.8 29.6Q45 27.2 45 23.9Q45 20.65 42.775 18.325Q40.55 16 37.35 16Q36.1 16 34.925 16.45Q33.75 16.9 32.85 17.75L17.05 32.65Q15.75 33.85 14.05 34.425Q12.35 35 10.6 35Z"/></svg>
            : 
            <svg style={{transform: 'rotate(90deg)'}} xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48'><path d="M39.6 43.85 35.9 40.2Q33.4 42 30.4 43Q27.4 44 24 44Q19.75 44 16.1 42.475Q12.45 40.95 9.75 38.25Q7.05 35.55 5.525 31.9Q4 28.25 4 24Q4 20.6 5 17.6Q6 14.6 7.8 12.1L4.1 8.4Q3.65 7.95 3.675 7.35Q3.7 6.75 4.15 6.3Q4.6 5.85 5.225 5.85Q5.85 5.85 6.3 6.3L41.75 41.75Q42.2 42.2 42.2 42.8Q42.2 43.4 41.75 43.85Q41.3 44.3 40.675 44.3Q40.05 44.3 39.6 43.85ZM24 41Q26.75 41 29.2 40.225Q31.65 39.45 33.75 38.05L9.95 14.25Q8.55 16.35 7.775 18.8Q7 21.25 7 24Q7 31.25 11.875 36.125Q16.75 41 24 41ZM40.2 35.9 38.05 33.75Q39.45 31.65 40.225 29.2Q41 26.75 41 24Q41 16.75 36.125 11.875Q31.25 7 24 7Q21.25 7 18.8 7.775Q16.35 8.55 14.25 9.95L12.1 7.8Q14.6 6 17.6 5Q20.6 4 24 4Q28.2 4 31.85 5.55Q35.5 7.1 38.2 9.8Q40.9 12.5 42.45 16.15Q44 19.8 44 24Q44 27.4 43 30.4Q42 33.4 40.2 35.9ZM26.15 21.85Q26.15 21.85 26.15 21.85Q26.15 21.85 26.15 21.85Q26.15 21.85 26.15 21.85Q26.15 21.85 26.15 21.85Q26.15 21.85 26.15 21.85Q26.15 21.85 26.15 21.85ZM21.85 26.15Q21.85 26.15 21.85 26.15Q21.85 26.15 21.85 26.15Q21.85 26.15 21.85 26.15Q21.85 26.15 21.85 26.15Q21.85 26.15 21.85 26.15Q21.85 26.15 21.85 26.15Z"/></svg>
          }
        </div>

        <div className="ml-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <p>{subtitle}</p>
        </div>
        
      </div>
    </Link>
  );
};

export default HomeMenu;

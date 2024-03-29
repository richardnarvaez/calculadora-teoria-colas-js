import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainStack from '../routes/MainStack';
import './App.css';

const App = () => {
  return (
    <Router>
        <div className=" overflow-hidden" >
          {/* <Toolbar heightVh={8} /> */}
          <div className="main-container overflow-y-auto">
            <MainStack />
          </div>
        </div>
    </Router>
  );
};

export default App;

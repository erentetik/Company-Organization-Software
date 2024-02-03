import React from 'react';
import SignIn from './components/SignIn';
import ActivateUser from './components/ActivateUser';
import ResetPassword from './components/ResetPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className= "content">
          <Routes>
            <Route extact path="/" element={<SignIn />}  /> 
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/ActivateUser" element={<ActivateUser />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

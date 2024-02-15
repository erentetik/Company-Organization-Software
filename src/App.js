import React from 'react';
import SignIn from './pages/SignIn';
import ActivateUser from './pages/ActivateUser';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className= "content">
          <Routes>
            <Route extact path="/" element={<SignIn />}  /> 
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/ActivateUser" element={<ActivateUser />} />
            <Route path="setNewPassword/?=token${token}" element={<SetNewPassword/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

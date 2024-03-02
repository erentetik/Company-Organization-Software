import React from 'react';
import { useState } from 'react';
import SignIn from './pages/Login_Pages/SignIn';
import ActivateUser from './pages/Login_Pages/ActivateUser';
import ResetPassword from './pages/Login_Pages/ResetPassword';
import SetNewPassword from './pages/Login_Pages/SetNewPassword';
import Home from './pages/Home page/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {

  const [signedIn, setSignedIn] = useState(localStorage.getItem("userId") != null)

  return (
    <Router>
      <div className= "content">
          <Routes>
           <Route exact path="/home" element=
              {signedIn ?
                  <Home signedIn={signedIn} setSignedIn={setSignedIn} />
                  :
                  <Navigate to="/" replace />
              } />
            <Route exact path="/" element=
                {signedIn ? <Navigate to="/home" replace /> : <SignIn setSignedIn={setSignedIn} />}
            />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/ActivateUser" element={<ActivateUser />} />
            <Route path="setNewPassword/:token" element={<SetNewPassword />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

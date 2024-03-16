import React from 'react';
import { useState } from 'react';
import SignIn from './pages/Login_Pages/SignIn';
import ActivateUser from './pages/Login_Pages/ActivateUser';
import ResetPassword from './pages/Login_Pages/ResetPassword';
import SetNewPassword from './pages/Login_Pages/SetNewPassword';
import Home from './pages/Home page/Home';
import Users from './pages/Home page/Users';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Companies from './pages/Home page/Companies';
import Town from './pages/Home page/Town';
import Regions from './pages/Home page/Regions';
import City from './pages/Home page/City';
import { AuthProvider } from './components/AuthContext';

function App() {

  const [signedIn, setSignedIn] = useState(localStorage.getItem("signedIn") );

  return (
    <AuthProvider setSignedIn={setSignedIn}>
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
              <Route path="/Users" element=     
              {signedIn ?
                <Users signedIn={signedIn} setSignedIn={setSignedIn} />
                :
                <Navigate to="/" replace />
            } /> 
              <Route path="/Companies" element={signedIn ?
                <Companies signedIn={signedIn} setSignedIn={setSignedIn} />
                :
                <Navigate to="/" replace />
            } /> 
              <Route path="/Towns" element={signedIn ?
                <Town signedIn={signedIn} setSignedIn={setSignedIn} />
                :
                <Navigate to="/" replace />
            } />
              <Route path="/Regions" element={signedIn ?
                <Regions signedIn={signedIn} setSignedIn={setSignedIn} />
                :
                <Navigate to="/" replace />
            } />
              <Route path="/Cities" element={signedIn ?
                <City signedIn={signedIn} setSignedIn={setSignedIn} />
                :
                <Navigate to="/" replace />
            } />
            </Routes>

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
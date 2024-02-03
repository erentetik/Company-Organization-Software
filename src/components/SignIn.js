import React, { useState } from 'react';
import NavigateButton from './NavigateButton';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // make an API call to back-end
    };

    return (
        <div className='container'>
            <div className='sign-in-page'>
                <form onSubmit={handleSubmit} >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='email-input'
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='password-input'
                        required
                    />
                    <button type="submit" className='button'>Sign In</button>
                   
                </form>
                <NavigateButton to="/ResetPassword" buttonText="Reset Password" />
            </div>
        <NavigateButton to="/ActivateUser" buttonText="Activate User" />
        </div>
       

    );
}

export default SignIn;

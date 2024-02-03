import React, { useState } from 'react';
import NavigateButton from './NavigateButton';

function ResetPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // send e mail to user
    };

    return (
        <div className='container'>
            <div className='reset-password-page'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='email-input'
                    />
                </form>
                <button type="submit" className='button'>Send e mail</button>
            </div>
            <NavigateButton to="/" buttonText="Return to login page." />
        </div>
    );
}

export default ResetPassword;
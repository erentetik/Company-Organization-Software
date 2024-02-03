import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavigateButton({ to, buttonText }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(to);
    };

    return (
        <button onClick={handleNavigate} className='navigate-button'>{buttonText}</button>
    );
}

export default NavigateButton;
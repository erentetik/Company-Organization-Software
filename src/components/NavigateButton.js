import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function NavigateButton({ to, buttonText }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(to);
    };

    return (
        <Button variant="outlined" onClick={handleNavigate}>{buttonText}</Button>
    );
}

export default NavigateButton;
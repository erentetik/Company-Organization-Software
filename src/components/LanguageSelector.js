import React from 'react';
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

const LanguageSelector = ({ language, setLanguage }) => {
    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
    };

    return (
        <Select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            sx={{ width: '100px', height:'20px' }} // Set a custom width for the Select
        >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='tr'>Turkish</MenuItem>
        </Select>
    );
};

export default LanguageSelector;

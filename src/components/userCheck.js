import React, { useEffect } from 'react';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext with the signedIn state
import LocalStorageDelete from "../Resources/localStorage";

const userCheck = () => {
    const EnhancedComponent = (props) => {
        const { signedIn, setSignedIn } = useAuth(); // Assuming you have these state and function from AuthContext

        useEffect(() => {
            checkUser();
        }, []);

        const checkUser = () => {
            if (!signedIn) {
                LocalStorageDelete();
                setSignedIn(false);
            }
        };
        
       
    };

    return EnhancedComponent;
};

export default userCheck;

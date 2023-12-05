import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';




export const useSignIn = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signin = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/v1/customers/login', {
                email,
                password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const { data, status } = response;

            if (status === 200) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                // Store user info if needed
                dispatch({ type: 'SIGNIN', payload: data });
                navigate('/')
            
            } else {
                setError(data.error || "Login failed");
            }
        } catch (error) {
            setError("Login failed. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return { signin, isLoading, error };
};

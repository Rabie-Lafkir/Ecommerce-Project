import { useAuthContext } from './useAuthContext';
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch({ type: 'LOGOUT' });
        navigate('/'); // Redirect to login or any other route after logout
    };


    return logout;
};

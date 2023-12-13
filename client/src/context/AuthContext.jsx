import { useContext, createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN':
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('customer', action.payload.customer?._id);
            return { customer: action.payload };
        case 'LOGOUT':
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return { customer: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedCustomer = storedAccessToken && storedRefreshToken ? { accessToken: storedAccessToken, refreshToken: storedRefreshToken } : null;

    const [state, dispatch] = useReducer(authReducer, {
        customer: storedCustomer,
    });

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedCustomer = storedAccessToken && storedRefreshToken ? { accessToken: storedAccessToken, refreshToken: storedRefreshToken } : null;

        if (storedCustomer) {
            dispatch({ type: 'SIGNIN', payload: storedCustomer });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

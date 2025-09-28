import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

export const useAppContext = () => {
    return useContext(AppContext);
};

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(undefined);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [cars, setCars] = useState([]);
    const [dashboardData, setDashboardData] = useState({});
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const registerUser = async (name, email, password) => {
        try {
            const { data } = await axios.post('/api/user/register', { name, email, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success('Account created successfully!');
                setShowLogin(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const loginUser = async (email, password) => {
        try {
            const { data } = await axios.post('/api/user/login', { email, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success('Logged in successfully!');
                setShowLogin(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        delete axios.defaults.headers.common['Authorization'];
        toast.success('Logged out successfully');
        navigate('/');
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data');
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === 'owner');
            } else {
                setUser(null); // Explicitly set user to null on failure
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            setUser(null); // Set user to null on error to stop loading states
        }
    };

    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars');
            if (data.success) {
                setCars(data.cars);
            }
        } catch (error) {
            toast.error("Could not fetch cars.");
        }
    };
    
    const changeRole = async () => {
        try {
            const { data } = await axios.post("/api/owner/change-role");
            if (data.success) {
                toast.success(data.message);
                await fetchUser();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchDashboardData = async () => {
        try {
          const { data } = await axios.get("/api/owner/dashboard");
          if (data.success) {
            setDashboardData(data.dashboardData);
          }
        } catch (error) {
          toast.error("Failed to fetch dashboard data");
        }
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setUser(null); // If no token, we know the user is not logged in
        }
        fetchCars();
    }, [token]);

    const value = {
        navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner,
        showLogin, setShowLogin, logout, cars, setCars, fetchCars, registerUser, loginUser, changeRole,
        dashboardData, fetchDashboardData, pickupDate, setPickupDate, returnDate, setReturnDate
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
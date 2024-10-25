import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };
    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Salary Stream</h1>
            <nav className="flex gap-6">
                {isAuthenticated ? (
                    <>
                        {/* <a href="/employee" className="hover:text-blue-200">Employee</a>
                        <a href="/admin" className="hover:text-blue-200">Admin</a> */}
                        <button
                            onClick={handleLogout}
                            className="hover:text-blue-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleLogin}
                            className="hover:text-blue-200"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleSignup}
                            className="hover:text-blue-200"
                        >
                            Signup
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
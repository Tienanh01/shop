import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaArrowRight, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // Import hook
import '../../styles/Header.css';

const Header = () => {
    // 1. CHUYỂN HOOKS VÀO TRONG COMPONENT (QUAN TRỌNG)
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    // Hàm xử lý logout nằm ngay tại đây
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="main-header">
            <div className="header-container">

                {/* 1. Logo Section */}
                <div className="logo">
                    <Link to="/">SS-Ecommerce</Link>
                </div>

                {/* 2. Search Bar Section */}
                <div className="search-box">
                    <FaSearch className="search-icon-left" />
                    <input
                        type="text"
                        placeholder="Search products, brands..."
                        className="search-input"
                    />
                    <button className="search-btn">
                        <FaArrowRight />
                    </button>
                </div>

                {/* 3. Actions Section (Cart & Auth) */}
                <div className="header-actions">
                    <div className="cart-action">
                        <FaShoppingCart className="cart-icon" />
                    </div>

                    {/* LOGIC CHECK AUTHENTICATION */}
                    {!isAuthenticated ? (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link to="/login" className="sign-in-btn">
                                Sign in
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {/* Hiển thị tên User */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0f172a' }}>
                                <FaUser style={{ fontSize: '14px' }} />
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>
                                    {user?.fullName || 'User'}
                                </span>
                            </div>

                            {/* Nút Logout */}
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: '6px 12px',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '600'
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
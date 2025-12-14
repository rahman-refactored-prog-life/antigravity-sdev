
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FloatingSubnav.css';

export const FloatingSubnav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const isActive = (path: string) => location.pathname.startsWith(path);

    const toggleMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    return (
        <div className="aws-subnav-container">
            <div className="aws-subnav-pill">
                <p className="aws-subnav-brand">Learning Portal</p>

                <div className="aws-subnav-menu-container">
                    <ul className="aws-subnav-list">
                        {/* Overview */}
                        <li className="aws-subnav-item">
                            <button
                                className={`aws-subnav-link ${isActive('/') ? 'active' : ''}`}
                                onClick={() => navigate('/')}
                            >
                                <span>Overview</span>
                            </button>
                        </li>

                        {/* Modules (Capabilities style) */}
                        <li className="aws-subnav-item">
                            <button
                                className={`aws-subnav-trigger ${activeMenu === 'modules' ? 'active' : ''}`}
                                onClick={() => toggleMenu('modules')}
                                onBlur={() => setTimeout(() => setActiveMenu(null), 200)}
                            >
                                <span>Modules</span>
                                <svg className="aws-icon-chevron" viewBox="0 0 16 16">
                                    <path d="M8 11L3.79 6.79L5.2 5.38L8 8.18L10.8 5.38L12.21 6.79L8 11Z" fill="currentColor" />
                                </svg>
                            </button>

                            {/* Dropdown would go here, simplified navigation for now */}
                        </li>

                        {/* Practice */}
                        <li className="aws-subnav-item">
                            <button
                                className={`aws-subnav-link ${isActive('/practice') ? 'active' : ''}`}
                                onClick={() => navigate('/practice')}
                            >
                                <span>Practice</span>
                            </button>
                        </li>

                        {/* Career */}
                        <li className="aws-subnav-item">
                            <button
                                className={`aws-subnav-link ${isActive('/career') ? 'active' : ''}`}
                                onClick={() => navigate('/career')}
                            >
                                <span>Career</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

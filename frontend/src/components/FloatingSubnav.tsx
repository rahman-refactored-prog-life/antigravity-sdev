
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    FileText,
    Mic,
    StickyNote,
    Terminal,
    ChevronDown,
    BookOpen,
    LayoutDashboard
} from 'lucide-react';
import './FloatingSubnav.css';

interface FloatingSubnavProps {
    onTogglePractice: () => void;
}

export const FloatingSubnav: React.FC<FloatingSubnavProps> = ({ onTogglePractice }) => {
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
                                className={`aws-subnav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
                                onClick={() => navigate('/')}
                            >
                                <LayoutDashboard size={14} className="nav-icon" />
                                <span>Overview</span>
                            </button>
                        </li>

                        {/* Modules */}
                        <li className="aws-subnav-item">
                            <button
                                className={`aws-subnav-trigger ${activeMenu === 'modules' ? 'active' : ''}`}
                                onClick={() => toggleMenu('modules')}
                                onBlur={() => setTimeout(() => setActiveMenu(null), 200)}
                            >
                                <BookOpen size={14} className="nav-icon" />
                                <span>Modules</span>
                                <ChevronDown size={12} className={`aws-icon-chevron ${activeMenu === 'modules' ? 'rotated' : ''}`} />
                            </button>

                            {/* Simplified Modules Dropdown */}
                            {activeMenu === 'modules' && (
                                <div className="aws-subnav-dropdown">
                                    <button onClick={() => navigate('/modules/java')}>Java Fundamentals</button>
                                    <button onClick={() => navigate('/modules/dsa')}>Data Structures</button>
                                </div>
                            )}
                        </li>

                        {/* Resources (Central Hubs) */}
                        <li className="aws-subnav-item">
                            <button
                                className={`aws-subnav-trigger ${activeMenu === 'resources' ? 'active' : ''}`}
                                onClick={() => toggleMenu('resources')}
                                onBlur={() => setTimeout(() => setActiveMenu(null), 200)}
                            >
                                <FileText size={14} className="nav-icon" />
                                <span>Resources</span>
                                <ChevronDown size={12} className={`aws-icon-chevron ${activeMenu === 'resources' ? 'rotated' : ''}`} />
                            </button>

                            {activeMenu === 'resources' && (
                                <div className="aws-subnav-dropdown">
                                    <button onClick={() => navigate('/cheatsheet')}>
                                        <FileText size={14} /> Cheatsheets
                                    </button>
                                    <button onClick={() => navigate('/interview-questions')}>
                                        <Mic size={14} /> Interview Bank
                                    </button>
                                    <button onClick={() => navigate('/notes')}>
                                        <StickyNote size={14} /> My Notes
                                    </button>
                                </div>
                            )}
                        </li>

                        {/* Practice Toggle */}
                        <li className="aws-subnav-item">
                            <button
                                className="aws-subnav-link practice-btn"
                                onClick={onTogglePractice}
                            >
                                <Terminal size={14} className="nav-icon" />
                                <span>Practice</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

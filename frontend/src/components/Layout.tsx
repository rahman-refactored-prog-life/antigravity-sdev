import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { GlobalHeader } from './GlobalHeader';
import { FloatingSubnav } from './FloatingSubnav';
import { PracticeSidebar } from './PracticeSidebar';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Start closed (Natural behavior)
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {/* Global Header kept for User Profile / Logout / Main Sidebar Toggle */}
      <GlobalHeader user={user || undefined} onLogout={handleLogout} onToggleSidebar={toggleSidebar} />

      {/* Floating Subnav for Quick Access & Practice */}
      <FloatingSubnav onTogglePractice={() => setIsPracticeOpen(!isPracticeOpen)} />

      <div className="layout-container">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          {children}
        </main>
      </div>

      {/* Slide-out Practice Environment */}
      <PracticeSidebar isOpen={isPracticeOpen} onClose={() => setIsPracticeOpen(false)} />
    </div>
  );
};

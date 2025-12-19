import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GlobalHeader.css';

interface GlobalHeaderProps {
  user?: { username: string; email: string };
  onToggleSidebar?: () => void;
  onLogout?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ user, onToggleSidebar, onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Navigation Bar */}
      <header className="global-navbar">
        <div className="navbar-left">
          {/* Hamburger Menu */}
          <button
            className="sidebar-trigger"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Brand/Title */}
          <div className="navbar-brand" onClick={() => navigate('/')}>
            <span className="brand-text">Senior Dev Academy</span>
          </div>
        </div>

        {/* User Profile / Actions */}
        <div className="navbar-right">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-name">{user.username}</span>
              </div>
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>

              {onLogout && (
                <button className="icon-btn logout" onClick={onLogout} title="Sign Out">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <button className="btn-primary" onClick={() => navigate('/login')}>
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Spacer to push content down */}
      <div className="header-spacer"></div>

      {/* Secondary Nav below header */}
      <div style={{ position: 'sticky', top: '70px', zIndex: 900 }}>
        {/* FloatingSubnav moved to Layout.tsx */}
      </div>
    </>
  );
};

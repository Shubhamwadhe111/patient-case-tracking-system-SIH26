import React from 'react';
import { NavLink } from 'react-router-dom';
import { Smartphone, Monitor } from 'lucide-react';
import { CareConnectLogo } from '../common/CareConnectLogo';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <NavLink to="/" className="brand-area" style={{ textDecoration: 'none' }}>
          <CareConnectLogo 
            size={22}
            iconBg="rgba(255, 255, 255, 0.2)"
            iconColor="#ffffff"
            textColor="#ffffff"
            subtitleColor="#ccfbf1"
          />
        </NavLink>

        <nav className="header-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Overview
          </NavLink>
          <NavLink 
            to="/patient" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Smartphone size={16} />
            Patient Mobile App
          </NavLink>
          <NavLink 
            to="/hospital" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Monitor size={16} />
            Hospital Web Portal
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

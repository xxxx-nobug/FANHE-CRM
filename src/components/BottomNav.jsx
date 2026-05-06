import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TeamOutlined, RiseOutlined, BarChartOutlined, UserOutlined } from '@ant-design/icons';
import './BottomNav.css';

const BottomNav = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      key: '/customers',
      icon: <TeamOutlined />,
      label: '客户',
      path: '/customers'
    },
    {
      key: '/opportunities',
      icon: <RiseOutlined />,
      label: '需求',
      path: '/opportunities'
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: '统计',
      path: '/reports',
      adminOnly: true
    },
    {
      key: '/my',
      icon: <UserOutlined />,
      label: '我的',
      path: '/my'
    }
  ];

  const handleNavClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const filteredItems = navItems.filter(item => {
    if (item.adminOnly) {
      return userRole === 'admin';
    }
    return true;
  });

  return (
    <div className="bottom-nav">
      {filteredItems.map(item => (
        <div
          key={item.key}
          className={`bottom-nav-item ${isActive(item.key) ? 'active' : ''}`}
          onClick={() => handleNavClick(item)}
        >
          <div className="nav-icon">{item.icon}</div>
          <div className="nav-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;

import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import './MainLayout.css';

const { Header, Content } = Layout;

const MainLayout = ({ children, user }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home' || location.pathname === '/';
  const isImmersivePage = isHomePage || location.pathname === '/customers' || location.pathname === '/opportunities' || location.pathname === '/reports' || location.pathname === '/my';

  return (
    <Layout className={`main-layout ${isImmersivePage ? 'home-layout' : ''}`}>
      {!isImmersivePage && (
        <Header className="main-header">
          <div className="header-content">
            <span className="header-title">泛和客商平台</span>
          </div>
        </Header>
      )}
      
      <Content className="main-content">
        {children}
      </Content>
      
      <BottomNav userRole={user?.role} />
    </Layout>
  );
};

export default MainLayout;

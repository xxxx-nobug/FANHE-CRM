import React from 'react';
import { Layout } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import './MainLayout.css';

const { Header, Content } = Layout;

const MainLayout = ({ children, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/home' || location.pathname === '/';
  const isImmersivePage = isHomePage || location.pathname === '/customers' || location.pathname === '/opportunities' || location.pathname === '/reports' || location.pathname === '/my';
  const backPathMap = [
    { match: /^\/customers\/create$/, path: '/customers' },
    { match: /^\/customers\/[^/]+\/edit$/, path: '/customers' },
    { match: /^\/customers\/[^/]+$/, path: '/customers' },
    { match: /^\/opportunities\/create$/, path: '/opportunities' },
    { match: /^\/opportunities\/[^/]+\/edit$/, path: '/opportunities' },
    { match: /^\/opportunities\/[^/]+$/, path: '/opportunities' },
    { match: /^\/reports\/.+/, path: '/reports' },
    { match: /^\/notifications$/, path: '/my' },
    { match: /^\/users$/, path: '/my' },
    { match: /^\/tag-management$/, path: '/my' },
    { match: /^\/create-user$/, path: '/my' }
  ];

  const handleBack = () => {
    const matchedRoute = backPathMap.find(item => item.match.test(location.pathname));
    navigate(matchedRoute?.path || -1);
  };

  return (
    <Layout className={`main-layout ${isImmersivePage ? 'home-layout' : ''}`}>
      {!isImmersivePage && (
        <Header className="main-header">
          <div className="header-content">
            <button
              type="button"
              className="header-back-button"
              onClick={handleBack}
              aria-label="返回"
            >
              <ArrowLeftOutlined />
              <span>返回</span>
            </button>
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

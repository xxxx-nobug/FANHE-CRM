import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import './MainLayout.css';

const { Header, Content } = Layout;

const MainLayout = ({ children, user }) => {
  const navigate = useNavigate();

  return (
    <Layout className="main-layout">
      <Header className="main-header">
        <div className="header-content">
          <span className="header-title">泛和客商平台</span>
        </div>
      </Header>
      
      <Content className="main-content">
        {children}
      </Content>
      
      <BottomNav userRole={user?.role} />
    </Layout>
  );
};

export default MainLayout;

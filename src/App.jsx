import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CustomerList from './pages/CustomerList';
import CustomerDetail from './pages/CustomerDetail';
import CustomerForm from './pages/CustomerForm';
import OpportunityList from './pages/OpportunityList';
import OpportunityDetail from './pages/OpportunityDetail';
import OpportunityForm from './pages/OpportunityForm';
import ReportDashboard from './pages/ReportDashboard';
import OpportunityReport from './pages/OpportunityReport';
import InputReport from './pages/InputReport';
import ContactReport from './pages/ContactReport';
import MyPage from './pages/MyPage';
import NotificationCenter from './pages/NotificationCenter';
import UserManagement from './pages/UserManagement';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import { mockCustomers, mockNotifications } from './mock/data';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState(mockCustomers);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#2F6FA8',
          colorSuccess: '#18A085',
          colorWarning: '#D48925',
          colorError: '#D85C55',
          colorText: '#1F2A3D',
          colorTextSecondary: '#667085',
          colorBorder: '#DCE7F2',
          colorBgLayout: '#F6FAFD',
          colorBgContainer: '#FFFFFF',
          borderRadius: 8,
          boxShadow: '0 8px 22px rgba(47, 111, 168, 0.08)',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
        },
        components: {
          Card: {
            borderRadiusLG: 10,
            paddingLG: 16
          },
          Button: {
            borderRadius: 8,
            controlHeight: 36,
            fontWeight: 600
          },
          Input: {
            borderRadius: 8,
            controlHeight: 38
          },
          Select: {
            borderRadius: 8,
            controlHeight: 38
          },
          Tag: {
            borderRadiusSM: 6
          }
        }
      }}
    >
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          
          <Route
            path="/*"
            element={
              user ? (
                <MainLayout user={user}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<HomePage user={user} customers={customers} notifications={notifications} />} />
                    <Route path="/customers" element={<CustomerList user={user} customers={customers} setCustomers={setCustomers} />} />
                    <Route path="/customers/create" element={<CustomerForm user={user} customers={customers} setCustomers={setCustomers} setNotifications={setNotifications} />} />
                    <Route path="/customers/:id" element={<CustomerDetail user={user} customers={customers} />} />
                    <Route path="/customers/:id/edit" element={<CustomerForm user={user} customers={customers} setCustomers={setCustomers} setNotifications={setNotifications} />} />
                    <Route path="/opportunities" element={<OpportunityList user={user} />} />
                    <Route path="/opportunities/:id" element={<OpportunityDetail user={user} />} />
                    <Route path="/opportunities/create" element={<OpportunityForm />} />
                    <Route path="/opportunities/:id/edit" element={<OpportunityForm />} />
                    <Route path="/reports" element={<ReportDashboard />} />
                    <Route path="/reports/opportunity" element={<OpportunityReport />} />
                    <Route path="/reports/input" element={<InputReport />} />
                    <Route path="/reports/contact" element={<ContactReport />} />
                    <Route path="/my" element={<MyPage user={user} notifications={notifications} onLogout={handleLogout} />} />
                    <Route path="/notifications" element={<NotificationCenter user={user} notifications={notifications} setNotifications={setNotifications} />} />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/create-user" element={<CreateUser />} />
                  </Routes>
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;

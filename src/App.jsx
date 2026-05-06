import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainLayout from './components/MainLayout';
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
import UserManagement from './pages/UserManagement';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import { mockCustomers } from './mock/data';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState(mockCustomers);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/customers" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          
          <Route
            path="/*"
            element={
              user ? (
                <MainLayout user={user}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/customers" replace />} />
                    <Route path="/customers" element={<CustomerList user={user} customers={customers} setCustomers={setCustomers} />} />
                    <Route path="/customers/create" element={<CustomerForm customers={customers} />} />
                    <Route path="/customers/:id" element={<CustomerDetail user={user} customers={customers} />} />
                    <Route path="/customers/:id/edit" element={<CustomerForm customers={customers} />} />
                    <Route path="/opportunities" element={<OpportunityList />} />
                    <Route path="/opportunities/:id" element={<OpportunityDetail />} />
                    <Route path="/opportunities/create" element={<OpportunityForm />} />
                    <Route path="/opportunities/:id/edit" element={<OpportunityForm />} />
                    <Route path="/reports" element={<ReportDashboard />} />
                    <Route path="/reports/opportunity" element={<OpportunityReport />} />
                    <Route path="/reports/input" element={<InputReport />} />
                    <Route path="/reports/contact" element={<ContactReport />} />
                    <Route path="/my" element={<MyPage user={user} onLogout={handleLogout} />} />
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

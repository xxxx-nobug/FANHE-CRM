import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, SolutionOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../mock/data';
import './Login.css';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'admin123') {
        message.success('登录成功');
        onLogin({
          id: 1,
          username: 'admin',
          email: 'admin@company.com',
          unit: '总部',
          role: 'admin'
        });
        navigate('/home');
      } else if (values.username === 'entry' && values.password === 'entry123') {
        const entryUser = mockUsers.find(u => u.role === 'entry');
        message.success('登录成功');
        onLogin({
          id: entryUser?.id || 2,
          username: entryUser?.username || 'entry',
          email: entryUser?.email || 'entry@company.com',
          unit: entryUser?.unit || '销售部',
          role: 'entry'
        });
        navigate('/home');
      } else {
        message.error('用户名或密码错误');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <div className="login-header">
          <SolutionOutlined className="login-icon" />
          <h2>泛和客商平台</h2>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              icon={<LoginOutlined />}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          <p>管理员账号: admin / admin123</p>
          <p>录入员账号: entry / entry123</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;

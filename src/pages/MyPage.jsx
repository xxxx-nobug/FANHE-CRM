import React, { useState } from 'react';
import { Card, Avatar, List, Button, Tag, Divider, Modal, message, Form, Input } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  UserAddOutlined, 
  LogoutOutlined,
  KeyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../mock/data';
import './MyPage.css';

const MyPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();

  const menuItems = [
    {
      icon: <KeyOutlined />,
      title: '修改密码',
      description: '更改登录密码',
      onClick: () => setPasswordModalVisible(true)
    },
    {
      icon: <TeamOutlined />,
      title: '用户管理',
      description: '管理系统用户',
      onClick: () => navigate('/users'),
      adminOnly: true
    },
    {
      icon: <UserAddOutlined />,
      title: '创建账号',
      description: '创建新用户账号',
      onClick: () => navigate('/create-user'),
      adminOnly: true
    }
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly) {
      return user?.role === 'admin';
    }
    return true;
  });

  const handleLogout = () => {
    Modal.confirm({
      title: '确认退出',
      content: '确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        message.success('已退出登录');
        onLogout();
        navigate('/login');
      }
    });
  };

  const handlePasswordSubmit = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    message.success('密码修改成功');
    setPasswordModalVisible(false);
    passwordForm.resetFields();
  };

  const handlePasswordCancel = () => {
    setPasswordModalVisible(false);
    passwordForm.resetFields();
  };

  return (
    <div className="my-page">
      <Card className="user-card">
        <div className="user-header">
          <Avatar size={80} icon={<UserOutlined />} className="user-avatar" />
          <div className="user-info">
            <h2>{user?.username}</h2>
            <p className="user-unit">{user?.unit}</p>
            <Tag color={user?.role === 'admin' ? 'red' : 'blue'}>
              {user?.role === 'admin' ? '管理员' : '录入员'}
            </Tag>
          </div>
        </div>
        
        <div className="user-details">
          <div className="detail-item">
            <span className="detail-label">邮箱</span>
            <span className="detail-value">{user?.email}</span>
          </div>
        </div>
      </Card>

      {filteredMenuItems.length > 0 && (
        <>
          <Divider>管理功能</Divider>
          <Card className="menu-card">
            <List
              dataSource={filteredMenuItems}
              renderItem={item => (
                <List.Item 
                  className="menu-item"
                  onClick={item.onClick}
                >
                  <div className="menu-icon">{item.icon}</div>
                  <div className="menu-content">
                    <div className="menu-title">{item.title}</div>
                    <div className="menu-description">{item.description}</div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </>
      )}

      <Modal
        title="修改密码"
        open={passwordModalVisible}
        onOk={passwordForm.submit}
        onCancel={handlePasswordCancel}
        width={400}
        okText="确认修改"
        cancelText="取消"
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordSubmit}
        >
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password placeholder="请输入当前密码" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码长度不能少于6位' }
            ]}
          >
            <Input.Password placeholder="请输入新密码（至少6位）" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            rules={[{ required: true, message: '请再次输入新密码' }]}
          >
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
      
     <Divider/>
      <Button 
          type="primary" 
          danger 
          block 
          size="large"
          className="action-card"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          退出登录
        </Button>

      <div className="version-info">
        <p>版本: 1.0.0</p>
        <p>© 2024 泛和客商平台</p>
      </div>
    </div>
  );
};

export default MyPage;

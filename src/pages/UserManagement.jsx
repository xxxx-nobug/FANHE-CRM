import React, { useState } from 'react';
import { Card, List, Avatar, Tag, Button, Modal, Form, Input } from 'antd';
import { ArrowLeftOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../mock/data';
import './UserManagement.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordForm] = Form.useForm();
  
  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setIsPasswordModalVisible(true);
  };

  const handlePasswordSubmit = (values) => {
    Modal.success({
      title: '密码重置成功',
      content: `用户 ${selectedUser.username} 的密码已更新`
    });
    setIsPasswordModalVisible(false);
    passwordForm.resetFields();
  };

  return (
    <div className="user-management">
      <Card className="page-card">
        <div className="page-header">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/my')}
          >
            返回
          </Button>
          <h2>用户管理</h2>
        </div>

        <List
          dataSource={mockUsers}
          renderItem={(user, index) => (
            <List.Item className="management-user-item">
              <Card className="management-user-card" hoverable>
                <div className="management-user-content">
                  <Avatar icon={<UserOutlined />} size={36} className="management-user-avatar" />
                  <div className="management-user-details">
                    <div className="management-user-top">
                      <span className="management-username">{user.username}</span>
                      <Tag color={user.role === 'admin' ? 'red' : 'blue'} className="management-role-tag">
                        {user.role === 'admin' ? '管理员' : '录入员'}
                      </Tag>
                    </div>
                    <div className="management-user-meta">
                      <span>{user.unit}</span>
                      <span className="separator">|</span>
                      <span className="email-text">{user.email}</span>
                    </div>
                    <div className="management-user-bottom">
                      <span className="create-time">{user.created_at?.substring(0, 10)}</span>
                      <Button 
                        type="link" 
                        size="small"
                        icon={<KeyOutlined />}
                        onClick={() => handleResetPassword(user)}
                      >
                        修改密码
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
          className="user-list"
        />
      </Card>

      <Modal
        title={`重置密码 - ${selectedUser?.username}`}
        open={isPasswordModalVisible}
        onOk={passwordForm.submit}
        onCancel={() => {
          setIsPasswordModalVisible(false);
          passwordForm.resetFields();
        }}
        width={400}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordSubmit}
        >
          <Form.Item
            name="new_password"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          
          <Form.Item
            name="confirm_password"
            label="确认密码"
            dependencies={['new_password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入密码" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;

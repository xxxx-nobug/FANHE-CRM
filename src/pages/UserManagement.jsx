import React, { useState, useRef } from 'react';
import { Card, List, Avatar, Tag, Button, Modal, Form, Input, message, Spin } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../mock/data';
import './UserManagement.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordForm] = Form.useForm();
  
  // 懒加载相关状态
  const [displayCount, setDisplayCount] = useState(5); // 初始显示数量
  const containerRef = useRef(null);

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

  // 懒加载：监听滚动事件
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    // 当滚动到距离底部 100px 时触发加载
    if (scrollHeight - (scrollTop + clientHeight) < 100 && displayCount < mockUsers.length) {
      setDisplayCount(prev => Math.min(prev + 2, mockUsers.length));
    }
  };

  return (
    <div className="user-management" ref={containerRef} onScroll={handleScroll}>
      <Card className="page-card">
        <div className="page-header">
          <Button 
            type="text" 
            icon={<UserOutlined />}
            onClick={() => navigate('/my')}
          >
            返回
          </Button>
          <h2>用户管理</h2>
        </div>

        <List
          dataSource={mockUsers.slice(0, displayCount)}
          renderItem={(user, index) => (
            <List.Item className="user-card">
              <Card className="user-info-card" hoverable>
                <div className="user-content">
                  <Avatar icon={<UserOutlined />} size={36} className="user-avatar" />
                  <div className="user-details">
                    <div className="user-top">
                      <span className="username">{user.username}</span>
                      <Tag color={user.role === 'admin' ? 'red' : 'blue'} className="role-tag">
                        {user.role === 'admin' ? '管理员' : '录入员'}
                      </Tag>
                    </div>
                    <div className="user-meta">
                      <span>{user.unit}</span>
                      <span className="separator">|</span>
                      <span className="email-text">{user.email}</span>
                    </div>
                    <div className="user-bottom">
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

        {displayCount < mockUsers.length && (
          <div className="loading-more">
            <Spin size="small" />
            <span>向下滚动加载更多</span>
          </div>
        )}

        {displayCount >= mockUsers.length && mockUsers.length > 3 && (
          <div className="load-complete">
            <span>— 已全部加载 —</span>
          </div>
        )}
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

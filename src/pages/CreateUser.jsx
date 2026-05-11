import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, message } from 'antd';
import { SaveOutlined, PlusOutlined } from '@ant-design/icons';
import './CreateUser.css';

const { Option } = Select;

const CreateUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      console.log('New user data:', values);
      message.success('用户创建成功');
      setLoading(false);
      form.resetFields();
    }, 500);
  };

  const handleContinueCreate = () => {
    form.validateFields().then(values => {
      console.log('New user data:', values);
      message.success('用户创建成功');
      form.resetFields();
    });
  };

  return (
    <div className="create-user">
      <Card className="form-card">
        <div className="form-header">
          <h2>创建新用户</h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="unit"
            label="所属单位"
            rules={[{ required: true, message: '请输入所属单位' }]}
          >
            <Input placeholder="请输入所属单位" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="entry">录入员</Option>
              <Option value="admin">管理员</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="form-actions">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
              >
                创建用户
              </Button>
              <Button 
                icon={<PlusOutlined />}
                size="large"
                onClick={handleContinueCreate}
              >
                继续创建
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateUser;

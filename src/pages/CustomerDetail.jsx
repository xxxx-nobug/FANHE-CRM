import React, { useState } from 'react';
import { Card, Descriptions, Tag, Button, Space, Divider, List, Avatar, message, Modal, Form, Input, Select } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, EditOutlined, PlusOutlined, DeleteOutlined, UserOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCustomers, mockOpportunities } from '../mock/data';
import './CustomerDetail.css';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(mockCustomers.find(c => c.id === parseInt(id)));
  const [isAddContactVisible, setIsAddContactVisible] = useState(false);
  const [contactForm] = Form.useForm();
  
  const isBlacklisted = customer?.tags && customer.tags.includes('黑名单');
  
  const handleToggleBlacklist = () => {
    Modal.confirm({
      title: isBlacklisted ? '移出黑名单' : '拉入黑名单',
      content: isBlacklisted 
        ? '确定要将此客户移出黑名单吗？' 
        : '确定要将此客户拉入黑名单吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        let newTags = customer.tags || '';
        if (isBlacklisted) {
          newTags = newTags.split(',').filter(tag => tag.trim() !== '黑名单').join(',');
        } else {
          newTags = newTags ? `${newTags},黑名单` : '黑名单';
        }
        
        const updatedCustomer = {
          ...customer,
          tags: newTags
        };
        
        setCustomer(updatedCustomer);
        message.success(isBlacklisted ? '已移出黑名单' : '已拉入黑名单');
      }
    });
  };

  const handleAddContact = () => {
    setIsAddContactVisible(true);
  };

  const handleAddContactSubmit = (values) => {
    const newContact = {
      id: (customer.contacts?.length || 0) + 1,
      name: values.name,
      position: values.position || null,
      department: values.department || null,
      phone: values.phone || null,
      email: values.email || null,
      relationship: values.relationship
    };

    const updatedCustomer = {
      ...customer,
      contacts: [...(customer.contacts || []), newContact]
    };

    setCustomer(updatedCustomer);
    setIsAddContactVisible(false);
    contactForm.resetFields();
    message.success('联系人添加成功');
  };

  const handleAddContactCancel = () => {
    setIsAddContactVisible(false);
    contactForm.resetFields();
  };

  if (!customer) {
    return <div>客户不存在</div>;
  }

  return (
    <div className="customer-detail">
      <Card className="detail-card">
        <div className="detail-header">
          <h2>{customer.company_name}</h2>
          <div className="location">
            <EnvironmentOutlined /> {customer.country || customer.region}
            {customer.tags && customer.tags.includes('黑名单') && (
              <Tag color="red" style={{ marginLeft: 8 }}>黑名单</Tag>
            )}
          </div>
        </div>

        <Descriptions column={1} className="detail-info">
          <Descriptions.Item label="信用代码">{customer.credit_code || '-'}</Descriptions.Item>
          <Descriptions.Item label="地址">{customer.address || '-'}</Descriptions.Item>
          <Descriptions.Item label="电话">
            {customer.phone ? (
              <a href={`tel:${customer.phone}`}>
                <PhoneOutlined /> {customer.phone}
              </a>
            ) : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {customer.email ? (
              <a href={`mailto:${customer.email}`}>
                <MailOutlined /> {customer.email}
              </a>
            ) : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="注册资金">
            {customer.registered_capital ? `${customer.registered_capital} 万元` : '-'}
          </Descriptions.Item>
          {customer.description && (
            <Descriptions.Item label="描述">{customer.description}</Descriptions.Item>
          )}
          {customer.tags && (
            <Descriptions.Item label="标签">
              {customer.tags.split(',').map((tag, index) => (
                tag.trim() && <Tag key={index} color="blue">{tag.trim()}</Tag>
              ))}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="创建人">{customer.created_by === 1 ? 'admin' : '未知'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{customer.created_at}</Descriptions.Item>
        </Descriptions>

        <div className="action-buttons">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => navigate(`/customers/${id}/edit`)}
          >
            编辑
          </Button>
          <Button 
            type="default"
            icon={<PlusOutlined />}
            onClick={() => navigate(`/opportunities/create?customer_id=${id}`)}
          >
            添加商机
          </Button>
          <Button 
            type={isBlacklisted ? "danger" : "default"}
            icon={isBlacklisted ? <CheckCircleOutlined /> : <WarningOutlined />}
            onClick={handleToggleBlacklist}
          >
            {isBlacklisted ? '移出黑名单' : '拉入黑名单'}
          </Button>
        </div>
      </Card>

      <div className="section-header">
        <div className="section-title">
          联系人 ({customer.contacts?.length || 0})
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAddContact}
          size="small"
        >
          添加
        </Button>
      </div>

      {customer.contacts && customer.contacts.length > 0 ? (
        <List
          dataSource={customer.contacts}
          renderItem={contact => (
            <Card className="contact-card">
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={<div>{contact.name} <span className="contact-position">{contact.position || '-'}</span></div>}
                  description={
                    <div>
                      <div>{contact.department || '-'}</div>
                      {contact.phone && (
                        <Button 
                          type="link" 
                          size="small"
                          href={`tel:${contact.phone}`}
                          icon={<PhoneOutlined />}
                        >
                          {contact.phone}
                        </Button>
                      )}
                      {contact.email && (
                        <Button 
                          type="link" 
                          size="small"
                          href={`mailto:${contact.email}`}
                          icon={<MailOutlined />}
                        >
                          发送邮件
                        </Button>
                      )}
                    </div>
                  }
                />
                {contact.relationship && (
                  <Tag color="green">{contact.relationship}</Tag>
                )}
              </List.Item>
            </Card>
          )}
        />
      ) : (
        <Card className="empty-card">
          <div className="empty-text">暂无联系人</div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAddContact}
            style={{ marginTop: 16 }}
          >
            添加联系人
          </Button>
        </Card>
      )}

      <div className="section-header">
        <div className="section-title">
          商机 ({customer.opportunities?.length || 0})
        </div>
      </div>

      {customer.opportunities && customer.opportunities.length > 0 ? (
        customer.opportunities.map(opp => {
          // 找到完整的商机信息
          const fullOpportunity = mockOpportunities.find(o => o.id === opp.id);
          return (
            <Card 
              key={opp.id} 
              className="opportunity-card"
              onClick={() => navigate(`/opportunities/${opp.id}`)}
            >
              <div className="opp-header">
                <Tag color={opp.status === '跟进中' ? 'blue' : opp.status === '签约' ? 'green' : 'default'}>
                  {opp.status}
                </Tag>
              </div>
              <div className="opp-description">{opp.description || '无描述'}</div>
              <div className="opp-time">创建于 {opp.created_at}</div>
            </Card>
          );
        })
      ) : (
        <Card className="empty-card">
          <div className="empty-text">暂无商机</div>
        </Card>
      )}

      {/* 添加联系人模态框 */}
      <Modal
        title="添加联系人"
        open={isAddContactVisible}
        onOk={contactForm.submit}
        onCancel={handleAddContactCancel}
        width={500}
      >
        <Form
          form={contactForm}
          layout="vertical"
          onFinish={handleAddContactSubmit}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="position"
            label="职位"
          >
            <Input placeholder="请输入职位" />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
          >
            <Input placeholder="请输入部门" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
          >
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="relationship"
            label="关系类型"
            rules={[{ required: true, message: '请选择关系类型' }]}
          >
            <Select placeholder="请选择关系类型">
              <Select.Option value="认识">认识</Select.Option>
              <Select.Option value="可约局">可约局</Select.Option>
              <Select.Option value="可支持">可支持</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerDetail;

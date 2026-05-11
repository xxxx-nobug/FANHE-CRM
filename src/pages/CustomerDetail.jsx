import React, { useState } from 'react';
import { Card, Descriptions, Tag, Button, List, Avatar, message, Modal, Form, Input, Select } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined, EditOutlined, PlusOutlined, UserOutlined, WarningOutlined, CheckCircleOutlined, MessageOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerIndustryTags, getCustomerLocationLabel, getCustomTags } from '../constants/customerDictionaries';
import './CustomerDetail.css';

const backgroundTypeOptions = [
  { value: 'lawsuit', label: '官司诉讼', color: 'red' },
  { value: 'arrears', label: '赖账欠款', color: 'volcano' },
  { value: 'dispute', label: '经济纠纷', color: 'orange' },
  { value: 'credit', label: '信用风险', color: 'gold' },
  { value: 'relationship', label: '合作关系', color: 'blue' },
  { value: 'other', label: '其他补充', color: 'default' }
];

const getBackgroundType = (type) => (
  backgroundTypeOptions.find(option => option.value === type) || backgroundTypeOptions[backgroundTypeOptions.length - 1]
);

const formatNow = () => {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const CustomerDetail = ({ user, customers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(customers.find(c => c.id === parseInt(id)));
  const [isAddContactVisible, setIsAddContactVisible] = useState(false);
  const [isBackgroundModalVisible, setIsBackgroundModalVisible] = useState(false);
  const [contactForm] = Form.useForm();
  const [backgroundForm] = Form.useForm();
  
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

  const handleAddBackgroundNote = (values) => {
    const newNote = {
      id: Date.now(),
      type: values.type,
      content: values.content.trim(),
      created_by: user?.id,
      created_by_name: user?.username || '当前用户',
      created_at: formatNow()
    };

    setCustomer({
      ...customer,
      background_notes: [...(customer.background_notes || []), newNote]
    });
    setIsBackgroundModalVisible(false);
    backgroundForm.resetFields();
    message.success('背景信息已补充');
  };

  const handleBackgroundCancel = () => {
    setIsBackgroundModalVisible(false);
    backgroundForm.resetFields();
  };

  if (!customer) {
    return <div>客户不存在</div>;
  }

  const uniqueOpportunities = Array.from(
    new Map((customer.opportunities || []).map(opportunity => [opportunity.id, opportunity])).values()
  );

  return (
    <div className="customer-detail">
      <Card className="detail-card">
        <div className="detail-header">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/customers')}
          >
            返回
          </Button>
          <h2>{customer.company_name}</h2>
          <div className="location">
            <EnvironmentOutlined /> {getCustomerLocationLabel(customer)}
            {customer.tags && customer.tags.includes('黑名单') && (
              <Tag color="red" style={{ marginLeft: 8 }}>黑名单</Tag>
            )}
          </div>
        </div>

        <Descriptions column={1} className="detail-info">
          <Descriptions.Item label="信用代码">{customer.credit_code || '-'}</Descriptions.Item>
          <Descriptions.Item label="省市/国家">{getCustomerLocationLabel(customer)}</Descriptions.Item>
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
          <Descriptions.Item label="行业标签">
            {getCustomerIndustryTags(customer).length > 0 ? (
              getCustomerIndustryTags(customer).map((tag) => (
                <Tag key={tag} color="green">{tag}</Tag>
              ))
            ) : '-'}
          </Descriptions.Item>
          {getCustomTags(customer).length > 0 && (
            <Descriptions.Item label="其他标签">
              {getCustomTags(customer).map((tag, index) => (
                tag.trim() && (
                  <Tag key={index} color={tag.trim() === '黑名单' ? 'red' : 'blue'}>
                    {tag.trim()}
                  </Tag>
                )
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
            添加需求
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
          rowKey="id"
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
          需求 ({uniqueOpportunities.length})
        </div>
      </div>

      {uniqueOpportunities.length > 0 ? (
        uniqueOpportunities.map(opp => {
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
          <div className="empty-text">暂无需求</div>
        </Card>
      )}

      <div className="section-header">
        <div className="section-title">
          背景信息补充 ({customer.background_notes?.length || 0})
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsBackgroundModalVisible(true)}
          size="small"
        >
          添加
        </Button>
      </div>

      <Card className="background-card">
        {customer.background_notes && customer.background_notes.length > 0 ? (
          <List
            dataSource={[...customer.background_notes].sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))}
            rowKey="id"
            renderItem={note => {
              const typeConfig = getBackgroundType(note.type);
              return (
                <List.Item className="background-item">
                  <List.Item.Meta
                    avatar={<Avatar icon={<MessageOutlined />} />}
                    title={
                      <div className="background-meta">
                        <Tag color={typeConfig.color}>{typeConfig.label}</Tag>
                        <span className="background-author">{note.created_by_name || '未知用户'}</span>
                        <span className="background-time">{note.created_at}</span>
                      </div>
                    }
                    description={<div className="background-content">{note.content}</div>}
                  />
                </List.Item>
              );
            }}
          />
        ) : (
          <div className="empty-text background-empty">暂无背景信息补充</div>
        )}
      </Card>

      <Modal
        title="添加背景信息"
        open={isBackgroundModalVisible}
        onOk={backgroundForm.submit}
        onCancel={handleBackgroundCancel}
        width={500}
        okText="添加"
        cancelText="取消"
      >
        <Form
          form={backgroundForm}
          layout="vertical"
          onFinish={handleAddBackgroundNote}
          initialValues={{ type: 'other' }}
        >
          <Form.Item
            name="type"
            label="信息类型"
            rules={[{ required: true, message: '请选择信息类型' }]}
          >
            <Select placeholder="请选择信息类型">
              {backgroundTypeOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="补充内容"
            rules={[
              { required: true, message: '请输入补充内容' },
              { whitespace: true, message: '请输入有效内容' }
            ]}
          >
            <Input.TextArea
              rows={4}
              maxLength={500}
              showCount
              placeholder="补充客户背景，例如是否存在官司、赖账、经济纠纷、合作风险或其他关键信息"
            />
          </Form.Item>
        </Form>
      </Modal>

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

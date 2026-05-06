import React, { useState, useRef } from 'react';
import { Card, Button, Badge, List, Avatar, Tag, Spin } from 'antd';
import { ArrowLeftOutlined, PhoneOutlined, MailOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockCustomers } from '../mock/data';
import './ContactReport.css';

const ContactReport = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [displayCount, setDisplayCount] = useState(5);

  // 分析相同联系方式的联系人
  const phoneGroups = {};
  const emailGroups = {};

  mockCustomers.forEach(customer => {
    if (customer.contacts) {
      customer.contacts.forEach(contact => {
        if (contact.phone) {
          if (!phoneGroups[contact.phone]) {
            phoneGroups[contact.phone] = [];
          }
          phoneGroups[contact.phone].push({
            name: contact.name,
            position: contact.position || '-',
            customer_name: customer.company_name,
            customer_id: customer.id,
            created_at: customer.created_at
          });
        }
        
        if (contact.email) {
          if (!emailGroups[contact.email]) {
            emailGroups[contact.email] = [];
          }
          emailGroups[contact.email].push({
            name: contact.name,
            position: contact.position || '-',
            customer_name: customer.company_name,
            customer_id: customer.id,
            created_at: customer.created_at
          });
        }
      });
    }
  });

  const duplicatePhoneGroups = Object.entries(phoneGroups)
    .filter(([_, contacts]) => contacts.length > 1)
    .map(([phone, contacts]) => ({
      type: 'phone',
      value: phone,
      contacts: contacts,
      count: contacts.length
    }));

  const duplicateEmailGroups = Object.entries(emailGroups)
    .filter(([_, contacts]) => contacts.length > 1)
    .map(([email, contacts]) => ({
      type: 'email',
      value: email,
      contacts: contacts,
      count: contacts.length
    }));

  const allGroups = [
    ...duplicatePhoneGroups,
    ...duplicateEmailGroups
  ].sort((a, b) => b.count - a.count);

  const displayGroups = allGroups.slice(0, displayCount);
  const duplicateContactTotal = allGroups.reduce((sum, group) => sum + group.count, 0);

  // 懒加载：监听滚动事件
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    if (scrollHeight - (scrollTop + clientHeight) < 100 && displayCount < allGroups.length) {
      setDisplayCount(prev => Math.min(prev + 3, allGroups.length));
    }
  };

  return (
    <div className="contact-report" ref={containerRef} onScroll={handleScroll}>
      <div className="report-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/reports')}
        >
          返回
        </Button>
        <h2>相同联系方式分析</h2>
      </div>

      <div className="report-description">
        聚焦可能重复或共享的联系方式，便于排查客户归属和联系人准确性。
      </div>

      <div className="summary-grid">
        <Card className="summary-card primary">
          <span>重复组数</span>
          <strong>{allGroups.length}</strong>
        </Card>
        <Card className="summary-card">
          <span>电话组</span>
          <strong>{duplicatePhoneGroups.length}</strong>
        </Card>
        <Card className="summary-card">
          <span>邮箱组</span>
          <strong>{duplicateEmailGroups.length}</strong>
        </Card>
        <Card className="summary-card">
          <span>涉及联系人</span>
          <strong>{duplicateContactTotal}</strong>
        </Card>
      </div>

      <div className="groups-container">
        {displayGroups.map((group, index) => (
          <Card key={`${group.type}-${group.value}`} className="group-card">
            <div className="group-title">
              <div className="group-title-main">
                {group.type === 'phone' ? (
                  <PhoneOutlined className="type-icon phone-icon" />
                ) : (
                  <MailOutlined className="type-icon email-icon" />
                )}
                <div>
                  <span className="contact-value">{group.value}</span>
                  <p>{group.type === 'phone' ? '相同电话号码' : '相同邮箱地址'}</p>
                </div>
              </div>
              <Badge
                count={group.count}
                style={{ backgroundColor: group.type === 'phone' ? '#2f6fa8' : '#16816d' }}
              />
            </div>

            <List
              dataSource={group.contacts}
              renderItem={(item, idx) => (
                <List.Item
                  key={idx}
                  className="contact-item"
                  onClick={() => navigate(`/customers/${item.customer_id}`)}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} size="small" />}
                    title={
                      <div className="contact-name-row">
                        <span className="contact-name">{item.name}</span>
                        {item.position !== '-' && (
                          <Tag color="blue" className="position-tag">{item.position}</Tag>
                        )}
                      </div>
                    }
                    description={
                      <div className="contact-desc">
                        <div className="customer-info">
                          <span className="customer-name" title={item.customer_name}>
                            {item.customer_name}
                          </span>
                        </div>
                        <div className="meta-info">
                          <ClockCircleOutlined /> {item.created_at?.substring(0, 10) || '-'}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
              size="small"
            />
          </Card>
        ))}
      </div>

      {allGroups.length === 0 && (
        <div className="empty-state">
          <p>暂无相同联系方式的联系人</p>
        </div>
      )}

      {displayCount < allGroups.length && (
        <div className="loading-more">
          <Spin size="small" />
          <span>向下滚动加载更多</span>
        </div>
      )}

      {displayCount >= allGroups.length && allGroups.length > 5 && (
        <div className="load-complete">
          <span>— 已全部加载 —</span>
        </div>
      )}
    </div>
  );
};

export default ContactReport;

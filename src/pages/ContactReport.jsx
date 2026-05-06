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
      <Card className="report-card">
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
          查找有相同电话或邮箱的联系人
        </div>

        <div className="group-stats">
          <Badge count={duplicatePhoneGroups.length} style={{ backgroundColor: '#2f6fa8' }} />
          <span className="group-label">相同电话号码组</span>
          <Badge count={duplicateEmailGroups.length} style={{ backgroundColor: '#16816d' }} />
          <span className="group-label">相同邮箱地址组</span>
        </div>

        <div className="groups-container">
          {displayGroups.map((group, index) => (
            <Card key={index} className="group-card">
              <div className="group-title">
                {group.type === 'phone' ? (
                  <PhoneOutlined className="type-icon phone-icon" />
                ) : (
                  <MailOutlined className="type-icon email-icon" />
                )}
                <span className="contact-value">{group.value}</span>
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
      </Card>
    </div>
  );
};

export default ContactReport;

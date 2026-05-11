import React from 'react';
import { Card, Tag } from 'antd';
import {
  ArrowRightOutlined,
  BarChartOutlined,
  ContactsOutlined,
  DatabaseOutlined,
  FileSearchOutlined,
  RiseOutlined,
  TeamOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockCustomers, mockOpportunities, mockUsers } from '../mock/data';
import './ReportDashboard.css';

const ReportDashboard = () => {
  const navigate = useNavigate();

  const customerOpportunityCount = {};
  mockCustomers.forEach(customer => {
    customerOpportunityCount[customer.id] = {
      id: customer.id,
      company_name: customer.company_name,
      count: 0
    };
  });

  mockOpportunities.forEach(opportunity => {
    if (opportunity.customer_id && customerOpportunityCount[opportunity.customer_id]) {
      customerOpportunityCount[opportunity.customer_id].count += 1;
    }
  });

  const opportunityRanking = Object.values(customerOpportunityCount)
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count);

  const inputStats = {};
  mockUsers.forEach(user => {
    inputStats[user.id] = {
      id: user.id,
      username: user.username,
      unit: user.unit,
      customerCount: 0,
      opportunityCount: 0
    };
  });

  mockCustomers.forEach(customer => {
    if (customer.created_by && inputStats[customer.created_by]) {
      inputStats[customer.created_by].customerCount += 1;
    }
  });

  mockOpportunities.forEach(opportunity => {
    if (opportunity.created_by && inputStats[opportunity.created_by]) {
      inputStats[opportunity.created_by].opportunityCount += 1;
    }
  });

  const inputRanking = Object.values(inputStats)
    .sort((a, b) => (b.customerCount + b.opportunityCount) - (a.customerCount + a.opportunityCount));

  const contactMap = {};
  mockCustomers.forEach(customer => {
    customer.contacts?.forEach(contact => {
      [
        { type: '电话', value: contact.phone },
        { type: '邮箱', value: contact.email }
      ].forEach(item => {
        if (!item.value) return;
        if (!contactMap[item.value]) {
          contactMap[item.value] = {
            type: item.type,
            value: item.value,
            contacts: []
          };
        }
        contactMap[item.value].contacts.push({
          customer_name: customer.company_name,
          contact_name: contact.name
        });
      });
    });
  });

  const duplicateContacts = Object.values(contactMap)
    .filter(item => item.contacts.length > 1)
    .sort((a, b) => b.contacts.length - a.contacts.length);

  const totalInputCount = mockCustomers.length + mockOpportunities.length;
  const activeInputUsers = inputRanking.filter(item => item.customerCount > 0 || item.opportunityCount > 0).length;

  const insightCards = [
    {
      key: 'opportunity',
      title: '需求统计',
      desc: '查看客户需求沉淀和重点客户排行',
      value: mockOpportunities.length,
      unit: '条需求',
      icon: <RiseOutlined />,
      tag: '客户维度',
      path: '/reports/opportunity'
    },
    {
      key: 'input',
      title: '录入统计',
      desc: '查看人员录入贡献和基础数据维护情况',
      value: totalInputCount,
      unit: '条录入',
      icon: <DatabaseOutlined />,
      tag: '人员维度',
      path: '/reports/input'
    },
    {
      key: 'contact',
      title: '相同联系方式分析',
      desc: '排查重复电话、邮箱和客户归属风险',
      value: duplicateContacts.length,
      unit: '组重复',
      icon: <ContactsOutlined />,
      tag: '数据质量',
      path: '/reports/contact'
    }
  ];

  return (
    <div className="report-dashboard">
      <section className="report-overview">
        <div>
          <h2>统计工作台</h2>
        </div>
        <BarChartOutlined />
      </section>

      <section className="report-summary-grid">
        <Card className="report-summary-card primary">
          <span>客户总数</span>
          <strong>{mockCustomers.length}</strong>
        </Card>
        <Card className="report-summary-card">
          <span>需求总数</span>
          <strong>{mockOpportunities.length}</strong>
        </Card>
        <Card className="report-summary-card">
          <span>活跃录入</span>
          <strong>{activeInputUsers}</strong>
        </Card>
        <Card className="report-summary-card">
          <span>重复组数</span>
          <strong>{duplicateContacts.length}</strong>
        </Card>
      </section>

      <section className="report-module-list">
        {insightCards.map(item => (
          <button
            key={item.key}
            type="button"
            className="report-module-card"
            onClick={() => navigate(item.path)}
          >
            <span className="module-icon">{item.icon}</span>
            <span className="module-main">
              <span className="module-title-row">
                <strong>{item.title}</strong>
                <Tag color="blue">{item.tag}</Tag>
              </span>
            </span>
            <span className="module-metric">
              <strong>{item.value}</strong>
              <em>{item.unit}</em>
            </span>
            <ArrowRightOutlined className="module-arrow" />
          </button>
        ))}
      </section>

      <section className="report-preview-section">
        <div className="preview-header">
          <div>
            <h3>重点关注</h3>
          </div>
        </div>

        <div className="preview-list">
          {opportunityRanking.slice(0, 2).map(item => (
            <button
              key={item.id}
              type="button"
              className="preview-row"
              onClick={() => navigate('/reports/opportunity')}
            >
              <TeamOutlined />
              <span>
                <strong>{item.company_name}</strong>
              </span>
              <Tag color="blue">{item.count} 条</Tag>
            </button>
          ))}

          {inputRanking.slice(0, 1).map(item => (
            <button
              key={item.id}
              type="button"
              className="preview-row"
              onClick={() => navigate('/reports/input')}
            >
              <UserSwitchOutlined />
              <span>
                <strong>{item.username}</strong>
              </span>
              <Tag color="green">{item.customerCount + item.opportunityCount} 条</Tag>
            </button>
          ))}

          {duplicateContacts.slice(0, 1).map(item => (
            <button
              key={item.value}
              type="button"
              className="preview-row"
              onClick={() => navigate('/reports/contact')}
            >
              <FileSearchOutlined />
              <span>
                <strong>{item.value}</strong>
              </span>
              <Tag color="red">{item.contacts.length} 人</Tag>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReportDashboard;

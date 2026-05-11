import React from 'react';
import { Card, Progress, Tag } from 'antd';
import {
  ArrowRightOutlined,
  ContactsOutlined,
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
  const customersWithOpportunities = opportunityRanking.length;
  const demandCoverage = mockCustomers.length
    ? Math.round((customersWithOpportunities / mockCustomers.length) * 100)
    : 0;
  const signedCount = mockOpportunities.filter(item => item.status === '签约').length;
  const inProgressCount = mockOpportunities.filter(item => item.status === '跟进中').length;
  const maxStageCount = Math.max(signedCount, inProgressCount, 1);
  const topInputUsers = inputRanking
    .filter(item => item.customerCount > 0 || item.opportunityCount > 0)
    .slice(0, 3);
  const maxInputCount = Math.max(...topInputUsers.map(item => item.customerCount + item.opportunityCount), 1);
  const totalDuplicateContacts = duplicateContacts.reduce((sum, item) => sum + item.contacts.length, 0);

  return (
    <div className="report-dashboard">
      <section className="report-page-hero">
        <div className="report-brand">
          <span className="report-brand-mark">泛</span>
          <span>
            <strong>泛和客商平台</strong>
            <em>统计工作台</em>
          </span>
        </div>
        <div className="report-panel-spacer" />
      </section>

      <section className="report-kpi-panel">
        <button type="button" className="kpi-primary-card" onClick={() => navigate('/reports/opportunity')}>
          <span>需求总数</span>
          <strong>{mockOpportunities.length}</strong>
          <em>{customersWithOpportunities} 个客户已有需求</em>
        </button>
        <div className="kpi-side-grid">
          <button type="button" className="kpi-mini-card" onClick={() => navigate('/customers')}>
            <span>客户总数</span>
            <strong>{mockCustomers.length}</strong>
          </button>
          <button type="button" className="kpi-mini-card" onClick={() => navigate('/reports/input')}>
            <span>活跃录入</span>
            <strong>{activeInputUsers}</strong>
          </button>
        </div>
      </section>

      <Card className="report-section-card">
        <div className="report-section-header">
          <div>
            <RiseOutlined />
            <strong>需求阶段</strong>
          </div>
          <button type="button" onClick={() => navigate('/reports/opportunity')}>明细 <ArrowRightOutlined /></button>
        </div>
        <div className="stage-list">
          <button
            type="button"
            className="stage-row"
            onClick={() => navigate('/reports/opportunity?status=跟进中')}
          >
            <span className="stage-label">跟进中</span>
            <span className="stage-bar">
              <Progress
                percent={Math.round((inProgressCount / maxStageCount) * 100)}
                showInfo={false}
                strokeColor="#2f6fa8"
                trailColor="#e8f1f8"
              />
            </span>
            <strong>{inProgressCount}</strong>
          </button>
          {signedCount > 0 && (
            <button
              type="button"
              className="stage-row"
              onClick={() => navigate('/reports/opportunity?status=签约')}
            >
              <span className="stage-label">已签约</span>
              <span className="stage-bar">
                <Progress
                  percent={Math.round((signedCount / maxStageCount) * 100)}
                  showInfo={false}
                  strokeColor="#18a085"
                  trailColor="#e8f1f8"
                />
              </span>
              <strong>{signedCount}</strong>
            </button>
          )}
        </div>
        <div className="coverage-row">
          <span>需求客户覆盖率</span>
          <strong>{demandCoverage}%</strong>
        </div>
      </Card>

      {opportunityRanking.length > 0 && (
        <Card className="report-section-card">
          <div className="report-section-header">
            <div>
              <TeamOutlined />
              <strong>重点客户需求</strong>
            </div>
            <button type="button" onClick={() => navigate('/reports/opportunity')}>排行 <ArrowRightOutlined /></button>
          </div>
          <div className="ranking-list">
            {opportunityRanking.slice(0, 4).map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="ranking-row"
                onClick={() => navigate('/reports/opportunity')}
              >
                <span className="rank-index">{index + 1}</span>
                <span className="rank-name">{item.company_name}</span>
                <Tag color="blue">{item.count} 条</Tag>
              </button>
            ))}
          </div>
        </Card>
      )}

      {topInputUsers.length > 0 && (
        <Card className="report-section-card">
          <div className="report-section-header">
            <div>
              <UserSwitchOutlined />
              <strong>录入贡献</strong>
            </div>
            <button type="button" onClick={() => navigate('/reports/input')}>明细 <ArrowRightOutlined /></button>
          </div>
          <div className="input-list">
            {topInputUsers.map(item => {
              const count = item.customerCount + item.opportunityCount;
              return (
                <button
                  key={item.id}
                  type="button"
                  className="input-row"
                  onClick={() => navigate('/reports/input')}
                >
                  <span className="input-user">
                    <strong>{item.username}</strong>
                    <em>{item.unit}</em>
                  </span>
                  <span className="input-progress">
                    <Progress
                      percent={Math.round((count / maxInputCount) * 100)}
                      showInfo={false}
                      strokeColor="#2f6fa8"
                      trailColor="#e8f1f8"
                    />
                  </span>
                  <Tag color="blue">{count} 条</Tag>
                </button>
              );
            })}
          </div>
          <div className="input-total-row">
            <span>累计录入</span>
            <strong>{totalInputCount} 条</strong>
          </div>
        </Card>
      )}

      {duplicateContacts.length > 0 && (
        <Card className="report-section-card warning-card">
          <div className="report-section-header">
            <div>
              <FileSearchOutlined />
              <strong>数据质量预警</strong>
            </div>
            <button type="button" onClick={() => navigate('/reports/contact')}>处理 <ArrowRightOutlined /></button>
          </div>
          <button type="button" className="quality-summary" onClick={() => navigate('/reports/contact')}>
            <span className="quality-icon"><ContactsOutlined /></span>
            <span>
              <strong>{duplicateContacts.length} 组重复联系方式</strong>
              <em>涉及 {totalDuplicateContacts} 条联系人记录</em>
            </span>
            <ArrowRightOutlined />
          </button>
          <div className="quality-list">
            {duplicateContacts.slice(0, 2).map(item => (
              <button
                key={item.value}
                type="button"
                className="quality-row"
                onClick={() => navigate('/reports/contact')}
              >
                <span>{item.value}</span>
                <Tag color="red">{item.contacts.length} 人</Tag>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReportDashboard;

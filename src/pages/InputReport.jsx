import React, { useState, useRef } from 'react';
import { Card, Spin, Tag } from 'antd';
import { UserOutlined, TeamOutlined, RiseOutlined, BankOutlined } from '@ant-design/icons';
import { mockCustomers, mockOpportunities, mockUsers } from '../mock/data';
import './InputReport.css';

const InputReport = () => {
  const containerRef = useRef(null);
  const [displayCount, setDisplayCount] = useState(10);
  const [activeFilter, setActiveFilter] = useState('active');

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
      inputStats[customer.created_by].customerCount++;
    }
  });
  
  mockOpportunities.forEach(opp => {
    if (opp.created_by && inputStats[opp.created_by]) {
      inputStats[opp.created_by].opportunityCount++;
    }
  });

  const inputReportData = Object.values(inputStats)
    .sort((a, b) => b.customerCount - a.customerCount)
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }));

  const totalCustomerInput = inputReportData.reduce((sum, item) => sum + item.customerCount, 0);
  const totalOpportunityInput = inputReportData.reduce((sum, item) => sum + item.opportunityCount, 0);
  const activeInputUsers = inputReportData.filter(item => item.customerCount > 0 || item.opportunityCount > 0).length;
  const topInputUser = inputReportData.find(item => item.customerCount > 0 || item.opportunityCount > 0);
  const filteredData = inputReportData.filter(item => {
    if (activeFilter === 'customers') return item.customerCount > 0;
    if (activeFilter === 'opportunities') return item.opportunityCount > 0;
    if (activeFilter === 'top') return item.id === topInputUser?.id;
    return item.customerCount > 0 || item.opportunityCount > 0;
  });
  const displayData = filteredData.slice(0, displayCount);

  const metricFilters = [
    { key: 'customers', label: '客户录入', value: totalCustomerInput },
    { key: 'opportunities', label: '需求录入', value: totalOpportunityInput },
    { key: 'active', label: '活跃人员', value: activeInputUsers },
    { key: 'top', label: '最高录入', value: topInputUser?.customerCount || 0 }
  ];

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    setDisplayCount(10);
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    if (scrollHeight - (scrollTop + clientHeight) < 100 && displayCount < filteredData.length) {
      setDisplayCount(prev => Math.min(prev + 5, filteredData.length));
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#c24b44';
    if (rank === 2) return '#b76e16';
    if (rank === 3) return '#d48925';
    return '#2f6fa8';
  };

  return (
    <div className="input-report" ref={containerRef} onScroll={handleScroll}>
      <div className="report-header">
        <h2>录入统计</h2>
      </div>

      <div className="report-description">
        关注录入人员的客户与需求沉淀，用于查看基础数据维护情况。
      </div>

      <div className="summary-grid">
        {metricFilters.map(metric => (
          <button
            key={metric.key}
            type="button"
            className={`summary-card metric-filter ${activeFilter === metric.key ? 'active' : ''}`}
            onClick={() => handleFilterChange(metric.key)}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </button>
        ))}
      </div>

      {displayData.length > 0 ? (
        <>
          {displayData.map(item => (
            <Card key={item.id} className="stat-card report-list-card" hoverable>
              <div className="report-card-main">
                <div className="rank-badge" style={{ color: getRankColor(item.rank), borderColor: getRankColor(item.rank) }}>
                  {item.rank}
                </div>
                <div className="user-info">
                  <div className="user-name">
                    <UserOutlined /> {item.username}
                  </div>
                  <div className="user-unit">
                    <BankOutlined /> {item.unit}
                  </div>
                </div>
                <div className="metric-block">
                  <strong>{item.customerCount}</strong>
                  <span>客户</span>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-item">
                  <TeamOutlined className="stat-icon" />
                  <span className="stat-label">客户数</span>
                  <Tag color={item.customerCount > 0 ? 'blue' : 'default'} className="stat-tag">
                    {item.customerCount}
                  </Tag>
                </div>
                <div className="stat-item">
                  <RiseOutlined className="stat-icon" />
                  <span className="stat-label">需求数</span>
                  <Tag color={item.opportunityCount > 0 ? 'green' : 'default'} className="stat-tag">
                    {item.opportunityCount}
                  </Tag>
                </div>
              </div>
            </Card>
          ))}

          {displayCount < filteredData.length && (
            <div className="loading-more">
              <Spin size="small" />
              <span>向下滚动加载更多</span>
            </div>
          )}

          {displayCount >= filteredData.length && filteredData.length > 10 && (
            <div className="load-complete">
              <span>— 已全部加载 —</span>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p>暂无录入统计数据</p>
        </div>
      )}
    </div>
  );
};

export default InputReport;

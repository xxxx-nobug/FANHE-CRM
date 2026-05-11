import React, { useState, useRef } from 'react';
import { Card, Button, Spin, Tag } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined, BarChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockCustomers, mockOpportunities } from '../mock/data';
import { getCustomerLocationLabel } from '../constants/customerDictionaries';
import './OpportunityReport.css';

const OpportunityReport = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [displayCount, setDisplayCount] = useState(10);
  const [activeFilter, setActiveFilter] = useState('all');

  const customerOpportunityCount = {};
  
  customerOpportunityCount[0] = {
    id: 0,
    company_name: '尚未建档的客户',
    count: 0
  };
  
  mockCustomers.forEach(customer => {
    customerOpportunityCount[customer.id] = {
      id: customer.id,
      company_name: customer.company_name,
      count: 0
    };
  });
  
  mockOpportunities.forEach(opp => {
    const customerId = opp.customer_id || 0;
    if (customerOpportunityCount[customerId]) {
      customerOpportunityCount[customerId].count++;
    }
  });

  const customerOpportunityData = Object.values(customerOpportunityCount)
    .sort((a, b) => b.count - a.count)
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }));

  const totalOpportunityCount = mockOpportunities.length;
  const customerWithOpportunityCount = customerOpportunityData.filter(item => item.id !== 0 && item.count > 0).length;
  const unfiledOpportunityCount = customerOpportunityData.find(item => item.id === 0)?.count || 0;
  const topCustomer = customerOpportunityData.find(item => item.id !== 0 && item.count > 0);
  const filteredData = customerOpportunityData.filter(item => {
    if (activeFilter === 'withOpportunity') return item.id !== 0 && item.count > 0;
    if (activeFilter === 'unfiled') return item.id === 0 && item.count > 0;
    if (activeFilter === 'top') return item.id === topCustomer?.id;
    return true;
  });
  const displayData = filteredData.slice(0, displayCount);

  const metricFilters = [
    { key: 'all', label: '全部需求', value: totalOpportunityCount },
    { key: 'withOpportunity', label: '有需求客户', value: customerWithOpportunityCount },
    { key: 'unfiled', label: '未建档需求', value: unfiledOpportunityCount },
    { key: 'top', label: '最高客户', value: topCustomer?.count || 0 }
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

  const handleCustomerClick = (customerId) => {
    if (customerId !== 0) {
      navigate(`/customers/${customerId}`);
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#c24b44';
    if (rank === 2) return '#b76e16';
    if (rank === 3) return '#d48925';
    return '#2f6fa8';
  };

  return (
    <div className="opportunity-report" ref={containerRef} onScroll={handleScroll}>
      <div className="report-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/reports')}
        >
          返回
        </Button>
        <h2>需求统计</h2>
      </div>

      <div className="report-description">
        聚焦客户维度的需求沉淀情况，用于判断哪些客户需要优先维护。
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
            <Card 
              key={item.id} 
              className="stat-card report-list-card" 
              hoverable
              onClick={() => handleCustomerClick(item.id)}
            >
              <div className="report-card-main">
                <div className="rank-badge" style={{ color: getRankColor(item.rank), borderColor: getRankColor(item.rank) }}>
                  {item.rank}
                </div>
                <div className="customer-info">
                  <div className={`company-name ${item.id === 0 ? 'no-link' : ''}`}>
                    {item.company_name}
                  </div>
                  {item.id !== 0 && (
                    <div className="region-text">
                      <EnvironmentOutlined /> {getCustomerLocationLabel(mockCustomers.find(c => c.id === item.id))}
                    </div>
                  )}
                </div>
                <div className="metric-block">
                  <strong>{item.count}</strong>
                  <span>需求</span>
                </div>
              </div>

              <div className="report-card-footer">
                <span><BarChartOutlined /> 客户需求排行</span>
                <Tag color={item.count > 0 ? 'blue' : 'default'} className="stat-tag">
                  {item.count > 0 ? '有需求' : '暂无需求'}
                </Tag>
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
          <p>暂无需求统计数据</p>
        </div>
      )}
    </div>
  );
};

export default OpportunityReport;

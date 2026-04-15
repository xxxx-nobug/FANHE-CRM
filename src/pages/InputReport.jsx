import React, { useState, useRef } from 'react';
import { Card, Button, Spin, Tag } from 'antd';
import { ArrowLeftOutlined, UserOutlined, TeamOutlined, RiseOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockCustomers, mockOpportunities, mockUsers } from '../mock/data';
import './InputReport.css';

const InputReport = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [displayCount, setDisplayCount] = useState(10);

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

  const displayData = inputReportData.slice(0, displayCount);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    if (scrollHeight - (scrollTop + clientHeight) < 100 && displayCount < inputReportData.length) {
      setDisplayCount(prev => Math.min(prev + 5, inputReportData.length));
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#f5222d';
    if (rank === 2) return '#fa8c16';
    if (rank === 3) return '#faad14';
    return '#1890ff';
  };

  return (
    <div className="input-report" ref={containerRef} onScroll={handleScroll}>
      <div className="report-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/reports')}
        >
          返回
        </Button>
        <h2>录入统计报表</h2>
      </div>

      <div className="report-description">
        按录入人统计的客户录入情况
      </div>

      {displayData.length > 0 ? (
        <>
          {displayData.map(item => (
            <Card key={item.id} className="stat-card" hoverable>
              <div className="card-header">
                <div className="rank-badge" style={{ color: getRankColor(item.rank), borderColor: getRankColor(item.rank) }}>
                  #{item.rank}
                </div>
                <div className="user-info">
                  <div className="user-name">
                    <UserOutlined /> {item.username}
                  </div>
                  <div className="user-unit">
                    <BankOutlined /> {item.unit}
                  </div>
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
                  <span className="stat-label">商机数</span>
                  <Tag color={item.opportunityCount > 0 ? 'green' : 'default'} className="stat-tag">
                    {item.opportunityCount}
                  </Tag>
                </div>
              </div>
            </Card>
          ))}

          {displayCount < inputReportData.length && (
            <div className="loading-more">
              <Spin size="small" />
              <span>向下滚动加载更多</span>
            </div>
          )}

          {displayCount >= inputReportData.length && inputReportData.length > 10 && (
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

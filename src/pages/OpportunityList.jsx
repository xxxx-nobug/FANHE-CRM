import React, { useState, useRef } from 'react';
import { Card, Button, Empty, Input, Spin } from 'antd';
import { SearchOutlined, UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockOpportunities, mockUsers } from '../mock/data';
import './OpportunityList.css';

const { Search } = Input;

const OpportunityList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const containerRef = useRef(null);
  const [displayCount, setDisplayCount] = useState(5);

  const getUserName = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.username : '未知';
  };

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = !searchText || 
                         (opp.customer && opp.customer.company_name.includes(searchText)) ||
                         (opp.description && opp.description.includes(searchText));
    return matchesSearch;
  });

  // 懒加载：监听滚动事件
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    // 当滚动到距离底部 100px 时触发加载
    if (scrollHeight - (scrollTop + clientHeight) < 100 && displayCount < filteredOpportunities.length) {
      setDisplayCount(prev => Math.min(prev + 3, filteredOpportunities.length));
    }
  };

  // 重置显示数量当搜索条件变化时
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setDisplayCount(5);
  };

  const displayOpportunities = filteredOpportunities.slice(0, displayCount);

  return (
    <div className="opportunity-list" ref={containerRef} onScroll={handleScroll}>
      <div className="search-section">
        <Search
          placeholder="搜索客户名称或描述"
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
          allowClear
        />
      </div>

      {displayOpportunities.length > 0 ? (
        <>
          {displayOpportunities.map(opp => (
            <Card 
              key={opp.id} 
              className="opportunity-card"
              hoverable
              onClick={() => navigate(`/opportunities/${opp.id}`)}
            >
              <div className="card-content">
                <div className="card-header">
                  <div className="company-name">
                    {opp.customer ? opp.customer.company_name : '尚未建档的客户'}
                  </div>
                  <div className="action-buttons">
                    <Button 
                      type="link" 
                      size="small"
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/opportunities/${opp.id}/edit`);
                      }}
                    >
                      编辑
                    </Button>
                    <Button 
                      type="link" 
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={(e) => e.stopPropagation()}
                    >
                      删除
                    </Button>
                  </div>
                </div>
                
                <div className="description">
                  {opp.description || '无描述'}
                </div>

                <div className="meta-info">
                  <span><UserOutlined /> {getUserName(opp.updated_by)}</span>
                  <span>{opp.updated_at}</span>
                </div>
              </div>
            </Card>
          ))}

          {displayCount < filteredOpportunities.length && (
            <div className="loading-more">
              <Spin size="small" />
              <span>向下滚动加载更多</span>
            </div>
          )}

          {displayCount >= filteredOpportunities.length && filteredOpportunities.length > 5 && (
            <div className="load-complete">
              <span>— 已全部加载 —</span>
            </div>
          )}
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无商机数据"
          className="empty-state"
        >
          <Button 
            type="primary" 
            onClick={() => navigate('/opportunities/create')}
          >
            新建商机
          </Button>
        </Empty>
      )}
      
      <div 
        className="floating-add-button"
        onClick={() => navigate('/opportunities/create')}
      >
        <PlusOutlined />
      </div>
    </div>
  );
};

export default OpportunityList;

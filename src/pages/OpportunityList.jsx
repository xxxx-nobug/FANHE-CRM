import React, { useState, useRef } from 'react';
import { Card, Button, Empty, Input, Spin, Tag } from 'antd';
import { UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined, RiseOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockOpportunities, mockUsers } from '../mock/data';
import { addSearchHistory, getSearchHistory } from '../utils/searchHistory';
import './OpportunityList.css';

const { Search } = Input;
const OPPORTUNITY_SEARCH_HISTORY_KEY = 'crm_opportunity_search_history';

const OpportunityList = ({ user }) => {
  const navigate = useNavigate();
  const canDelete = user?.role === 'admin';
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => getSearchHistory(OPPORTUNITY_SEARCH_HISTORY_KEY));
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
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

  const handleSearchSubmit = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    setSearchText(trimmedValue);
    setSearchHistory(addSearchHistory(OPPORTUNITY_SEARCH_HISTORY_KEY, trimmedValue));
    setIsHistoryVisible(false);
    setDisplayCount(5);
  };

  const handleHistorySelect = (keyword) => {
    setSearchText(keyword);
    setIsHistoryVisible(false);
    setDisplayCount(5);
  };

  const displayOpportunities = filteredOpportunities.slice(0, displayCount);

  return (
    <div className="opportunity-list" ref={containerRef} onScroll={handleScroll}>
      <section className="opportunity-page-hero">
        <div className="opportunity-brand">
          <span className="opportunity-brand-mark">泛</span>
          <span>
            <strong>泛和客商平台</strong>
            <em>需求管理</em>
          </span>
        </div>
        <div className="opportunity-panel-spacer" />
      </section>

      <section className="opportunity-filter-panel">
        <div className="search-section">
          <Search
            placeholder="搜索客户名称或描述"
            value={searchText}
            onChange={handleSearchChange}
            onSearch={handleSearchSubmit}
            onFocus={() => setIsHistoryVisible(true)}
            onBlur={() => setTimeout(() => setIsHistoryVisible(false), 120)}
            className="search-input"
            allowClear
          />
          {isHistoryVisible && searchHistory.length > 0 && (
            <div className="search-history-panel" onMouseDown={(e) => e.preventDefault()}>
              <div className="search-history-title">最近搜索</div>
              {searchHistory.map(keyword => (
                <button
                  type="button"
                  key={keyword}
                  className="search-history-item"
                  onClick={() => handleHistorySelect(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

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
                  <Tag color={opp.status === '签约' ? 'green' : 'blue'}>{opp.status}</Tag>
                </div>
                
                <div className="description">
                  {opp.description || '无描述'}
                </div>

                <div className="meta-info">
                  <span><RiseOutlined /> {opp.probability || 0}%</span>
                  <span><UserOutlined /> {getUserName(opp.updated_by)}</span>
                  <span><CalendarOutlined /> {opp.updated_at?.substring(0, 10)}</span>
                </div>

                <div className="action-buttons">
                  <Button
                    type="primary"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/opportunities/${opp.id}/edit`);
                    }}
                  >
                    编辑
                  </Button>
                  {canDelete && (
                    <Button
                      type="default"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => e.stopPropagation()}
                    >
                      删除
                    </Button>
                  )}
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
          description="暂无需求数据"
          className="empty-state"
        >
          <Button 
            type="primary" 
            onClick={() => navigate('/opportunities/create')}
          >
            新建需求
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

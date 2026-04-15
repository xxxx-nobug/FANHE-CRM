import React, { useState, useRef } from 'react';
import { Card, Input, Tag, Button, Empty, Modal, Spin } from 'antd';
import { SearchOutlined, TeamOutlined, RiseOutlined, UserOutlined, EnvironmentOutlined, EditOutlined, PlusOutlined, PhoneOutlined, MailOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockCustomers } from '../mock/data';
import './CustomerList.css';

const { Search } = Input;

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const containerRef = useRef(null);
  const [displayCount, setDisplayCount] = useState(5);

  const regions = ['华北', '华东', '华南', '华中', '西北', '西南', '东北', '国外'];

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.company_name.includes(searchText) || 
                         (customer.address && customer.address.includes(searchText));
    const matchesRegion = !selectedRegion || customer.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  // 懒加载：监听滚动事件
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    // 当滚动到距离底部 100px 时触发加载
    if (scrollHeight - (scrollTop + clientHeight) < 100 && displayCount < filteredCustomers.length) {
      setDisplayCount(prev => Math.min(prev + 3, filteredCustomers.length));
    }
  };

  // 重置显示数量当筛选条件变化时
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setDisplayCount(5);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region === selectedRegion ? '' : region);
    setDisplayCount(5);
  };

  const displayCustomers = filteredCustomers.slice(0, displayCount);

  const handleCardClick = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  const handleEditClick = (e, customerId) => {
    e.stopPropagation();
    navigate(`/customers/${customerId}/edit`);
  };

  const handleAddOpportunity = (e, customerId) => {
    e.stopPropagation();
    navigate(`/opportunities/create?customer_id=${customerId}`);
  };

  const handleDeleteClick = (e, customer) => {
    e.stopPropagation();
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除客户 "${customer.company_name}" 吗？`,
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk() {
        Modal.success({
          title: '删除成功',
          content: `客户 "${customer.company_name}" 已被删除`
        });
      }
    });
  };

  return (
    <div className="customer-list" ref={containerRef} onScroll={handleScroll}>
      <div className="search-section">
        <Search
          placeholder="搜索公司名称或地址"
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
          allowClear
        />
      </div>

      <div className="filter-section">
        <Tag 
          color={!selectedRegion ? 'blue' : 'default'}
          className="filter-tag"
          onClick={() => handleRegionChange('')}
          style={{ cursor: 'pointer' }}
        >
          全部
        </Tag>
        {regions.map(region => (
          <Tag
            key={region}
            color={selectedRegion === region ? 'blue' : 'default'}
            className="filter-tag"
            onClick={() => handleRegionChange(region)}
            style={{ cursor: 'pointer' }}
          >
            {region}
          </Tag>
        ))}
      </div>

      {displayCustomers.length > 0 ? (
        <>
          {displayCustomers.map(customer => (
            <Card 
              key={customer.id} 
              className="customer-card"
              onClick={() => handleCardClick(customer.id)}
              hoverable
            >
              <div className="card-header">
                <div className="company-name">
                  {customer.company_name}
                  {customer.tags && customer.tags.includes('黑名单') && (
                    <Tag color="red" className="blacklist-tag">黑名单</Tag>
                  )}
                </div>
              </div>
              
              <div className="region-tag">
                <EnvironmentOutlined /> {customer.country || customer.region}
              </div>

              <div className="meta-info">
                <span><TeamOutlined /> {customer.contacts?.length || 0} 联系人</span>
                <span><RiseOutlined /> {customer.opportunities?.length || 0} 商机</span>
                <span><UserOutlined /> {customer.created_by === 1 ? 'admin' : '未知'}</span>
              </div>

              {customer.tags && (
                <div className="tags-section">
                  {customer.tags.split(',').slice(0, 3).map((tag, index) => {
                    const trimmedTag = tag.trim();
                    return trimmedTag && (
                      <Tag 
                        key={index} 
                        color={trimmedTag === '黑名单' ? 'red' : 'blue'}
                      >
                        {trimmedTag}
                      </Tag>
                    );
                  })}
                </div>
              )}

              {customer.contacts && customer.contacts.length > 0 && (
                <div className="contact-info">
                  <div className="contact-name">
                    <UserOutlined /> {customer.contacts[0].name}
                    {customer.contacts[0].position && <span className="contact-position">{customer.contacts[0].position}</span>}
                  </div>
                  <div className="contact-details">
                    {customer.contacts[0].phone && (
                      <span className="contact-item" onClick={(e) => e.stopPropagation()}>
                        <PhoneOutlined /> {customer.contacts[0].phone}
                      </span>
                    )}
                    {customer.contacts[0].email && (
                      <span className="contact-item" onClick={(e) => e.stopPropagation()}>
                        <MailOutlined /> {customer.contacts[0].email}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="action-buttons">
                <Button 
                  type="primary" 
                  size="small"
                  icon={<EditOutlined />}
                  onClick={(e) => handleEditClick(e, customer.id)}
                >
                  编辑
                </Button>
                <Button 
                  type="default" 
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={(e) => handleAddOpportunity(e, customer.id)}
                >
                  添加商机
                </Button>
                <Button 
                  type="default" 
                  size="small" 
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => handleDeleteClick(e, customer)}
                >
                  删除
                </Button>
              </div>
            </Card>
          ))}

          {displayCount < filteredCustomers.length && (
            <div className="loading-more">
              <Spin size="small" />
              <span>向下滚动加载更多</span>
            </div>
          )}

          {displayCount >= filteredCustomers.length && filteredCustomers.length > 5 && (
            <div className="load-complete">
              <span>— 已全部加载 —</span>
            </div>
          )}
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无客户数据"
          className="empty-state"
        >
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => navigate('/customers/create')}
          >
            新建客户
          </Button>
        </Empty>
      )}
      
      <div 
        className="floating-add-button"
        onClick={() => navigate('/customers/create')}
      >
        <PlusOutlined />
      </div>
    </div>
  );
};

export default CustomerList;

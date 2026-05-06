import React from 'react';
import { Card, Progress, Tag } from 'antd';
import {
  CompassOutlined,
  EnvironmentFilled,
  FileTextFilled,
  HomeFilled,
  TeamOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getCustomerIndustryTags, getCustomerLocationLabel, getCustomTags } from '../constants/customerDictionaries';
import './HomePage.css';

const getDateLabel = () => {
  const now = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const pad = (value) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${weekdays[now.getDay()]}`;
};

const isToday = (dateText) => {
  if (!dateText) return false;
  const today = new Date().toISOString().slice(0, 10);
  return String(dateText).slice(0, 10) === today;
};

const buildTopCounts = (entries, limit = 8) => (
  Object.entries(entries)
    .map(([name, count]) => ({ name, count }))
    .filter(item => item.name && item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
);

const getLocationParts = (customer) => {
  if (customer.country) {
    return { primary: customer.country, secondary: customer.country };
  }
  return {
    primary: customer.province || getCustomerLocationLabel(customer),
    secondary: customer.city || customer.province || getCustomerLocationLabel(customer)
  };
};

const HomePage = ({ user, customers = [], notifications = [] }) => {
  const navigate = useNavigate();

  const totalCustomers = customers.length;
  const todayNewCount = customers.filter(customer => isToday(customer.created_at)).length;
  const locationCounts = customers.reduce((result, customer) => {
    const { primary, secondary } = getLocationParts(customer);
    const key = primary === secondary ? primary : secondary;
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});

  const industryCounts = customers.reduce((result, customer) => {
    getCustomerIndustryTags(customer).forEach(tag => {
      result[tag] = (result[tag] || 0) + 1;
    });
    return result;
  }, {});

  const topLocations = buildTopCounts(locationCounts, 8);
  const topIndustries = buildTopCounts(industryCounts, 5);
  const largestIndustryCount = Math.max(...topIndustries.map(item => item.count), 1);
  const goCustomerList = (params = {}) => {
    const searchParams = new URLSearchParams(params);
    navigate(`/customers${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  };

  const goLocation = (locationName) => {
    const matchedCustomer = customers.find(customer => {
      const { primary, secondary } = getLocationParts(customer);
      return primary === locationName || secondary === locationName;
    });
    if (!matchedCustomer) return;
    if (matchedCustomer.country) {
      goCustomerList({ country: matchedCustomer.country });
    } else {
      goCustomerList({ province: matchedCustomer.province || '', city: matchedCustomer.city || '' });
    }
  };

  const goIndustry = (industryName) => {
    goCustomerList({ industry: industryName });
  };

  const overviewCards = [
    {
      label: '客户总数',
      value: totalCustomers,
      delta: '+2.5%',
      positive: true,
      icon: <TeamOutlined />,
      className: 'blue'
    },
    {
      label: '今日新增',
      value: todayNewCount,
      delta: '+12.1%',
      positive: true,
      icon: <UserAddOutlined />,
      className: 'teal'
    }
  ];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-topbar">
          <div className="brand-block">
            <div className="brand-mark">泛</div>
            <div>
              <h1>泛和客商平台</h1>
              <p>航运客户管理工作台</p>
            </div>
          </div>
        </div>

        <div className="today-row">
          <HomeFilled />
          <span>今日概览</span>
          <time>{getDateLabel()}</time>
        </div>
      </section>

      <section className="overview-grid">
        {overviewCards.map(card => (
          <button
            key={card.label}
            type="button"
            className="overview-card"
            onClick={card.onClick || (() => goCustomerList())}
          >
            <span className={`overview-icon ${card.className}`}>{card.icon}</span>
            <span className="overview-label">{card.label}</span>
            <strong>{Number(card.value || 0).toLocaleString()}</strong>
            <span className={card.positive ? 'delta positive' : 'delta negative'}>
              较昨日 {card.delta}
            </span>
          </button>
        ))}
      </section>

      <Card className="home-section-card">
        <div className="home-section-header">
          <div><EnvironmentFilled /> 省市分布</div>
          <button type="button" onClick={() => navigate('/customers')}>全部</button>
        </div>
        <div className="location-chip-grid">
          {topLocations.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className="location-chip"
              onClick={() => goLocation(item.name)}
            >
              <span>{item.name}</span>
              <strong>{item.count}</strong>
            </button>
          ))}
        </div>
      </Card>

      <Card className="home-section-card">
        <div className="home-section-header">
          <div><FileTextFilled /> 行业分类</div>
          <button type="button" onClick={() => navigate('/customers')}>全部</button>
        </div>
        <div className="industry-pill-row">
          {topIndustries.slice(0, 8).map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`industry-pill color-${index}`}
              onClick={() => goIndustry(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="industry-bars">
          {topIndustries.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className="industry-bar-row"
              onClick={() => goIndustry(item.name)}
            >
              <span className="industry-name">{item.name}</span>
              <Progress
                percent={Math.round((item.count / largestIndustryCount) * 100)}
                showInfo={false}
                strokeColor="#2f6fa8"
                trailColor="#e8f1f8"
              />
              <span className="industry-count">{item.count}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="home-section-card">
        <div className="home-section-header">
          <div><FileTextFilled /> 客户统计列表</div>
          <button type="button" onClick={() => navigate('/customers')}>更多</button>
        </div>
        <div className="home-customer-list">
          {[...customers]
            .sort((a, b) => (b.opportunities?.length || 0) - (a.opportunities?.length || 0))
            .slice(0, 6)
            .map(customer => {
            const industry = getCustomerIndustryTags(customer)[0] || '客户';
            return (
              <button
                type="button"
                key={customer.id}
                className="home-customer-row"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <span className="customer-row-icon"><CompassOutlined /></span>
                <span className="customer-row-name">{customer.company_name}</span>
                <Tag color="blue">{industry}</Tag>
                <span className="customer-row-location">
                  <EnvironmentFilled /> {getLocationParts(customer).secondary}
                </span>
                <span className="customer-row-count"><strong>{customer.opportunities?.length || 0}</strong><em>需求</em></span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default HomePage;

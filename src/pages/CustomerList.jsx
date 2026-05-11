import React, { useEffect, useState, useRef } from 'react';
import { Card, Input, Tag, Button, Empty, Modal, Spin, Cascader, Upload, message } from 'antd';
import { TeamOutlined, RiseOutlined, UserOutlined, EnvironmentOutlined, EditOutlined, PlusOutlined, PhoneOutlined, MailOutlined, DeleteOutlined, TagsOutlined, FileExcelOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  customerMatchesLocation,
  FOREIGN_LOCATION_VALUE,
  getCustomerIndustryTags,
  getCustomerLocationLabel,
  getCustomTags,
  getIndustryPath,
  getIndustryValuesByPath,
  industryOptions,
  locationOptions
} from '../constants/customerDictionaries';
import { downloadCustomerTemplate, exportCustomersToExcel, parseCustomersFromExcel } from '../utils/customerExcel';
import { addSearchHistory, getSearchHistory } from '../utils/searchHistory';
import './CustomerList.css';

const { Search } = Input;
const CUSTOMER_SEARCH_HISTORY_KEY = 'crm_customer_search_history';

const CustomerList = ({ user, customers, setCustomers }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const canDelete = user?.role === 'admin';
  const getQueryLocation = () => {
    const country = searchParams.get('country');
    const province = searchParams.get('province');
    const city = searchParams.get('city');
    if (country) return [FOREIGN_LOCATION_VALUE, country];
    if (province && city) return [province, city];
    return [];
  };
  const getQueryIndustry = () => {
    const industry = searchParams.get('industry');
    return industry ? getIndustryPath(industry) || [] : [];
  };
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');
  const [selectedLocation, setSelectedLocation] = useState(getQueryLocation);
  const [selectedIndustry, setSelectedIndustry] = useState(getQueryIndustry);
  const [searchHistory, setSearchHistory] = useState(() => getSearchHistory(CUSTOMER_SEARCH_HISTORY_KEY));
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isExcelModalVisible, setIsExcelModalVisible] = useState(false);
  const [importing, setImporting] = useState(false);
  const containerRef = useRef(null);
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    setSearchText(searchParams.get('q') || '');
    setSelectedLocation(getQueryLocation());
    setSelectedIndustry(getQueryIndustry());
    setDisplayCount(5);
  }, [location.search]);

  const filteredCustomers = customers.filter(customer => {
    const industryTags = getCustomerIndustryTags(customer);
    const customTags = getCustomTags(customer);
    const selectedIndustryValues = getIndustryValuesByPath(selectedIndustry);
    const matchesSearch = customer.company_name.includes(searchText) || 
                         (customer.address && customer.address.includes(searchText)) ||
                         industryTags.some(tag => tag.includes(searchText)) ||
                         customTags.some(tag => tag.includes(searchText));
    const matchesLocation = customerMatchesLocation(customer, selectedLocation);
    const matchesIndustry = selectedIndustryValues.length === 0 ||
      industryTags.some(tag => selectedIndustryValues.includes(tag));
    return matchesSearch && matchesLocation && matchesIndustry;
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

  const handleSearchSubmit = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    setSearchText(trimmedValue);
    setSearchHistory(addSearchHistory(CUSTOMER_SEARCH_HISTORY_KEY, trimmedValue));
    setIsHistoryVisible(false);
    setDisplayCount(5);
  };

  const handleHistorySelect = (keyword) => {
    setSearchText(keyword);
    setIsHistoryVisible(false);
    setDisplayCount(5);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value || []);
    setDisplayCount(5);
  };

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value || []);
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
        setCustomers(prevCustomers => prevCustomers.filter(item => item.id !== customer.id));
        message.success(`客户 "${customer.company_name}" 已被删除`);
      }
    });
  };

  const handleImportFile = async (file) => {
    setImporting(true);
    try {
      const { customers: importedCustomers, errors } = await parseCustomersFromExcel(file, {
        baseId: Math.max(...customers.map(customer => customer.id), 0) + 1,
        userId: user?.id
      });

      if (errors.length > 0) {
        Modal.error({
          title: '导入失败',
          content: (
            <div className="excel-error-list">
              {errors.slice(0, 6).map(error => <div key={error}>{error}</div>)}
              {errors.length > 6 && <div>还有 {errors.length - 6} 条错误，请检查模板内容。</div>}
            </div>
          )
        });
        return;
      }

      if (importedCustomers.length === 0) {
        Modal.warning({
          title: '未导入客户',
          content: 'Excel 中没有可导入的客户数据，请填写模板后再导入。'
        });
        return;
      }

      setCustomers(prevCustomers => [...importedCustomers, ...prevCustomers]);
      setDisplayCount(5);
      setIsExcelModalVisible(false);
      message.success(`成功导入 ${importedCustomers.length} 个客户`);
    } catch (error) {
      Modal.error({
        title: '导入失败',
        content: '无法读取该 Excel 文件，请使用下载的固定模板填写后再导入。'
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="customer-list" ref={containerRef} onScroll={handleScroll}>
      <section className="customer-page-hero">
        <div className="customer-brand">
          <span className="customer-brand-mark">泛</span>
          <span>
            <strong>泛和客商平台</strong>
            <em>客户管理</em>
          </span>
        </div>
        <div className="customer-panel-spacer" />
      </section>

      <section className="customer-filter-panel">
        <div className="search-section">
          <div className="search-row">
            <Search
              placeholder="搜索公司名称、地址或标签"
              value={searchText}
              onChange={handleSearchChange}
              onSearch={handleSearchSubmit}
              onFocus={() => setIsHistoryVisible(true)}
              onBlur={() => setTimeout(() => setIsHistoryVisible(false), 120)}
              className="search-input"
              allowClear
            />
          </div>
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

        <div className="filter-section">
          <Cascader
            className="filter-cascader"
            options={locationOptions}
            value={selectedLocation}
            onChange={handleLocationChange}
            placeholder="省市/国家"
            allowClear
            changeOnSelect
            showSearch
            expandTrigger="click"
            displayRender={(labels) => labels[0] === labels[1] ? labels[0] : labels.join(' / ')}
            placement="bottomLeft"
            getPopupContainer={() => containerRef.current || document.body}
          />
          <Cascader
            className="filter-cascader"
            options={industryOptions}
            value={selectedIndustry}
            onChange={handleIndustryChange}
            placeholder="行业标签"
            allowClear
            changeOnSelect
            showSearch
            expandTrigger="click"
            placement="bottomLeft"
            getPopupContainer={() => containerRef.current || document.body}
          />
        </div>
      </section>

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
                <EnvironmentOutlined /> {getCustomerLocationLabel(customer)}
              </div>

              <div className="meta-info">
                <span><TeamOutlined /> {customer.contacts?.length || 0} 联系人</span>
                <span><RiseOutlined /> {customer.opportunities?.length || 0} 需求</span>
                <span><UserOutlined /> {customer.created_by === 1 ? 'admin' : '未知'}</span>
              </div>

              {getCustomerIndustryTags(customer).length > 0 && (
                <div className="tags-section">
                  {getCustomerIndustryTags(customer).slice(0, 4).map(tag => (
                    <Tag key={tag} color="green" icon={<TagsOutlined />}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}

              {getCustomTags(customer).length > 0 && (
                <div className="tags-section">
                  {getCustomTags(customer).slice(0, 3).map((trimmedTag, index) => (
                      <Tag 
                        key={index} 
                        color={trimmedTag === '黑名单' ? 'red' : 'blue'}
                      >
                        {trimmedTag}
                      </Tag>
                  ))}
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
                  添加需求
                </Button>
                {canDelete && (
                  <Button 
                    type="default" 
                    size="small" 
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => handleDeleteClick(e, customer)}
                  >
                    删除
                  </Button>
                )}
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
      
      <div className="floating-actions">
        <button
          type="button"
          className="floating-action-button excel-action-button"
          onClick={() => setIsExcelModalVisible(true)}
          aria-label="批量导入导出客户"
        >
          <FileExcelOutlined />
        </button>
        <button
          type="button"
          className="floating-action-button add-action-button"
          onClick={() => navigate('/customers/create')}
          aria-label="新建客户"
        >
          <PlusOutlined />
        </button>
      </div>

      <Modal
        title="客户批量导入/导出"
        open={isExcelModalVisible}
        onCancel={() => setIsExcelModalVisible(false)}
        footer={null}
        width={420}
      >
        <div className="excel-actions">
          <Button
            icon={<DownloadOutlined />}
            onClick={downloadCustomerTemplate}
            block
          >
            下载Excel模板
          </Button>
          <Upload
            accept=".xlsx,.xls"
            showUploadList={false}
            beforeUpload={(file) => {
              handleImportFile(file);
              return false;
            }}
          >
            <Button
              type="primary"
              icon={<UploadOutlined />}
              loading={importing}
              block
            >
              导入客户Excel
            </Button>
          </Upload>
          <Button
            icon={<FileExcelOutlined />}
            onClick={() => exportCustomersToExcel(filteredCustomers)}
            block
          >
            导出当前客户
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerList;

import React, { useState } from 'react';
import { Card, Descriptions, Tag, Button, Divider } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, UserOutlined, CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOpportunities, mockUsers } from '../mock/data';
import './OpportunityDetail.css';

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(mockOpportunities.find(opp => opp.id === parseInt(id)));

  const getUserName = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.username : '未知';
  };

  const getOpportunityTypeLabel = (type) => {
    const labels = {
      intent: '意向商机（10%）',
      proposal: '方案商机（50%）',
      contract: '合同商机（75%）',
      contract_signed: '合同双签（100%）'
    };
    return labels[type] || type;
  };

  if (!opportunity) {
    return <div>商机不存在</div>;
  }

  return (
    <div className="opportunity-detail">
      <Card className="detail-card">
        <div className="detail-header">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/opportunities')}
          >
            返回
          </Button>
          <h2>{opportunity.title}</h2>
        </div>

        <Descriptions column={1} className="detail-info">
          <Descriptions.Item label="客户">
            {opportunity.customer ? opportunity.customer.company_name : '尚未建档的客户'}
          </Descriptions.Item>
          <Descriptions.Item label="描述">{opportunity.description || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建人">
            <UserOutlined /> {getUserName(opportunity.created_by)}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            <CalendarOutlined /> {opportunity.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="最后更新人">
            <UserOutlined /> {getUserName(opportunity.updated_by)}
          </Descriptions.Item>
          <Descriptions.Item label="最后更新时间">
            <CalendarOutlined /> {opportunity.updated_at}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <div className="action-buttons">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => navigate(`/opportunities/${id}/edit`)} 
          >
            编辑
          </Button>
          <Button 
            type="default" 
            danger
            icon={<DeleteOutlined />}
          >
            删除
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OpportunityDetail;

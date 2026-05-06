import React from 'react';
import { Card, Table, Tag, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockCustomers, mockOpportunities, mockUsers } from '../mock/data';
import './ReportDashboard.css';

const ReportDashboard = () => {
  const navigate = useNavigate();

  // 1. 需求统计 - 按客户统计需求数量
  const customerOpportunityCount = {};
  mockCustomers.forEach(customer => {
    customerOpportunityCount[customer.id] = {
      company_name: customer.company_name,
      count: 0
    };
  });

  mockOpportunities.forEach(opp => {
    if (opp.customer_id && customerOpportunityCount[opp.customer_id]) {
      customerOpportunityCount[opp.customer_id].count++;
    }
  });

  const customerOpportunityData = Object.values(customerOpportunityCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const customerColumns = [
    {
      title: '客户名称',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: '需求数量',
      dataIndex: 'count',
      key: 'count',
      render: (count) => <Tag color={count > 0 ? 'blue' : 'default'}>{count}</Tag>
    }
  ];

  // 2. 录入统计 - 按录入人统计客户录入情况
  const inputCount = {};
  mockUsers.forEach(user => {
    inputCount[user.id] = {
      username: user.username,
      unit: user.unit,
      count: 0
    };
  });

  mockCustomers.forEach(customer => {
    if (customer.created_by && inputCount[customer.created_by]) {
      inputCount[customer.created_by].count++;
    }
  });

  const inputReportData = Object.values(inputCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const inputColumns = [
    {
      title: '录入人',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '录入数量',
      dataIndex: 'count',
      key: 'count',
      render: (count) => <Tag color={count > 0 ? 'green' : 'default'}>{count}</Tag>
    }
  ];

  // 3. 相同联系方式分析 - 查找有相同电话或邮箱的联系人
  const contactMap = {};
  mockCustomers.forEach(customer => {
    if (customer.contacts) {
      customer.contacts.forEach(contact => {
        if (contact.phone) {
          if (!contactMap[contact.phone]) {
            contactMap[contact.phone] = [];
          }
          contactMap[contact.phone].push({
            customer: customer.company_name,
            name: contact.name,
            contactType: '电话',
            value: contact.phone
          });
        }
        if (contact.email) {
          if (!contactMap[contact.email]) {
            contactMap[contact.email] = [];
          }
          contactMap[contact.email].push({
            customer: customer.company_name,
            name: contact.name,
            contactType: '邮箱',
            value: contact.email
          });
        }
      });
    }
  });

  const duplicateContacts = Object.values(contactMap)
    .filter(contacts => contacts.length > 1)
    .map((contacts, index) => ({
      key: index,
      contactType: contacts[0].contactType,
      value: contacts[0].value,
      count: contacts.length,
      contacts: contacts.map(c => `${c.customer} - ${c.name}`).join('; ')
    }))
    .slice(0, 5);

  const duplicateColumns = [
    {
      title: '联系方式类型',
      dataIndex: 'contactType',
      key: 'contactType',
    },
    {
      title: '联系方式',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: '重复数量',
      dataIndex: 'count',
      key: 'count',
      render: (count) => <Tag color="red">{count}</Tag>
    },
    {
      title: '涉及客户',
      dataIndex: 'contacts',
      key: 'contacts',
    }
  ];

  return (
    <div className="report-dashboard">
      {/* 1. 需求统计 */}
      <Card className="report-card" title="需求统计">
        <div className="report-description">
          查看按客户统计的需求数量
        </div>
        <Table
          dataSource={customerOpportunityData}
          columns={customerColumns}
          pagination={false}
          size="small"
          rowKey="company_name"
          className="report-table"
        />
        <div className="report-action">
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate('/reports/opportunity')}
          >
            查看统计
          </Button>
        </div>
      </Card>

      {/* 2. 录入统计 */}
      <Card className="report-card" title="录入统计">
        <div className="report-description">
          查看按录入人统计的客户录入情况
        </div>
        <Table
          dataSource={inputReportData}
          columns={inputColumns}
          pagination={false}
          size="small"
          rowKey="username"
          className="report-table"
        />
        <div className="report-action">
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate('/reports/input')}
          >
            查看统计
          </Button>
        </div>
      </Card>

      {/* 3. 相同联系方式分析 */}
      <Card className="report-card" title="相同联系方式分析">
        <div className="report-description">
          查找有相同电话或邮箱的联系人
        </div>
        <Table
          dataSource={duplicateContacts}
          columns={duplicateColumns}
          pagination={false}
          size="small"
          rowKey="key"
          className="report-table"
        />
        <div className="report-action">
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate('/reports/contact')}
          >
            查看统计
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReportDashboard;

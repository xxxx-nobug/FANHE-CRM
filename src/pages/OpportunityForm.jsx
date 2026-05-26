import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Button, message, Mentions } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { mockCustomers, mockOpportunities, mockUsers } from '../mock/data';
import './OpportunityForm.css';

const { Option } = Select;

const statusOptions = ['跟进中', '签约', '暂停', '关闭'];

const OpportunityForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  const opportunityId = id;
  const isEdit = !!opportunityId;
  const preselectedCustomerId = searchParams.get('customer_id');

  useEffect(() => {
    if (isEdit) {
      const opportunity = mockOpportunities.find(o => o.id === parseInt(opportunityId));
      if (opportunity) {
        form.setFieldsValue({
          customer_id: opportunity.customer_id || 0,
          status: opportunity.status || '跟进中',
          description: opportunity.description
        });
      }
    } else if (preselectedCustomerId) {
      form.setFieldsValue({
        customer_id: parseInt(preselectedCustomerId),
        status: '跟进中',
      });
    } else {
      form.setFieldsValue({
        status: '跟进中',
      });
    }
  }, [opportunityId, form, isEdit, preselectedCustomerId]);

  const onFinish = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      const opportunityData = {
        ...values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('Opportunity data:', opportunityData);
      message.success(isEdit ? '需求更新成功' : '需求创建成功');
      setLoading(false);
      navigate('/opportunities');
    }, 500);
  };

  return (
    <div className="opportunity-form">
      <Card className="form-card">
        <div className="form-header">
          <h2>{isEdit ? '编辑需求' : '新建需求'}</h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="customer_id"
            label="客户"
            rules={[{ required: true, message: '请选择客户' }]}
          >
            <Select 
              placeholder="请选择客户"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key={0} value={0}>尚未建档的客户</Option>
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.id}>
                  {customer.company_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="跟进状态"
            rules={[{ required: true, message: '请选择跟进状态' }]}
          >
            <Select placeholder="请选择跟进状态">
              {statusOptions.map(status => (
                <Option key={status} value={status}>{status}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <Mentions
              rows={4}
              placeholder="请输入需求描述，输入@可提及用户"
              prefix="@"
              options={mockUsers.map(user => ({
                value: user.username,
                label: `${user.username}（${user.unit}）`
              }))}
            />
          </Form.Item>

          <Form.Item>
            <div className="form-actions">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
              >
                {isEdit ? '保存' : '创建'}
              </Button>
              <Button 
                size="large"
                onClick={() => navigate('/opportunities')}
              >
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default OpportunityForm;

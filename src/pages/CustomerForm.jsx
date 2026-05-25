import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, InputNumber, Upload, Button, message, Cascader } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FOREIGN_LOCATION_VALUE,
  customTagOptions,
  flattenIndustryPaths,
  getCustomerIndustryTags,
  getCustomerLocationPath,
  getCustomerRouteTags,
  getCustomTags,
  getIndustryPathsFromTags,
  industryOptions,
  locationOptions,
  routeOptions
} from '../constants/customerDictionaries';
import './CustomerForm.css';

const { TextArea } = Input;

const CustomerForm = ({ user, customers = [], setCustomers, setNotifications }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const locationPath = Form.useWatch('location_path', form);
  
  const customerId = id;
  const isEdit = !!customerId;
  const isForeignCustomer = locationPath?.[0] === FOREIGN_LOCATION_VALUE;
  const hasLocation = Array.isArray(locationPath) && locationPath.length > 0;

  useEffect(() => {
    if (isEdit) {
      const customer = customers.find(c => c.id === parseInt(customerId));
      if (customer) {
        form.setFieldsValue({
          company_name: customer.company_name,
          location_path: getCustomerLocationPath(customer),
          industry_paths: getIndustryPathsFromTags(getCustomerIndustryTags(customer)),
          route_tags: getCustomerRouteTags(customer),
          credit_code: customer.credit_code,
          address: customer.address,
          phone: customer.phone,
          email: customer.email,
          registered_capital: customer.registered_capital,
          description: customer.description,
          tags: getCustomTags(customer)
        });
      }
    }
  }, [customerId, customers, form, isEdit]);

  const createAdminNotification = (customer) => ({
    id: Date.now(),
    type: 'customer_created',
    title: '新客户录入',
    content: `录入员 ${user?.username || '未知用户'} 新增客户「${customer.company_name}」，请管理员关注客户资料完整性。`,
    customer_id: customer.id,
    customer_name: customer.company_name,
    actor_id: user?.id,
    actor_name: user?.username || '未知用户',
    target_roles: ['admin'],
    read_by: [],
    created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
  });

  const onFinish = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      const tags = values.tags ? values.tags.join(',') : '';
      const industryTags = flattenIndustryPaths(values.industry_paths);
      const routeTags = values.route_tags || [];
      const [locationLevel1, locationLevel2] = values.location_path || [];
      const isForeign = locationLevel1 === FOREIGN_LOCATION_VALUE;
      const customerData = {
        ...values,
        id: isEdit ? parseInt(customerId) : Math.max(...customers.map(customer => customer.id), 0) + 1,
        region: isForeign ? FOREIGN_LOCATION_VALUE : null,
        province: isForeign ? null : locationLevel1,
        city: isForeign ? null : locationLevel2,
        country: isForeign ? locationLevel2 : null,
        industry_tags: industryTags,
        route_tags: routeTags,
        tags,
        contacts: isEdit ? customers.find(customer => customer.id === parseInt(customerId))?.contacts || [] : [],
        opportunities: isEdit ? customers.find(customer => customer.id === parseInt(customerId))?.opportunities || [] : [],
        background_notes: isEdit ? customers.find(customer => customer.id === parseInt(customerId))?.background_notes || [] : [],
        created_by: isEdit ? customers.find(customer => customer.id === parseInt(customerId))?.created_by : user?.id,
        created_at: isEdit ? customers.find(customer => customer.id === parseInt(customerId))?.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      delete customerData.location_path;
      delete customerData.industry_paths;
      
      if (setCustomers) {
        if (isEdit) {
          setCustomers(prevCustomers => prevCustomers.map(customer => (
            customer.id === parseInt(customerId) ? customerData : customer
          )));
        } else {
          setCustomers(prevCustomers => [customerData, ...prevCustomers]);
          if (user?.role === 'entry' && setNotifications) {
            setNotifications(prevNotifications => [createAdminNotification(customerData), ...prevNotifications]);
          }
        }
      }

      message.success(isEdit ? '客户信息更新成功' : '客户创建成功');
      setLoading(false);
      navigate('/customers');
    }, 500);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="customer-form">
      <Card className="form-card">
        <div className="form-header">
          <h2>{isEdit ? '编辑客户' : '新建客户'}</h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="company_name"
            label="公司名称"
            rules={[{ required: true, message: '请输入公司名称' }]}
          >
            <Input placeholder="请输入公司名称" />
          </Form.Item>

          <Form.Item
            name="location_path"
            label="省市/国家标签"
            rules={[
              { required: true, message: '请选择省市或国家' },
              {
                validator(_, value) {
                  if (value && value.length >= 2) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请选择到城市或国家'));
                },
              },
            ]}
          >
            <Cascader
              options={locationOptions}
              placeholder="请选择省市；国外客户请选择国家"
              showSearch
              expandTrigger="click"
              displayRender={(labels) => labels[0] === labels[1] ? labels[0] : labels.join(' / ')}
              placement="bottomLeft"
            />
          </Form.Item>

          {hasLocation && !isForeignCustomer && (
            <Form.Item
              name="credit_code"
              label="统一社会信用代码"
              rules={[{ required: true, message: '请输入统一社会信用代码' }]}
            >
              <Input placeholder="请输入统一社会信用代码" />
            </Form.Item>
          )}

          <Form.Item
            name="industry_paths"
            label="行业标签"
            rules={[
              { required: true, message: '请选择行业标签' },
              {
                validator(_, value) {
                  if (Array.isArray(value) && value.length > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('至少选择一个行业标签'));
                },
              },
            ]}
          >
            <Cascader
              options={industryOptions}
              placeholder="请选择行业标签"
              multiple
              maxTagCount="responsive"
              showSearch
              expandTrigger="click"
              placement="bottomLeft"
            />
          </Form.Item>

          <Form.Item
            name="route_tags"
            label="航线标签"
          >
            <Select
              mode="multiple"
              options={routeOptions}
              placeholder="可选，选择客户对应航线"
              maxTagCount="responsive"
              allowClear
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="地址"
          >
            <Input placeholder="请输入地址" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="电话"
          >
            <Input placeholder="请输入电话" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="registered_capital"
            label="注册资金（万元）"
          >
            <InputNumber 
              placeholder="请输入注册资金" 
              style={{ width: '100%' }}
              min={0}
              precision={2}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={3} placeholder="请输入描述" />
          </Form.Item>

          <Form.Item
            name="tags"
            label="其他标签"
          >
            <Select 
              mode="tags" 
              options={customTagOptions}
              placeholder="可选预设标签，也可输入后按回车"
              maxTagCount="responsive"
              allowClear
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="attachment"
            label="附件"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
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
                onClick={() => navigate('/customers')}
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

export default CustomerForm;

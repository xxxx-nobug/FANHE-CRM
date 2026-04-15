import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, InputNumber, Upload, Button, message } from 'antd';
import { UploadOutlined, ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { mockCustomers } from '../mock/data';
import './CustomerForm.css';

const { TextArea } = Input;
const { Option } = Select;

const CustomerForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(false);
  
  const customerId = id;
  const isEdit = !!customerId;
  
  const regions = ['华北', '华东', '华南', '华中', '西北', '西南', '东北', '国外'];
  const countries = [
    '美国', '日本', '德国', '英国', '法国', '韩国', '新加坡', '澳大利亚',
    '加拿大', '意大利', '俄罗斯', '印度', '巴西', '墨西哥', '荷兰',
    '瑞士', '瑞典', '西班牙', '阿联酋', '沙特阿拉伯', '泰国', '越南',
    '马来西亚', '印度尼西亚', '菲律宾', '土耳其', '以色列', '南非',
    '埃及', '新西兰', '其他'
  ];

  useEffect(() => {
    if (isEdit) {
      const customer = mockCustomers.find(c => c.id === parseInt(customerId));
      if (customer) {
        form.setFieldsValue({
          company_name: customer.company_name,
          region: customer.region,
          country: customer.country,
          credit_code: customer.credit_code,
          address: customer.address,
          phone: customer.phone,
          email: customer.email,
          registered_capital: customer.registered_capital,
          description: customer.description,
          tags: customer.tags ? customer.tags.split(',') : []
        });
        setSelectedRegion(customer.region);
      }
    }
  }, [customerId, form, isEdit]);

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    if (value !== '国外') {
      form.setFieldsValue({ country: undefined });
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      const tags = values.tags ? values.tags.join(',') : '';
      const customerData = {
        ...values,
        tags,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('Customer data:', customerData);
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
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            返回
          </Button>
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
            name="region"
            label="主要办公地"
            rules={[{ required: true, message: '请选择主要办公地' }]}
          >
            <Select 
              placeholder="请选择主要办公地"
              onChange={handleRegionChange}
            >
              {regions.map(region => (
                <Option key={region} value={region}>{region}</Option>
              ))}
            </Select>
          </Form.Item>

          {selectedRegion === '国外' && (
            <Form.Item
              name="country"
              label="国家"
              rules={[{ required: true, message: '请选择国家' }]}
            >
              <Select placeholder="请选择国家" showSearch>
                {countries.map(country => (
                  <Option key={country} value={country}>{country}</Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {selectedRegion && selectedRegion !== '国外' && (
            <Form.Item
              name="credit_code"
              label="统一社会信用代码"
              rules={[{ required: true, message: '请输入统一社会信用代码' }]}
            >
              <Input placeholder="请输入统一社会信用代码" />
            </Form.Item>
          )}

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
            label="客户标签"
          >
            <Select 
              mode="tags" 
              placeholder="输入标签后按回车"
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

import React, { useState } from 'react';
import { Avatar, Button, Card, Descriptions, Divider, Form, List, Mentions, Modal, Tag, message } from 'antd';
import { CalendarOutlined, DeleteOutlined, EditOutlined, MessageOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOpportunities, mockUsers } from '../mock/data';
import './OpportunityDetail.css';

const OpportunityDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const canDelete = user?.role === 'admin';
  const [opportunity, setOpportunity] = useState(mockOpportunities.find(opp => opp.id === parseInt(id)));
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [noteForm] = Form.useForm();

  const getUserName = (userId) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.username : '未知';
  };

  const getOpportunityTypeLabel = (type) => {
    const labels = {
      intent: '意向需求（10%）',
      proposal: '方案需求（50%）',
      contract: '合同需求（75%）',
      contract_signed: '合同双签（100%）'
    };
    return labels[type] || type;
  };

  const formatNow = () => {
    const date = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  const getMentionUsers = (ids = []) => (
    ids
      .map(userId => mockUsers.find(mockUser => mockUser.id === userId))
      .filter(Boolean)
  );

  const parseMentionUserIds = (content = '') => {
    const mentionedNames = Array.from(content.matchAll(/@([\w\u4e00-\u9fa5.-]+)/g)).map(match => match[1]);
    return mockUsers
      .filter(mockUser => mentionedNames.includes(mockUser.username))
      .map(mockUser => mockUser.id);
  };

  const handleAddNote = (values) => {
    const newNote = {
      id: Date.now(),
      content: values.content.trim(),
      mention_user_ids: parseMentionUserIds(values.content),
      created_by: user?.id,
      created_by_name: user?.username || '当前用户',
      created_at: formatNow()
    };

    setOpportunity({
      ...opportunity,
      follow_notes: [...(opportunity.follow_notes || []), newNote]
    });
    setIsNoteModalVisible(false);
    noteForm.resetFields();
    message.success('需求补充信息已添加');
  };

  const handleNoteCancel = () => {
    setIsNoteModalVisible(false);
    noteForm.resetFields();
  };

  if (!opportunity) {
    return <div>需求不存在</div>;
  }

  const followNotes = [...(opportunity.follow_notes || [])]
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));

  return (
    <div className="opportunity-detail">
      <Card className="detail-card">
        <div className="detail-header">
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
          {canDelete && (
            <Button 
              type="default" 
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          )}
        </div>
      </Card>

      <div className="section-header">
        <div className="section-title">
          需求信息补充 ({followNotes.length})
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsNoteModalVisible(true)}
          size="small"
        >
          添加
        </Button>
      </div>

      <Card className="follow-note-card">
        {followNotes.length > 0 ? (
          <List
            dataSource={followNotes}
            rowKey="id"
            renderItem={note => (
              <List.Item className="follow-note-item">
                <List.Item.Meta
                  avatar={<Avatar icon={<MessageOutlined />} />}
                  title={
                    <div className="follow-note-meta">
                      <span className="follow-note-author">{note.created_by_name || '未知用户'}</span>
                      <span className="follow-note-time">{note.created_at}</span>
                    </div>
                  }
                  description={
                    <div>
                      {note.mention_user_ids && note.mention_user_ids.length > 0 && (
                        <div className="mention-list">
                          {getMentionUsers(note.mention_user_ids).map(mentionUser => (
                            <Tag key={mentionUser.id} color="blue">@{mentionUser.username}</Tag>
                          ))}
                        </div>
                      )}
                      <div className="follow-note-content">{note.content}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div className="empty-text follow-note-empty">暂无需求信息补充</div>
        )}
      </Card>

      <Modal
        title="添加需求信息补充"
        open={isNoteModalVisible}
        onOk={noteForm.submit}
        onCancel={handleNoteCancel}
        width={500}
        okText="添加"
        cancelText="取消"
      >
        <Form
          form={noteForm}
          layout="vertical"
          onFinish={handleAddNote}
        >
          <Form.Item
            name="content"
            label="补充内容"
            rules={[
              { required: true, message: '请输入补充内容' },
              { whitespace: true, message: '请输入有效内容' }
            ]}
          >
            <Mentions
              rows={5}
              placeholder="请输入需求推进、客户反馈、协同事项等补充信息，输入@可提及用户"
              prefix="@"
              options={mockUsers.map(mockUser => ({
                value: mockUser.username,
                label: `${mockUser.username}（${mockUser.unit}）`
              }))}
              maxLength={500}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OpportunityDetail;

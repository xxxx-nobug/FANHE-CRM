import React from 'react';
import { Avatar, Button, Card, Empty, List, Tag } from 'antd';
import { BellOutlined, CheckCircleOutlined, TeamOutlined } from '@ant-design/icons';
import './NotificationCenter.css';

const notificationTypeConfig = {
  customer_created: {
    label: '新客户',
    color: 'blue',
    icon: <TeamOutlined />
  },
  system: {
    label: '系统',
    color: 'default',
    icon: <BellOutlined />
  }
};

const isVisibleToUser = (notification, user) => {
  if (!user) return false;
  const targetRoles = notification.target_roles || [];
  const targetUserIds = notification.target_user_ids || [];
  return targetRoles.includes(user.role) || targetUserIds.includes(user.id);
};

const isUnread = (notification, user) => !(notification.read_by || []).includes(user?.id);

const NotificationCenter = ({ user, notifications = [], setNotifications }) => {
  const visibleNotifications = notifications
    .filter(notification => isVisibleToUser(notification, user))
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  const unreadCount = visibleNotifications.filter(notification => isUnread(notification, user)).length;

  const markAllRead = () => {
    if (!user || unreadCount === 0) return;
    setNotifications(prevNotifications => prevNotifications.map(notification => {
      if (!isVisibleToUser(notification, user) || !isUnread(notification, user)) {
        return notification;
      }
      return {
        ...notification,
        read_by: [...(notification.read_by || []), user.id]
      };
    }));
  };

  const markOneRead = (notificationId) => {
    if (!user) return;
    setNotifications(prevNotifications => prevNotifications.map(notification => {
      if (notification.id !== notificationId || !isUnread(notification, user)) {
        return notification;
      }
      return {
        ...notification,
        read_by: [...(notification.read_by || []), user.id]
      };
    }));
  };

  return (
    <div className="notification-center">
      <Card className="notification-header-card">
        <div className="notification-header">
          <div className="notification-title">
            <h2>通知消息</h2>
            <span>{unreadCount > 0 ? `${unreadCount} 条未读` : '暂无未读'}</span>
          </div>
          <Button
            type="link"
            size="small"
            disabled={unreadCount === 0}
            onClick={markAllRead}
          >
            全部已读
          </Button>
        </div>
      </Card>

      {visibleNotifications.length > 0 ? (
        <List
          dataSource={visibleNotifications}
          rowKey="id"
          renderItem={notification => {
            const typeConfig = notificationTypeConfig[notification.type] || notificationTypeConfig.system;
            const unread = isUnread(notification, user);
            return (
              <Card className={`notification-card ${unread ? 'unread' : ''}`}>
                <List.Item
                  onClick={() => markOneRead(notification.id)}
                  className="notification-item"
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={typeConfig.icon} className={unread ? 'notification-avatar unread' : 'notification-avatar'} />}
                    title={
                      <div className="notification-item-title">
                        <div>
                          <Tag color={typeConfig.color}>{typeConfig.label}</Tag>
                          <span>{notification.title}</span>
                        </div>
                        {unread ? <span className="unread-dot" /> : <CheckCircleOutlined className="read-icon" />}
                      </div>
                    }
                    description={
                      <div className="notification-desc">
                        <div className="notification-content">{notification.content}</div>
                        <div className="notification-meta">
                          <span>{notification.actor_name ? `来自 ${notification.actor_name}` : '系统通知'}</span>
                          <span>{notification.created_at}</span>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              </Card>
            );
          }}
        />
      ) : (
        <Card className="notification-empty-card">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无通知消息" />
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;

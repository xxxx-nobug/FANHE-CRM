import React, { useMemo, useState } from 'react';
import { Button, Card, Collapse, Empty, Form, Input, List, Modal, Radio, Select, Tabs, Tag, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import {
  customTagOptions,
  industryOptions,
  locationOptions,
  routeOptions
} from '../constants/customerDictionaries';
import './TagManagement.css';

const STORAGE_KEY = 'crm_tag_dictionary';

const categoryConfig = {
  locations: {
    title: '省市/国家',
    groupLabel: '一级标签',
    childLabel: '二级标签',
    groupPlaceholder: '例如：广东省、国外',
    childPlaceholder: '例如：深圳市、新加坡'
  },
  industries: {
    title: '行业标签',
    groupLabel: '一级标签',
    childLabel: '二级标签',
    groupPlaceholder: '例如：航运服务',
    childPlaceholder: '例如：船代'
  },
  routes: {
    title: '航线标签',
    childLabel: '标签名称',
    childPlaceholder: '例如：地中海航线'
  },
  custom: {
    title: '其他标签',
    childLabel: '标签名称',
    childPlaceholder: '例如：散货船东'
  }
};

const isGroupedCategory = (key) => key === 'locations' || key === 'industries';

const buildGroupedItems = (options, prefix) => (
  options.map(option => ({
    id: `${prefix}-${option.value}`,
    label: option.label,
    children: (option.children || []).map(child => ({
      id: `${prefix}-${option.value}-${child.value}`,
      label: child.label
    }))
  }))
);

const buildDefaultDictionary = () => ({
  locations: buildGroupedItems(locationOptions, 'location'),
  industries: buildGroupedItems(industryOptions, 'industry'),
  routes: routeOptions.map(option => ({
    id: `route-${option.value}`,
    label: option.label
  })),
  custom: customTagOptions.map(option => ({
    id: `custom-${option.value}`,
    label: option.label
  }))
});

const migrateGroupedItems = (items, options, prefix) => {
  if (!Array.isArray(items) || items.length === 0) {
    return buildGroupedItems(options, prefix);
  }

  if (items[0]?.children) {
    return items;
  }

  return items.reduce((groups, item) => {
    const groupLabel = item.group || '未分组';
    let group = groups.find(currentGroup => currentGroup.label === groupLabel);
    if (!group) {
      group = {
        id: `${prefix}-${groupLabel}`,
        label: groupLabel,
        children: []
      };
      groups.push(group);
    }
    group.children.push({
      id: item.id,
      label: item.label
    });
    return groups;
  }, []);
};

const normalizeSingleItems = (items, fallbackItems) => {
  if (!Array.isArray(items) || items.length === 0) {
    return fallbackItems;
  }

  return items.flatMap(item => {
    if (Array.isArray(item.children)) {
      return item.children.map(child => ({
        id: child.id,
        label: child.label
      }));
    }
    return {
      id: item.id,
      label: item.label
    };
  }).filter(item => item.label);
};

const loadDictionary = () => {
  const defaultDictionary = buildDefaultDictionary();
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      locations: migrateGroupedItems(stored.locations, locationOptions, 'location'),
      industries: migrateGroupedItems(stored.industries, industryOptions, 'industry'),
      routes: normalizeSingleItems(stored.routes, defaultDictionary.routes),
      custom: normalizeSingleItems(stored.custom, defaultDictionary.custom)
    };
  } catch {
    return defaultDictionary;
  }
};

const saveDictionary = (dictionary) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dictionary));
};

const normalizeValue = (value) => String(value || '').trim();

const TagManagement = ({ user }) => {
  const [activeKey, setActiveKey] = useState('locations');
  const [dictionary, setDictionary] = useState(loadDictionary);
  const [keyword, setKeyword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [tagLevel, setTagLevel] = useState('child');
  const [form] = Form.useForm();

  const currentConfig = categoryConfig[activeKey];
  const grouped = isGroupedCategory(activeKey);
  const currentItems = dictionary[activeKey] || [];

  const filteredItems = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) return currentItems;

    if (!grouped) {
      return currentItems.filter(item => String(item.label || '').toLowerCase().includes(normalizedKeyword));
    }

    return currentItems
      .map(group => {
        const children = group.children || [];
        const groupMatched = String(group.label || '').toLowerCase().includes(normalizedKeyword);
        const matchedChildren = children.filter(child => String(child.label || '').toLowerCase().includes(normalizedKeyword));
        if (groupMatched) return group;
        if (matchedChildren.length > 0) {
          return {
            ...group,
            children: matchedChildren
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [currentItems, grouped, keyword]);

  if (user?.role !== 'admin') {
    return <Navigate to="/my" replace />;
  }

  const persistDictionary = (nextDictionary) => {
    setDictionary(nextDictionary);
    saveDictionary(nextDictionary);
  };

  const openCreateModal = () => {
    const defaultLevel = grouped ? 'child' : 'single';
    setEditingItem(null);
    setTagLevel(defaultLevel);
    form.resetFields();
    form.setFieldsValue({ level: defaultLevel });
    setModalVisible(true);
  };

  const openEditGroupModal = (group) => {
    setEditingItem({ type: 'group', groupId: group.id });
    setTagLevel('group');
    form.setFieldsValue({
      level: 'group',
      label: group.label
    });
    setModalVisible(true);
  };

  const openEditChildModal = (group, child) => {
    setEditingItem({ type: 'child', groupId: group.id, childId: child.id });
    setTagLevel('child');
    form.setFieldsValue({
      level: 'child',
      parentId: group.id,
      label: child.label
    });
    setModalVisible(true);
  };

  const openEditSingleModal = (item) => {
    setEditingItem({ type: 'single', itemId: item.id });
    setTagLevel('single');
    form.setFieldsValue({
      level: 'single',
      label: item.label
    });
    setModalVisible(true);
  };

  const handleSubmit = (values) => {
    const label = normalizeValue(values.label);
    const level = grouped ? values.level : 'single';
    const parentId = values.parentId;

    if (!label) {
      message.warning('请填写标签名称');
      return;
    }

    if (grouped && level === 'child' && !parentId) {
      message.warning('请选择上级标签');
      return;
    }

    if (!grouped) {
      const duplicate = currentItems.some(item => item.id !== editingItem?.itemId && item.label === label);
      if (duplicate) {
        message.warning('该标签已存在');
        return;
      }

      const nextItems = editingItem
        ? currentItems.map(item => (item.id === editingItem.itemId ? { ...item, label } : item))
        : [{ id: `${activeKey}-${Date.now()}`, label }, ...currentItems];

      persistDictionary({ ...dictionary, [activeKey]: nextItems });
    } else if (level === 'group') {
      const duplicate = currentItems.some(group => group.id !== editingItem?.groupId && group.label === label);
      if (duplicate) {
        message.warning('一级标签已存在');
        return;
      }

      const nextGroups = editingItem
        ? currentItems.map(group => (group.id === editingItem.groupId ? { ...group, label } : group))
        : [{ id: `${activeKey}-group-${Date.now()}`, label, children: [] }, ...currentItems];

      persistDictionary({ ...dictionary, [activeKey]: nextGroups });
    } else {
      const parentGroup = currentItems.find(group => group.id === parentId);
      const duplicate = parentGroup?.children.some(child => child.id !== editingItem?.childId && child.label === label);
      if (duplicate) {
        message.warning('该二级标签已存在');
        return;
      }

      const nextGroups = currentItems.map(group => {
        if (group.id !== parentId && group.id !== editingItem?.groupId) return group;
        if (editingItem) {
          if (group.id !== editingItem.groupId) return group;
          return {
            ...group,
            children: group.children.map(child => (
              child.id === editingItem.childId ? { ...child, label } : child
            ))
          };
        }
        return {
          ...group,
          children: [{ id: `${activeKey}-child-${Date.now()}`, label }, ...group.children]
        };
      });

      persistDictionary({ ...dictionary, [activeKey]: nextGroups });
    }

    setModalVisible(false);
    form.resetFields();
    message.success(editingItem ? '标签已更新' : '标签已新增');
  };

  const deleteGroup = (group) => {
    Modal.confirm({
      title: '删除一级标签',
      content: `确定删除“${group.label}”及其下方 ${group.children.length} 个二级标签吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        persistDictionary({
          ...dictionary,
          [activeKey]: currentItems.filter(item => item.id !== group.id)
        });
        message.success('一级标签已删除');
      }
    });
  };

  const deleteChild = (group, child) => {
    Modal.confirm({
      title: '删除二级标签',
      content: `确定删除“${child.label}”吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        persistDictionary({
          ...dictionary,
          [activeKey]: currentItems.map(item => (
            item.id === group.id
              ? { ...item, children: item.children.filter(currentChild => currentChild.id !== child.id) }
              : item
          ))
        });
        message.success('二级标签已删除');
      }
    });
  };

  const deleteSingle = (item) => {
    Modal.confirm({
      title: '删除标签',
      content: `确定删除“${item.label}”吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        persistDictionary({
          ...dictionary,
          [activeKey]: currentItems.filter(currentItem => currentItem.id !== item.id)
        });
        message.success('标签已删除');
      }
    });
  };

  const collapseItems = grouped ? filteredItems.map(group => {
    const children = group.children || [];
    return {
    key: group.id,
    label: (
      <div className="tag-collapse-label">
        <strong>{group.label}</strong>
        <Tag>{children.length} 个二级标签</Tag>
      </div>
    ),
    extra: (
      <div className="tag-actions" onClick={event => event.stopPropagation()}>
        <Button size="small" icon={<EditOutlined />} onClick={() => openEditGroupModal(group)}>
          编辑
        </Button>
        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => deleteGroup(group)}>
          删除
        </Button>
      </div>
    ),
    children: children.length > 0 ? (
      <div className="tag-child-list">
        {children.map(child => (
          <div key={child.id} className="tag-child-item">
            <span>{child.label}</span>
            <div className="tag-actions">
              <Button size="small" icon={<EditOutlined />} onClick={() => openEditChildModal(group, child)}>
                编辑
              </Button>
              <Button size="small" danger icon={<DeleteOutlined />} onClick={() => deleteChild(group, child)}>
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无二级标签" />
    )
    };
  }) : [];

  return (
    <div className="tag-management">
      <Card className="tag-management-card">
        <div className="tag-management-header">
          <div>
            <h2>标签管理</h2>
            <span>维护客户录入和筛选使用的标准标签词典</span>
          </div>
          <Button type="primary" className="tag-create-button" icon={<PlusOutlined />} onClick={openCreateModal}>
            新增
          </Button>
        </div>

        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
            setKeyword('');
          }}
          items={Object.entries(categoryConfig).map(([key, config]) => ({
            key,
            label: config.title
          }))}
        />

        <Input
          allowClear
          prefix={<SearchOutlined />}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder={`搜索${currentConfig.title}`}
          className="tag-search-input"
        />

        {grouped && filteredItems.length > 0 && (
          <Collapse className="tag-collapse" items={collapseItems} bordered={false} />
        )}

        {!grouped && filteredItems.length > 0 && (
          <List
            className="tag-list"
            dataSource={filteredItems}
            rowKey="id"
            renderItem={item => (
              <List.Item className="tag-list-item">
                <div className="tag-main">
                  <strong>{item.label}</strong>
                </div>
                <div className="tag-actions">
                  <Button size="small" icon={<EditOutlined />} onClick={() => openEditSingleModal(item)}>
                    编辑
                  </Button>
                  <Button size="small" danger icon={<DeleteOutlined />} onClick={() => deleteSingle(item)}>
                    删除
                  </Button>
                </div>
              </List.Item>
            )}
          />
        )}

        {filteredItems.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无标签" />
        )}
      </Card>

      <Modal
        title={editingItem ? '编辑标签' : '新增标签'}
        open={modalVisible}
        onOk={form.submit}
        onCancel={() => setModalVisible(false)}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {grouped && (
            <Form.Item name="level" label="标签层级" initialValue={tagLevel}>
              <Radio.Group
                optionType="button"
                buttonStyle="solid"
                disabled={!!editingItem}
                onChange={(event) => {
                  setTagLevel(event.target.value);
                  form.setFieldValue('parentId', undefined);
                }}
                options={[
                  { label: '一级标签', value: 'group' },
                  { label: '二级标签', value: 'child' }
                ]}
              />
            </Form.Item>
          )}

          {grouped && tagLevel === 'child' && (
            <Form.Item
              name="parentId"
              label="所属上级标签"
              rules={[{ required: true, message: '请选择所属上级标签' }]}
            >
              <Select
                placeholder="请选择所属上级标签"
                disabled={editingItem?.type === 'child'}
                options={currentItems.map(group => ({
                  value: group.id,
                  label: group.label
                }))}
              />
            </Form.Item>
          )}

          <Form.Item
            name="label"
            label={grouped && tagLevel === 'group' ? currentConfig.groupLabel : currentConfig.childLabel}
            rules={[{ required: true, message: '请输入标签名称' }]}
          >
            <Input placeholder={grouped && tagLevel === 'group' ? currentConfig.groupPlaceholder : currentConfig.childPlaceholder} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagManagement;

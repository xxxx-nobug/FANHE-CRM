export const mockCustomers = [
  {
    id: 1,
    company_name: '北京科技有限公司',
    credit_code: '91110108MA01234567',
    region: null,
    province: '北京市',
    city: '北京市',
    country: null,
    address: '北京市海淀区中关村大街1号',
    phone: '010-12345678',
    email: 'contact@bjtech.com',
    description: '一家专注于人工智能技术研发的高新技术企业',
    registered_capital: 1000,
    industry_tags: ['人工智能', '软件与数字化'],
    tags: '',
    attachment: null,
    created_at: '2024-01-15 10:30:00',
    updated_at: '2024-01-15 10:30:00',
    created_by: 1,
    contacts: [
      {
        id: 1,
        name: '张三',
        position: '技术总监',
        department: '技术部',
        phone: '13800138001',
        email: 'zhangsan@bjtech.com',
        relationship: '可支持'
      },
      {
        id: 2,
        name: '李四',
        position: '产品经理',
        department: '产品部',
        phone: '13800138002',
        email: 'lisi@bjtech.com',
        relationship: '认识'
      }
    ],
    opportunities: [
      {
        id: 1,
        title: '北京科技的需求',
        opportunity_type: 'proposal',
        status: '跟进中',
        description: 'AI平台建设项目',
        created_at: '2024-01-16 14:20:00'
      }
    ],
    background_notes: [
      {
        id: 1,
        type: 'relationship',
        content: '合作沟通较顺畅，技术负责人可直接推进需求确认，暂未发现明显付款风险。',
        created_by: 1,
        created_by_name: 'admin',
        created_at: '2024-01-18 16:20:00'
      }
    ]
  },
  {
    id: 2,
    company_name: '上海贸易有限公司',
    credit_code: '91310115MA02345678',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区陆家嘴环路1000号',
    phone: '021-87654321',
    email: 'info@shtrade.com',
    description: '进出口贸易公司，主营电子产品',
    registered_capital: 500,
    industry_tags: ['国际贸易', '货代服务', '报关报检'],
    tags: '',
    attachment: null,
    created_at: '2024-01-16 09:15:00',
    updated_at: '2024-01-16 09:15:00',
    created_by: 2,
    contacts: [
      {
        id: 3,
        name: '王五',
        position: '总经理',
        department: '管理层',
        phone: '13900139001',
        email: 'wangwu@shtrade.com',
        relationship: '可约局'
      }
    ],
    opportunities: [],
    background_notes: [
      {
        id: 2,
        type: 'arrears',
        content: '历史合作中曾出现账期延迟，后续报价建议明确付款节点和违约责任。',
        created_by: 2,
        created_by_name: 'zhangsan',
        created_at: '2024-01-20 09:40:00'
      }
    ]
  },
  {
    id: 3,
    company_name: 'Google Inc.',
    credit_code: null,
    region: '国外',
    province: null,
    city: null,
    country: '美国',
    address: '1600 Amphitheatre Parkway, Mountain View, CA',
    phone: '+1-650-253-0000',
    email: 'contact@google.com',
    description: '全球领先的科技公司',
    registered_capital: null,
    industry_tags: ['互联网平台', '人工智能'],
    tags: '',
    attachment: null,
    created_at: '2024-01-17 11:00:00',
    updated_at: '2024-01-17 11:00:00',
    created_by: 1,
    contacts: [],
    opportunities: []
  },
  {
    id: 4,
    company_name: '深圳创新科技有限公司',
    credit_code: '91440300MA03456789',
    region: null,
    province: '广东省',
    city: '深圳市',
    country: null,
    address: '深圳市南山区科技园南区',
    phone: '0755-12345678',
    email: 'info@szinno.com',
    description: '专注于物联网技术研发',
    registered_capital: 800,
    industry_tags: ['物联网', '软件与数字化'],
    tags: '黑名单',
    attachment: null,
    created_at: '2024-01-18 15:30:00',
    updated_at: '2024-01-18 15:30:00',
    created_by: 1,
    contacts: [],
    opportunities: []
  },
  {
    id: 5,
    company_name: '麟鲤科技',
    credit_code: '91310115MA01234567',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区张江高科技园区',
    phone: '021-12345678',
    email: 'info@linli-tech.com',
    description: '人工智能领域的创新企业',
    registered_capital: 1500,
    industry_tags: ['人工智能', '软件与数字化'],
    tags: '',
    attachment: null,
    created_at: '2026-04-02 08:29:00',
    updated_at: '2026-04-02 08:29:00',
    created_by: 1,
    contacts: [
      {
        id: 4,
        name: '于航',
        position: '总经理',
        department: '管理层',
        phone: '17302171317',
        email: 'linhao@linli-tech.com.cn',
        relationship: '可约局'
      }
    ],
    opportunities: []
  },
  {
    id: 6,
    company_name: '麟鲤科技2',
    credit_code: '91310115MA01234568',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区张江高科技园区',
    phone: '021-12345679',
    email: 'info@linli-tech2.com',
    description: '麟鲤科技的子公司',
    registered_capital: 800,
    industry_tags: ['人工智能', '软件与数字化'],
    tags: '',
    attachment: null,
    created_at: '2026-04-02 08:30:00',
    updated_at: '2026-04-02 08:30:00',
    created_by: 1,
    contacts: [
      {
        id: 5,
        name: '林',
        position: null,
        department: null,
        phone: '17302171317',
        email: 'lin@linli-tech2.com',
        relationship: '认识'
      }
    ],
    opportunities: []
  },
  {
    id: 7,
    company_name: 'xxx科技',
    credit_code: '91310115MA01234569',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区张江高科技园区',
    phone: '021-12345680',
    email: 'info@xxx-tech.com',
    description: '科技创新企业',
    registered_capital: 1000,
    industry_tags: ['软件与数字化'],
    tags: '',
    attachment: null,
    created_at: '2026-04-13 05:35:00',
    updated_at: '2026-04-13 05:35:00',
    created_by: 1,
    contacts: [
      {
        id: 6,
        name: 'yy',
        position: null,
        department: null,
        phone: '1853435435',
        email: 'yy@xxx-tech.com',
        relationship: '认识'
      }
    ],
    opportunities: []
  },
  {
    id: 8,
    company_name: 'dxxx科技',
    credit_code: '91310115MA01234570',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区张江高科技园区',
    phone: '021-12345681',
    email: 'info@dxxx-tech.com',
    description: '数字科技企业',
    registered_capital: 1200,
    industry_tags: ['软件与数字化', '数据服务'],
    tags: '',
    attachment: null,
    created_at: '2026-04-13 05:41:00',
    updated_at: '2026-04-13 05:41:00',
    created_by: 1,
    contacts: [
      {
        id: 7,
        name: 'yy',
        position: null,
        department: null,
        phone: '1853435435',
        email: 'yy@dxxx-tech.com',
        relationship: '认识'
      }
    ],
    opportunities: []
  },
  {
    id: 9,
    company_name: '麟鲤科技3',
    credit_code: '91310115MA01234571',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区张江高科技园区',
    phone: '021-12345682',
    email: 'info@linli-tech3.com',
    description: '麟鲤科技的另一家子公司',
    registered_capital: 900,
    industry_tags: ['人工智能', '软件与数字化'],
    tags: '',
    attachment: null,
    created_at: '2026-04-02 08:44:00',
    updated_at: '2026-04-02 08:44:00',
    created_by: 1,
    contacts: [
      {
        id: 8,
        name: '陈',
        position: null,
        department: null,
        phone: '13812345678',
        email: 'linhao@linli-tech.com.cn',
        relationship: '认识'
      }
    ],
    opportunities: []
  },
  {
    id: 10,
    company_name: '测试科技有限公司',
    credit_code: '91310115MA01234572',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区张江高科技园区',
    phone: '021-12345683',
    email: 'info@test-tech.com',
    description: '测试用公司',
    registered_capital: 500,
    industry_tags: ['软件与数字化'],
    tags: '测试',
    attachment: null,
    created_at: '2026-04-14 10:00:00',
    updated_at: '2026-04-14 10:00:00',
    created_by: 2,
    contacts: [
      {
        id: 9,
        name: '测试用户',
        position: '测试工程师',
        department: '测试部',
        phone: '13812345678',
        email: 'test@test-tech.com',
        relationship: '认识'
      }
    ],
    opportunities: []
  },
  {
    id: 11,
    company_name: '示例科技有限公司',
    credit_code: '91310115MA01234573',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区张江高科技园区',
    phone: '021-12345684',
    email: 'info@example-tech.com',
    description: '示例用公司',
    registered_capital: 600,
    industry_tags: ['软件与数字化'],
    tags: '示例',
    attachment: null,
    created_at: '2026-04-14 11:00:00',
    updated_at: '2026-04-14 11:00:00',
    created_by: 2,
    contacts: [
      {
        id: 10,
        name: '示例用户',
        position: '示例职位',
        department: '示例部门',
        phone: '13912345678',
        email: 'example@example-tech.com',
        relationship: '认识'
      }
    ],
    opportunities: []
  },
  {
    id: 12,
    company_name: '演示科技有限公司',
    credit_code: '91310115MA01234574',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市浦东新区张江高科技园区',
    phone: '021-12345685',
    email: 'info@demo-tech.com',
    description: '演示用公司',
    registered_capital: 700,
    industry_tags: ['软件与数字化'],
    tags: '演示',
    attachment: null,
    created_at: '2026-04-14 12:00:00',
    updated_at: '2026-04-14 12:00:00',
    created_by: 3,
    contacts: [
      {
        id: 11,
        name: '演示用户',
        position: '演示工程师',
        department: '演示部',
        phone: '13912345678',
        email: 'demo@demo-tech.com',
        relationship: '认识'
      }
    ],
    opportunities: []
  }
]

export const mockOpportunities = [
  {
    id: 1,
    customer_id: 1,
    title: '北京科技的需求',
    opportunity_type: 'proposal',
    status: '跟进中',
    description: 'AI平台建设项目，预计金额500万',
    probability: 50,
    expected_close_date: '2024-06-30',
    created_at: '2024-01-16 14:20:00',
    updated_at: '2024-01-16 14:20:00',
    created_by: 1,
    updated_by: 1,
    customer: {
      id: 1,
      company_name: '北京科技有限公司'
    }
  },
  {
    id: 2,
    customer_id: null,
    title: '尚未建档的客户的需求',
    opportunity_type: 'intent',
    status: '跟进中',
    description: '某大型企业的数字化转型项目',
    probability: 10,
    expected_close_date: '2024-12-31',
    created_at: '2024-01-17 10:00:00',
    updated_at: '2024-01-17 10:00:00',
    created_by: 2,
    updated_by: 2,
    customer: null
  },
  {
    id: 3,
    customer_id: 2,
    title: '上海贸易的需求',
    opportunity_type: 'contract',
    status: '签约',
    description: '电子元器件采购合同',
    probability: 75,
    expected_close_date: '2024-03-15',
    created_at: '2024-01-18 09:30:00',
    updated_at: '2024-01-19 16:45:00',
    created_by: 2,
    updated_by: 1,
    customer: {
      id: 2,
      company_name: '上海贸易有限公司'
    }
  },
  {
    id: 4,
    customer_id: 5,
    title: '麟鲤科技的AI项目',
    opportunity_type: 'contract',
    status: '跟进中',
    description: 'AI算法开发项目',
    probability: 75,
    expected_close_date: '2026-06-30',
    created_at: '2026-04-03 10:00:00',
    updated_at: '2026-04-03 10:00:00',
    created_by: 1,
    updated_by: 1,
    customer: {
      id: 5,
      company_name: '麟鲤科技'
    }
  },
  {
    id: 5,
    customer_id: 7,
    title: 'xxx科技的数字化项目',
    opportunity_type: 'intent',
    status: '跟进中',
    description: '企业数字化转型项目',
    probability: 10,
    expected_close_date: '2026-12-31',
    created_at: '2026-04-14 09:00:00',
    updated_at: '2026-04-14 09:00:00',
    created_by: 1,
    updated_by: 1,
    customer: {
      id: 7,
      company_name: 'xxx科技'
    }
  }
]

export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@company.com',
    unit: '总部',
    role: 'admin',
    created_at: '2024-01-01 00:00:00'
  },
  {
    id: 2,
    username: 'zhangsan',
    email: 'zhangsan@company.com',
    unit: '销售部',
    role: 'entry',
    created_at: '2024-01-10 10:00:00'
  },
  {
    id: 3,
    username: 'lisi',
    email: 'lisi@company.com',
    unit: '市场部',
    role: 'entry',
    created_at: '2024-01-12 14:30:00'
  },
  {
    id: 4,
    username: 'wangwu',
    email: 'wangwu@company.com',
    unit: '技术部',
    role: 'entry',
    created_at: '2024-01-15 09:20:00'
  },
  {
    id: 5,
    username: 'zhaoliu',
    email: 'zhaoliu@company.com',
    unit: '财务部',
    role: 'entry',
    created_at: '2024-01-18 11:45:00'
  },
  {
    id: 6,
    username: 'chenqi',
    email: 'chenqi@company.com',
    unit: '人力资源部',
    role: 'entry',
    created_at: '2024-01-20 15:10:00'
  },
  {
    id: 7,
    username: 'sunba',
    email: 'sunba@company.com',
    unit: '运营部',
    role: 'entry',
    created_at: '2024-01-22 08:30:00'
  },
  {
    id: 8,
    username: 'zhoujiu',
    email: 'zhoujiu@company.com',
    unit: '销售部',
    role: 'entry',
    created_at: '2024-01-25 14:20:00'
  },
  {
    id: 9,
    username: 'wushi',
    email: 'wushi@company.com',
    unit: '技术部',
    role: 'entry',
    created_at: '2024-01-28 10:15:00'
  },
  {
    id: 10,
    username: 'liming',
    email: 'liming@company.com',
    unit: '市场部',
    role: 'entry',
    created_at: '2024-01-30 16:40:00'
  }
]

export const mockUrgentCustomers = [
  {
    id: 1,
    company_name: '杭州互联网公司',
    description: '有强烈的合作意向，需要尽快接触',
    created_at: '2024-01-19 11:00:00',
    updated_at: '2024-01-19 11:00:00',
    created_by: 1
  },
  {
    id: 2,
    company_name: '成都科技公司',
    description: '通过展会认识，对产品感兴趣',
    created_at: '2024-01-20 09:15:00',
    updated_at: '2024-01-20 09:15:00',
    created_by: 2
  }
]

export const mockNotifications = [
  {
    id: 1,
    type: 'customer_created',
    title: '新客户录入',
    content: '录入员 zhangsan 新增客户「上海贸易有限公司」，请管理员关注客户资料完整性。',
    customer_id: 2,
    customer_name: '上海贸易有限公司',
    actor_id: 2,
    actor_name: 'zhangsan',
    target_roles: ['admin'],
    read_by: [],
    created_at: '2026-04-14 10:18:00'
  },
  {
    id: 2,
    type: 'customer_created',
    title: '新客户录入',
    content: '录入员 lisi 新增客户「演示科技有限公司」。',
    customer_id: 12,
    customer_name: '演示科技有限公司',
    actor_id: 3,
    actor_name: 'lisi',
    target_roles: ['admin'],
    read_by: [1],
    created_at: '2026-04-14 12:08:00'
  },
  {
    id: 3,
    type: 'system',
    title: '客户模板更新',
    content: '客户批量导入模板已增加省市/国家标签和航运行业标签字段。',
    target_roles: ['admin', 'entry'],
    read_by: [],
    created_at: '2026-04-15 09:30:00'
  }
]

export const mockCurrentUser = {
  id: 1,
  username: 'admin',
  email: 'admin@company.com',
  unit: '总部',
  role: 'admin'
}

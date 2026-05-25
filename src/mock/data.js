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
    follow_notes: [
      {
        id: 1,
        content: '客户希望先确认船期协同和报价流程能否统一到一个入口，建议下次沟通带上方案示意。',
        mention_user_ids: [2, 4],
        created_by: 1,
        created_by_name: 'admin',
        created_at: '2024-01-17 09:30:00'
      }
    ],
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
    follow_notes: [
      {
        id: 2,
        content: '客户暂未建档，后续需要先确认主体名称、统一社会信用代码和联系人信息。',
        mention_user_ids: [1],
        created_by: 2,
        created_by_name: 'zhangsan',
        created_at: '2024-01-17 15:45:00'
      }
    ],
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
    follow_notes: [
      {
        id: 3,
        content: '合同需求已推进到商务确认阶段，需关注交付范围和付款节点。',
        mention_user_ids: [1, 5],
        created_by: 1,
        created_by_name: 'admin',
        created_at: '2024-01-20 11:20:00'
      }
    ],
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
    follow_notes: [],
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
    follow_notes: [],
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

const expandedCustomers = [
  {
    id: 13,
    company_name: '远洋航运集团',
    credit_code: '91310000MA10000013',
    region: null,
    province: '上海市',
    city: '上海市',
    country: null,
    address: '上海市虹口区东大名路航运中心',
    phone: '021-61000013',
    email: 'bd@ocean-shipping.com',
    description: '综合船东企业，主营集装箱与散货运输。',
    registered_capital: 12000,
    industry_tags: ['船舶管理', '班轮运输', '集装箱运输'],
    tags: '重点客户',
    attachment: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 2,
    contacts: [
      { id: 13, name: '周航', position: '商务总监', department: '市场部', phone: '13800000013', email: 'zhouhang@ocean-shipping.com', relationship: '可支持' }
    ],
    opportunities: [],
    background_notes: []
  },
  {
    id: 14,
    company_name: '海联船务代理',
    credit_code: '91440300MA10000014',
    region: null,
    province: '广东省',
    city: '深圳市',
    country: null,
    address: '深圳市盐田区港口服务大厦',
    phone: '0755-61000014',
    email: 'ops@sealinks-agent.com',
    description: '华南口岸船代与港口协调服务商。',
    registered_capital: 1800,
    industry_tags: ['船代', '港口码头', '报关报检'],
    tags: '',
    attachment: null,
    created_at: '2026-04-18 09:10:00',
    updated_at: '2026-04-18 09:10:00',
    created_by: 3,
    contacts: [
      { id: 14, name: '林海', position: '操作经理', department: '船代部', phone: '13800000014', email: 'linhai@sealinks-agent.com', relationship: '可约局' }
    ],
    opportunities: [],
    background_notes: []
  },
  {
    id: 15,
    company_name: '华港国际货运',
    credit_code: '91330200MA10000015',
    region: null,
    province: '浙江省',
    city: '宁波市',
    country: null,
    address: '宁波市鄞州区航运广场',
    phone: '0574-61000015',
    email: 'sales@huagang-logistics.com',
    description: '宁波口岸货代、订舱与海铁联运服务商。',
    registered_capital: 2600,
    industry_tags: ['货代服务', '租船订舱', '海铁联运'],
    tags: '重点客户',
    attachment: null,
    created_at: '2026-04-19 11:20:00',
    updated_at: '2026-04-19 11:20:00',
    created_by: 2,
    contacts: [
      { id: 15, name: '陈港', position: '销售负责人', department: '商务部', phone: '13800000015', email: 'chengang@huagang-logistics.com', relationship: '认识' }
    ],
    opportunities: [],
    background_notes: []
  },
  {
    id: 16,
    company_name: '东海港务物流',
    credit_code: '91370200MA10000016',
    region: null,
    province: '山东省',
    city: '青岛市',
    country: null,
    address: '青岛市黄岛区前湾港区',
    phone: '0532-61000016',
    email: 'contact@eastharbor.com',
    description: '港口仓储、堆场与多式联运企业。',
    registered_capital: 5200,
    industry_tags: ['港口码头', '仓储堆场', '多式联运'],
    tags: '',
    attachment: null,
    created_at: '2026-04-20 14:00:00',
    updated_at: '2026-04-20 14:00:00',
    created_by: 2,
    contacts: [
      { id: 16, name: '王堆场', position: '运营总监', department: '运营部', phone: '13800000016', email: 'wang@eastharbor.com', relationship: '可支持' }
    ],
    opportunities: [],
    background_notes: []
  },
  {
    id: 17,
    company_name: '厦门海丝船舶服务',
    credit_code: '91350200MA10000017',
    region: null,
    province: '福建省',
    city: '厦门市',
    country: null,
    address: '厦门市湖里区自贸片区',
    phone: '0592-61000017',
    email: 'service@maritime-silk.com',
    description: '船舶供应、维修与船员服务企业。',
    registered_capital: 1600,
    industry_tags: ['船舶供应', '船舶维修', '船员服务'],
    tags: '',
    attachment: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 3,
    contacts: [
      { id: 17, name: '黄船服', position: '客户经理', department: '服务部', phone: '13800000017', email: 'huang@maritime-silk.com', relationship: '认识' }
    ],
    opportunities: [],
    background_notes: []
  },
  {
    id: 18,
    company_name: '大连北方船管',
    credit_code: '91210200MA10000018',
    region: null,
    province: '辽宁省',
    city: '大连市',
    country: null,
    address: '大连市中山区港湾街',
    phone: '0411-61000018',
    email: 'mgmt@north-ship.com',
    description: '船舶管理与油化品运输管理服务。',
    registered_capital: 3800,
    industry_tags: ['船舶管理', '油化品运输', '船舶检验'],
    tags: '重点客户',
    attachment: null,
    created_at: '2026-04-21 16:30:00',
    updated_at: '2026-04-21 16:30:00',
    created_by: 2,
    contacts: [
      { id: 18, name: '赵北航', position: '副总经理', department: '船管部', phone: '13800000018', email: 'zhao@north-ship.com', relationship: '可约局' }
    ],
    opportunities: [],
    background_notes: []
  },
  {
    id: 19,
    company_name: '广州南沙冷链物流',
    credit_code: '91440100MA10000019',
    region: null,
    province: '广东省',
    city: '广州市',
    country: null,
    address: '广州市南沙区港前大道',
    phone: '020-61000019',
    email: 'coldchain@nansha-logistics.com',
    description: '港口冷链仓储与跨境物流服务商。',
    registered_capital: 3200,
    industry_tags: ['冷链物流', '跨境物流', '仓储堆场'],
    tags: '',
    attachment: null,
    created_at: '2026-04-22 08:40:00',
    updated_at: '2026-04-22 08:40:00',
    created_by: 3,
    contacts: [
      { id: 19, name: '何冷链', position: '业务经理', department: '国际部', phone: '13800000019', email: 'he@nansha-logistics.com', relationship: '认识' }
    ],
    opportunities: [],
    background_notes: []
  },
  {
    id: 20,
    company_name: '新加坡海贸控股',
    credit_code: null,
    region: '国外',
    province: null,
    city: null,
    country: '新加坡',
    address: 'Marina Boulevard, Singapore',
    phone: '+65-61000020',
    email: 'apac@sg-maritime.com',
    description: '东南亚航运贸易与船舶经纪企业。',
    registered_capital: null,
    industry_tags: ['船舶经纪', '国际贸易', '航运咨询'],
    tags: '',
    attachment: null,
    created_at: '2026-04-23 10:15:00',
    updated_at: '2026-04-23 10:15:00',
    created_by: 1,
    contacts: [
      { id: 20, name: 'Tan Wei', position: 'BD Director', department: 'APAC', phone: '+65-90000020', email: 'tan@sg-maritime.com', relationship: '可支持' }
    ],
    opportunities: [],
    background_notes: []
  }
]

const expandedOpportunities = [
  { id: 6, customer_id: 13, title: '远洋航运船管系统需求', opportunity_type: 'contract', status: '跟进中', description: '船队管理与客户档案系统升级', probability: 75, expected_close_date: '2026-07-20', created_at: '2026-04-18 10:00:00', updated_at: '2026-04-18 10:00:00', created_by: 2, updated_by: 1, customer: { id: 13, company_name: '远洋航运集团' } },
  { id: 7, customer_id: 13, title: '远洋航运订舱协同需求', opportunity_type: 'proposal', status: '跟进中', description: '订舱流程与客户跟进协同', probability: 50, expected_close_date: '2026-08-15', created_at: '2026-04-19 09:30:00', updated_at: '2026-04-19 09:30:00', created_by: 2, updated_by: 2, customer: { id: 13, company_name: '远洋航运集团' } },
  { id: 8, customer_id: 13, title: '远洋航运通知集成需求', opportunity_type: 'intent', status: '跟进中', description: '小程序通知与内部消息同步', probability: 10, expected_close_date: '2026-09-01', created_at: '2026-04-20 15:30:00', updated_at: '2026-04-20 15:30:00', created_by: 3, updated_by: 3, customer: { id: 13, company_name: '远洋航运集团' } },
  { id: 9, customer_id: 15, title: '华港国际货运客户分级需求', opportunity_type: 'proposal', status: '跟进中', description: '按航线与货类管理客户池', probability: 50, expected_close_date: '2026-06-25', created_at: '2026-04-20 11:00:00', updated_at: '2026-04-20 11:00:00', created_by: 2, updated_by: 2, customer: { id: 15, company_name: '华港国际货运' } },
  { id: 10, customer_id: 15, title: '宁波口岸货代导入需求', opportunity_type: 'intent', status: '跟进中', description: '批量导入客户与联系人数据', probability: 10, expected_close_date: '2026-07-05', created_at: '2026-04-21 13:20:00', updated_at: '2026-04-21 13:20:00', created_by: 1, updated_by: 1, customer: { id: 15, company_name: '华港国际货运' } },
  { id: 11, customer_id: 16, title: '东海港务物流仓储客户需求', opportunity_type: 'contract', status: '签约', description: '港区仓储客户统计与跟进', probability: 75, expected_close_date: '2026-05-28', created_at: '2026-04-22 09:00:00', updated_at: '2026-04-23 09:00:00', created_by: 2, updated_by: 1, customer: { id: 16, company_name: '东海港务物流' } },
  { id: 12, customer_id: 18, title: '大连北方船管风控需求', opportunity_type: 'proposal', status: '跟进中', description: '客户背景信息与风险标签管理', probability: 50, expected_close_date: '2026-08-08', created_at: '2026-04-23 16:10:00', updated_at: '2026-04-23 16:10:00', created_by: 2, updated_by: 2, customer: { id: 18, company_name: '大连北方船管' } },
  { id: 13, customer_id: 14, title: '海联船务代理操作协同需求', opportunity_type: 'intent', status: '跟进中', description: '船代客户跟进与港口联系人沉淀', probability: 10, expected_close_date: '2026-06-10', created_at: '2026-04-24 10:00:00', updated_at: '2026-04-24 10:00:00', created_by: 3, updated_by: 3, customer: { id: 14, company_name: '海联船务代理' } },
  { id: 14, customer_id: 17, title: '海丝船舶服务供应商管理需求', opportunity_type: 'intent', status: '跟进中', description: '船供客户与维修记录统一管理', probability: 10, expected_close_date: '2026-07-18', created_at: '2026-04-24 14:30:00', updated_at: '2026-04-24 14:30:00', created_by: 3, updated_by: 3, customer: { id: 17, company_name: '厦门海丝船舶服务' } },
  { id: 15, customer_id: 20, title: '新加坡海贸跨境客户需求', opportunity_type: 'proposal', status: '跟进中', description: '海外客户档案与微信通知联动', probability: 50, expected_close_date: '2026-09-12', created_at: '2026-04-25 09:45:00', updated_at: '2026-04-25 09:45:00', created_by: 1, updated_by: 1, customer: { id: 20, company_name: '新加坡海贸控股' } }
]

const attachOpportunitiesToCustomer = (customer) => {
  const existingOpportunities = customer.opportunities || [];
  const appendedOpportunities = expandedOpportunities
    .filter(opportunity => opportunity.customer_id === customer.id)
    .map(opportunity => ({
      id: opportunity.id,
      title: opportunity.title,
      opportunity_type: opportunity.opportunity_type,
      status: opportunity.status,
      description: opportunity.description,
      created_at: opportunity.created_at
    }));

  const opportunityMap = new Map();
  [...existingOpportunities, ...appendedOpportunities].forEach(opportunity => {
    opportunityMap.set(opportunity.id, opportunity);
  });

  return {
    ...customer,
    opportunities: Array.from(opportunityMap.values())
  };
}

const getOpportunityFollowNotes = (opportunity) => opportunity.follow_notes || [];

mockCustomers.push(...expandedCustomers)
const customerRouteTags = {
  1: ['北美航线', '欧洲航线'],
  2: ['地中海航线', '欧洲航线'],
  3: ['北美航线', '日韩航线'],
  4: ['东南亚航线', '中东航线'],
  5: ['东南亚航线'],
  6: ['日韩航线', '东南亚航线'],
  7: ['南美航线'],
  8: ['中东航线', '非洲航线'],
  9: ['地中海航线'],
  10: ['澳新航线', '东南亚航线'],
  11: ['南美航线', '北美航线'],
  12: ['非洲航线', '中东航线'],
  13: ['地中海航线', '中东航线'],
  14: ['中东航线', '非洲航线'],
  15: ['南美航线', '地中海航线'],
  16: ['日韩航线', '东南亚航线'],
  17: ['非洲航线', '红海航线'],
  18: ['中东航线', '黑海航线'],
  19: ['南美航线', '东南亚航线'],
  20: ['东南亚航线', '澳新航线']
}

const customerCustomTags = {
  1: ['数字化客户', '重点跟进'],
  2: ['贸易货主', '项目货客户'],
  3: ['海外客户', '平台客户'],
  4: ['潜在客户', '特种箱船东'],
  5: ['数字化客户', '长期合作'],
  6: ['关联客户', '冷藏箱客户'],
  7: ['散货船东', '需重点跟进'],
  8: ['危险品客户', '中东货源'],
  9: ['软件客户', '集装箱船东'],
  10: ['潜在客户', '澳新货源'],
  11: ['北美货源', '大宗货主'],
  12: ['非洲货源', '风控关注'],
  13: ['重点客户', '散货船东'],
  14: ['船代资源', '需重点跟进'],
  15: ['特种箱船东', '项目货客户'],
  16: ['长期合作', '冷藏箱客户'],
  17: ['船供资源', '潜在客户'],
  18: ['散货船东', '风控关注'],
  19: ['冷链客户', '南美货源'],
  20: ['海外客户', '集装箱船东']
}

mockCustomers.forEach((customer, index) => {
  const existingCustomTags = customer.tags
    ? customer.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];
  const mergedCustomTags = [...new Set([...existingCustomTags, ...(customerCustomTags[customer.id] || [])])];
  mockCustomers[index] = attachOpportunitiesToCustomer({
    ...customer,
    route_tags: customer.route_tags || customerRouteTags[customer.id] || [],
    tags: mergedCustomTags.join(',')
  })
})
mockOpportunities.push(...expandedOpportunities.map(opportunity => ({
  ...opportunity,
  follow_notes: getOpportunityFollowNotes(opportunity)
})))

export const mockCurrentUser = {
  id: 1,
  username: 'admin',
  email: 'admin@company.com',
  unit: '总部',
  role: 'admin'
}

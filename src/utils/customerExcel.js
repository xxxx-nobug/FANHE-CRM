const CUSTOMER_TEMPLATE_HEADERS = [
  '公司名称',
  '是否国外',
  '省份/直辖市',
  '城市/国家',
  '统一社会信用代码',
  '地址',
  '电话',
  '邮箱',
  '注册资金万元',
  '行业标签',
  '航线标签',
  '其他标签',
  '描述',
  '联系人姓名',
  '联系人职位',
  '联系人部门',
  '联系人电话',
  '联系人邮箱',
  '联系人关系'
];

const TEMPLATE_SAMPLE_ROW = {
  公司名称: '示例航运服务有限公司',
  是否国外: '否',
  '省份/直辖市': '上海市',
  '城市/国家': '上海市',
  统一社会信用代码: '91310000MA00000000',
  地址: '上海市浦东新区示例路100号',
  电话: '021-00000000',
  邮箱: 'contact@example.com',
  注册资金万元: 1000,
  行业标签: '船舶管理、船代、租船订舱',
  航线标签: '地中海航线、中东航线',
  其他标签: '重点客户',
  描述: '模板示例，导入前可删除本行',
  联系人姓名: '张三',
  联系人职位: '经理',
  联系人部门: '商务部',
  联系人电话: '13800000000',
  联系人邮箱: 'zhangsan@example.com',
  联系人关系: '认识'
};

const INSTRUCTION_ROWS = [
  ['字段', '说明'],
  ['公司名称', '必填。每行代表一个客户。'],
  ['是否国外', '填“是”或“否”。国外客户不需要填写统一社会信用代码。'],
  ['省份/直辖市', '国内客户填写省份、直辖市或特别行政区；国外客户可留空。'],
  ['城市/国家', '国内客户填写城市；国外客户填写国家。'],
  ['行业标签', '可填写多个标签，用顿号、逗号、分号或换行分隔，例如：船舶管理、船代、租船订舱。'],
  ['航线标签', '可选。填写客户对应航线，例如：地中海航线、南美航线、中东航线、非洲航线。'],
  ['其他标签', '可填写黑名单、重点客户等补充标签，多个标签同样用顿号、逗号或分号分隔。'],
  ['联系人字段', '联系人信息可选；填写联系人姓名后会随客户一并导入。']
];

const splitTags = (value) => (
  String(value || '')
    .split(/[,，、;；\n]/)
    .map(item => item.trim())
    .filter(Boolean)
);

const normalizeText = (value) => String(value || '').trim();

const isForeignValue = (value) => ['是', '国外', 'yes', 'y', 'true'].includes(normalizeText(value).toLowerCase());

const loadXlsx = async () => import('xlsx');

const buildWorkbook = (XLSX, rows, sheetName) => {
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: CUSTOMER_TEMPLATE_HEADERS });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return workbook;
};

export const downloadCustomerTemplate = async () => {
  const XLSX = await loadXlsx();
  const workbook = buildWorkbook(XLSX, [TEMPLATE_SAMPLE_ROW], '客户导入模板');
  const instructionSheet = XLSX.utils.aoa_to_sheet(INSTRUCTION_ROWS);
  XLSX.utils.book_append_sheet(workbook, instructionSheet, '填写说明');
  XLSX.writeFile(workbook, '客户批量导入模板.xlsx');
};

export const exportCustomersToExcel = async (customers) => {
  const XLSX = await loadXlsx();
  const rows = customers.map(customer => ({
    公司名称: customer.company_name || '',
    是否国外: customer.country ? '是' : '否',
    '省份/直辖市': customer.province || '',
    '城市/国家': customer.country || customer.city || '',
    统一社会信用代码: customer.credit_code || '',
    地址: customer.address || '',
    电话: customer.phone || '',
    邮箱: customer.email || '',
    注册资金万元: customer.registered_capital ?? '',
    行业标签: (customer.industry_tags || []).join('、'),
    航线标签: (customer.route_tags || []).join('、'),
    其他标签: customer.tags || '',
    描述: customer.description || '',
    联系人姓名: customer.contacts?.[0]?.name || '',
    联系人职位: customer.contacts?.[0]?.position || '',
    联系人部门: customer.contacts?.[0]?.department || '',
    联系人电话: customer.contacts?.[0]?.phone || '',
    联系人邮箱: customer.contacts?.[0]?.email || '',
    联系人关系: customer.contacts?.[0]?.relationship || ''
  }));

  const workbook = buildWorkbook(XLSX, rows.length > 0 ? rows : [], '客户数据');
  XLSX.writeFile(workbook, '客户数据导出.xlsx');
};

export const parseCustomersFromExcel = async (file, options = {}) => {
  const XLSX = await loadXlsx();
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  const errors = [];
  const now = new Date().toISOString();

  const customers = rows.map((row, index) => {
    const rowNumber = index + 2;
    const companyName = normalizeText(row['公司名称']);
    if (!companyName) {
      errors.push(`第 ${rowNumber} 行缺少公司名称`);
      return null;
    }

    const isForeign = isForeignValue(row['是否国外']);
    const province = isForeign ? null : normalizeText(row['省份/直辖市']);
    const cityOrCountry = normalizeText(row['城市/国家']);
    const creditCode = normalizeText(row['统一社会信用代码']);

    if (!isForeign && !province) {
      errors.push(`第 ${rowNumber} 行缺少省份/直辖市`);
    }
    if (!isForeign && !cityOrCountry) {
      errors.push(`第 ${rowNumber} 行缺少城市`);
    }
    if (!isForeign && !creditCode) {
      errors.push(`第 ${rowNumber} 行缺少统一社会信用代码`);
    }
    if (isForeign && !cityOrCountry) {
      errors.push(`第 ${rowNumber} 行缺少国家`);
    }

    const contactName = normalizeText(row['联系人姓名']);
    const contacts = contactName ? [{
      id: Date.now() + index,
      name: contactName,
      position: normalizeText(row['联系人职位']) || null,
      department: normalizeText(row['联系人部门']) || null,
      phone: normalizeText(row['联系人电话']) || null,
      email: normalizeText(row['联系人邮箱']) || null,
      relationship: normalizeText(row['联系人关系']) || '认识'
    }] : [];

    return {
      id: (options.baseId || Date.now()) + index,
      company_name: companyName,
      credit_code: isForeign ? null : creditCode,
      region: isForeign ? '国外' : null,
      province,
      city: isForeign ? null : cityOrCountry,
      country: isForeign ? cityOrCountry : null,
      address: normalizeText(row['地址']),
      phone: normalizeText(row['电话']),
      email: normalizeText(row['邮箱']),
      description: normalizeText(row['描述']),
      registered_capital: Number(row['注册资金万元']) || null,
      industry_tags: splitTags(row['行业标签']),
      route_tags: splitTags(row['航线标签']),
      tags: splitTags(row['其他标签']).join(','),
      attachment: null,
      created_at: now,
      updated_at: now,
      created_by: options.userId || 1,
      contacts,
      opportunities: [],
      background_notes: []
    };
  }).filter(Boolean);

  return {
    customers: errors.length > 0 ? [] : customers,
    errors
  };
};

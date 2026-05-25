export const FOREIGN_LOCATION_VALUE = '国外';

export const locationOptions = [
  { value: '北京市', label: '北京市', children: [{ value: '北京市', label: '北京市' }] },
  { value: '上海市', label: '上海市', children: [{ value: '上海市', label: '上海市' }] },
  { value: '天津市', label: '天津市', children: [{ value: '天津市', label: '天津市' }] },
  { value: '重庆市', label: '重庆市', children: [{ value: '重庆市', label: '重庆市' }] },
  {
    value: '广东省',
    label: '广东省',
    children: ['广州', '深圳', '珠海', '佛山', '东莞', '中山', '惠州', '湛江'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  {
    value: '江苏省',
    label: '江苏省',
    children: ['南京', '苏州', '无锡', '常州', '南通', '连云港', '盐城'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  {
    value: '浙江省',
    label: '浙江省',
    children: ['杭州', '宁波', '温州', '嘉兴', '舟山', '台州'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  {
    value: '山东省',
    label: '山东省',
    children: ['济南', '青岛', '烟台', '威海', '日照', '潍坊'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  {
    value: '福建省',
    label: '福建省',
    children: ['福州', '厦门', '泉州', '漳州', '宁德'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  {
    value: '辽宁省',
    label: '辽宁省',
    children: ['沈阳', '大连', '营口', '丹东', '锦州'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  {
    value: '海南省',
    label: '海南省',
    children: ['海口', '三亚', '洋浦'].map(city => ({
      value: `${city}`,
      label: `${city}`
    }))
  },
  {
    value: '河北省',
    label: '河北省',
    children: ['石家庄', '唐山', '秦皇岛', '沧州'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  {
    value: '湖北省',
    label: '湖北省',
    children: ['武汉', '宜昌', '襄阳'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  {
    value: '四川省',
    label: '四川省',
    children: ['成都', '绵阳', '宜宾'].map(city => ({
      value: `${city}市`,
      label: `${city}市`
    }))
  },
  { value: '香港特别行政区', label: '香港特别行政区', children: [{ value: '香港', label: '香港' }] },
  {
    value: FOREIGN_LOCATION_VALUE,
    label: FOREIGN_LOCATION_VALUE,
    children: [
      '美国',
      '日本',
      '德国',
      '英国',
      '法国',
      '韩国',
      '新加坡',
      '澳大利亚',
      '加拿大',
      '荷兰',
      '阿联酋',
      '沙特阿拉伯',
      '印度',
      '越南',
      '马来西亚',
      '印度尼西亚',
      '其他'
    ].map(country => ({ value: country, label: country }))
  }
];

export const industryOptions = [
  {
    value: '航运服务',
    label: '航运服务',
    children: [
      '船舶管理',
      '船代',
      '货代服务',
      '租船订舱',
      '班轮运输',
      '散货运输',
      '油化品运输',
      '集装箱运输',
      '船舶供应',
      '船员服务'
    ].map(label => ({ value: label, label }))
  },
  {
    value: '港口与物流',
    label: '港口与物流',
    children: [
      '港口码头',
      '仓储堆场',
      '报关报检',
      '多式联运',
      '冷链物流',
      '跨境物流',
      '内河航运',
      '海铁联运'
    ].map(label => ({ value: label, label }))
  },
  {
    value: '船舶技术',
    label: '船舶技术',
    children: [
      '船舶制造',
      '船舶维修',
      '船舶设备',
      '海工装备',
      '航运数字化',
      '船舶新能源',
      '船舶检验'
    ].map(label => ({ value: label, label }))
  },
  {
    value: '航运金融与专业服务',
    label: '航运金融与专业服务',
    children: [
      '船舶融资',
      '船舶保险',
      '海事法律',
      '航运咨询',
      '船舶经纪',
      '运价数据'
    ].map(label => ({ value: label, label }))
  },
  {
    value: '贸易与制造',
    label: '贸易与制造',
    children: [
      '国际贸易',
      '大宗商品',
      '电子元器件贸易',
      '装备制造',
      '供应链服务'
    ].map(label => ({ value: label, label }))
  },
  {
    value: '科技服务',
    label: '科技服务',
    children: [
      '人工智能',
      '互联网平台',
      '软件与数字化',
      '物联网',
      '数据服务'
    ].map(label => ({ value: label, label }))
  }
];

export const routeOptions = [
  '地中海航线',
  '南美航线',
  '中东航线',
  '非洲航线',
  '欧洲航线',
  '北美航线',
  '东南亚航线',
  '日韩航线',
  '澳新航线',
  '印巴航线',
  '红海航线',
  '黑海航线'
].map(label => ({ value: label, label }));

export const customTagOptions = [
  '散货船东',
  '特种箱船东',
  '集装箱船东',
  '油化船东',
  '冷藏箱客户',
  '危险品客户',
  '大宗货主',
  '项目货客户',
  '重点客户',
  '潜在客户',
  '长期合作',
  '需重点跟进',
  '黑名单'
].map(label => ({ value: label, label }));

const splitTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags.filter(Boolean);
  }
  return (tags || '')
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
};

const findPath = (options, targetValue, prefix = []) => {
  for (const option of options) {
    const currentPath = [...prefix, option.value];
    if (option.value === targetValue) {
      return currentPath;
    }
    if (option.children) {
      const childPath = findPath(option.children, targetValue, currentPath);
      if (childPath) {
        return childPath;
      }
    }
  }
  return null;
};

const collectLeafValues = (option) => {
  if (!option.children || option.children.length === 0) {
    return [option.value];
  }
  return option.children.flatMap(collectLeafValues);
};

const findOptionByPath = (options, path = []) => {
  let currentOptions = options;
  let currentOption = null;

  for (const value of path) {
    currentOption = currentOptions?.find(option => option.value === value);
    if (!currentOption) return null;
    currentOptions = currentOption.children;
  }

  return currentOption;
};

export const getIndustryPath = (tag) => findPath(industryOptions, tag);

export const getIndustryValuesByPath = (path) => {
  if (!path || path.length === 0) return [];
  const option = findOptionByPath(industryOptions, path);
  return option ? collectLeafValues(option) : [];
};

export const getCustomerIndustryTags = (customer) => {
  if (Array.isArray(customer?.industry_tags) && customer.industry_tags.length > 0) {
    return customer.industry_tags;
  }

  const legacyTags = splitTags(customer?.tags);
  const mappedTags = [];
  if (legacyTags.includes('人工智能')) mappedTags.push('人工智能');
  if (legacyTags.includes('互联网')) mappedTags.push('互联网平台');
  if (legacyTags.includes('科技')) mappedTags.push('软件与数字化');
  if (legacyTags.includes('贸易')) mappedTags.push('国际贸易');
  if (legacyTags.includes('电子')) mappedTags.push('电子元器件贸易');
  if (legacyTags.includes('数字')) mappedTags.push('数据服务');

  return [...new Set(mappedTags)];
};

export const getCustomerRouteTags = (customer) => {
  if (Array.isArray(customer?.route_tags)) {
    return customer.route_tags.filter(Boolean);
  }
  return splitTags(customer?.route_tags);
};

export const getCustomTags = (customer) => {
  const industryTags = new Set(getCustomerIndustryTags(customer));
  const routeTags = new Set(getCustomerRouteTags(customer));
  return splitTags(customer?.tags).filter(tag => !industryTags.has(tag) && !routeTags.has(tag));
};

export const getCustomerLocationPath = (customer) => {
  if (Array.isArray(customer?.location_path) && customer.location_path.length > 0) {
    return customer.location_path;
  }

  if (customer?.country || customer?.region === FOREIGN_LOCATION_VALUE) {
    return [FOREIGN_LOCATION_VALUE, customer.country || '其他'];
  }

  if (customer?.province && customer?.city) {
    return [customer.province, customer.city];
  }

  const address = customer?.address || '';
  if (address.includes('北京')) return ['北京市', '北京市'];
  if (address.includes('上海')) return ['上海市', '上海市'];
  if (address.includes('深圳')) return ['广东省', '深圳市'];
  if (address.includes('广州')) return ['广东省', '广州市'];
  if (address.includes('青岛')) return ['山东省', '青岛市'];
  if (address.includes('宁波')) return ['浙江省', '宁波市'];
  if (address.includes('大连')) return ['辽宁省', '大连市'];

  return [];
};

export const formatLocationPath = (path = []) => {
  if (!path.length) return '-';
  if (path[0] === FOREIGN_LOCATION_VALUE) return path[1] || FOREIGN_LOCATION_VALUE;
  if (path[0] === path[1]) return path[0];
  return path.filter(Boolean).join(' ');
};

export const getCustomerLocationLabel = (customer) => formatLocationPath(getCustomerLocationPath(customer));

export const customerMatchesLocation = (customer, selectedPath = []) => {
  if (!selectedPath || selectedPath.length === 0) return true;

  const customerPath = getCustomerLocationPath(customer);
  return selectedPath.every((value, index) => customerPath[index] === value);
};

export const flattenIndustryPaths = (paths = []) => {
  if (!Array.isArray(paths)) return [];
  return [...new Set(paths.flatMap(path => getIndustryValuesByPath(path)).filter(Boolean))];
};

export const getIndustryPathsFromTags = (tags = []) => (
  tags
    .map(tag => getIndustryPath(tag))
    .filter(Boolean)
);

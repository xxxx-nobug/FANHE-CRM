const { mockCustomers } = require('./src/mock/data.js');

console.log('=== 检查重复的 opportunity ID ===\n');

let hasDuplicates = false;
let totalCustomersChecked = 0;

mockCustomers.forEach(customer => {
  if (customer.id >= 13 && customer.id <= 20) {
    totalCustomersChecked++;
    const oppIds = customer.opportunities.map(opp => opp.id);
    const uniqueIds = new Set(oppIds);
    
    if (oppIds.length !== uniqueIds.size) {
      hasDuplicates = true;
      console.log(`❌ 客户 ${customer.id} (${customer.company_name}) 存在重复:`);
      console.log(`   总数: ${oppIds.length}, 唯一数: ${uniqueIds.size}`);
      console.log(`   IDs: [${oppIds.join(', ')}]\n`);
    } else {
      console.log(`✅ 客户 ${customer.id} (${customer.company_name}) - ${oppIds.length} 个需求 (无重复)`);
      if (oppIds.length > 0) {
        console.log(`   IDs: [${oppIds.join(', ')}]`);
      }
      console.log();
    }
  }
});

console.log(`\n共检查 ${totalCustomersChecked} 个客户`);

if (!hasDuplicates) {
  console.log('\n🎉 所有客户的 opportunity ID 都是唯一的！修复成功！');
  process.exit(0);
} else {
  console.log('\n⚠️  仍然存在重复的 ID');
  process.exit(1);
}

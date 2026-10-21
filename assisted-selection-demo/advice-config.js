(() => {
  'use strict';
  const base = window.DEMO_CONFIG;
  const defaults = Object.entries(base.adviceCategories).map(([name, tags], i) => ({
    id: `category-${i + 1}`,
    name,
    english: ({工艺:'Process',面料:'Fabric',其他:'Other'})[name] || name,
    tags: tags.map((tag, j) => ({id: `tag-${i + 1}-${j + 1}`, name: tag, enabled: true})),
    enabled: true
  }));
  const categories = defaults;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const table = document.querySelector('#categories');
  table.innerHTML = categories.map(c => `<tr><td>${escape(c.name)}</td><td>${escape(c.english || c.name)}</td><td>列表单选</td><td class="row-actions"><button disabled>删除</button><button disabled>停用</button><a class="text-link" href="advice-tags.html?category=${encodeURIComponent(c.name)}">管理</a></td></tr>`).join('');
})();

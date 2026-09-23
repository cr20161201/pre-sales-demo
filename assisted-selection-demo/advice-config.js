(() => {
  'use strict';
  const base = window.DEMO_CONFIG;
  const key = base.adviceConfigKey;
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(key) || 'null'); } catch {}
  const defaults = Object.entries(base.adviceCategories).map(([name, tags], i) => ({
    id: `category-${i + 1}`,
    name,
    english: ({工艺:'Process',尺寸:'Size',面料:'Fabric',其他:'Other'})[name] || name,
    tags: tags.map((tag, j) => ({id: `tag-${i + 1}-${j + 1}`, name: tag, enabled: true})),
    enabled: true,
    expanded: name === '工艺' || name === '尺寸'
  }));
  const categories = defaults.map(category => ({...category, expanded: saved?.fields?.[category.name]?.expanded ?? category.expanded}));
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const table = document.querySelector('#categories');
  table.innerHTML = categories.map(c => `<tr><td>${escape(c.name)}</td><td>${escape(c.english || c.name)}</td><td>列表单选</td><td><input type="checkbox" data-category="${escape(c.name)}" aria-label="${escape(c.name)}是否展开" ${c.expanded ? 'checked' : ''}></td><td class="row-actions"><button disabled>删除</button><button disabled>停用</button><button disabled>管理</button></td></tr>`).join('');
  table.addEventListener('change', event => {
    const checkbox = event.target.closest('input[data-category]');
    if (!checkbox) return;
    let latest = saved || {};
    try { latest = JSON.parse(localStorage.getItem(key) || 'null') || latest; } catch {}
    const fields = {...latest.fields, [checkbox.dataset.category]: {expanded: checkbox.checked}};
    try {
      localStorage.setItem(key, JSON.stringify({...latest, fields}));
      saved = {...latest, fields};
    } catch {
      checkbox.checked = !checkbox.checked;
      const toast = document.querySelector('#toast');
      toast.textContent = '保存失败，请重试';
      toast.hidden = false;
    }
  });
})();

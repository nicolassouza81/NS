(() => {
  const catalogue = window.NS_PORTFOLIO;
  if (!catalogue) return;
  const number = value => String(value).padStart(2, '0');
  const asset = file => new URL(`assets/${file}`, document.querySelector('script[data-portfolio-base]').src).href;
  const caseUrl = id => new URL(`cases/${id}/index.html`, document.querySelector('script[data-portfolio-base]').src).href;
  const image = p => `<img src="${asset(p.image)}" alt="${p.imageAlt}" width="${p.width}" height="${p.height}" loading="lazy">`;

  const hero = document.getElementById('hero-fan');
  if (hero && Array.isArray(catalogue.featured)) {
    const featured = catalogue.featured.map(id => catalogue.projects.find(p => p.id === id)).filter(Boolean);
    const heroImage = p => p.id === 'fala-fin' ? 'fin-hoje.webp' : p.image;
    hero.innerHTML = featured.map((p, i) => {
      const angle = (-90 + i * 360 / featured.length) * Math.PI / 180;
      const title = p.heroTitle || p.title;
      const label = p.heroTag || (p.category === 'branding' ? 'BRANDING' : p.id === 'gran-minha-conta' ? 'APP MOBILE' : p.id === 'fala-fin' ? 'SITE & APP' : 'CONCEITO');
      const name = p.visual === 'gran' ? '<div class="hero-gran-name" aria-hidden="true">gran.</div>' : p.visual === 'fin' ? '<div class="hero-fin-label" aria-hidden="true">FALA, FIN<span>✳</span></div>' : '';
      return `<a class="hero-project hero-card-${p.visual}" data-project="${p.name}" data-project-id="${p.id}" href="${caseUrl(p.id)}" aria-label="Abrir case ${p.name}" style="--orbit-x:${Math.cos(angle).toFixed(5)};--orbit-y:${Math.sin(angle).toFixed(5)};--card-tilt:${i % 2 ? 8 : -8}deg">${name}<img src="${asset(heroImage(p))}" alt="" width="${p.id === 'fala-fin' ? 402 : p.width}" height="${p.id === 'fala-fin' ? 981 : p.height}" decoding="async"><span class="hero-project-tag">${number(i + 1)} / ${label}</span><strong>${title.join('<br>')}</strong><span class="hero-project-arrow" aria-hidden="true">↗</span></a>`;
    }).join('');
    document.querySelectorAll('[data-hero-total]').forEach(el => el.textContent = number(featured.length));
  }

  document.querySelectorAll('[data-project-total]').forEach(el => el.textContent = number(catalogue.projects.length));
  const homeList = document.querySelector('[data-home-projects]');
  if (homeList) {
    // Exclude every project actually present in the hero, then cap the home selection.
    const featured = new Set(Array.from(document.querySelectorAll('.hero-project[data-project-id]'), el => el.dataset.projectId));
    const selection = catalogue.projects.filter(p => !featured.has(p.id)).slice(0, catalogue.homeLimit);
    homeList.innerHTML = selection.map((p, i) => `<article class="work-item index-item"><a href="${caseUrl(p.id)}" class="index-row"><span class="index-number">${number(i + 1)}</span><span class="index-content"><strong>${p.title.join('<br>')}<span class="index-dot">.</span></strong><span class="index-mobile-category">${p.label}</span><span class="index-desc">${p.description}</span></span><span class="index-tags">${p.tags.map(tag => `<span>${tag}</span>`).join('')}</span><span class="index-thumb index-thumb-${p.visual}">${image(p)}</span><span class="index-arrow" aria-hidden="true">↗</span><span class="sr-only">Ver case ${p.name}</span></a></article>`).join('');
    document.querySelectorAll('[data-home-total]').forEach(el => el.textContent = number(selection.length));
    document.querySelectorAll('[data-home-plural]').forEach(el => el.textContent = selection.length === 1 ? '' : 'S');
    document.querySelector('.work-index-section').hidden = selection.length === 0;
  }

  const collection = document.querySelector('[data-project-collection]');
  if (!collection) return;
  collection.innerHTML = catalogue.projects.map((p, i) => `<article class="collection-card" data-category="${p.category}" data-search="${p.name} ${p.label} ${p.tags.join(' ')}"><a class="collection-card-link" href="${caseUrl(p.id)}" aria-label="Ver case ${p.name}"><div class="collection-visual collection-visual-${p.visual}"><span class="collection-card-index">${number(i + 1)} / PROJETO</span>${image(p)}<span class="collection-open" aria-hidden="true">↗</span>${p.visual === 'gran' ? '<span class="collection-wordmark" aria-hidden="true">gran.</span>' : ''}${p.visual === 'fin' ? '<span class="collection-wordmark" aria-hidden="true">FALA, FIN<span>✳</span></span>' : ''}</div><div class="collection-card-caption"><div><span class="collection-card-category">${p.label}</span><h2>${p.name}<span>.</span></h2><p>${p.description}</p></div><span class="collection-caption-arrow" aria-hidden="true">↗</span></div></a></article>`).join('');
  const buttons = Array.from(document.querySelectorAll('[data-project-filter]'));
  const search = document.getElementById('project-search');
  const status = document.getElementById('collection-status');
  const empty = document.getElementById('collection-empty');
  let category = 'all';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function filter() {
    const query = normalize(search.value.trim());
    let count = 0;
    collection.querySelectorAll('.collection-card').forEach(card => {
      const show = (category === 'all' || card.dataset.category === category) && normalize(card.dataset.search).includes(query);
      card.hidden = !show;
      if (show) count++;
    });
    status.textContent = `${number(count)} ${count === 1 ? 'PROJETO' : 'PROJETOS'}`;
    empty.hidden = count > 0;
  }
  buttons.forEach(button => {
    const count = catalogue.projects.filter(p => button.dataset.projectFilter === 'all' || p.category === button.dataset.projectFilter).length;
    button.querySelector('span').textContent = number(count);
    button.addEventListener('click', () => {
      category = button.dataset.projectFilter;
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      filter();
    });
  });
  search.addEventListener('input', filter);
  document.getElementById('reset-filters').addEventListener('click', () => {
    search.value = '';
    buttons[0].click();
    search.focus();
  });
  filter();
})();

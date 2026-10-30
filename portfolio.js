(() => {
  const catalogue = window.NS_PORTFOLIO;
  if (!catalogue) return;
  const number = value => String(value).padStart(2, '0');
  const asset = file => new URL(`assets/${file}`, document.querySelector('script[data-portfolio-base]').src).href;
  const caseUrl = id => new URL(`cases/${id}/`, document.querySelector('script[data-portfolio-base]').src).href;
  const image = p => `<img src="${asset(p.image)}" alt="${p.imageAlt}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async">`;

  const getLang = () => window.NS_I18N?.currentLang || 'pt';
  const getLabel = p => {
    const lang = getLang();
    if (lang === 'en' && p.label_en) return p.label_en;
    if (lang === 'es' && p.label_es) return p.label_es;
    return p.label;
  };
  const getDesc = p => {
    const lang = getLang();
    if (lang === 'en' && p.description_en) return p.description_en;
    if (lang === 'es' && p.description_es) return p.description_es;
    return p.description;
  };
  const getTags = p => {
    const lang = getLang();
    if (lang === 'en' && p.tags_en) return p.tags_en;
    if (lang === 'es' && p.tags_es) return p.tags_es;
    return p.tags;
  };

  const getHeroTag = p => {
    const lang = getLang();
    const map = {
      'true': { pt: 'BRANDING COMPLETO', en: 'FULL BRANDING', es: 'BRANDING COMPLETO' },
      'granberry': { pt: 'LOGO & DESIGN SYSTEM', en: 'LOGO & DESIGN SYSTEM', es: 'LOGO & DESIGN SYSTEM' },
      'barbearia-nunes': { pt: 'BRANDING & IMPRESSOS', en: 'BRANDING & PRINT', es: 'BRANDING & IMPRESOS' },
      'minha-saude': { pt: 'COMUNICAÇÃO & CAMPANHA', en: 'CAMPAIGN & COMMUNICATION', es: 'COMUNICACIÓN & CAMPAÑA' },
      'planeta-energia': { pt: 'IDENTIDADE VISUAL', en: 'VISUAL IDENTITY', es: 'IDENTIDAD VISUAL' },
      'voce-tem-valor': { pt: 'COMUNICAÇÃO VISUAL', en: 'VISUAL COMMUNICATION', es: 'COMUNICACIÓN VISUAL' },
      'wecodes': { pt: 'IDENTIDADE VISUAL', en: 'VISUAL IDENTITY', es: 'IDENTIDAD VISUAL' },
      'zeca-acai': { pt: 'BRANDING & EMBALAGENS', en: 'BRANDING & PACKAGING', es: 'BRANDING & ENVASES' },
      'redburning': { pt: 'IDENTIDADE VISUAL', en: 'VISUAL IDENTITY', es: 'IDENTIDAD VISUAL' },
      'fala-fin': { pt: 'SITE & APP', en: 'WEB & APP', es: 'SITIO & APP' },
      'gran-minha-conta': { pt: 'APP MOBILE', en: 'MOBILE APP', es: 'APP MÓVIL' },
      'adizero-racing': { pt: 'WEB DESIGN & CONCEITO', en: 'WEB DESIGN & CONCEPT', es: 'DISEÑO WEB & CONCEPTO' }
    };
    return map[p.id]?.[lang] || map[p.id]?.pt || p.heroTag || (p.category === 'branding' ? 'BRANDING' : 'DESIGN');
  };

  const ovalArcTable = (() => {
    const steps = 360, rx = 1.84, cum = [0];
    for (let k = 1; k <= steps; k++) {
      const a = (-90 + (k - 0.5) * 360 / steps) * Math.PI / 180;
      cum[k] = cum[k - 1] + Math.hypot(rx * Math.sin(a), Math.cos(a));
    }
    const total = cum[steps];
    return u => {
      const target = ((u % 1) + 1) % 1 * total;
      let lo = 0, hi = steps;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] < target) lo = mid + 1; else hi = mid; }
      const i = Math.max(1, lo), frac = (target - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
      return (-90 + (i - 1 + frac) * 360 / steps) * Math.PI / 180;
    };
  })();

  const hero = document.getElementById('hero-fan');
  function renderHeroFan() {
    if (!hero || !Array.isArray(catalogue.featured)) return;
    const featured = catalogue.featured.map(id => catalogue.projects.find(p => p.id === id)).filter(Boolean);
    const heroImage = p => p.id === 'fala-fin' ? 'fin-hoje.webp' : p.image;
    const lang = getLang();
    const openCaseLabel = lang === 'en' ? 'Open case' : (lang === 'es' ? 'Abrir caso' : 'Abrir case');

    hero.innerHTML = featured.map((p, i) => {
      const angle = ovalArcTable(i / featured.length);
      const title = p.heroTitle || p.title;
      const label = getHeroTag(p);
      const stackTilt = ((i - (featured.length - 1) / 2) * 2.2).toFixed(1);
      const badge = p.visual === 'gran' ? '<div class="hero-gran-name">gran.</div>' : p.visual === 'fin' ? '<div class="hero-fin-label">FALA, FIN<span><i class="hgi hgi-stroke hgi-sparkles" aria-hidden="true"></i></span></div>' : '';
      return `<a class="hero-project hero-card-${p.visual}${i === 0 ? ' is-selected' : ''}" data-project="${p.name}" data-project-id="${p.id}" href="${caseUrl(p.id)}" aria-label="${openCaseLabel} ${p.name}" style="--orbit-x:${Math.cos(angle).toFixed(5)};--orbit-y:${Math.sin(angle).toFixed(5)};--card-tilt:${i % 2 ? 8 : -8}deg;--card-i:${i};--stack-tilt:${stackTilt}deg">${badge}<img src="${asset(heroImage(p))}" alt="" width="${p.id === 'fala-fin' ? 402 : p.width}" height="${p.id === 'fala-fin' ? 981 : p.height}" fetchpriority="${i === 0 ? 'high' : 'low'}" decoding="async"><span class="hero-project-tag">${number(featured.length - i)} / ${label}</span><strong>${title.join('<br>')}</strong><span class="hero-project-arrow" aria-hidden="true"><i class="hgi hgi-stroke hgi-arrow-up-right-01"></i></span></a>`;
    }).join('');
    document.querySelectorAll('[data-hero-total]').forEach(el => el.textContent = number(featured.length));
  }
  if (hero) renderHeroFan();

  document.querySelectorAll('[data-project-total]').forEach(el => el.textContent = number(catalogue.projects.length));

  const homeList = document.querySelector('[data-home-projects]');
  function renderHomeList() {
    if (!homeList) return;
    const featured = new Set(Array.from(document.querySelectorAll('.hero-project[data-project-id]'), el => el.dataset.projectId));
    const homeOrder = new Map((catalogue.homeOrder || []).map((id, index) => [id, index]));
    const priority = project => homeOrder.get(project.id) ?? catalogue.projects.length;
    const nonFeatured = catalogue.projects.filter(p => !featured.has(p.id)).sort((a, b) => priority(a) - priority(b));
    const selection = nonFeatured.slice(0, catalogue.homeLimit);
    const lang = getLang();
    const openCaseLabel = lang === 'en' ? 'View case' : (lang === 'es' ? 'Ver caso' : 'Ver case');

    homeList.innerHTML = selection.map((p, i) => `<article class="work-item index-item"><a href="${caseUrl(p.id)}" class="index-row"><span class="index-number">${number(selection.length - i)}</span><span class="index-content"><strong>${p.title.join('<br>')}<span class="index-dot">.</span></strong><span class="index-mobile-category">${getLabel(p)}</span><span class="index-desc">${getDesc(p)}</span></span><span class="index-tags">${getTags(p).map(tag => `<span>${tag}</span>`).join('')}</span><span class="index-thumb index-thumb-${p.visual}">${image(p)}</span><span class="index-arrow" aria-hidden="true"><i class="hgi hgi-stroke hgi-arrow-up-right-01"></i></span><span class="sr-only">${openCaseLabel} ${p.name}</span></a></article>`).join('');

    document.querySelectorAll('[data-home-total]').forEach(el => el.textContent = number(selection.length));
    document.querySelectorAll('[data-home-plural]').forEach(el => el.textContent = selection.length === 1 ? '' : 'S');
    const workSection = document.querySelector('.work-index-section');
    if (workSection) workSection.hidden = selection.length === 0;
  }
  if (homeList) renderHomeList();

  const nextCase = document.querySelector('.next-case');
  function updateNextCase() {
    if (!nextCase || !Array.isArray(catalogue.projects) || catalogue.projects.length === 0) return;
    const currentId = document.body.dataset.caseId ||
      catalogue.projects.find(p => document.body.classList.contains(p.id) || location.pathname.includes(`/cases/${p.id}/`) || location.pathname.endsWith(`/cases/${p.id}`))?.id;
    if (currentId) {
      const idx = catalogue.projects.findIndex(p => p.id === currentId);
      if (idx !== -1) {
        const nextProject = catalogue.projects[(idx + 1) % catalogue.projects.length];
        const nextLink = nextCase.querySelector('a:not(.back-collection)');
        if (nextLink && nextProject) {
          nextLink.href = caseUrl(nextProject.id);
          const title = nextLink.querySelector('h2');
          const desc = nextLink.querySelector('p');
          if (title) title.textContent = nextProject.name;
          if (desc) desc.textContent = getDesc(nextProject);
        }
      }
    }
  }
  if (nextCase) updateNextCase();

  const collection = document.querySelector('[data-project-collection]');
  if (collection) {
    const buttons = Array.from(document.querySelectorAll('[data-project-filter]'));
    const search = document.getElementById('project-search');
    const status = document.getElementById('collection-status');
    const empty = document.getElementById('collection-empty');
    let category = 'all';
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    function renderCollectionCards() {
      const cardIndexLabel = window.NS_I18N?.t('collection.card_index') || 'PROJETO';
      const openLabel = window.NS_I18N?.t('collection.open_case') || 'Ver case';
      collection.innerHTML = catalogue.projects.map((p, i) => `<article class="collection-card" data-category="${p.category}" data-search="${p.name} ${getLabel(p)} ${getTags(p).join(' ')}"><a class="collection-card-link" href="${caseUrl(p.id)}" aria-label="${openLabel} ${p.name}"><div class="collection-visual collection-visual-${p.visual}"><span class="collection-card-index">${number(catalogue.projects.length - i)} / ${cardIndexLabel}</span>${image(p)}<span class="collection-open" aria-hidden="true"><i class="hgi hgi-stroke hgi-arrow-up-right-01"></i></span>${p.visual === 'gran' ? '<span class="collection-wordmark" aria-hidden="true">gran.</span>' : ''}${p.visual === 'fin' ? '<span class="collection-wordmark" aria-hidden="true">FALA, FIN<span><i class="hgi hgi-stroke hgi-sparkles"></i></span></span>' : ''}</div><div class="collection-card-caption"><div><span class="collection-card-category">${getLabel(p)}</span><h2>${p.name}<span>.</span></h2><p>${getDesc(p)}</p></div><span class="collection-caption-arrow" aria-hidden="true"><i class="hgi hgi-stroke hgi-arrow-up-right-01"></i></span></div></a></article>`).join('');
    }

    function filter() {
      const query = normalize((search?.value || '').trim());
      let count = 0;
      collection.querySelectorAll('.collection-card').forEach(card => {
        const show = (category === 'all' || card.dataset.category === category) && normalize(card.dataset.search).includes(query);
        card.hidden = !show;
        if (show) count++;
      });
      if (status) {
        const countWord = count === 1 ? (window.NS_I18N?.t('collection.project_count_singular') || 'PROJETO') : (window.NS_I18N?.t('collection.projects_count') || 'PROJETOS');
        status.textContent = `${number(count)} ${countWord}`;
      }
      if (empty) empty.hidden = count > 0;
    }

    renderCollectionCards();

    buttons.forEach(button => {
      const count = catalogue.projects.filter(p => button.dataset.projectFilter === 'all' || p.category === button.dataset.projectFilter).length;
      const countSpan = button.querySelector('span:last-child');
      if (countSpan) countSpan.textContent = number(count);
      button.addEventListener('click', () => {
        category = button.dataset.projectFilter;
        buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        filter();
      });
    });

    if (search) search.addEventListener('input', filter);
    document.getElementById('reset-filters')?.addEventListener('click', () => {
      if (search) search.value = '';
      if (buttons[0]) buttons[0].click();
      search?.focus();
    });

    filter();

    window.addEventListener('ns:langchange', () => {
      renderCollectionCards();
      filter();
    });
  }

  window.addEventListener('ns:langchange', () => {
    if (hero) renderHeroFan();
    if (homeList) renderHomeList();
    if (nextCase) updateNextCase();
  });
})();

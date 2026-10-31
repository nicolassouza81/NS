(() => {
  const STORAGE_KEY = 'ns_portfolio_lang';
  const SUPPORTED = ['pt', 'en', 'es'];
  const HTML_LANG_MAP = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
  const LANGUAGE_NAMES = { pt: 'Português', en: 'English', es: 'Español' };

  const DICTIONARY = {
    pt: {
      // Navigation
      "nav.skip": "Pular para o conteúdo",
      "nav.works": "Trabalhos",
      "nav.about": "Sobre",
      "nav.contact": "Vamos conversar",
      "nav.open_menu": "Abrir menu",
      "nav.close_menu": "Fechar menu",
      "nav.menu_label": "Menu principal",
      "nav.back_to_top": "VOLTAR AO TOPO",
      "footer.brand_tagline": "DESIGN COM INTENÇÃO. FEITO EM BRASÍLIA.",

      // Hero
      "hero.meta_portfolio": "PORTFÓLIO '26",
      "hero.meta_disciplines": "UX/UI · PRODUTOS DIGITAIS · DESIGN SYSTEMS",
      "hero.meta_location": "BRASÍLIA, BR",
      "hero.statement": "DESIGN DE EXPERIÊNCIAS DIGITAIS COM PROPÓSITO E FORMA.",
      "hero.orbit_title": "DESIGN EM<br>ÓRBITA.",
      "hero.orbit_sub": "IDEIA · FORMA<br>EXPERIÊNCIA",
      "hero.swipe_hint": "Deslize para explorar · Toque no destaque para abrir",
      "hero.fan_label": "Projetos em órbita. Use as setas para navegar e Enter para abrir o projeto selecionado.",
      "hero.previous": "Destacar projeto anterior",
      "hero.next": "Destacar próximo projeto",

      // Section 01: Work Index
      "work.kicker": "01 / MAIS PROJETOS",
      "work.title": "IDEIAS EM<br><em>MOVIMENTO.</em>",
      "work.desc": "Outras ideias, novos pontos de vista.<br>Continue explorando os projetos.",
      "work.col_project": "PROJETO / EXPERIÊNCIA",
      "work.col_disciplines": "DISCIPLINAS",
      "work.col_explore": "EXPLORAR",
      "work.continue": "CONTINUE A EXPLORAR",
      "work.all_projects": "TODOS OS PROJETOS",
      "work.project_singular": "PROJETO",
      "work.project_plural": "PROJETOS",

      // Section 02: Connections
      "connections.kicker": "02 / CONEXÕES",
      "connections.sub": "IDEIA · FORMA · EXPERIÊNCIA",
      "connections.title": "Toda ideia<br>merece encontrar<br><em>seu caminho.</em>",
      "connections.desc": "Da primeira pergunta à interface, cada escolha aproxima uma ideia de quem vai usá-la.",
      "connections.cta": "CONHEÇA MEU OLHAR",

      // Section 03: About
      "about.kicker": "03 / POR TRÁS DO DESIGN",
      "about.sub": "CLAREZA · INTENÇÃO · EXPRESSÃO",
      "about.location": "DESIGNER · BRASÍLIA, BR",
      "about.tag": "SOBRE MIM",
      "about.title": "O design começa com uma boa <span>pergunta.</span>",
      "about.identity": "<strong>Nícolas Souza</strong><span> · </span> UX/UI Designer",
      "about.p1": "Sou designer baseado em Brasília. Minha atuação conecta experiência do usuário, interfaces e sistemas de design.",
      "about.p2": "Gosto de encontrar a lógica por trás de um problema e dar a ela uma forma que as pessoas consigam compreender e usar. Cada decisão precisa ter uma razão.",
      "about.discipline_1": "UX & UI DESIGN",
      "about.discipline_2": "DESIGN SYSTEMS",
      "about.discipline_3": "PRODUTOS DIGITAIS",
      "about.cta_work": "CONHEÇA MEU TRABALHO",
      "about.cta_contact": "VAMOS CONVERSAR",

      // Marquee
      "marquee.ux": "UX/UI DESIGN",
      "marquee.products": "PRODUTOS DIGITAIS",
      "marquee.ds": "DESIGN SYSTEMS",
      "marquee.art": "DIREÇÃO DE ARTE",
      "marquee.branding": "BRANDING",

      // Section 04: Contact
      "contact.kicker": "04 / PRÓXIMO CAPÍTULO",
      "contact.sub": "WHATSAPP · +55 61 9 9923-5548",
      "contact.title": "Boas ideias<br>merecem <em>forma.</em>",
      "contact.desc": "Tem um produto, uma marca ou uma ideia esperando forma? Vamos conversar pelo WhatsApp.",
      "contact.cta": "Conversar no WhatsApp · +55 61 9 9923-5548",
      "whatsapp.message": "Olá, Nícolas! Conheci seu portfólio e gostaria de conversar sobre um projeto de design.",

      // Collection page
      "collection.back": "INÍCIO",
      "collection.title": "Acervo de Projetos",
      "collection.desc": "Projetos autorais, produtos digitais, identidades visuais e explorações conceituais desenvolvidos com foco em clareza, intenção e estética.",
      "collection.filter_all": "Todos",
      "collection.filter_ux": "UX/UI",
      "collection.filter_branding": "Branding",
      "collection.filter_art": "Direção de Arte",
      "collection.search_placeholder": "Buscar por título, categoria ou palavra-chave...",
      "collection.search_label": "Buscar projetos no acervo",
      "collection.projects_count": "PROJETOS",
      "collection.project_count_singular": "PROJETO",
      "collection.empty_title": "Nenhum projeto encontrado",
      "collection.empty_desc": "Tente ajustar os filtros ou pesquisar com outros termos.",
      "collection.reset_filters": "Limpar busca e filtros",
      "collection.card_index": "PROJETO",
      "collection.open_case": "Ver case",

      // Case studies common chrome
      "case.all_projects": "TODOS OS PROJETOS",
      "case.next_case": "CONTINUE EXPLORANDO / PRÓXIMO CASE",
      "case.back_collection": "Todos os projetos",
      "case.explore_figma": "Explorar no Figma",
      "case.full_interface": "04 / INTERFACE COMPLETA",
      "case.expand": "EXPANDIR PROJETO",
      "case.collapse": "RECOLHER PROJETO",
      "case.disclaimer": "Projeto conceitual independente. As marcas citadas pertencem aos seus respectivos titulares.",
      "case.nature": "NATUREZA",
      "case.authorship": "AUTORIA",
      "case.focus": "FOCO",
      "case.client": "CLIENTE",
      "case.role": "PAPEL",
      "case.year": "ANO",
      "case.project": "PROJETO",
      "case.scope": "ATUAÇÃO",
      "case.deliverables": "ENTREGAS",
      "case.view_full": "Ver aplicação completa"
    },
    en: {
      // Navigation
      "nav.skip": "Skip to content",
      "nav.works": "Works",
      "nav.about": "About",
      "nav.contact": "Let's talk",
      "nav.open_menu": "Open menu",
      "nav.close_menu": "Close menu",
      "nav.menu_label": "Main menu",
      "nav.back_to_top": "BACK TO TOP",
      "footer.brand_tagline": "DESIGN WITH PURPOSE. CRAFTED IN BRASÍLIA.",

      // Hero
      "hero.meta_portfolio": "PORTFOLIO '26",
      "hero.meta_disciplines": "UX/UI · DIGITAL PRODUCTS · DESIGN SYSTEMS",
      "hero.meta_location": "BRASÍLIA, BR",
      "hero.statement": "DIGITAL EXPERIENCE DESIGN WITH PURPOSE AND CRAFT.",
      "hero.orbit_title": "DESIGN IN<br>ORBIT.",
      "hero.orbit_sub": "IDEA · FORM<br>EXPERIENCE",
      "hero.swipe_hint": "Swipe to explore · Tap the featured card to open",
      "hero.fan_label": "Projects in orbit. Use the arrow keys to navigate and Enter to open the selected project.",
      "hero.previous": "Highlight previous project",
      "hero.next": "Highlight next project",

      // Section 01: Work Index
      "work.kicker": "01 / MORE PROJECTS",
      "work.title": "IDEAS IN<br><em>MOTION.</em>",
      "work.desc": "Fresh perspectives, distinctive craft.<br>Keep exploring selected work.",
      "work.col_project": "PROJECT / EXPERIENCE",
      "work.col_disciplines": "DISCIPLINES",
      "work.col_explore": "EXPLORE",
      "work.continue": "KEEP EXPLORING",
      "work.all_projects": "ALL PROJECTS",
      "work.project_singular": "PROJECT",
      "work.project_plural": "PROJECTS",

      // Section 02: Connections
      "connections.kicker": "02 / CONNECTIONS",
      "connections.sub": "IDEA · FORM · EXPERIENCE",
      "connections.title": "Every idea<br>deserves to find<br><em>its path.</em>",
      "connections.desc": "From the first question to the interface, every choice brings an idea closer to who uses it.",
      "connections.cta": "EXPLORE MY APPROACH",

      // Section 03: About
      "about.kicker": "03 / BEHIND THE DESIGN",
      "about.sub": "CLARITY · PURPOSE · EXPRESSION",
      "about.location": "DESIGNER · BRASÍLIA, BR",
      "about.tag": "ABOUT ME",
      "about.title": "Design begins with a good <span>question.</span>",
      "about.identity": "<strong>Nícolas Souza</strong><span> · </span> UX/UI Designer",
      "about.p1": "I am a designer based in Brasília. My practice bridges user experience, digital interfaces, and design systems.",
      "about.p2": "I love discovering the logic behind a problem and shaping it into something people can understand and use effortlessly. Every decision must have a purpose.",
      "about.discipline_1": "UX & UI DESIGN",
      "about.discipline_2": "DESIGN SYSTEMS",
      "about.discipline_3": "DIGITAL PRODUCTS",
      "about.cta_work": "EXPLORE MY WORK",
      "about.cta_contact": "LET'S TALK",

      // Marquee
      "marquee.ux": "UX/UI DESIGN",
      "marquee.products": "DIGITAL PRODUCTS",
      "marquee.ds": "DESIGN SYSTEMS",
      "marquee.art": "ART DIRECTION",
      "marquee.branding": "BRANDING",

      // Section 04: Contact
      "contact.kicker": "04 / NEXT CHAPTER",
      "contact.sub": "WHATSAPP · +55 61 9 9923-5548",
      "contact.title": "Great ideas<br>deserve <em>form.</em>",
      "contact.desc": "Have a product, a brand, or an idea waiting to take shape? Let's chat on WhatsApp.",
      "contact.cta": "Chat on WhatsApp · +55 61 9 9923-5548",
      "whatsapp.message": "Hi, Nícolas! I came across your portfolio and would like to discuss a design project.",

      // Collection page
      "collection.back": "HOME",
      "collection.title": "Project Archive",
      "collection.desc": "Original projects, digital products, visual identities, and conceptual explorations developed with a focus on clarity, purpose, and craft.",
      "collection.filter_all": "All",
      "collection.filter_ux": "UX/UI",
      "collection.filter_branding": "Branding",
      "collection.filter_art": "Art Direction",
      "collection.search_placeholder": "Search by title, category, or keyword...",
      "collection.search_label": "Search projects in archive",
      "collection.projects_count": "PROJECTS",
      "collection.project_count_singular": "PROJECT",
      "collection.empty_title": "No projects found",
      "collection.empty_desc": "Try adjusting your filters or searching with other terms.",
      "collection.reset_filters": "Clear search and filters",
      "collection.card_index": "PROJECT",
      "collection.open_case": "View case",

      // Case studies common chrome
      "case.all_projects": "ALL PROJECTS",
      "case.next_case": "KEEP EXPLORING / NEXT CASE",
      "case.back_collection": "All projects",
      "case.explore_figma": "Explore on Figma",
      "case.full_interface": "04 / FULL INTERFACE",
      "case.expand": "EXPAND PROJECT",
      "case.collapse": "COLLAPSE PROJECT",
      "case.disclaimer": "Independent conceptual project. Mentioned trademarks belong to their respective owners.",
      "case.nature": "NATURE",
      "case.authorship": "AUTHORSHIP",
      "case.focus": "FOCUS",
      "case.client": "CLIENT",
      "case.role": "ROLE",
      "case.year": "YEAR",
      "case.project": "PROJECT",
      "case.scope": "SCOPE",
      "case.deliverables": "DELIVERABLES",
      "case.view_full": "View full application"
    },
    es: {
      // Navigation
      "nav.skip": "Saltar al contenido",
      "nav.works": "Trabajos",
      "nav.about": "Sobre mí",
      "nav.contact": "Hablemos",
      "nav.open_menu": "Abrir menú",
      "nav.close_menu": "Cerrar menú",
      "nav.menu_label": "Menú principal",
      "nav.back_to_top": "VOLVER ARRIBA",
      "footer.brand_tagline": "DISEÑO CON PROPÓSITO. HECHO EN BRASILIA.",

      // Hero
      "hero.meta_portfolio": "PORTAFOLIO '26",
      "hero.meta_disciplines": "UX/UI · PRODUCTOS DIGITALES · DESIGN SYSTEMS",
      "hero.meta_location": "BRASILIA, BR",
      "hero.statement": "DISEÑO DE EXPERIENCIAS DIGITALES CON PROPÓSITO Y FORMA.",
      "hero.orbit_title": "DISEÑO EN<br>ÓRBITA.",
      "hero.orbit_sub": "IDEA · FORMA<br>EXPERIENCIA",
      "hero.swipe_hint": "Desliza para explorar · Toca la destacada para abrir",
      "hero.fan_label": "Proyectos en órbita. Usa las flechas para navegar y Enter para abrir el proyecto seleccionado.",
      "hero.previous": "Destacar proyecto anterior",
      "hero.next": "Destacar próximo proyecto",

      // Section 01: Work Index
      "work.kicker": "01 / MÁS PROYECTOS",
      "work.title": "IDEAS EN<br><em>MOVIMIENTO.</em>",
      "work.desc": "Nuevas ideas, nuevas perspectivas.<br>Continúa explorando los proyectos.",
      "work.col_project": "PROYECTO / EXPERIENCIA",
      "work.col_disciplines": "DISCIPLINAS",
      "work.col_explore": "EXPLORAR",
      "work.continue": "CONTINÚA EXPLORANDO",
      "work.all_projects": "TODOS LOS PROYECTOS",
      "work.project_singular": "PROYECTO",
      "work.project_plural": "PROYECTOS",

      // Section 02: Connections
      "connections.kicker": "02 / CONEXIONES",
      "connections.sub": "IDEA · FORMA · EXPERIENCIA",
      "connections.title": "Toda idea<br>merece encontrar<br><em>su camino.</em>",
      "connections.desc": "Desde la primera pregunta hasta la interfaz, cada elección acerca una idea a quien la va a usar.",
      "connections.cta": "CONOCE MI ENFOQUE",

      // Section 03: About
      "about.kicker": "03 / DETRÁS DEL DISEÑO",
      "about.sub": "CLARIDAD · INTENCIÓN · EXPRESIÓN",
      "about.location": "DISEÑADOR · BRASILIA, BR",
      "about.tag": "SOBRE MÍ",
      "about.title": "El diseño comienza con una buena <span>pregunta.</span>",
      "about.identity": "<strong>Nícolas Souza</strong><span> · </span> Diseñador UX/UI",
      "about.p1": "Soy un diseñador basado en Brasilia. Mi labor conecta la experiencia del usuario, interfaces y sistemas de diseño.",
      "about.p2": "Me apasiona encontrar la lógica detrás de un problema y darle una forma que las personas puedan comprender y usar con facilidad. Cada decisión debe tener una razón.",
      "about.discipline_1": "DISEÑO UX & UI",
      "about.discipline_2": "DESIGN SYSTEMS",
      "about.discipline_3": "PRODUCTOS DIGITALES",
      "about.cta_work": "CONOCE MI TRABAJO",
      "about.cta_contact": "HABLEMOS",

      // Marquee
      "marquee.ux": "DISEÑO UX/UI",
      "marquee.products": "PRODUCTOS DIGITALES",
      "marquee.ds": "DESIGN SYSTEMS",
      "marquee.art": "DIRECCIÓN DE ARTE",
      "marquee.branding": "BRANDING",

      // Section 04: Contact
      "contact.kicker": "04 / PRÓXIMO CAPÍTULO",
      "contact.sub": "WHATSAPP · +55 61 9 9923-5548",
      "contact.title": "Las buenas ideas<br>merecen <em>forma.</em>",
      "contact.desc": "¿Tienes un producto, una marca o una idea esperando forma? Hablemos por WhatsApp.",
      "contact.cta": "Conversar en WhatsApp · +55 61 9 9923-5548",
      "whatsapp.message": "¡Hola, Nícolas! Conocí tu portafolio y me gustaría conversar sobre un proyecto de diseño.",

      // Collection page
      "collection.back": "INICIO",
      "collection.title": "Archivo de Proyectos",
      "collection.desc": "Proyectos propios, productos digitales, identidades visuales y exploraciones conceptuales desarrollados con foco en claridad, propósito y estética.",
      "collection.filter_all": "Todos",
      "collection.filter_ux": "UX/UI",
      "collection.filter_branding": "Branding",
      "collection.filter_art": "Dirección de Arte",
      "collection.search_placeholder": "Buscar por título, categoría o palabra clave...",
      "collection.search_label": "Buscar proyectos en el archivo",
      "collection.projects_count": "PROYECTOS",
      "collection.project_count_singular": "PROYECTO",
      "collection.empty_title": "No se encontraron proyectos",
      "collection.empty_desc": "Intenta ajustar los filtros o buscar con otros términos.",
      "collection.reset_filters": "Limpiar búsqueda y filtros",
      "collection.card_index": "PROYECTO",
      "collection.open_case": "Ver caso",

      // Case studies common chrome
      "case.all_projects": "TODOS LOS PROYECTOS",
      "case.next_case": "CONTINÚA EXPLORANDO / SIGUIENTE CASE",
      "case.back_collection": "Todos los proyectos",
      "case.explore_figma": "Explorar en Figma",
      "case.full_interface": "04 / INTERFAZ COMPLETA",
      "case.expand": "EXPANDIR PROYECTO",
      "case.collapse": "COLAPSAR PROYECTO",
      "case.disclaimer": "Proyecto conceptual independiente. Las marcas citadas pertenecen a sus respectivos propietarios.",
      "case.nature": "NATURALEZA",
      "case.authorship": "AUTORÍA",
      "case.focus": "ENFOQUE",
      "case.client": "CLIENTE",
      "case.role": "ROL",
      "case.year": "AÑO",
      "case.project": "PROYECTO",
      "case.scope": "ALCANCE",
      "case.deliverables": "ENTREGAS",
      "case.view_full": "Ver aplicación completa"
    }
  };

  // Case Study intros localization (kicker, title, lead)
  const CASE_INTROS = {
    'bike-registrada': {
      en: {
        kicker: 'BRANDING / COMPLETE VISUAL IDENTITY',
        title: 'An identity<br><em>in motion.</em>',
        lead: 'A complete visual identity for BikeRegistrada. The symbol, wordmark, and green, black, and white visual language connect the brand guidelines with apparel, vehicle graphics, and seal packaging.'
      },
      es: {
        kicker: 'BRANDING / IDENTIDAD VISUAL COMPLETA',
        title: 'Identidad en<br><em>movimiento.</em>',
        lead: 'Una identidad visual completa para BikeRegistrada. Símbolo, logotipo y una paleta verde, negra y blanca conectan el manual con el vestuario, la gráfica vehicular y el envase del sello.'
      }
    },
    'syn-saude': {
      en: {
        kicker: 'BRANDING / COMPLETE VISUAL IDENTITY',
        title: 'An identity<br><em>that connects.</em>',
        lead: 'A complete visual identity for SYN Saúde. The symbol, wordmark, colors, and typography form a system documented in the brand guidelines and carried through business cards, badges, and uniforms.'
      },
      es: {
        kicker: 'BRANDING / IDENTIDAD VISUAL COMPLETA',
        title: 'Una identidad<br><em>que conecta.</em>',
        lead: 'Una identidad visual completa para SYN Saúde. Símbolo, logotipo, colores y tipografía forman un sistema documentado en el manual y aplicado a tarjetas, credenciales y uniformes.'
      }
    },
    'adrenalina': {
      en: {
        kicker: 'BRANDING / COMPLETE VISUAL IDENTITY',
        title: 'Energy in<br><em>every application.</em>',
        lead: 'A visual identity for Adrenalina Sport Bike, connecting cycling with the brand’s touchpoints. The symbol, wordmark, and graphic elements extend across stationery, apparel, accessories, and vehicles.'
      },
      es: {
        kicker: 'BRANDING / IDENTIDAD VISUAL COMPLETA',
        title: 'Energía en<br><em>cada aplicación.</em>',
        lead: 'Una identidad visual para Adrenalina Sport Bike que conecta el ciclismo con los puntos de contacto de la marca. El símbolo, el logotipo y los elementos gráficos recorren papelería, indumentaria, accesorios y vehículos.'
      }
    },
    'barbearia-nunes': {
      en: {
        kicker: 'BRANDING / BRAND REFINEMENT / PRINT & APPAREL',
        title: 'Tradition commanding<br><em>respect in every detail.</em>',
        lead: 'Visual refinement and collateral expansion for Barbearia Nunes, a traditional barbershop established in Brasília in 2014. The project balances classical heraldry with practical daily applications for the Sudoeste branch: refined logo, fast-booking business cards, staff uniforms, and promotional flyers.'
      },
      es: {
        kicker: 'BRANDING / AJUSTE DE MARCA / IMPRESOS & UNIFORME',
        title: 'Tradición que impone<br><em>respeto en el detalle.</em>',
        lead: 'Ajuste y desarrollo visual para Barbearia Nunes, tradicional barbería fundada en 2014 en Brasilia. El proyecto equilibra el carácter clásico del blasón con aplicaciones prácticas para el día a día: logotipo ajustado, tarjetas con reserva rápida, uniformes y folleto promocional.'
      }
    },
    'adizero-racing': {
      en: {
        kicker: 'WEB DESIGN / ART DIRECTION / INDEPENDENT CONCEPT',
        title: 'Speed translated into<br><em>design language.</em>',
        lead: 'A conceptual website connecting the Adizero performance universe with motorsport. The published version combines large-scale imagery, condensed typography, chapter navigation, and motion in a responsive experience.'
      },
      es: {
        kicker: 'DISEÑO WEB / DIRECCIÓN DE ARTE / CONCEPTO INDEPENDIENTE',
        title: 'La velocidad como<br><em>lenguaje de diseño.</em>',
        lead: 'Un sitio conceptual que conecta el universo de rendimiento Adizero con el automovilismo. La versión publicada combina imágenes a gran escala, tipografía condensada, navegación por capítulos y movimiento en una experiencia adaptable.'
      }
    },
    'gran-minha-conta': {
      en: {
        kicker: 'UX/UI REDESIGN & MOBILE APP',
        title: 'Autonomy and clarity<br><em>for every student.</em>',
        lead: 'A complete overhaul of the student account management experience, reducing support friction and streamlining subscriptions.'
      },
      es: {
        kicker: 'REDISEÑO UX/UI & APP MÓVIL',
        title: 'Autonomía y claridad<br><em>para cada estudiante.</em>',
        lead: 'Una nueva mirada a la experiencia de gestión de cuenta para estudiantes, reduciendo fricciones y facilitando la autogestión.'
      }
    },
    'fala-fin': {
      en: {
        kicker: 'DIGITAL PRODUCT / INTERFACE & NARRATIVE',
        title: 'Talking about money<br><em>should feel natural.</em>',
        lead: 'Presentation website and mobile interface for Finly, an AI-powered conversational financial assistant.'
      },
      es: {
        kicker: 'PRODUCTO DIGITAL / INTERFAZ & NARRATIVA',
        title: 'Hablar de dinero<br><em>debería ser natural.</em>',
        lead: 'Sitio de presentación e interfaces de la aplicación para Finly, un asistente financiero conversacional por chat.'
      }
    },
    'granberry': {
      en: {
        kicker: 'BRANDING / DESIGN SYSTEM / DOCUMENTATION',
        title: 'The design system identity<br><em>empowering the ecosystem.</em>',
        lead: 'Visual identity, logo, and comprehensive documentation portal for Gran Cursos Design System.'
      },
      es: {
        kicker: 'BRANDING / DESIGN SYSTEM / DOCUMENTACIÓN',
        title: 'La identidad del design system<br><em>que potencia el ecosistema.</em>',
        lead: 'Logotipo, identidad visual, papelería institucional y portal de documentación del Design System de Gran Cursos.'
      }
    },
    'true': {
      en: {
        kicker: 'FULL BRANDING / IDENTITY & EVENTS',
        title: 'Transforming the atmosphere<br><em>of every event.</em>',
        lead: 'Comprehensive branding, outdoor campaigns, stage scenography, and technical apparel for TRUE Eventos.'
      },
      es: {
        kicker: 'BRANDING COMPLETO / IDENTIDAD & EVENTOS',
        title: 'Transformar la atmósfera<br><em>de cada evento.</em>',
        lead: 'Branding integral, arquitectura de marca, campaña exterior y vestuario técnico para transformar la atmósfera de eventos.'
      }
    }
  };

  function detectLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
      const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (navLang.startsWith('es')) return 'es';
      if (navLang.startsWith('en')) return 'en';
    } catch (_) {}
    return 'pt';
  }

  let currentLang = detectLanguage();

  function t(key, lang = currentLang) {
    return DICTIONARY[lang]?.[key] ?? DICTIONARY.pt[key] ?? key;
  }

  function applyLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'pt';
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}

    document.documentElement.lang = HTML_LANG_MAP[lang] || 'pt-BR';

    // 1. Sync the language control and any legacy native selects.
    document.querySelectorAll('.lang-select').forEach(sel => {
      sel.value = lang;
    });
    document.querySelectorAll('.lang-current').forEach(el => {
      el.textContent = lang.toUpperCase();
    });
    document.querySelectorAll('.lang-trigger').forEach(el => {
      el.setAttribute('aria-label', `Idioma / Language: ${LANGUAGE_NAMES[lang]}`);
    });
    document.querySelectorAll('.lang-option').forEach(el => {
      el.setAttribute('aria-checked', String(el.dataset.language === lang));
    });

    // 2. Elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translation = t(key, lang);
      if (translation !== undefined) {
        if (el.hasAttribute('data-i18n-preserve')) {
          const preserved = Array.from(el.children).map(child => child.cloneNode(true));
          el.textContent = translation + ' ';
          preserved.forEach(child => el.appendChild(child));
        } else {
          el.textContent = translation;
        }
      }
    });

    // 3. Elements with data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      const translation = t(key, lang);
      if (translation !== undefined) {
        el.innerHTML = translation;
      }
    });

    // 4. Attribute translations
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const specs = el.dataset.i18nAttr.split(';');
      specs.forEach(spec => {
        const [attr, key] = spec.split(':');
        if (attr && key) {
          el.setAttribute(attr.trim(), t(key.trim(), lang));
        }
      });
    });

    // 5. WhatsApp links
    const whatsappMsg = encodeURIComponent(t('whatsapp.message', lang));
    document.querySelectorAll('a[href*="wa.me/5561999235548"]').forEach(a => {
      try {
        const url = new URL(a.href);
        url.searchParams.set('text', decodeURIComponent(whatsappMsg));
        a.href = url.toString();
      } catch (_) {}
    });

    // 6. Marquee track translation
    document.querySelectorAll('.marquee-track').forEach(track => {
      const items = [
        t('marquee.ux', lang),
        t('marquee.products', lang),
        t('marquee.ds', lang),
        t('marquee.art', lang),
        t('marquee.branding', lang)
      ];
      const spark = '<i class="hgi hgi-stroke hgi-sparkles"></i>';
      const groupHtml = items.map((item, idx) => `<span${idx % 2 === 1 ? ' class="o"' : ''}>${item}</span>`).join(spark);
      track.innerHTML = `<div class="marquee-group">${groupHtml}</div><div class="marquee-group">${groupHtml}</div>`;
    });

    // 7. Case Studies chrome & content
    translateCaseChrome(lang);

    // 8. Header nav links on subpages
    translateHeaderNav(lang);

    // 9. Dispatch event
    window.dispatchEvent(new CustomEvent('ns:langchange', { detail: { lang } }));
  }

  function translateHeaderNav(lang) {
    const nav = document.querySelector('#site-navigation') || document.querySelector('body > header nav');
    if (!nav) return;

    // "Trabalhos" link
    const worksLink = nav.querySelector('a[href*="projetos"]');
    if (worksLink && !worksLink.hasAttribute('data-i18n')) {
      const sup = worksLink.querySelector('sup')?.outerHTML || '';
      worksLink.innerHTML = `${t('nav.works', lang)} ${sup}`;
    }

    // "Sobre" link
    const aboutLink = nav.querySelector('a[href*="#sobre"]');
    if (aboutLink && !aboutLink.hasAttribute('data-i18n')) {
      aboutLink.textContent = t('nav.about', lang);
    }

    // "Vamos conversar" link
    const ctaLink = nav.querySelector('a:last-of-type');
    if (ctaLink && !ctaLink.querySelector('[data-i18n]')) {
      const icon = ctaLink.querySelector('span')?.outerHTML || '';
      ctaLink.innerHTML = `${t('nav.contact', lang)} ${icon}`;
    }

    // Footer
    const footerTagline = document.querySelector('footer span');
    if (footerTagline && !footerTagline.hasAttribute('data-i18n')) {
      footerTagline.textContent = t('footer.brand_tagline', lang);
    }
    const footerTop = document.querySelector('footer a[href^="#"]');
    if (footerTop && !footerTop.querySelector('[data-i18n]')) {
      const icon = footerTop.querySelector('i')?.outerHTML || '↑';
      footerTop.innerHTML = `${t('nav.back_to_top', lang)} ${icon}`;
    }
  }

  function translateCaseChrome(lang) {
    // Back to all projects in case header
    document.querySelectorAll('.section-label a[href*="projetos"]').forEach(a => {
      const icon = a.querySelector('i')?.outerHTML || '↖';
      a.innerHTML = `${t('case.all_projects', lang)} ${icon}`;
    });

    // Meta small headers
    document.querySelectorAll('.case-meta small, .red-meta small, .gran-meta small, .fin-meta small').forEach(sm => {
      const text = sm.textContent.trim().toUpperCase();
      if (text.includes('PROJETO') || text.includes('PROJECT')) sm.textContent = t('case.project', lang);
      else if (text.includes('ATUAÇÃO') || text.includes('SCOPE') || text.includes('ALCANCE')) sm.textContent = t('case.scope', lang);
      else if (text.includes('ENTREGAS') || text.includes('DELIVERABLES')) sm.textContent = t('case.deliverables', lang);
      else if (text.includes('NATUREZA') || text.includes('NATURE')) sm.textContent = t('case.nature', lang);
      else if (text.includes('AUTORIA') || text.includes('AUTHORSHIP')) sm.textContent = t('case.authorship', lang);
      else if (text.includes('FOCO') || text.includes('FOCUS') || text.includes('ENFOQUE')) sm.textContent = t('case.focus', lang);
      else if (text.includes('CLIENTE') || text.includes('CLIENT')) sm.textContent = t('case.client', lang);
      else if (text.includes('PAPEL') || text.includes('ROLE')) sm.textContent = t('case.role', lang);
      else if (text.includes('ANO') || text.includes('YEAR')) sm.textContent = t('case.year', lang);
    });

    // Figma link
    document.querySelectorAll('.case-meta a[href*="figma.com"], .red-meta a[href*="figma.com"]').forEach(a => {
      const icon = a.querySelector('i')?.outerHTML || '↗';
      a.innerHTML = `${t('case.explore_figma', lang)} ${icon}`;
    });

    // View full application links in figcaptions
    document.querySelectorAll('figcaption a[target="_blank"]').forEach(a => {
      const icon = a.querySelector('i')?.outerHTML || '↗';
      a.innerHTML = `${t('case.view_full', lang)} ${icon}`;
    });

    // Full interface section label
    document.querySelectorAll('.full-project .section-label span').forEach(sp => {
      sp.textContent = t('case.full_interface', lang);
    });

    // Expand button in case study
    const expandBtn = document.getElementById('expand');
    if (expandBtn) {
      const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
      const label = isExpanded ? t('case.collapse', lang) : t('case.expand', lang);
      const icon = isExpanded ? '<i class="hgi hgi-stroke hgi-remove-01" aria-hidden="true"></i>' : '<i class="hgi hgi-stroke hgi-add-01" aria-hidden="true"></i>';
      expandBtn.innerHTML = `${label} ${icon}`;
    }

    // Disclaimer
    document.querySelectorAll('.disclaimer').forEach(p => {
      p.textContent = t('case.disclaimer', lang);
    });

    // Next case kicker
    document.querySelectorAll('.next-case > span').forEach(sp => {
      sp.textContent = t('case.next_case', lang);
    });

    // Back to collection link
    document.querySelectorAll('.back-collection').forEach(a => {
      const icon = a.querySelector('i')?.outerHTML || '←';
      a.innerHTML = `${icon} ${t('case.back_collection', lang)}`;
    });

    // Case Intro translation (if translation exists)
    const caseId = document.body.dataset.caseId;
    if (caseId && CASE_INTROS[caseId]) {
      const introData = CASE_INTROS[caseId][lang];
      const kickerEl = document.querySelector('.case-kicker, .red-kicker, .gran-kicker, .fin-kicker');
      const h1El = document.querySelector('.case-head h1, .red-intro h1, .gran-case-head h1, .fin-case-intro h1');
      const leadEl = document.querySelector('.case-lead, .red-lead, .gran-lead, .fin-lead');

      // Store originals
      if (!kickerEl?.dataset.origPt && kickerEl) kickerEl.dataset.origPt = kickerEl.innerHTML;
      if (!h1El?.dataset.origPt && h1El) h1El.dataset.origPt = h1El.innerHTML;
      if (!leadEl?.dataset.origPt && leadEl) leadEl.dataset.origPt = leadEl.innerHTML;

      if (introData) {
        if (kickerEl && introData.kicker) kickerEl.textContent = introData.kicker;
        if (h1El && introData.title) h1El.innerHTML = introData.title;
        if (leadEl && introData.lead) leadEl.textContent = introData.lead;
      } else {
        if (kickerEl && kickerEl.dataset.origPt) kickerEl.innerHTML = kickerEl.dataset.origPt;
        if (h1El && h1El.dataset.origPt) h1El.innerHTML = h1El.dataset.origPt;
        if (leadEl && leadEl.dataset.origPt) leadEl.innerHTML = leadEl.dataset.origPt;
      }
    }
  }

  function createLanguageSelect() {
    const wrap = document.createElement('div');
    wrap.className = 'lang-selector';
    wrap.innerHTML = `
      <button type="button" class="lang-trigger" aria-haspopup="menu" aria-expanded="false" aria-controls="language-menu" aria-label="Idioma / Language: ${LANGUAGE_NAMES[currentLang]}">
        <span class="lang-globe" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
        </span>
        <span class="lang-current">${currentLang.toUpperCase()}</span>
        <span class="lang-arrow" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
      </button>
    `;
    const trigger = wrap.querySelector('.lang-trigger');
    const menu = document.createElement('div');
    menu.id = 'language-menu';
    menu.className = 'lang-menu';
    menu.hidden = true;
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', 'Idioma / Language');
    menu.innerHTML = SUPPORTED.map(lang => `
      <button type="button" class="lang-option" role="menuitemradio" data-language="${lang}" aria-checked="${lang === currentLang}" tabindex="-1" lang="${HTML_LANG_MAP[lang]}">
        <span class="lang-option-code" aria-hidden="true">${lang.toUpperCase()}</span>
        <span>${LANGUAGE_NAMES[lang]}</span>
        <svg class="lang-option-check" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"></path></svg>
      </button>
    `).join('');
    document.body.append(menu);
    const options = Array.from(menu.querySelectorAll('.lang-option'));

    function closeMenu(restoreFocus = false) {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) trigger.focus({ preventScroll: true });
    }

    function openMenu(index = SUPPORTED.indexOf(currentLang)) {
      const owner = trigger.closest('dialog[open]') || document.body;
      if (menu.parentElement !== owner) owner.append(menu);
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      const rect = trigger.getBoundingClientRect();
      const width = menu.offsetWidth, height = menu.offsetHeight;
      const left = innerWidth <= 600 ? rect.left : rect.right - width;
      const top = rect.bottom + height + 8 <= innerHeight ? rect.bottom + 8 : rect.top - height - 8;
      menu.style.left = `${Math.max(8, Math.min(left, innerWidth - width - 8))}px`;
      menu.style.top = `${Math.max(8, Math.min(top, innerHeight - height - 8))}px`;
      options[index].focus({ preventScroll: true });
    }

    trigger.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu());
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        openMenu(event.key === 'ArrowUp' ? options.length - 1 : SUPPORTED.indexOf(currentLang));
      } else if (event.key === 'Escape' && !menu.hidden) {
        event.preventDefault();
        event.stopPropagation();
        closeMenu(true);
      }
    });
    menu.addEventListener('click', event => {
      // This portal belongs to the header; keep mobile navigation open on selection.
      event.stopPropagation();
      const option = event.target.closest('.lang-option');
      if (!option) return;
      applyLanguage(option.dataset.language);
      closeMenu(true);
    });
    menu.addEventListener('keydown', event => {
      const index = options.indexOf(document.activeElement);
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % options.length;
      if (event.key === 'ArrowUp') next = (index - 1 + options.length) % options.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = options.length - 1;
      if (event.key === 'Escape' || event.key === 'Tab') {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
        }
        closeMenu(true);
        return;
      }
      if (next === undefined && event.key.length === 1 && /[a-z]/i.test(event.key)) {
        next = options.findIndex((_, offset) => {
          const candidate = (index + offset + 1) % options.length;
          return LANGUAGE_NAMES[SUPPORTED[candidate]].toLowerCase().startsWith(event.key.toLowerCase());
        });
        if (next !== -1) next = (index + next + 1) % options.length;
        else next = undefined;
      }
      if (next !== undefined) {
        event.preventDefault();
        event.stopPropagation();
        options[next].focus({ preventScroll: true });
      }
    });
    document.addEventListener('pointerdown', event => {
      if (!wrap.contains(event.target) && !menu.contains(event.target)) closeMenu();
    });
    document.addEventListener('focusin', event => {
      if (!wrap.contains(event.target) && !menu.contains(event.target)) closeMenu();
    });
    window.addEventListener('scroll', () => closeMenu(), { passive: true, capture: true });
    window.addEventListener('resize', () => closeMenu());
    document.addEventListener('ns:navigation-close', () => {
      closeMenu();
      document.body.append(menu);
    });
    return wrap;
  }

  function mountLanguageSelector() {
    // Remove any legacy raw button groups
    document.querySelectorAll('.lang-switch').forEach(el => el.remove());

    const existing = document.querySelector('.lang-selector');
    if (existing) {
      const sel = existing.querySelector('.lang-select');
      if (sel) {
        sel.value = currentLang;
        sel.onchange = e => applyLanguage(e.target.value);
      }
      return;
    }

    const nav = document.querySelector('body > header nav');
    if (nav) {
      const selector = createLanguageSelect();
      const lastLink = nav.querySelector('a:last-child');
      if (lastLink) {
        nav.insertBefore(selector, lastLink);
      } else {
        nav.appendChild(selector);
      }
    }
  }

  // Expose API
  window.NS_I18N = {
    get currentLang() { return currentLang; },
    setLanguage: applyLanguage,
    t,
    dictionary: DICTIONARY
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      mountLanguageSelector();
      applyLanguage(currentLang);
    });
  } else {
    mountLanguageSelector();
    applyLanguage(currentLang);
  }
})();

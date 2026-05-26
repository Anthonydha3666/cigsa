/**
 * CIGSA — i18n ES ↔ EN
 * Texto base en español en el HTML; traducciones al inglés en translations.js.
 * Idioma por defecto: inglés. ES solo si el usuario lo eligió antes.
 */
(function () {
    const STORAGE_KEY = 'cigsa-lang';
    const DEFAULT_LANG = 'en';

    function getPageId() {
        if (document.body.dataset.page) return document.body.dataset.page;
        const file = location.pathname.split('/').pop().replace('.html', '') || 'index';
        return file;
    }

    function detectDefaultLang() {
        return localStorage.getItem(STORAGE_KEY) === 'es' ? 'es' : DEFAULT_LANG;
    }

    function getTranslation(lang, key) {
        const dict = window.CIGSA_TRANSLATIONS;
        if (!dict) return null;
        if (lang === 'en') return dict.en?.[key] ?? null;
        if (lang === 'es') return dict.es?.[key] ?? null;
        return null;
    }

    function cacheOriginal(el) {
        if (el.dataset.i18nCached) return;
        const attr = el.dataset.i18nAttr;
        if (attr) {
            el.dataset.i18nDefault = el.getAttribute(attr) || el[attr] || '';
        } else if (el.dataset.i18nHtml !== undefined || el.innerHTML !== el.textContent) {
            el.dataset.i18nDefault = el.innerHTML.trim();
            el.dataset.i18nHtml = '';
        } else {
            el.dataset.i18nDefault = el.textContent.trim();
        }
        el.dataset.i18nCached = '1';
    }

    function applyToElement(el, lang) {
        const key = el.dataset.i18n;
        if (!key) return;
        cacheOriginal(el);
        const attr = el.dataset.i18nAttr;
        const text = getTranslation(lang, key);

        if (lang === 'en') {
            if (!text) return;
            if (attr) el.setAttribute(attr, text);
            else if (el.dataset.i18nHtml !== undefined || /<[a-z][\s\S]*>/i.test(text)) el.innerHTML = text;
            else el.textContent = text;
        } else {
            const value = text || el.dataset.i18nDefault;
            if (attr) el.setAttribute(attr, value);
            else if (el.dataset.i18nHtml !== undefined) el.innerHTML = value;
            else el.textContent = value;
        }
    }

    function wireSelectors(selectors) {
        selectors.forEach(({ selector, key, attr, html }) => {
            document.querySelectorAll(selector).forEach((el) => {
                if (!el.dataset.i18n) {
                    el.dataset.i18n = key;
                    if (attr) el.dataset.i18nAttr = attr;
                    if (html) el.dataset.i18nHtml = '';
                }
            });
        });
    }

    const FOOTER_LINK_SELECTORS = [
        { selector: '.footer-links-col li:nth-child(1) a, .footer-links li:nth-child(1) a', key: 'footer.proyecto' },
        { selector: '.footer-links-col li:nth-child(2) a, .footer-links li:nth-child(2) a', key: 'footer.inversion' },
        { selector: '.footer-links-col li:nth-child(3) a, .footer-links li:nth-child(3) a', key: 'footer.gobernanza' },
        { selector: '.footer-links-col li:nth-child(4) a, .footer-links li:nth-child(4) a', key: 'footer.innovacion' },
        { selector: '.footer-links-col li:nth-child(5) a, .footer-links li:nth-child(5) a', key: 'footer.prensa' },
        { selector: '.footer-links-col li:nth-child(6) a, .footer-links li:nth-child(6) a', key: 'footer.insights' },
        { selector: '.footer-links-col li:nth-child(7) a, .footer-links li:nth-child(7) a', key: 'footer.equipo' },
        { selector: '.footer-col:nth-child(3) .footer-links-col li:nth-child(1) a', key: 'footer.terms' },
        { selector: '.footer-col:nth-child(3) .footer-links-col li:nth-child(2) a', key: 'footer.privacy' },
        { selector: '.footer-col:nth-child(3) .footer-links-col li:nth-child(3) a', key: 'footer.gdpr' },
    ];

    const COMMON_SELECTORS = [
        { selector: '.nav-links li:nth-child(1) a', key: 'nav.proyecto' },
        { selector: '.nav-links li:nth-child(2) a', key: 'nav.inversion' },
        { selector: '.nav-links li:nth-child(3) a', key: 'nav.gobernanza' },
        { selector: '.nav-links li:nth-child(4) a', key: 'nav.innovacion' },
        { selector: '.nav-links li:nth-child(5) a', key: 'nav.prensa' },
        { selector: '.nav-links li:nth-child(6) a', key: 'nav.insights' },
        { selector: '.nav-links li:nth-child(7) a', key: 'nav.equipo' },
        { selector: '.btn-investor', key: 'nav.requestAccess' },
        { selector: '.mobile-toggle', key: 'nav.menu', attr: 'aria-label' },
        { selector: '.lang-switch', key: 'nav.langAria', attr: 'aria-label' },
        { selector: '.footer-copy', key: 'footer.copy' },
        { selector: '.footer-disclaimer', key: 'footer.disclaimer' },
        { selector: '.footer-col:nth-child(2) h4', key: 'footer.navTitle' },
        { selector: '.footer-col:nth-child(3) h4', key: 'footer.legalTitle' },
        { selector: '.footer-col:nth-child(4) h4', key: 'footer.socialTitle' },
        { selector: '.footer-cta', key: 'footer.cta' },
        ...FOOTER_LINK_SELECTORS,
    ];

    const PAGE_SELECTORS = {
        index: [
            { selector: '.hero-content .section-tag', key: 'index.hero.tag' },
            { selector: '.hero-content h1', key: 'index.hero.title' },
            { selector: '.hero-content .hero-subtitle', key: 'index.hero.subtitle' },
            { selector: '.hero-buttons .btn-primary', key: 'index.hero.btnProject' },
            { selector: '.hero-buttons .btn-outline', key: 'index.hero.btnInvestment' },
            { selector: '.hero-stats .stat:nth-child(1) .stat-label', key: 'index.stat.rail' },
            { selector: '.hero-stats .stat:nth-child(2) .stat-label', key: 'index.stat.draft' },
            { selector: '.hero-stats .stat:nth-child(3) .stat-label', key: 'index.stat.capital' },
            { selector: '#teaser-proyecto .section-tag', key: 'index.asset.tag' },
            { selector: '#teaser-proyecto h2', key: 'index.asset.title' },
            { selector: '#teaser-proyecto .section-desc', key: 'index.asset.desc' },
            { selector: '#teaser-proyecto .home-pillar:nth-child(1) h3', key: 'index.pillar.ports.title' },
            { selector: '#teaser-proyecto .home-pillar:nth-child(1) p', key: 'index.pillar.ports.desc' },
            { selector: '#teaser-proyecto .home-pillar:nth-child(2) h3', key: 'index.pillar.rail.title' },
            { selector: '#teaser-proyecto .home-pillar:nth-child(2) p', key: 'index.pillar.rail.desc' },
            { selector: '#teaser-proyecto .home-pillar:nth-child(3) h3', key: 'index.pillar.energy.title' },
            { selector: '#teaser-proyecto .home-pillar:nth-child(3) p', key: 'index.pillar.energy.desc' },
            { selector: '#teaser-proyecto .home-cta-row .btn', key: 'index.asset.cta' },
            { selector: '.home-benchmark .section-tag', key: 'index.bench.tag' },
            { selector: '.home-benchmark h2', key: 'index.bench.title' },
            { selector: '.home-benchmark > .container > .section-desc', key: 'index.bench.desc' },
            { selector: '.home-benchmark .benchmark-note', key: 'index.bench.note' },
            { selector: '.home-teaser:nth-of-type(3) .section-tag', key: 'index.finance.tag' },
            { selector: '.home-teaser:nth-of-type(3) h2', key: 'index.finance.title' },
            { selector: '.home-teaser:nth-of-type(3) .section-desc', key: 'index.finance.desc' },
            { selector: '.home-teaser:nth-of-type(3) .home-list li:nth-child(1)', key: 'index.finance.li1' },
            { selector: '.home-teaser:nth-of-type(3) .home-list li:nth-child(2)', key: 'index.finance.li2' },
            { selector: '.home-teaser:nth-of-type(3) .home-list li:nth-child(3)', key: 'index.finance.li3' },
            { selector: '.home-teaser:nth-of-type(3) .home-list li:nth-child(4)', key: 'index.finance.li4' },
            { selector: '.home-teaser:nth-of-type(3) .btn-primary', key: 'index.finance.cta' },
            { selector: '.home-teaser:nth-of-type(4) .section-tag', key: 'index.gov.tag' },
            { selector: '.home-teaser:nth-of-type(4) h2', key: 'index.gov.title' },
            { selector: '.home-teaser:nth-of-type(4) .section-desc', key: 'index.gov.desc' },
            { selector: '.gov-label', key: 'index.gov.label' },
            { selector: '.governance-highlight p', key: 'index.gov.highlight' },
            { selector: '.home-teaser:nth-of-type(4) .home-list li:nth-child(1)', key: 'index.gov.li1' },
            { selector: '.home-teaser:nth-of-type(4) .home-list li:nth-child(2)', key: 'index.gov.li2' },
            { selector: '.home-teaser:nth-of-type(4) .home-list li:nth-child(3)', key: 'index.gov.li3' },
            { selector: '.home-teaser:nth-of-type(4) .btn-outline', key: 'index.gov.cta' },
            { selector: '#teaser-equipo .section-tag', key: 'index.lead.tag' },
            { selector: '#teaser-equipo h2', key: 'index.lead.title' },
            { selector: '#teaser-equipo .section-desc', key: 'index.lead.desc' },
            { selector: '#teaser-equipo .leader-card:nth-child(1) .leader-role', key: 'index.lead.role1' },
            { selector: '#teaser-equipo .leader-card:nth-child(1) .leader-title', key: 'index.lead.title1' },
            { selector: '#teaser-equipo .leader-card:nth-child(2) .leader-role', key: 'index.lead.role2' },
            { selector: '#teaser-equipo .leader-card:nth-child(2) .leader-title', key: 'index.lead.title2' },
            { selector: '#teaser-equipo .leader-card:nth-child(3) .leader-role', key: 'index.lead.role3' },
            { selector: '#teaser-equipo .leader-card:nth-child(3) .leader-title', key: 'index.lead.title3' },
            { selector: '#teaser-equipo .home-cta-row .btn', key: 'index.lead.cta' },
            { selector: '.home-benchmark table thead th:nth-child(1)', key: 'index.table.h1' },
            { selector: '.home-benchmark table thead th:nth-child(2)', key: 'index.table.h2' },
            { selector: '.home-benchmark table thead th:nth-child(3)', key: 'index.table.h3' },
            { selector: '.home-benchmark table thead th:nth-child(4)', key: 'index.table.h4' },
            { selector: '.home-benchmark table tbody tr:nth-child(1) td:nth-child(1)', key: 'index.table.r1c1' },
            { selector: '.home-benchmark table tbody tr:nth-child(1) td:nth-child(2)', key: 'index.table.r1c2' },
            { selector: '.home-benchmark table tbody tr:nth-child(1) td:nth-child(3)', key: 'index.table.r1c3' },
            { selector: '.home-benchmark table tbody tr:nth-child(1) td:nth-child(4)', key: 'index.table.r1c4' },
            { selector: '.home-benchmark table tbody tr:nth-child(2) td:nth-child(1)', key: 'index.table.r2c1' },
            { selector: '.home-benchmark table tbody tr:nth-child(2) td:nth-child(2)', key: 'index.table.r2c2' },
            { selector: '.home-benchmark table tbody tr:nth-child(2) td:nth-child(3)', key: 'index.table.r2c3' },
            { selector: '.home-benchmark table tbody tr:nth-child(2) td:nth-child(4)', key: 'index.table.r2c4' },
            { selector: '.home-benchmark table tbody tr:nth-child(3) td:nth-child(1)', key: 'index.table.r3c1' },
            { selector: '.home-benchmark table tbody tr:nth-child(3) td:nth-child(2)', key: 'index.table.r3c2' },
            { selector: '.home-benchmark table tbody tr:nth-child(3) td:nth-child(3)', key: 'index.table.r3c3' },
            { selector: '.home-benchmark table tbody tr:nth-child(3) td:nth-child(4)', key: 'index.table.r3c4' },
            { selector: '.home-benchmark table tbody tr:nth-child(4) td:nth-child(1)', key: 'index.table.r4c1' },
            { selector: '.home-benchmark table tbody tr:nth-child(4) td:nth-child(2)', key: 'index.table.r4c2' },
            { selector: '.home-benchmark table tbody tr:nth-child(4) td:nth-child(3)', key: 'index.table.r4c3' },
            { selector: '.home-benchmark table tbody tr:nth-child(4) td:nth-child(4)', key: 'index.table.r4c4' },
            { selector: '.home-benchmark table tbody tr:nth-child(5) td:nth-child(1)', key: 'index.table.r5c1' },
            { selector: '.home-benchmark table tbody tr:nth-child(5) td:nth-child(2)', key: 'index.table.r5c2' },
            { selector: '.home-benchmark table tbody tr:nth-child(5) td:nth-child(3)', key: 'index.table.r5c3' },
            { selector: '.home-benchmark table tbody tr:nth-child(5) td:nth-child(4)', key: 'index.table.r5c4' },
            { selector: '.home-benchmark table tbody tr:nth-child(6) td:nth-child(1)', key: 'index.table.r6c1' },
            { selector: '.home-benchmark table tbody tr:nth-child(6) td:nth-child(2)', key: 'index.table.r6c2' },
            { selector: '.home-benchmark table tbody tr:nth-child(6) td:nth-child(3)', key: 'index.table.r6c3' },
            { selector: '.home-benchmark table tbody tr:nth-child(6) td:nth-child(4)', key: 'index.table.r6c4' },
        ],
        proyecto: [
            { selector: '.page-hero .section-tag', key: 'proyecto.hero.tag' },
            { selector: '.page-hero h1', key: 'proyecto.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'proyecto.hero.subtitle', html: true },
            { selector: '.page-hero .btn-primary', key: 'common.requestInvestor' },
            { selector: '.page-hero .btn-outline', key: 'common.backOverview' },
            { selector: '.page-main .section > .container > h2', key: 'proyecto.section.title' },
            { selector: '.page-main .section > .container > .section-desc', key: 'proyecto.section.desc' },
            { selector: '.infra-card:nth-child(1) h3', key: 'proyecto.infra1.title' },
            { selector: '.infra-card:nth-child(1) p', key: 'proyecto.infra1.p' },
            { selector: '.infra-card:nth-child(1) .infra-detail', key: 'proyecto.infra1.d' },
            { selector: '.infra-card:nth-child(2) h3', key: 'proyecto.infra2.title' },
            { selector: '.infra-card:nth-child(2) p', key: 'proyecto.infra2.p' },
            { selector: '.infra-card:nth-child(3) h3', key: 'proyecto.infra3.title' },
            { selector: '.infra-card:nth-child(3) p', key: 'proyecto.infra3.p' },
            { selector: '.infra-card:nth-child(4) h3', key: 'proyecto.infra4.title' },
            { selector: '.infra-card:nth-child(4) p', key: 'proyecto.infra4.p' },
            { selector: '.port-caption', key: 'proyecto.port.caption' },
            { selector: '[data-i18n="proyecto.fast.tag"]', key: 'proyecto.fast.tag' },
            { selector: '[data-i18n="proyecto.fast.title"]', key: 'proyecto.fast.title' },
            { selector: '[data-i18n="proyecto.fast.desc"]', key: 'proyecto.fast.desc' },
            { selector: '.track-card:nth-child(1) .card-meta', key: 'proyecto.track1.meta' },
            { selector: '.track-card:nth-child(1) h3', key: 'proyecto.track1.title' },
            { selector: '.track-card:nth-child(1) p', key: 'proyecto.track1.p' },
            { selector: '.track-card:nth-child(2) .card-meta', key: 'proyecto.track2.meta' },
            { selector: '.track-card:nth-child(2) h3', key: 'proyecto.track2.title' },
            { selector: '.track-card:nth-child(2) p', key: 'proyecto.track2.p' },
            { selector: '.track-card:nth-child(3) .card-meta', key: 'proyecto.track3.meta' },
            { selector: '.track-card:nth-child(3) h3', key: 'proyecto.track3.title' },
            { selector: '.track-card:nth-child(3) p', key: 'proyecto.track3.p' },
            { selector: '.benchmark h3', key: 'proyecto.bench.title' },
        ],
        inversion: [
            { selector: '.page-hero .section-tag', key: 'inversion.hero.tag' },
            { selector: '.page-hero h1', key: 'inversion.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'inversion.hero.subtitle' },
            { selector: '.page-hero .btn-primary', key: 'inversion.hero.btn1' },
            { selector: '.page-hero .btn-outline', key: 'inversion.hero.btn2' },
            { selector: '.section-dark h2', key: 'inversion.section.title' },
            { selector: '.section-dark > .container > .section-desc', key: 'inversion.section.desc' },
            { selector: '.bot-model .bot-title', key: 'inversion.bot.title' },
            { selector: '.bot-step:nth-child(1) h4', key: 'inversion.bot1.title' },
            { selector: '.bot-step:nth-child(1) p', key: 'inversion.bot1.p' },
            { selector: '.bot-step:nth-child(2) h4', key: 'inversion.bot2.title' },
            { selector: '.bot-step:nth-child(2) p', key: 'inversion.bot2.p' },
            { selector: '.bot-step:nth-child(3) h4', key: 'inversion.bot3.title' },
            { selector: '.bot-step:nth-child(3) p', key: 'inversion.bot3.p' },
            { selector: '.coingt-section h3', key: 'inversion.coingt.title' },
            { selector: '.coingt-desc', key: 'inversion.coingt.desc' },
            { selector: '.coingt-card:nth-child(1) .coingt-label', key: 'inversion.coingt1.label' },
            { selector: '.coingt-card:nth-child(1) .coingt-detail', key: 'inversion.coingt1.d' },
            { selector: '.coingt-card:nth-child(2) .coingt-label', key: 'inversion.coingt2.label' },
            { selector: '.coingt-card:nth-child(2) .coingt-detail', key: 'inversion.coingt2.d' },
            { selector: '.coingt-card:nth-child(3) .coingt-label', key: 'inversion.coingt3.label' },
            { selector: '.coingt-card:nth-child(3) .coingt-detail', key: 'inversion.coingt3.d' },
            { selector: '[data-i18n="inversion.eco.title"]', key: 'inversion.eco.title' },
            { selector: '[data-i18n="inversion.eco.desc"]', key: 'inversion.eco.desc' },
            { selector: '.ecosystem-card:nth-child(1) span', key: 'inversion.eco1' },
            { selector: '.ecosystem-card:nth-child(2) span', key: 'inversion.eco2' },
            { selector: '.ecosystem-card:nth-child(3) span', key: 'inversion.eco3' },
            { selector: '.data-room h3', key: 'inversion.dataroom.title' },
            { selector: '.data-room p', key: 'inversion.dataroom.desc' },
            { selector: '.data-room .btn-primary', key: 'common.requestAccess' },
        ],
        gobernanza: [
            { selector: '.page-hero .section-tag', key: 'gobernanza.hero.tag' },
            { selector: '.page-hero h1', key: 'gobernanza.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'gobernanza.hero.subtitle' },
            { selector: '.page-hero .btn-primary', key: 'gobernanza.hero.btn1' },
            { selector: '.page-hero .btn-outline', key: 'gobernanza.hero.btn2' },
            { selector: '.page-main .section h2', key: 'gobernanza.section.title' },
            { selector: '.page-main .section > .container > .section-desc', key: 'gobernanza.section.desc' },
            { selector: '.governance-highlight .gov-label', key: 'gobernanza.gov.label' },
            { selector: '.governance-highlight p', key: 'gobernanza.gov.p' },
            { selector: '.gov-column:nth-child(1) h3', key: 'gobernanza.col1.title' },
            { selector: '.gov-column:nth-child(1) .gov-list li:nth-child(1)', key: 'gobernanza.col1.li1' },
            { selector: '.gov-column:nth-child(1) .gov-list li:nth-child(2)', key: 'gobernanza.col1.li2' },
            { selector: '.gov-column:nth-child(1) .gov-list li:nth-child(3)', key: 'gobernanza.col1.li3' },
            { selector: '.gov-column:nth-child(1) .gov-list li:nth-child(4)', key: 'gobernanza.col1.li4' },
            { selector: '.gov-column:nth-child(2) h3', key: 'gobernanza.col2.title' },
            { selector: '.gov-column:nth-child(2) .gov-list li:nth-child(1)', key: 'gobernanza.col2.li1' },
            { selector: '.gov-column:nth-child(2) .gov-list li:nth-child(2)', key: 'gobernanza.col2.li2' },
            { selector: '.gov-column:nth-child(2) .gov-list li:nth-child(3)', key: 'gobernanza.col2.li3' },
            { selector: '.gov-column:nth-child(2) .gov-list li:nth-child(4)', key: 'gobernanza.col2.li4' },
        ],
        innovacion: [
            { selector: '.page-hero .section-tag', key: 'innovacion.hero.tag' },
            { selector: '.page-hero h1', key: 'innovacion.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'innovacion.hero.subtitle' },
            { selector: '.page-hero .btn-primary', key: 'innovacion.hero.btn1' },
            { selector: '.page-hero .btn-outline', key: 'innovacion.hero.btn2' },
            { selector: '.phase-badge', key: 'innovacion.phase' },
            { selector: '.section-dark h2', key: 'innovacion.section.title' },
            { selector: '.section-dark .section-desc', key: 'innovacion.section.desc' },
            { selector: '.agent-card:nth-child(1) h3', key: 'innovacion.a1.title' },
            { selector: '.agent-card:nth-child(1) p', key: 'innovacion.a1.p' },
            { selector: '.agent-card:nth-child(2) h3', key: 'innovacion.a2.title' },
            { selector: '.agent-card:nth-child(2) p', key: 'innovacion.a2.p' },
            { selector: '.agent-card:nth-child(3) h3', key: 'innovacion.a3.title' },
            { selector: '.agent-card:nth-child(3) p', key: 'innovacion.a3.p' },
            { selector: '.agent-card:nth-child(4) h3', key: 'innovacion.a4.title' },
            { selector: '.agent-card:nth-child(4) p', key: 'innovacion.a4.p' },
            { selector: '.agent-card:nth-child(5) h3', key: 'innovacion.a5.title' },
            { selector: '.agent-card:nth-child(5) p', key: 'innovacion.a5.p' },
        ],
        prensa: [
            { selector: '.page-hero .section-tag', key: 'prensa.hero.tag' },
            { selector: '.page-hero h1', key: 'prensa.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'prensa.hero.subtitle' },
            { selector: '.page-hero .btn-primary', key: 'prensa.hero.btn1' },
            { selector: '.page-hero .btn-outline', key: 'prensa.hero.btn2' },
            { selector: '.page-main .section h2', key: 'prensa.section.title' },
            { selector: '.page-main .section > .container > .section-desc', key: 'prensa.section.desc' },
            { selector: '.press-card:nth-child(1) .card-meta', key: 'prensa.c1.meta' },
            { selector: '.press-card:nth-child(1) h3', key: 'prensa.c1.title' },
            { selector: '.press-card:nth-child(1) p', key: 'prensa.c1.p' },
            { selector: '.press-card:nth-child(1) .card-link', key: 'prensa.c1.link' },
            { selector: '.press-card:nth-child(2) .card-meta', key: 'prensa.c2.meta' },
            { selector: '.press-card:nth-child(2) h3', key: 'prensa.c2.title' },
            { selector: '.press-card:nth-child(2) p', key: 'prensa.c2.p' },
            { selector: '.press-card:nth-child(2) .card-link', key: 'prensa.c2.link' },
            { selector: '.press-card:nth-child(3) .card-meta', key: 'prensa.c3.meta' },
            { selector: '.press-card:nth-child(3) h3', key: 'prensa.c3.title' },
            { selector: '.press-card:nth-child(3) p', key: 'prensa.c3.p' },
            { selector: '.press-card:nth-child(3) .card-link', key: 'prensa.c3.link' },
        ],
        insights: [
            { selector: '.page-hero .section-tag', key: 'insights.hero.tag' },
            { selector: '.page-hero h1', key: 'insights.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'insights.hero.subtitle' },
            { selector: '.page-hero .btn-primary', key: 'insights.hero.btn1' },
            { selector: '.page-hero .btn-outline', key: 'insights.hero.btn2' },
            { selector: '.section-dark h2', key: 'insights.section.title' },
            { selector: '.section-dark > .container > .section-desc', key: 'insights.section.desc' },
            { selector: '.insight-card:nth-child(1) .card-meta', key: 'insights.c1.meta' },
            { selector: '.insight-card:nth-child(1) h3', key: 'insights.c1.title' },
            { selector: '.insight-card:nth-child(1) p', key: 'insights.c1.p' },
            { selector: '.insight-card:nth-child(2) .card-meta', key: 'insights.c2.meta' },
            { selector: '.insight-card:nth-child(2) h3', key: 'insights.c2.title' },
            { selector: '.insight-card:nth-child(2) p', key: 'insights.c2.p' },
            { selector: '.insight-card:nth-child(3) .card-meta', key: 'insights.c3.meta' },
            { selector: '.insight-card:nth-child(3) h3', key: 'insights.c3.title' },
            { selector: '.insight-card:nth-child(3) p', key: 'insights.c3.p' },
        ],
        'equipo-contacto': [
            { selector: '.page-hero .section-tag', key: 'equipo.hero.tag' },
            { selector: '.page-hero h1', key: 'equipo.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'equipo.hero.subtitle' },
            { selector: '.page-hero .btn-primary', key: 'equipo.hero.btn1' },
            { selector: '.page-hero .btn-outline', key: 'equipo.hero.btn2' },
            { selector: '#liderazgo .section-tag', key: 'equipo.lead.tag' },
            { selector: '#liderazgo h2', key: 'equipo.lead.title' },
            { selector: '#liderazgo .section-desc', key: 'equipo.lead.desc' },
            { selector: '#liderazgo .bot-title', key: 'equipo.eco.title' },
            { selector: '.section-dark h2', key: 'equipo.contact.title' },
            { selector: '.section-dark .section-desc', key: 'equipo.contact.desc' },
            { selector: '#contactForm label:nth-of-type(1)', key: 'equipo.form.name' },
            { selector: '#contactForm label:nth-of-type(2)', key: 'equipo.form.email' },
            { selector: '#contactForm label:nth-of-type(3)', key: 'equipo.form.org' },
            { selector: '#contactForm label:nth-of-type(4)', key: 'equipo.form.type' },
            { selector: '#contactForm label:nth-of-type(5)', key: 'equipo.form.message' },
            { selector: '#contactForm input[type="text"]', key: 'equipo.form.namePh', attr: 'placeholder' },
            { selector: '#contactForm input[type="email"]', key: 'equipo.form.emailPh', attr: 'placeholder' },
            { selector: '#contactForm .form-group:nth-child(3) input', key: 'equipo.form.orgPh', attr: 'placeholder' },
            { selector: '#contactForm textarea', key: 'equipo.form.msgPh', attr: 'placeholder' },
            { selector: '#contactForm .btn-submit', key: 'equipo.form.submit' },
            { selector: '#contactForm .checkbox-label span', key: 'equipo.form.privacy' },
            { selector: '#contactForm option:nth-child(1)', key: 'equipo.form.opt0' },
            { selector: '#contactForm option:nth-child(2)', key: 'equipo.form.opt1' },
            { selector: '#contactForm option:nth-child(3)', key: 'equipo.form.opt2' },
            { selector: '#contactForm option:nth-child(4)', key: 'equipo.form.opt3' },
            { selector: '#contactForm option:nth-child(5)', key: 'equipo.form.opt4' },
            { selector: '#contactForm option:nth-child(6)', key: 'equipo.form.opt5' },
            { selector: '.leader-card:nth-child(1) .leader-role', key: 'equipo.lead1.role' },
            { selector: '.leader-card:nth-child(1) .leader-title', key: 'equipo.lead1.title' },
            { selector: '.leader-card:nth-child(1) p', key: 'equipo.lead1.p' },
            { selector: '.leader-card:nth-child(2) .leader-role', key: 'equipo.lead2.role' },
            { selector: '.leader-card:nth-child(2) .leader-title', key: 'equipo.lead2.title' },
            { selector: '.leader-card:nth-child(2) p', key: 'equipo.lead2.p' },
            { selector: '.leader-card:nth-child(3) .leader-role', key: 'equipo.lead3.role' },
            { selector: '.leader-card:nth-child(3) .leader-title', key: 'equipo.lead3.title' },
            { selector: '.leader-card:nth-child(3) p', key: 'equipo.lead3.p' },
            { selector: '.leader-card:nth-child(4) .leader-role', key: 'equipo.lead4.role' },
            { selector: '.leader-card:nth-child(4) .leader-title', key: 'equipo.lead4.title' },
            { selector: '.leader-card:nth-child(4) p', key: 'equipo.lead4.p' },
            { selector: '.leader-card:nth-child(5) .leader-role', key: 'equipo.lead5.role' },
            { selector: '.leader-card:nth-child(5) .leader-title', key: 'equipo.lead5.title' },
            { selector: '.leader-card:nth-child(5) p', key: 'equipo.lead5.p' },
            { selector: '.ecosystem-card:nth-child(1) span', key: 'equipo.eco.cig' },
            { selector: '.ecosystem-card:nth-child(2) span', key: 'equipo.eco.cigsa' },
            { selector: '.ecosystem-card:nth-child(3) span', key: 'equipo.eco.odepal' },
            { selector: '.ecosystem-card:nth-child(4) span', key: 'equipo.eco.godes' },
            { selector: '.ecosystem-card:nth-child(5) span', key: 'equipo.eco.coingt' },
            { selector: '.team-card:nth-child(1) .card-meta', key: 'equipo.team1.meta' },
            { selector: '.team-card:nth-child(1) h3', key: 'equipo.team1.title' },
            { selector: '.team-card:nth-child(1) .team-detail', key: 'equipo.team1.p' },
            { selector: '.team-card:nth-child(2) .card-meta', key: 'equipo.team2.meta' },
            { selector: '.team-card:nth-child(2) h3', key: 'equipo.team2.title' },
            { selector: '.team-card:nth-child(2) .team-detail', key: 'equipo.team2.p' },
            { selector: '.team-card:nth-child(3) .card-meta', key: 'equipo.team3.meta' },
            { selector: '.team-card:nth-child(3) h3', key: 'equipo.team3.title' },
            { selector: '.team-card:nth-child(3) .team-detail', key: 'equipo.team3.p' },
        ],
    };

    function applyTitle(lang) {
        const page = getPageId();
        const key = `${page}.meta.title`;
        const dict = window.CIGSA_TRANSLATIONS?.en;

        if (!document.body.dataset.i18nTitleDefault) {
            document.body.dataset.i18nTitleDefault = document.title;
        }
        if (lang === 'en' && dict?.[key]) {
            document.title = dict[key];
        } else {
            document.title = document.body.dataset.i18nTitleDefault;
        }

        const metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) return;
        const descKey = `${page}.meta.description`;
        if (!metaDesc.dataset.i18nDefault) {
            metaDesc.dataset.i18nDefault = metaDesc.getAttribute('content') || '';
        }
        if (lang === 'en' && dict?.[descKey]) {
            metaDesc.setAttribute('content', dict[descKey]);
        } else {
            metaDesc.setAttribute('content', metaDesc.dataset.i18nDefault);
        }
    }

    function updateLangButtons(lang) {
        document.querySelectorAll('.lang-btn').forEach((btn) => {
            const active = btn.dataset.lang === lang;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }

    function setLanguage(lang) {
        if (lang !== 'en' && lang !== 'es') return;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach((el) => applyToElement(el, lang));
        applyTitle(lang);
        updateLangButtons(lang);
    }

    function initLangSwitcher() {
        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
        });
    }

    function initI18n() {
        const page = getPageId();
        wireSelectors(COMMON_SELECTORS);
        if (PAGE_SELECTORS[page]) wireSelectors(PAGE_SELECTORS[page]);

        document.querySelectorAll('[data-i18n]').forEach(cacheOriginal);
        setLanguage(detectDefaultLang());
        initLangSwitcher();
        document.documentElement.classList.add('i18n-ready');
    }

    window.CIGSA_I18N = { setLanguage, detectDefaultLang, getPageId };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }
})();

/**
 * CIGSA — i18n ES ↔ EN
 * Texto base en español en el HTML; traducciones al inglés en translations.js.
 * Detecta idioma del navegador en la primera visita.
 */
(function () {
    const STORAGE_KEY = 'cigsa-lang';

    function getPageId() {
        if (document.body.dataset.page) return document.body.dataset.page;
        const file = location.pathname.split('/').pop().replace('.html', '') || 'index';
        return file;
    }

    function detectDefaultLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'es') return stored;
        const nav = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
        return nav.startsWith('en') ? 'en' : 'es';
    }

    function cacheOriginal(el) {
        if (el.dataset.i18nCached) return;
        const attr = el.dataset.i18nAttr;
        if (attr) {
            el.dataset.i18nDefault = el.getAttribute(attr) || '';
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
        const enText = window.CIGSA_TRANSLATIONS?.en?.[key];

        if (lang === 'en') {
            if (!enText) return;
            if (attr) el.setAttribute(attr, enText);
            else if (el.dataset.i18nHtml !== undefined || /<[a-z][\s\S]*>/i.test(enText)) el.innerHTML = enText;
            else el.textContent = enText;
        } else {
            const value = el.dataset.i18nDefault;
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
        ],
        proyecto: [
            { selector: '.page-hero .section-tag', key: 'proyecto.hero.tag' },
            { selector: '.page-hero h1', key: 'proyecto.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'proyecto.hero.subtitle', html: true },
            { selector: '.page-hero .btn-primary', key: 'proyecto.hero.btn1' },
            { selector: '.page-hero .btn-outline', key: 'proyecto.hero.btn2' },
        ],
        inversion: [
            { selector: '.page-hero .section-tag', key: 'inversion.hero.tag' },
            { selector: '.page-hero h1', key: 'inversion.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'inversion.hero.subtitle' },
        ],
        gobernanza: [
            { selector: '.page-hero .section-tag', key: 'gobernanza.hero.tag' },
            { selector: '.page-hero h1', key: 'gobernanza.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'gobernanza.hero.subtitle' },
        ],
        innovacion: [
            { selector: '.page-hero .section-tag', key: 'innovacion.hero.tag' },
            { selector: '.page-hero h1', key: 'innovacion.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'innovacion.hero.subtitle' },
        ],
        prensa: [
            { selector: '.page-hero .section-tag', key: 'prensa.hero.tag' },
            { selector: '.page-hero h1', key: 'prensa.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'prensa.hero.subtitle' },
        ],
        insights: [
            { selector: '.page-hero .section-tag', key: 'insights.hero.tag' },
            { selector: '.page-hero h1', key: 'insights.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'insights.hero.subtitle' },
        ],
        'equipo-contacto': [
            { selector: '.page-hero .section-tag', key: 'equipo.hero.tag' },
            { selector: '.page-hero h1', key: 'equipo.hero.title' },
            { selector: '.page-hero .hero-subtitle', key: 'equipo.hero.subtitle' },
            { selector: '.page-hero .btn-primary', key: 'equipo.hero.btn1' },
            { selector: '.page-hero .btn-outline', key: 'equipo.hero.btn2' },
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
    }

    window.CIGSA_I18N = { setLanguage, detectDefaultLang, getPageId };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }
})();

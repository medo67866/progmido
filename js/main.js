document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const progress = document.getElementById("scrollProgress");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll("#navMenu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});

// English / Arabic interface. Only visible copy and direction are changed.
(() => {
  const translations = {
    ar: {
      '.navbar-nav .nav-item:nth-child(1) .nav-link':'الرئيسية',
      '.navbar-nav .nav-item:nth-child(2) .nav-link':'نبذة عني',
      '.navbar-nav .nav-item:nth-child(3) .nav-link':'الخدمات',
      '.navbar-nav .nav-item:nth-child(4) .nav-link':'الأعمال',
      '.navbar-nav .nav-item:nth-child(5) .nav-link':'تواصل',
      '.btn-nav':'لنتحدث <i class="bi bi-arrow-up-right"></i>',
      '.eyebrow':'<span class="dot"></span> مطور مواقع · حلول رقمية',
      '.hero-title':'أصنع تجارب رقمية<br><span>نظيفة واحترافية.</span>',
      '.hero-copy':'مرحباً، أنا <strong>محمد حسن</strong>. أصمم وأطور مواقع حديثة ومتجاوبة وعملية تساعد الشركات على عرض أفكارها بوضوح والتواصل مع جمهورها.',
      '.hero-actions .btn-primary-custom':'شاهد أعمالي <i class="bi bi-arrow-down-right"></i>',
      '.hero-actions .btn-outline-custom':'تواصل معي',
      '.hero-links span':'<i class="bi bi-globe2"></i> متاح للعمل عالمياً',
      '.status':'<span></span> متاح للمشاريع',
      '.portrait-caption small':'مرحباً، أنا',
      '.card-one span':'كود منظم', '.card-two span':'تصميم متجاوب',
      '.scroll-hint':'<span></span> مرر للاستكشاف',
      '#about .section-label':'01 · نبذة عني',
      '#about .section-heading h2':'العمل الرقمي يجب أن يكون <em>بسيطاً، مفيداً ولا يُنسى.</em>',
      '#about .lead-text':'أتعامل مع تطوير المواقع من منظور تقني وعملي معاً. هدفي ليس مجرد جعل الصفحة جميلة، بل إنشاء تجربة سريعة وواضحة ومتجاوبة وسهلة الاستخدام.',
      '#about .body-text':'من مواقع الشركات وصفحات الهبوط إلى معارض الأعمال والمواقع التجارية، أجمع بين تطوير الواجهات النظيفة والاهتمام بالبنية وسهولة الاستخدام والتفاصيل البصرية.',
      '#about .text-link':'ابدأ محادثة <i class="bi bi-arrow-right"></i>',
      '.about-card-title':'أدواتي الأساسية',
      '#services .section-label':'02 · الخدمات',
      '#services .section-heading h2':'من الفكرة إلى <em>حضور رقمي احترافي.</em>',
      '#services .service-card:nth-of-type(1) h3':'تطوير المواقع',
      '#services .service-card:nth-of-type(1) p':'مواقع ثابتة وتجارية حديثة مبنية بكود واجهات منظم وقابل للصيانة.',
      '#services .row > div:nth-child(1) h3':'تطوير المواقع',
      '#services .row > div:nth-child(1) p':'مواقع ثابتة وتجارية حديثة مبنية بكود واجهات منظم وقابل للصيانة.',
      '#services .row > div:nth-child(2) h3':'تنفيذ واجهات المستخدم',
      '#services .row > div:nth-child(2) p':'تحويل التصاميم المرئية إلى واجهات متجاوبة مع عناية بالمسافات والتفاصيل.',
      '#services .row > div:nth-child(3) h3':'التصميم المتجاوب',
      '#services .row > div:nth-child(3) p':'تجارب تتكيف بسلاسة مع شاشات الكمبيوتر والتابلت والجوال.',
      '#services .row > div:nth-child(4) h3':'تحسين المواقع',
      '#services .row > div:nth-child(4) p':'تحسينات عملية للبنية والأداء وإمكانية الوصول وأساسيات SEO.',
      '#work .section-label':'03 · أعمال مختارة',
      '#work .section-heading h2':'أعمال تحول الأفكار إلى <em>تجارب حقيقية.</em>',
      '#work .work-card:nth-child(1) .project-tag':'موقع شركة · مشروع مميز',
      '#work .work-card:nth-child(1) p':'حضور رقمي احترافي صُمم حول الثقة والتجارة الدولية والعرض الواضح للمنتجات.',
      '#work .work-card:nth-child(1) .work-visit':'<i class="bi bi-box-arrow-up-right"></i> زيارة الموقع',
      '#work .work-card:nth-child(1) .project-link':'زيارة المشروع <i class="bi bi-arrow-up-right"></i>',
      '#work .work-card:nth-child(2) .project-tag':'صفحة هبوط · تجربة تسجيل',
      '#work .work-card:nth-child(2) p':'تجربة فعالية ثنائية اللغة ومتجاوبة، مع نماذج تسجيل ودعم RTL/LTR وربط عملي للبيانات.',
      '#work .work-card:nth-child(2) .work-visit':'<i class="bi bi-box-arrow-up-right"></i> زيارة الموقع',
      '#work .work-card:nth-child(2) .project-link':'زيارة المشروع <i class="bi bi-arrow-up-right"></i>',
      '#process .section-label':'04 · آلية العمل',
      '#process .section-heading h2':'عملية واضحة تصنع <em>نتائج أفضل.</em>',
      '#process .process-step:nth-child(1) h3':'الاكتشاف',
      '#process .process-step:nth-child(1) p':'فهم النشاط والجمهور والهدف قبل كتابة أول سطر من الكود.',
      '#process .process-step:nth-child(2) h3':'الهيكلة',
      '#process .process-step:nth-child(2) p':'تخطيط المحتوى والتسلسل والسلوك المتجاوب لتكون التجربة طبيعية.',
      '#process .process-step:nth-child(3) h3':'التطوير',
      '#process .process-step:nth-child(3) p':'بناء مكونات نظيفة ومتجاوبة وتفاعلات قابلة للصيانة.',
      '#process .process-step:nth-child(4) h3':'التسليم',
      '#process .process-step:nth-child(4) p':'اختبار أحجام الشاشات وصقل التفاصيل وتجهيز الموقع للنشر.',
      '#contact .section-label':'05 · لنتواصل',
      '.contact-copy h2':'هل لديك مشروع في ذهنك؟',
      '.contact-copy p':'أرحب بالاستفسارات المباشرة. أخبرني بما تريد بناءه ولنستكشف كيف يمكنني مساعدتك.',
      '.btn-whatsapp':'<i class="bi bi-whatsapp"></i> تواصل عبر واتساب',
      '.contact-details .contact-item:nth-child(1) small':'البريد الإلكتروني',
      '.contact-details .contact-item:nth-child(2) small':'واتساب',
      'footer .footer-inner p':'© <span id="year"></span> Mohamed Hassan. صُمم بكود منظم وهدف واضح.'
    }
  };

  const english = new Map();
  const selectors = Object.keys(translations.ar);
  selectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) english.set(sel, el.innerHTML);
  });

  const toggle = document.getElementById('langToggle');
  const applyLanguage = (lang) => {
    const ar = lang === 'ar';
    document.documentElement.lang = ar ? 'ar' : 'en';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', ar);
    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.innerHTML = ar ? translations.ar[sel] : english.get(sel);
    });
    if (toggle) toggle.textContent = ar ? 'English' : 'العربية';
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
    localStorage.setItem('progmidoLang', lang);
  };

  if (toggle) toggle.addEventListener('click', () => applyLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar'));
  applyLanguage(localStorage.getItem('progmidoLang') === 'ar' ? 'ar' : 'en');
})();

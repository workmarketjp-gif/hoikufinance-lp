(() => {
  const fullLogo = '/logo/logo_hoikufinance.png';
  const markLogo = '/logo/logom_hoikufinance.png';

  const mountOfficialBranding = () => {
    document.querySelectorAll('.site-header .brand, .site-footer .brand').forEach((brand) => {
      brand.innerHTML = `<img class="official-logo" src="${fullLogo}" alt="Hoiku Finance">`;
    });

    const dashBrand = document.querySelector('.dash-brand');
    if (dashBrand) dashBrand.innerHTML = `<img class="official-logo" src="${fullLogo}" alt="Hoiku Finance">`;

    document.querySelectorAll('.mini-mark, .brand-mark').forEach((mark) => {
      const image = document.createElement('img');
      image.className = 'official-mark';
      image.src = markLogo;
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      mark.replaceWith(image);
    });

    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      document.head.appendChild(favicon);
    }
    favicon.href = `${markLogo}?v=20260904`;
  };

  const injectMessageStyles = () => {
    const style = document.createElement('style');
    style.id = 'hf-message-fixes';
    style.textContent = `
      .hero h1,.section-heading h2,.split-heading h2,.report-copy h2,.flow-heading h2,.pricing-panel h2,.cta-copy h2{font-family:"Zen Maru Gothic","Noto Sans JP",sans-serif!important;font-weight:700!important;letter-spacing:-.035em!important}
      .hero .eyebrow{letter-spacing:.05em!important;font-size:12px!important;color:#0a5adf!important}
      .hero-lead strong{color:#0b2d64;font-weight:800}
      .budget-bridge{margin-top:24px;display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;max-width:560px}
      .budget-bridge-card{border:1px solid #dce8f6;background:rgba(255,255,255,.92);border-radius:16px;padding:14px 16px;box-shadow:0 10px 25px rgba(35,84,146,.07)}
      .budget-bridge-card small{display:block;color:#73849a;font-size:10px;font-weight:700;margin-bottom:5px}.budget-bridge-card strong{font-size:14px;color:#123c74}.budget-bridge-card b{color:#0a5adf;font-size:18px}.budget-bridge-arrow{color:#0a5adf;font-size:22px;font-weight:800}
      .site-budget-example{margin-top:28px;border:1px solid #d9e8f8;border-radius:20px;padding:20px;background:#fff;box-shadow:0 12px 30px rgba(35,84,146,.08)}
      .site-budget-example-head{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:12px}.site-budget-example-head strong{color:#153b72;font-family:"Zen Maru Gothic","Noto Sans JP",sans-serif;font-size:17px}.site-budget-example-head span{font-size:11px;color:#6c809a}
      .site-budget-row{display:grid;grid-template-columns:1.3fr .9fr .9fr 1fr;gap:12px;align-items:center;padding:12px 0;border-top:1px solid #edf3fa;font-size:12px;color:#526984}.site-budget-row b{color:#123c74}.site-budget-row .available{color:#0a5adf;font-size:14px;font-weight:800}
      .cta-panel .cta-copy .eyebrow,.cta-panel .cta-copy h2,.cta-panel .cta-copy p{color:#fff!important;opacity:1!important;text-shadow:none!important}.cta-panel .cta-copy p{color:rgba(255,255,255,.9)!important}.cta-panel .official-mark{filter:brightness(0) invert(1)}
      .final-cta .button-ghost{background:#fff!important;color:#17436f!important;border-color:#fff!important}.final-cta .button-primary{background:#ff9228!important;box-shadow:0 14px 28px rgba(255,146,40,.25)!important}
      .official-logo{display:block;max-width:190px;height:auto}.dash-brand .official-logo{max-width:116px}.site-footer .official-logo{max-width:175px}.official-mark{width:22px;height:22px;object-fit:contain}
      @media(max-width:880px){.budget-bridge{grid-template-columns:1fr}.budget-bridge-arrow{transform:rotate(90deg);justify-self:center}.site-budget-example-head{align-items:flex-start;flex-direction:column}.site-budget-row{grid-template-columns:1fr 1fr}.site-budget-row span:nth-child(3),.site-budget-row span:nth-child(4){text-align:right}}
    `;
    document.head.appendChild(style);
  };

  const setHtml = (selector, html) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  };
  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  };

  const updateMessaging = () => {
    setText('.hero-copy .eyebrow', '本部で決めた予算を、現場で使える予算へ。');
    setHtml('.hero-copy h1', '保育園の<br><span>予算・会計・経営情報</span>を、<br>ひとつにつなぐ。');
    setHtml('.hero-copy .hero-lead', '<strong>本部が園別・費目別に予算を設定。</strong> 現場では「今月、保育材料費をあといくら使えるか」がすぐにわかる。支出申請・出納・会計・経営情報報告まで、同じデータでつなぎます。');

    const heroLead = document.querySelector('.hero-copy .hero-lead');
    if (heroLead && !document.querySelector('.budget-bridge')) {
      heroLead.insertAdjacentHTML('afterend', '<div class="budget-bridge"><div class="budget-bridge-card"><small>法人本部</small><strong>保育材料費を設定</strong><br><b>月 50,000円</b></div><div class="budget-bridge-arrow">→</div><div class="budget-bridge-card"><small>さくら保育園</small><strong>今月あと使える額</strong><br><b>31,400円</b></div></div>');
    }
    setHtml('.hero-trust', '<span><b>✓</b> 現場の利用可能額を明確に</span><span><b>✓</b> 本部で予算超過を抑制</span><span><b>✓</b> 経営情報報告まで連携</span>');

    setText('.dash-head h2', '全園の予算状況');
    const metrics = document.querySelectorAll('.metric-card');
    if (metrics[0]) metrics[0].innerHTML = '<small>管理園数</small><strong>12<em>園</em></strong><span>すべての園</span>';
    if (metrics[1]) metrics[1].innerHTML = '<small>今月の利用可能額（全園）</small><strong>¥26,720,000</strong><div class="bar"><i style="width:61%"></i></div><span>残額 38.6%</span>';
    if (metrics[2]) metrics[2].innerHTML = '<small>承認待ち</small><strong>18<em>件</em></strong><span>申請待ち</span>';
    if (metrics[3]) metrics[3].innerHTML = '<small>予算消化率</small><div class="donut"><b>62%</b></div>';

    const compact = document.querySelector('.compact-panel');
    if (compact) compact.innerHTML = '<strong>保育材料費｜さくら保育園</strong><div><span>今月予算</span><b>¥50,000</b></div><div><span>使用済み</span><b>¥18,600</b></div><div><span>あと使える額</span><b class="positive">¥31,400</b></div>';

    setText('.features-section .section-heading .eyebrow', 'Hoiku Financeがつなぐもの');
    setHtml('.features-section .section-heading h2', '本部の予算と、<br>現場の毎日の支出をつなぐ。');
    const featureIntro = document.querySelector('.features-section .section-heading p:last-child');
    if (featureIntro) featureIntro.textContent = '「予算は本部のExcel、支出は園のレシート、会計は別ソフト」という分断をなくし、予算を現場で使える数字に変えます。';

    const cards = document.querySelectorAll('.feature-card');
    const featureContent = [
      ['現場に「今月使える額」を表示','保育材料費、絵本・教材費、行事費など、費目ごとに今月あといくら使えるかを現場がすぐ確認できます。','利用可能額を明確に ›'],
      ['本部で予算を設定・統制','園別・費目別・月別に予算を設定。残額不足や承認上限を申請時点で判定し、過剰な支出を抑えます。','予算超過を防ぐ ›'],
      ['支出・出納をそのまま会計へ','現場の支出申請と承認結果を出納・会計へつなぎ、月末の転記や二重入力を減らします。','出納・会計をつなぐ ›'],
      ['経営情報報告の再集計を減らす','日々の会計・運営データを経営情報報告の確認・出力に活用。決算後に数字を集め直す作業を減らします。','報告業務を短縮 ›']
    ];
    cards.forEach((card, i) => {
      if (!featureContent[i]) return;
      const [title, body, link] = featureContent[i];
      const h3 = card.querySelector('h3'); const p = card.querySelector('p'); const fl = card.querySelector('.feature-link');
      if (h3) h3.textContent = title; if (p) p.textContent = body; if (fl) fl.textContent = link;
    });

    setText('.flow-heading .eyebrow', '予算が現場まで届く仕組み');
    setText('.flow-heading h2', '本部で設定した予算が、そのまま現場の「使える額」になる。');
    const steps = document.querySelectorAll('.flow-step');
    const stepContent = [
      ['本部で予算設定','園別・費目別'],['各園へ配分','月額を反映'],['残額を確認','現場で即確認'],['支出申請・承認','超過を事前制御'],['出納・会計','実績へ反映'],['経営情報報告','再集計を削減']
    ];
    steps.forEach((step, i) => { if (!stepContent[i]) return; const b = step.querySelector('b'); const s = step.querySelector('small'); if (b) b.textContent = stepContent[i][0]; if (s) s.textContent = stepContent[i][1]; });

    setText('.control-section .split-heading .eyebrow', 'HEAD OFFICE × NURSERY');
    setHtml('.control-section .split-heading h2', '本部で決める。<br>現場でわかる。');
    const splitP = document.querySelector('.control-section .split-heading > p');
    if (splitP) splitP.textContent = '本部は全園の予算を統制し、現場は自分の園で「何に、あといくら使えるか」を確認する。同じ予算データを、それぞれの役割に必要な形で見せます。';

    const controlArticles = document.querySelectorAll('.control-side article');
    const controlContent = [
      ['現場が迷わない','「保育材料を買っていいのか」を本部に毎回確認せず、今月の利用可能額を見て判断できます。'],
      ['本部は使い過ぎを事前に抑える','予算残額と承認上限に応じて、申請時点で本部承認へ回す・超過を止める運用ができます。'],
      ['月末の集計を減らす','現場で使った実績がそのまま出納・会計へつながるため、レシートとExcelを後から突き合わせる作業を減らします。']
    ];
    controlArticles.forEach((article, i) => { if (!controlContent[i]) return; const h3 = article.querySelector('h3'); const p = article.querySelector('p'); if (h3) h3.textContent = controlContent[i][0]; if (p) p.textContent = controlContent[i][1]; });

    const controlLayout = document.querySelector('.control-layout');
    if (controlLayout && !document.querySelector('.site-budget-example')) {
      controlLayout.insertAdjacentHTML('afterend', '<div class="shell site-budget-example reveal is-visible"><div class="site-budget-example-head"><strong>現場に見える「今月使える予算」の例</strong><span>さくら保育園｜2026年9月</span></div><div class="site-budget-row"><b>保育材料費</b><span>月予算 ¥50,000</span><span>使用済 ¥18,600</span><span class="available">あと ¥31,400</span></div><div class="site-budget-row"><b>絵本・教材費</b><span>月予算 ¥30,000</span><span>使用済 ¥12,400</span><span class="available">あと ¥17,600</span></div><div class="site-budget-row"><b>行事費</b><span>月予算 ¥80,000</span><span>使用済 ¥54,000</span><span class="available">あと ¥26,000</span></div></div>');
    }

    setHtml('.report-copy h2', '経営情報報告のために、<br>もう一度集計し直さない。');
    const reportP = document.querySelector('.report-copy > p:not(.eyebrow)');
    if (reportP) reportP.textContent = '日々の予算・出納・会計で蓄積したデータを、経営情報報告の確認・出力に活用。決算後に複数のExcelや帳簿から数字を探して転記する作業を減らします。';

    setText('.finance-stack .section-heading .eyebrow', 'ONE DATA FLOW');
    setText('.finance-stack .section-heading h2', '予算管理から、出納・決算・経営情報報告まで。');
    const financeP = document.querySelector('.finance-stack .section-heading p:last-child');
    if (financeP) financeP.textContent = '現場と本部で同じ数字を使うから、後工程の転記と再集計を減らせます。';

    setHtml('.final-cta .cta-copy h2', '本部の予算を、<br>現場で使える数字に。');
    const ctaP = document.querySelector('.final-cta .cta-copy > p:last-of-type');
    if (ctaP) ctaP.textContent = '現場では今月あといくら使えるかがわかり、本部では全園の予算執行を把握する。そこから出納・会計・経営情報報告までつなげます。';
  };

  mountOfficialBranding();
  injectMessageStyles();
  updateMessaging();

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
  revealItems.forEach((item) => observer.observe(item));

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = () => { if (!menuToggle || !mobileMenu) return; mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true'); menuToggle.setAttribute('aria-expanded','false'); };
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => { const open = mobileMenu.classList.toggle('open'); mobileMenu.setAttribute('aria-hidden',String(!open)); menuToggle.setAttribute('aria-expanded',String(open)); });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 880) closeMenu(); });
  }

  const header = document.querySelector('.site-header');
  let ticking = false;
  const updateHeader = () => { if (header) header.style.boxShadow = window.scrollY > 30 ? '0 8px 24px rgba(31,73,125,.06)' : 'none'; ticking = false; };
  window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(updateHeader); ticking = true; } }, { passive:true });

  const dashboard = document.querySelector('.dashboard-window');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (dashboard && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const visual = document.querySelector('.hero-visual');
    if (visual) {
      visual.addEventListener('mousemove',(event) => { const rect=visual.getBoundingClientRect(); const x=(event.clientX-rect.left)/rect.width-.5; const y=(event.clientY-rect.top)/rect.height-.5; dashboard.style.animation='none'; dashboard.style.transform=`perspective(1500px) rotateY(${x*3}deg) rotateX(${y*-2}deg) translateY(-3px)`; });
      visual.addEventListener('mouseleave',() => { dashboard.style.transform=''; dashboard.style.animation=''; });
    }
  }

  const progressBars = document.querySelectorAll('.progress b, .bar i');
  progressBars.forEach((bar) => { const target=bar.style.width; if (!target) return; bar.dataset.width=target; bar.style.width='0%'; });
  const progressObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.querySelectorAll('.progress b, .bar i').forEach((bar) => requestAnimationFrame(() => { bar.style.transition='width 1.1s cubic-bezier(.2,.7,.2,1)'; bar.style.width=bar.dataset.width||'0%'; })); progressObserver.unobserve(entry.target); }); }, { threshold:.2 });
  document.querySelectorAll('.dashboard-window, .budget-board').forEach((block) => progressObserver.observe(block));
})();

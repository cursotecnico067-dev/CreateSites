/* =====================================================
   CreateSites — JavaScript principal (puro, sem dependências)
   ===================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var CFG = window.CREATESITES_CONFIG || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Links de contato (WhatsApp / Instagram) ---------- */
  function onlyDigits(v) { return String(v || "").replace(/\D/g, ""); }

  function whatsappUrl(text) {
    var num = onlyDigits(CFG.whatsappNumber);
    if (!num) { return null; }
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(text || CFG.whatsappMessage || "");
  }

  function setupContactLinks() {
    var wa = whatsappUrl(CFG.whatsappMessage);
    $$("[data-whatsapp]").forEach(function (a) {
      if (wa) {
        a.href = wa;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      } else {
        /* Número ainda não configurado: encaminha para o Instagram */
        a.href = CFG.instagramUrl || "https://www.instagram.com/_create__sites/";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
    });
    $$("[data-instagram]").forEach(function (a) {
      if (CFG.instagramUrl) { a.href = CFG.instagramUrl; }
    });
  }

  /* ---------- Menu ---------- */
  function setupMenu() {
    var toggle = $("#menuToggle");
    var links = $("#navLinks");
    var header = $("#header");
    if (!toggle || !links) { return; }

    function close() {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    }
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    $$("a", links).forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 860) { close(); } });

    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 10);
      var bar = $("#scrollProgress");
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar && h > 0) { bar.style.width = (window.scrollY / h) * 100 + "%"; }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Link ativo conforme a seção visível */
    var navLinks = $$(".nav-link");
    var map = {};
    navLinks.forEach(function (l) { map[l.getAttribute("href").slice(1)] = l; });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && map[en.target.id]) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            map[en.target.id].classList.add("active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) {
        var s = document.getElementById(id);
        if (s) { io.observe(s); }
      });
    }
  }

  /* ---------- Animação de entrada (reveal) ---------- */
  function setupReveal() {
    var items = $$(".reveal");
    /* Atraso escalonado dentro de cada grupo */
    $$(".cards, .portfolio-grid, .steps, .hero-features, .values").forEach(function (group) {
      $$(".reveal", group).forEach(function (el, i) { el.style.setProperty("--d", (i * 0.08) + "s"); });
    });
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Brilho que segue o mouse nos cards ---------- */
  function setupGlowCards(root) {
    $$(".glow-card", root).forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- Código digitando no hero ---------- */
  var CODE_LINES = [
    '<span class="c-c">&lt;!-- CreateSites --&gt;</span>',
    '<span class="c-k">const</span> <span class="c-v">projeto</span> = {',
    '  <span class="c-p">ideia</span>: <span class="c-s">"sua"</span>,',
    '  <span class="c-p">desenvolvimento</span>: <span class="c-s">"nosso"</span>,',
    '  <span class="c-p">design</span>: <span class="c-s">"moderno"</span>,',
    '  <span class="c-p">responsivo</span>: <span class="c-n">true</span>',
    '};',
    '',
    '<span class="c-k">function</span> <span class="c-v">criarSite</span>(ideia) {',
    '  <span class="c-k">return</span> projeto.<span class="c-v">publicar</span>(ideia);',
    '}'
  ];

  function setupTyping() {
    var el = $("#codeTyping");
    if (!el) { return; }
    var html = CODE_LINES.join("\n");

    if (reduceMotion) { el.innerHTML = html; return; }

    /* Digita respeitando as tags HTML (insere tags inteiras de uma vez) */
    var i = 0;
    var out = "";
    function step() {
      if (i >= html.length) {
        setTimeout(function () { i = 0; out = ""; step(); }, 4500);
        return;
      }
      if (html[i] === "<") {
        var end = html.indexOf(">", i);
        out += html.slice(i, end + 1);
        i = end + 1;
      } else if (html[i] === "&") {
        var semi = html.indexOf(";", i);
        out += html.slice(i, semi + 1);
        i = semi + 1;
      } else {
        out += html[i];
        i++;
      }
      el.innerHTML = out;
      setTimeout(step, html[i - 1] === "\n" ? 120 : 24);
    }
    step();
  }

  /* ---------- Fundo animado (partículas / rede) ---------- */
  function setupBackground() {
    var canvas = $("#bgCanvas");
    if (!canvas || reduceMotion) { if (canvas) { canvas.style.display = "none"; } return; }
    var ctx = canvas.getContext("2d");
    var w, h, dpr, pts = [];
    var small = window.innerWidth < 700;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      var n = Math.round((window.innerWidth * window.innerHeight) / (small ? 22000 : 16000));
      pts = [];
      for (var k = 0; k < n; k++) {
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25 * dpr, vy: (Math.random() - 0.5) * 0.25 * dpr });
      }
    }
    resize();
    window.addEventListener("resize", resize);

    var running = true;
    document.addEventListener("visibilitychange", function () { running = !document.hidden; if (running) { draw(); } });

    function draw() {
      if (!running) { return; }
      ctx.clearRect(0, 0, w, h);
      var maxD = 140 * dpr;
      for (var a = 0; a < pts.length; a++) {
        var p = pts[a];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) { p.vx *= -1; }
        if (p.y < 0 || p.y > h) { p.vy *= -1; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(25,165,255,.7)";
        ctx.fill();
        for (var b = a + 1; b < pts.length; b++) {
          var q = pts[b];
          var dx = p.x - q.x, dy = p.y - q.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            ctx.strokeStyle = "rgba(8,125,245," + (0.22 * (1 - d / maxD)) + ")";
            ctx.lineWidth = dpr * 0.8;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------- Portfólio (gerado a partir do config.js) ---------- */
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function setupPortfolio() {
    var grid = $("#portfolioGrid");
    if (!grid) { return; }
    var list = Array.isArray(CFG.projects) ? CFG.projects : [];
    if (!list.length) {
      grid.innerHTML = '<p class="portfolio-note">Em breve, novos projetos por aqui.</p>';
      return;
    }

    grid.innerHTML = list.map(function (p, i) {
      var tags = (p.tags || []).map(function (t) { return "<span>" + escapeHtml(t) + "</span>"; }).join("");
      var badge = p.demo ? '<span class="badge">Demonstração</span>' : "";
      return (
        '<article class="project glow-card reveal">' +
          '<div class="project-thumb">' + badge +
            '<img src="' + escapeHtml(p.image) + '" alt="Ilustração do projeto ' + escapeHtml(p.title) + '" loading="lazy" width="640" height="400">' +
          "</div>" +
          '<div class="project-body">' +
            '<span class="project-cat">' + escapeHtml(p.category) + "</span>" +
            "<h3>" + escapeHtml(p.title) + "</h3>" +
            "<p>" + escapeHtml(p.description) + "</p>" +
            '<div class="tags">' + tags + "</div>" +
            '<button type="button" class="btn btn-ghost" data-project="' + i + '">Visualizar projeto</button>' +
          "</div>" +
        "</article>"
      );
    }).join("");

    $$(".project", grid).forEach(function (el, i) { el.style.setProperty("--d", (i * 0.08) + "s"); });
    setupGlowCards(grid);

    $$("[data-project]", grid).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var p = list[Number(btn.getAttribute("data-project"))];
        if (p.url) { window.open(p.url, "_blank", "noopener"); }
        else { openModal(p, btn); }
      });
    });
  }

  /* ---------- Modal ---------- */
  var lastFocus = null;
  function openModal(p, trigger) {
    var m = $("#projectModal");
    if (!m) { return; }
    lastFocus = trigger || document.activeElement;
    $("#modalImg").src = p.image;
    $("#modalImg").alt = "Ilustração do projeto " + p.title;
    $("#modalTitle").textContent = p.title;
    $("#modalCat").textContent = p.category;
    $("#modalDesc").textContent = p.description;
    $("#modalBadge").hidden = !p.demo;
    $("#modalTags").innerHTML = (p.tags || []).map(function (t) { return "<span>" + escapeHtml(t) + "</span>"; }).join("");
    m.hidden = false;
    document.body.style.overflow = "hidden";
    var c = $(".modal-close", m);
    if (c) { c.focus(); }
  }
  function closeModal() {
    var m = $("#projectModal");
    if (!m || m.hidden) { return; }
    m.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }
  function setupModal() {
    var m = $("#projectModal");
    if (!m) { return; }
    $$("[data-close]", m).forEach(function (el) { el.addEventListener("click", closeModal); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeModal(); } });
  }

  /* ---------- Formulário de orçamento (envia para o WhatsApp) ---------- */
  function setupForm() {
    var form = $("#quoteForm");
    if (!form) { return; }
    var err = $("#formError");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var tipo = form.tipo.value.trim();
      var msg = form.mensagem.value.trim();

      if (!nome || !tipo || !msg) {
        err.textContent = "Preencha todos os campos para enviar o pedido.";
        err.hidden = false;
        return;
      }
      err.hidden = true;

      var texto =
        "Olá, CreateSites! Gostaria de solicitar um orçamento.\n\n" +
        "*Nome:* " + nome + "\n" +
        "*Tipo de projeto:* " + tipo + "\n" +
        "*Minha ideia:* " + msg;

      var url = whatsappUrl(texto);
      if (url) {
        window.open(url, "_blank", "noopener");
      } else {
        /* WhatsApp não configurado: copia a mensagem e abre o Instagram */
        var done = function (copied) {
          err.textContent = copied
            ? "Mensagem copiada! Abrimos nosso Instagram: cole a mensagem no direct para falar com a gente."
            : "Abrimos nosso Instagram: envie sua mensagem pelo direct.";
          err.hidden = false;
          err.style.color = "#19A5FF";
          window.open(CFG.instagramUrl || "https://www.instagram.com/_create__sites/", "_blank", "noopener");
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(texto).then(function () { done(true); }, function () { done(false); });
        } else { done(false); }
      }
    });
  }

  /* ---------- Início ---------- */
  function init() {
    var y = $("#year");
    if (y) { y.textContent = new Date().getFullYear(); }
    setupContactLinks();
    setupMenu();
    setupPortfolio();
    setupModal();
    setupGlowCards(document);
    setupReveal();
    setupTyping();
    setupBackground();
    setupForm();
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); }
  else { init(); }
})();

// Labcin: la mascota de Pache Labs. Saluda al entrar a la página y queda en reposo.
// Si lo tocás se ríe agarrándose la panza; al tercer toque se rompe, pierde el líquido
// y se cura solo. Sin dependencias: SVG + Web Animations API.
// Uso: <div class="labsin" data-labsin><p class="labsin__globo">Hola, soy Labcin</p>
//        <span class="labsin__risa" hidden>¡Ja, ja, ja!</span></div>
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Silueta del frasco (vidrio). Las piezas rotas se recortan de esta misma forma.
  var VIDRIO = "M138,74 L138,160 L72,318 Q62,350 96,352 L224,352 Q258,350 248,318 L182,160 L182,74 Z";
  var LIQUIDO_A = "M86,300 C84,268 108,250 132,258 C146,240 176,240 190,254 C214,246 238,266 236,300 L244,322 Q250,344 222,346 L98,346 Q70,344 76,322 Z";
  var LIQUIDO_B = "M86,302 C86,272 110,254 134,261 C148,246 176,246 190,258 C212,250 236,270 236,302 L244,322 Q250,344 222,346 L98,346 Q70,344 76,322 Z";

  var SVG = [
    '<svg viewBox="0 0 320 420" class="labsin__svg" aria-hidden="true" focusable="false">',
    '<defs>',
    ' <radialGradient id="lb-liq" cx="35%" cy="28%" r="85%"><stop offset="0" stop-color="#F0473B"/><stop offset=".5" stop-color="#C8201A"/><stop offset="1" stop-color="#7A0E09"/></radialGradient>',
    ' <linearGradient id="lb-lente" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".45" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient>',
    ' <linearGradient id="lb-vid" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#DCE6F2" stop-opacity=".55"/><stop offset=".22" stop-color="#F2F6FA" stop-opacity=".10"/><stop offset=".78" stop-color="#F2F6FA" stop-opacity=".06"/><stop offset="1" stop-color="#DCE6F2" stop-opacity=".45"/></linearGradient>',
    ' <radialGradient id="lb-piel" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#4A4D57"/><stop offset="1" stop-color="#1D1F24"/></radialGradient>',
    ' <radialGradient id="lb-zap" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#FF6B5C"/><stop offset="1" stop-color="#A3170F"/></radialGradient>',
    ' <radialGradient id="lb-sombra"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>',
    '</defs>',
    '<ellipse class="lb-sombra" cx="160" cy="402" rx="110" ry="14" fill="url(#lb-sombra)"/>',
    // piernas
    '<g class="lb-pierna lb-pierna--izq"><path d="M132,346 C130,366 126,378 124,390" fill="none" stroke="url(#lb-piel)" stroke-width="13" stroke-linecap="round"/>',
    ' <ellipse cx="114" cy="396" rx="22" ry="11" fill="url(#lb-zap)"/><ellipse cx="108" cy="392" rx="8" ry="3" fill="#fff" opacity=".35"/></g>',
    '<g class="lb-pierna lb-pierna--der"><path d="M188,346 C190,366 194,378 196,390" fill="none" stroke="url(#lb-piel)" stroke-width="13" stroke-linecap="round"/>',
    ' <ellipse cx="206" cy="396" rx="22" ry="11" fill="url(#lb-zap)"/><ellipse cx="200" cy="392" rx="8" ry="3" fill="#fff" opacity=".35"/></g>',
    // líquido con la cara
    '<g class="lb-liquido">',
    ' <path class="lb-liquido__forma" d="' + LIQUIDO_A + '" fill="url(#lb-liq)">',
    '  <animate attributeName="d" dur="2.4s" repeatCount="indefinite" values="' + LIQUIDO_A + ';' + LIQUIDO_B + ';' + LIQUIDO_A + '"/></path>',
    ' <path d="M96,312 C96,290 106,276 120,272" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="6" stroke-linecap="round"/>',
    ' <ellipse cx="128" cy="266" rx="10" ry="5" fill="#fff" opacity=".35" transform="rotate(-20 128 266)"/>',
    ' <g class="lb-cara">',
    '  <g class="lb-ojos"><circle cx="131" cy="294" r="11" fill="#141416"/><circle cx="191" cy="294" r="11" fill="#141416"/>',
    '   <circle cx="135" cy="290" r="4.6" fill="#fff"/><circle cx="195" cy="290" r="4.6" fill="#fff"/>',
    '   <circle cx="127" cy="299" r="1.8" fill="#fff" opacity=".7"/><circle cx="187" cy="299" r="1.8" fill="#fff" opacity=".7"/></g>',
    '  <g class="lb-ojos-risa" opacity="0" fill="none" stroke="#141416" stroke-width="5" stroke-linecap="round">',
    '   <path d="M121,297 Q131,285 141,297"/><path d="M181,297 Q191,285 201,297"/></g>',
    '  <g class="lb-anteojos">',
    '   <path d="M95,284 L78,277 M227,284 L244,277" stroke="#141416" stroke-width="7" stroke-linecap="round"/>',
    '   <rect x="97" y="272" width="62" height="46" rx="13" fill="url(#lb-lente)" stroke="#141416" stroke-width="8"/>',
    '   <rect x="163" y="272" width="62" height="46" rx="13" fill="url(#lb-lente)" stroke="#141416" stroke-width="8"/>',
    '   <path d="M155,282 Q161,275 167,282" fill="none" stroke="#141416" stroke-width="7" stroke-linecap="round"/>',
    '   <path d="M104,306 L122,278 L132,278 L114,306 Z M170,306 L188,278 L198,278 L180,306 Z" fill="#fff" opacity=".28"/>',
    '   <path d="M101,276 L155,276" stroke="#fff" stroke-opacity=".35" stroke-width="2"/><path d="M167,276 L221,276" stroke="#fff" stroke-opacity=".35" stroke-width="2"/></g>',
    '  <path class="lb-boca" d="M140,326 Q161,342 182,326" fill="none" stroke="#141416" stroke-width="5" stroke-linecap="round"/>',
    '  <path class="lb-boca-risa" d="M138,324 Q161,324 184,324 Q178,348 161,348 Q144,348 138,324 Z" fill="#141416" opacity="0"/>',
    '  <path class="lb-lengua" d="M150,340 Q161,334 172,340 Q166,347 161,347 Q156,347 150,340 Z" fill="#FF7A6E" opacity="0"/>',
    ' </g>',
    '</g>',
    // vidrio entero (se reemplaza por piezas al romperse)
    '<g class="lb-vidrio">',
    ' <path d="' + VIDRIO + '" fill="url(#lb-vid)" stroke="#C9D1DC" stroke-width="9" stroke-linejoin="round"/>',
    ' <path d="' + VIDRIO + '" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>',
    ' <rect x="124" y="56" width="72" height="20" rx="10" fill="#fff" stroke="#C9D1DC" stroke-width="3"/>',
    ' <path d="M148,92 L148,150" stroke="#fff" stroke-width="6" stroke-linecap="round"/>',
    ' <path d="M147,92 L147,150" stroke="#C9D1DC" stroke-width="1.5" stroke-linecap="round" opacity=".6"/>',
    ' <text x="164" y="126" text-anchor="middle" font-family="ui-monospace,Consolas,monospace" font-weight="700" font-size="26" fill="#E5392F">{ }</text>',
    ' <circle cx="172" cy="148" r="4" fill="#AEB5C0"/>',
    ' <text x="160" y="212" text-anchor="middle" font-family="ui-monospace,Consolas,monospace" font-weight="700" font-size="8.5" fill="#5B5F69"><tspan fill="#E5392F">def</tspan> my_code_lab():</text>',
    ' <path d="M132,222 L140,222 M146,222 L160,222 M132,232 L150,232" stroke="#AEB5C0" stroke-width="3" stroke-linecap="round"/>',
    ' <text x="164" y="235" font-family="ui-monospace,Consolas,monospace" font-weight="700" font-size="10" fill="#E5392F">&lt;/&gt;</text>',
    '</g>',
    '<g class="lb-piezas"></g>',
    '<g class="lb-grietas" fill="none" stroke="#8C99AD" stroke-width="2.5" stroke-linecap="round"></g>',
    // brazo izquierdo (descansa)
    '<g class="lb-brazo lb-brazo--izq"><path d="M96,262 C80,274 70,288 66,304" fill="none" stroke="url(#lb-piel)" stroke-width="12" stroke-linecap="round"/>',
    ' <circle cx="64" cy="310" r="13" fill="url(#lb-piel)"/><circle cx="60" cy="306" r="4" fill="#fff" opacity=".25"/></g>',
    // brazo derecho (saluda)
    '<g class="lb-brazo lb-brazo--der"><path d="M224,262 C240,248 252,232 258,212" fill="none" stroke="url(#lb-piel)" stroke-width="12" stroke-linecap="round"/>',
    ' <g class="lb-mano"><circle cx="261" cy="203" r="14" fill="url(#lb-piel)"/><path d="M252,192 L248,184 M260,189 L259,180 M268,192 L272,185" stroke="url(#lb-piel)" stroke-width="6" stroke-linecap="round"/>',
    ' <circle cx="257" cy="199" r="4" fill="#fff" opacity=".25"/></g></g>',
    // burbujas
    '<g class="lb-burbujas"><circle class="lb-b lb-b1" cx="154" cy="40" r="7" fill="#D9DBE0"/><circle class="lb-b lb-b2" cx="168" cy="22" r="5" fill="#D9DBE0"/>',
    ' <g class="lb-b lb-b3"><circle cx="182" cy="36" r="13" fill="#E7E8EC"/><path d="M178,32 L174,36 L178,40 M186,32 L190,36 L186,40" fill="none" stroke="#5B5F69" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g></g>',
    '<g class="lb-gotas"></g>',
    '<g class="lb-brillos"></g>',
    '</svg>'
  ].join("");

  var CSS = [
    ".labsin{position:relative;width:240px;max-width:100%;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;outline:none}",
    ".labsin:focus-visible .labsin__svg{filter:drop-shadow(0 0 0 #fff) drop-shadow(0 0 10px rgba(211,38,29,.6))}",
    ".labsin__svg{display:block;width:100%;height:auto;overflow:visible}",
    ".labsin .lb-vidrio,.labsin .lb-piezas{filter:drop-shadow(0 4px 6px rgba(0,0,0,.18))}",
    ".labsin svg *{transform-box:fill-box}",
    ".labsin .lb-brazo--der{transform-origin:0% 100%}",
    ".labsin .lb-brazo--izq{transform-origin:100% 0%}",
    ".labsin .lb-pierna{transform-origin:50% 0%}",
    ".labsin .lb-liquido{transform-origin:50% 100%}",
    ".labsin .lb-cara{transform-origin:50% 50%}",
    ".labsin .lb-b{animation:lb-sube 2.6s ease-in infinite}",
    ".labsin .lb-b2{animation-delay:.9s}.labsin .lb-b3{animation:lb-flota 2.2s ease-in-out infinite alternate}",
    "@keyframes lb-sube{0%{transform:translateY(26px) scale(.3);opacity:0}25%{opacity:1}100%{transform:translateY(-18px) scale(1);opacity:0}}",
    "@keyframes lb-flota{from{transform:translateY(0)}to{transform:translateY(-6px)}}",
    ".labsin .lb-cuerpo-idle{animation:lb-respira 3s ease-in-out infinite}",
    "@keyframes lb-respira{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}",
    ".labsin .lb-ojos{animation:lb-parpadeo 4.5s infinite;transform-origin:50% 50%}",
    "@keyframes lb-parpadeo{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}",
    ".labsin__globo{position:absolute;left:58%;top:-6px;z-index:2;margin:0;padding:12px 16px;border-radius:18px 18px 18px 4px;",
    " background:#fff;color:#17181C;font:800 1.05rem/1.2 var(--titulos,system-ui,sans-serif);letter-spacing:-.01em;white-space:nowrap;",
    " box-shadow:0 12px 30px -10px rgba(23,24,28,.35);border:2px solid #17181C;opacity:0;transform:translateY(8px) scale(.9);transform-origin:0% 100%;",
    " transition:opacity .3s ease,transform .35s cubic-bezier(.2,1.4,.4,1);pointer-events:none}",
    ".labsin__globo.visible{opacity:1;transform:none}",
    ".labsin__pista{margin:6px 0 0;text-align:center;font-size:.85rem;color:var(--tinta-suave,#666)}",
    "@media (max-width:560px){.labsin{width:190px}.labsin__globo{font-size:.95rem;left:52%}}"
  ].join("");

  function el(tag, attrs, padre) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (padre) padre.appendChild(e);
    return e;
  }
  function anim(nodo, frames, opts) {
    if (!nodo || !nodo.animate) return { finished: Promise.resolve() };
    return nodo.animate(frames, Object.assign({ fill: "forwards" }, opts));
  }
  function espera(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function iniciar(cont) {
    var globo = cont.querySelector(".labsin__globo");
    var frase = globo ? globo.textContent.trim() : "Hola, soy Labcin";
    var risaEl = cont.querySelector(".labsin__risa");
    var risaTexto = risaEl ? risaEl.textContent.trim() : "¡Ja, ja, ja!";
    cont.insertAdjacentHTML("afterbegin", SVG);
    var svg = cont.querySelector("svg");
    // ids únicos por si hay más de un Labsin en la página
    var sufijo = "-" + Math.random().toString(36).slice(2, 7);
    svg.querySelectorAll("[id]").forEach(function (n) { n.id += sufijo; });
    svg.innerHTML = svg.innerHTML.replace(/url\(#(lb-[a-z]+)\)/g, "url(#$1" + sufijo + ")");
    cont.setAttribute("role", "button");
    cont.setAttribute("tabindex", "0");
    if (!cont.getAttribute("aria-label")) cont.setAttribute("aria-label", frase);

    var q = function (s) { return svg.querySelector(s); };
    var cuerpo = el("g", { "class": "lb-cuerpo-idle" });
    // todo menos la sombra respira junto
    Array.prototype.slice.call(svg.childNodes).forEach(function (n) {
      if (n.nodeType === 1 && n.tagName !== "defs" && !n.classList.contains("lb-sombra")) cuerpo.appendChild(n);
    });
    svg.appendChild(cuerpo);

    var brazoDer = q(".lb-brazo--der"), brazoIzq = q(".lb-brazo--izq");
    var piernas = svg.querySelectorAll(".lb-pierna");
    var liquido = q(".lb-liquido"), cara = q(".lb-cara"), boca = q(".lb-boca");
    var vidrio = q(".lb-vidrio"), piezasG = q(".lb-piezas"), grietasG = q(".lb-grietas");
    var gotasG = q(".lb-gotas"), brillosG = q(".lb-brillos"), burbujas = q(".lb-burbujas");
    var ojos = q(".lb-ojos"), ojosRisa = q(".lb-ojos-risa"), bocaRisa = q(".lb-boca-risa"), lengua = q(".lb-lengua");

    // --- piezas de vidrio: cortes en abanico desde el punto del golpe ---
    var C = { x: 162, y: 236 }, N = 9, piezas = [];
    var clipDefs = q("defs");
    var angulos = [];
    for (var i = 0; i < N; i++) angulos.push((i / N) * Math.PI * 2 + (Math.sin(i * 7.3) * 0.22));
    for (i = 0; i < N; i++) {
      var a1 = angulos[i], a2 = angulos[(i + 1) % N] + (i === N - 1 ? Math.PI * 2 : 0);
      var R = 420, pts = [C.x + "," + C.y];
      for (var s = 0; s <= 3; s++) {
        var a = a1 + (a2 - a1) * s / 3;
        pts.push((C.x + Math.cos(a) * R).toFixed(1) + "," + (C.y + Math.sin(a) * R).toFixed(1));
      }
      var cp = el("clipPath", { id: "lb-corte" + i + sufijo }, clipDefs);
      el("polygon", { points: pts.join(" ") }, cp);
      var g = el("g", { "clip-path": "url(#lb-corte" + i + sufijo + ")", opacity: "0" }, piezasG);
      g.innerHTML = vidrio.innerHTML;
      var medio = (a1 + a2) / 2;
      piezas.push({ g: g, dx: Math.cos(medio), dy: Math.sin(medio), giro: (i % 2 ? 1 : -1) * (40 + (i * 37) % 80) });
      // grieta: línea quebrada a lo largo del corte
      var gx = C.x, gy = C.y, d = "M" + gx + "," + gy;
      for (var k = 1; k <= 4; k++) {
        var rr = k * 34, jit = (k % 2 ? 0.08 : -0.08);
        d += " L" + (C.x + Math.cos(a1 + jit) * rr).toFixed(1) + "," + (C.y + Math.sin(a1 + jit) * rr).toFixed(1);
      }
      var linea = el("path", { d: d, opacity: "0" }, grietasG);
      linea.style.strokeDasharray = "160";
      linea.style.strokeDashoffset = "160";
    }
    // las grietas solo se ven dentro del vidrio
    var cpV = el("clipPath", { id: "lb-silueta" + sufijo }, clipDefs);
    el("path", { d: VIDRIO }, cpV);
    grietasG.setAttribute("clip-path", "url(#lb-silueta" + sufijo + ")");

    // --- saludo ---
    var saludando = false;
    function saludar() {
      if (saludando) return Promise.resolve();
      saludando = true;
      if (globo) { globo.textContent = frase; globo.classList.add("visible"); }
      var w = anim(brazoDer, [
        { transform: "rotate(0deg)" }, { transform: "rotate(-28deg)" }, { transform: "rotate(10deg)" },
        { transform: "rotate(-28deg)" }, { transform: "rotate(10deg)" }, { transform: "rotate(-20deg)" }, { transform: "rotate(0deg)" }
      ], { duration: 1800, easing: "ease-in-out" });
      anim(cara, [{ transform: "rotate(0)" }, { transform: "rotate(-4deg)" }, { transform: "rotate(3deg)" }, { transform: "rotate(0)" }], { duration: 1800 });
      return w.finished.then(function () {
        return espera(1400);
      }).then(function () {
        if (globo) globo.classList.remove("visible");
        saludando = false;
      });
    }

    // --- romperse y curarse ---
    var ocupado = false;
    function gotas() {
      for (var i = 0; i < 14; i++) {
        var r = 3 + (i % 4) * 1.6;
        var c = el("circle", { cx: 160, cy: 300, r: r, fill: i % 3 ? "#D3261D" : "#FF6B5C" }, gotasG);
        var ang = Math.PI * (1.08 + (i / 13) * 0.84), v = 60 + (i * 29) % 70;
        var dx = Math.cos(ang) * v * 1.6, alto = Math.sin(ang) * v;
        anim(c, [
          { transform: "translate(0,0)", opacity: 1 },
          { transform: "translate(" + (dx * .55) + "px," + (alto * 1.1) + "px)", opacity: 1, offset: .45 },
          { transform: "translate(" + dx + "px,96px)", opacity: .95, offset: .9 },
          { transform: "translate(" + dx + "px,98px) scale(1.6,.4)", opacity: 0 }
        ], { duration: 900 + (i % 5) * 60, easing: "cubic-bezier(.3,.7,.6,1)" });
        setTimeout(function (n) { n.remove(); }.bind(null, c), 1300);
      }
    }
    function brillos() {
      for (var i = 0; i < 10; i++) {
        var x = 80 + (i * 53) % 170, y = 80 + (i * 71) % 270;
        var b = el("path", { d: "M0,-9 L2.5,-2.5 L9,0 L2.5,2.5 L0,9 L-2.5,2.5 L-9,0 L-2.5,-2.5 Z", fill: i % 2 ? "#FFD15C" : "#fff",
          transform: "translate(" + x + "," + y + ")" }, brillosG);
        b.style.transformBox = "view-box";
        anim(b, [{ opacity: 0, transform: "translate(" + x + "px," + y + "px) scale(0)" },
                 { opacity: 1, transform: "translate(" + x + "px," + y + "px) scale(1.2) rotate(45deg)", offset: .5 },
                 { opacity: 0, transform: "translate(" + x + "px," + y + "px) scale(0) rotate(90deg)" }],
             { duration: 700, delay: i * 60 });
        setTimeout(function (n) { n.remove(); }.bind(null, b), 1500);
      }
    }
    function romper() {
      if (ocupado) return;
      ocupado = true;
      if (globo) globo.classList.remove("visible");
      cuerpo.classList.remove("lb-cuerpo-idle");
      var lineas = grietasG.querySelectorAll("path");
      // 1) golpe: tiembla y aparecen las grietas
      anim(cuerpo, [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" },
                    { transform: "translateX(-4px)" }, { transform: "translateX(0)" }], { duration: 320, fill: "none" });
      boca.setAttribute("d", "M151,330 Q161,320 171,330 Q161,340 151,330 Z");
      boca.setAttribute("fill", "#141416");
      lineas.forEach(function (l, i) {
        anim(l, [{ opacity: 1, strokeDashoffset: 160 }, { opacity: 1, strokeDashoffset: 0 }], { duration: 260, delay: i * 18 });
      });
      espera(480).then(function () {
        // 2) se rompe: el vidrio vuela en pedazos, el líquido cae y se derrama
        vidrio.style.opacity = "0";
        lineas.forEach(function (l) { anim(l, [{ opacity: 1 }, { opacity: 0 }], { duration: 120 }); });
        burbujas.style.opacity = "0";
        piezas.forEach(function (p, i) {
          p.g.setAttribute("opacity", "1");
          var lejos = 45 + (i * 19) % 35;
          p.anim = anim(p.g, [
            { transform: "translate(0,0) rotate(0)" },
            { transform: "translate(" + (p.dx * lejos) + "px," + (p.dy * lejos * .6 - 12) + "px) rotate(" + p.giro * .6 + "deg)", offset: .4 },
            { transform: "translate(" + (p.dx * lejos * 1.1) + "px," + (130 - p.dy * 40) + "px) rotate(" + p.giro + "deg)" }
          ], { duration: 850, easing: "cubic-bezier(.25,.6,.4,1)" });
        });
        anim(brazoDer, [{ transform: "rotate(0)" }, { transform: "translate(14px,120px) rotate(110deg)" }], { duration: 700, easing: "cubic-bezier(.5,0,.8,.5)" });
        anim(brazoIzq, [{ transform: "rotate(0)" }, { transform: "translate(-10px,70px) rotate(-80deg)" }], { duration: 650, easing: "cubic-bezier(.5,0,.8,.5)" });
        piernas.forEach(function (pn, i) {
          anim(pn, [{ transform: "rotate(0)" }, { transform: "rotate(" + (i ? -70 : 70) + "deg) translateY(10px)" }], { duration: 500, easing: "ease-in" });
        });
        anim(liquido, [
          { transform: "translateY(0) scale(1,1)" },
          { transform: "translateY(26px) scale(1.15,.8)", offset: .35 },
          { transform: "translateY(52px) scale(1.9,.26)" }
        ], { duration: 650, easing: "cubic-bezier(.5,0,.6,1)" });
        anim(cara, [{ transform: "scale(1,1)" }, { transform: "scale(.55,2.6) translateY(-6px)" }], { duration: 650 });
        gotas();
        return espera(1500);
      }).then(function () {
        // 3) se cura: el líquido sube, los pedazos vuelven y todo brilla
        brillos();
        anim(liquido, [{ transform: "translateY(52px) scale(1.9,.26)" }, { transform: "translateY(-8px) scale(.95,1.08)", offset: .7 },
                       { transform: "translateY(0) scale(1,1)" }], { duration: 750, easing: "cubic-bezier(.3,1.3,.5,1)" });
        anim(cara, [{ transform: "scale(.55,2.6) translateY(-6px)" }, { transform: "scale(1,1)" }], { duration: 750, easing: "cubic-bezier(.3,1.3,.5,1)" });
        piezas.forEach(function (p, i) { if (p.anim && p.anim.reverse) { p.anim.playbackRate = 1.15; p.anim.reverse(); } });
        anim(brazoDer, [{ transform: "translate(14px,120px) rotate(110deg)" }, { transform: "rotate(0)" }], { duration: 800, delay: 200, easing: "cubic-bezier(.3,1.3,.5,1)" });
        anim(brazoIzq, [{ transform: "translate(-10px,70px) rotate(-80deg)" }, { transform: "rotate(0)" }], { duration: 800, delay: 200, easing: "cubic-bezier(.3,1.3,.5,1)" });
        piernas.forEach(function (pn, i) {
          anim(pn, [{ transform: "rotate(" + (i ? -70 : 70) + "deg) translateY(10px)" }, { transform: "rotate(0)" }], { duration: 700, delay: 150, easing: "cubic-bezier(.3,1.3,.5,1)" });
        });
        return espera(950);
      }).then(function () {
        vidrio.style.opacity = "";
        piezas.forEach(function (p) { p.g.setAttribute("opacity", "0"); if (p.anim) p.anim.cancel(); });
        burbujas.style.opacity = "";
        boca.setAttribute("d", "M140,326 Q161,342 182,326");
        boca.setAttribute("fill", "none");
        anim(cuerpo, [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 380, fill: "none", easing: "ease-out" });
        cuerpo.classList.add("lb-cuerpo-idle");
        return saludar();
      }).then(function () { ocupado = false; });
    }

    // --- reírse agarrándose la panza ---
    var riendo = false;
    function reir() {
      if (riendo) return;
      riendo = true;
      if (globo) { globo.textContent = risaTexto; globo.classList.add("visible"); }
      ojos.style.opacity = "0"; ojosRisa.setAttribute("opacity", "1");
      boca.style.opacity = "0"; bocaRisa.setAttribute("opacity", "1"); lengua.setAttribute("opacity", "1");
      var manos = { duration: 260, easing: "cubic-bezier(.3,1.3,.5,1)" };
      anim(brazoDer, [{ transform: "rotate(0)" }, { transform: "rotate(158deg)" }], manos);
      anim(brazoIzq, [{ transform: "rotate(0)" }, { transform: "rotate(-58deg)" }], manos);
      var sacudon = [];
      for (var i = 0; i < 9; i++) sacudon.push({ transform: "translateY(" + (i % 2 ? -7 : 0) + "px) rotate(" + (i % 2 ? -2 : 2) + "deg)" });
      sacudon.push({ transform: "translateY(0) rotate(0)" });
      anim(cuerpo, sacudon, { duration: 1500, fill: "none", easing: "ease-in-out" });
      anim(cara, [{ transform: "scale(1)" }, { transform: "scale(1.06,.94)" }, { transform: "scale(1)" }, { transform: "scale(1.06,.94)" }, { transform: "scale(1)" }],
           { duration: 1500, fill: "none" });
      return espera(1550).then(function () {
        anim(brazoDer, [{ transform: "rotate(158deg)" }, { transform: "rotate(0)" }], { duration: 380, easing: "ease-out" });
        anim(brazoIzq, [{ transform: "rotate(-58deg)" }, { transform: "rotate(0)" }], { duration: 380, easing: "ease-out" });
        ojos.style.opacity = ""; ojosRisa.setAttribute("opacity", "0");
        boca.style.opacity = ""; bocaRisa.setAttribute("opacity", "0"); lengua.setAttribute("opacity", "0");
        return espera(500);
      }).then(function () {
        if (globo) globo.classList.remove("visible");
        riendo = false;
      });
    }

    // 1.º y 2.º toque: se ríe. 3.º toque: se rompe y se cura.
    var toques = 0;
    function tocar() {
      if (ocupado || riendo) return;
      if (sinMovimiento) { saludar(); return; }
      toques += 1;
      if (toques >= 3) { toques = 0; romper(); } else { reir(); }
    }
    cont.addEventListener("click", tocar);
    cont.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tocar(); }
    });

    // saluda al entrar a la página (después de la presentación) y queda en reposo.
    // Si en ese momento no está a la vista, saluda la primera vez que aparece.
    var saludo = false;
    function saludoInicial() {
      if (saludo) return;
      saludo = true;
      setTimeout(saludar, 400);
    }
    function cuandoTermineIntro(fn) {
      var raiz = document.documentElement;
      if (!raiz.classList.contains("con-intro")) { fn(); return; }
      var mo = new MutationObserver(function () {
        if (!raiz.classList.contains("con-intro")) { mo.disconnect(); setTimeout(fn, 600); }
      });
      mo.observe(raiz, { attributes: true, attributeFilter: ["class"] });
    }
    cuandoTermineIntro(function () {
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); saludoInicial(); } });
        }, { threshold: .4 });
        io.observe(cont);
      } else {
        saludoInicial();
      }
    });
  }

  function arrancar() {
    if (!document.getElementById("labsin-css")) {
      var st = document.createElement("style");
      st.id = "labsin-css";
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    document.querySelectorAll("[data-labsin]").forEach(iniciar);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arrancar);
  else arrancar();
})();

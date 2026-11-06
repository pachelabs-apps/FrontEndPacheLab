// Labcin: la mascota de Pache Labs. Saluda al entrar a la página y queda en reposo.
// Si lo tocás se ríe agarrándose la panza; al tercer toque se rompe, pierde el líquido
// y se cura solo. Sin dependencias: SVG + Web Animations API.
// Uso: <div class="labsin" data-labsin><p class="labsin__globo">Hola, soy Labcin</p>
//        <span class="labsin__risa" hidden>¡Ja, ja, ja!</span></div>
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Silueta del frasco (vidrio), calcada del avatar. Las piezas rotas se recortan de esta forma.
  var VIDRIO = "M128,118 L128,189 L60,330 Q50,352 78,352 L242,352 Q270,352 260,330 L192,189 L192,118 Z";
  var LIQUIDO_A = "M99,258 C98,234 112,222 127,224 C140,222 151,228 157,236 C165,222 180,217 192,221 C208,225 218,240 221,256 L251,322 Q258,346 234,347 L86,347 Q62,346 69,322 Z";
  var LIQUIDO_B = "M99,259 C99,237 113,226 128,228 C141,226 151,231 158,238 C166,226 180,221 192,225 C207,229 217,242 221,257 L251,322 Q258,346 234,347 L86,347 Q62,346 69,322 Z";
  var BOCA = "M130,297 Q161,321 192,297";
  var LENTE_IZQ = "M84,241 L153,241 Q157,241 156.5,246 L153,274 Q151.5,286 140,286 L99,286 Q88,286 86.5,275 L81.5,247 Q81,241 84,241 Z";
  var LENTE_DER = "M238,241 L169,241 Q165,241 165.5,246 L169,274 Q170.5,286 182,286 L223,286 Q234,286 235.5,275 L240.5,247 Q241,241 238,241 Z";
  var MONO = 'font-family="ui-monospace,Consolas,monospace"';
  var SANS = 'font-family="Segoe UI,Helvetica,Arial,sans-serif"';

  var SVG = [
    '<svg viewBox="0 0 320 420" class="labsin__svg" aria-hidden="true" focusable="false">',
    '<defs>',
    ' <radialGradient id="lb-liq" cx="32%" cy="30%" r="80%"><stop offset="0" stop-color="#E8342A"/><stop offset=".55" stop-color="#C21D17"/><stop offset="1" stop-color="#860F0B"/></radialGradient>',
    ' <linearGradient id="lb-lente" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD9D6" stop-opacity=".55"/><stop offset="1" stop-color="#FF9C94" stop-opacity=".32"/></linearGradient>',
    ' <linearGradient id="lb-fondo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#202227"/><stop offset="1" stop-color="#121317"/></linearGradient>',
    ' <radialGradient id="lb-burbuja" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#F4F5F7"/><stop offset="1" stop-color="#C3C7CE"/></radialGradient>',
    ' <radialGradient id="lb-piel" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#4A4D57"/><stop offset="1" stop-color="#1D1F24"/></radialGradient>',
    ' <radialGradient id="lb-zap" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#FF6B5C"/><stop offset="1" stop-color="#A3170F"/></radialGradient>',
    ' <radialGradient id="lb-sombra"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>',
    '</defs>',
    '<ellipse class="lb-sombra" cx="160" cy="404" rx="112" ry="13" fill="url(#lb-sombra)"/>',
    // piernas
    '<g class="lb-pierna lb-pierna--izq"><path d="M130,346 C128,366 124,378 122,390" fill="none" stroke="url(#lb-piel)" stroke-width="12" stroke-linecap="round"/>',
    ' <ellipse cx="112" cy="396" rx="21" ry="10.5" fill="url(#lb-zap)"/><ellipse cx="106" cy="392" rx="8" ry="3" fill="#fff" opacity=".35"/></g>',
    '<g class="lb-pierna lb-pierna--der"><path d="M190,346 C192,366 196,378 198,390" fill="none" stroke="url(#lb-piel)" stroke-width="12" stroke-linecap="round"/>',
    ' <ellipse cx="208" cy="396" rx="21" ry="10.5" fill="url(#lb-zap)"/><ellipse cx="202" cy="392" rx="8" ry="3" fill="#fff" opacity=".35"/></g>',
    // interior oscuro del frasco, como en el avatar
    '<g class="lb-fondo"><path d="' + VIDRIO + '" fill="url(#lb-fondo)"/></g>',
    '<g class="lb-piezas"></g>',
    // líquido
    '<g class="lb-liquido">',
    ' <path d="' + LIQUIDO_A + '" fill="url(#lb-liq)">',
    '  <animate attributeName="d" dur="2.6s" repeatCount="indefinite" values="' + LIQUIDO_A + ';' + LIQUIDO_B + ';' + LIQUIDO_A + '"/></path>',
    ' <path d="M76,334 C72,316 78,300 88,290" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="7" stroke-linecap="round"/>',
    ' <ellipse cx="122" cy="230" rx="11" ry="4.5" fill="#fff" opacity=".28" transform="rotate(-12 122 230)"/>',
    ' <ellipse cx="186" cy="226" rx="9" ry="3.5" fill="#fff" opacity=".22" transform="rotate(-8 186 226)"/>',
    '</g>',
    // vidrio: contorno y detalles (se reemplaza por piezas al romperse)
    '<g class="lb-vidrio">',
    ' <path d="' + VIDRIO + '" fill="none" stroke="#C9D1DC" stroke-width="9.5" stroke-linejoin="round"/>',
    ' <path d="' + VIDRIO + '" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>',
    ' <rect x="113" y="99" width="94" height="21" rx="10.5" fill="#17181C" stroke="#C9D1DC" stroke-width="9.5"/>',
    ' <rect x="113" y="99" width="94" height="21" rx="10.5" fill="#17181C" stroke="#fff" stroke-width="6"/>',
    ' <path d="M139,130 L139,184" stroke="#E4E6EA" stroke-width="5.5" stroke-linecap="round"/>',
    ' <text x="161" y="160" text-anchor="middle" ' + MONO + ' font-weight="400" font-size="30" fill="#D6352C">{}</text>',
    ' <circle cx="179" cy="178" r="5.3" fill="#9EA3AC"/>',
    ' <text x="130" y="201" textLength="60" lengthAdjust="spacingAndGlyphs" ' + SANS + ' font-size="7.2" fill="#E9EAEE"><tspan fill="#E0463C">def</tspan> my_code_lab():</text>',
    ' <path d="M143.5,206.5 L144,206.5 M147,206.5 L147.5,206.5 M150.5,206.5 L151,206.5 M143.5,221 L144,221 M147,221 L147.5,221 M150.5,221 L151,221" stroke="#AEB3BC" stroke-width="2.6" stroke-linecap="round"/>',
    ' <path d="M155,206.5 L164,206.5 M143.5,213.5 L160,213.5" stroke="#AEB3BC" stroke-width="2.6" stroke-linecap="round"/>',
    ' <path d="M168,210.5 L165.5,213.5 L168,216.5 M171,209.5 L171,217.5 M174,210.5 L176.5,213.5 L174,216.5" fill="none" stroke="#E0463C" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    ' <path d="M129,209 L116,233" stroke="#DADDE2" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>',
    '</g>',
    '<g class="lb-grietas" fill="none" stroke="#E6EAF0" stroke-width="2.2" stroke-linecap="round"></g>',
    // cara por delante del vidrio, como en el avatar (los anteojos sobresalen del frasco)
    '<g class="lb-cara-env"><g class="lb-cara">',
    '  <g class="lb-ojos"><circle cx="126" cy="260" r="12" fill="#141416"/><circle cx="195" cy="260" r="12" fill="#141416"/>',
    '   <circle cx="130.5" cy="256.5" r="4.3" fill="#fff"/><circle cx="199.5" cy="256.5" r="4.3" fill="#fff"/></g>',
    '  <g class="lb-ojos-risa" opacity="0" fill="none" stroke="#141416" stroke-width="5" stroke-linecap="round">',
    '   <path d="M115,264 Q126,251 137,264"/><path d="M184,264 Q195,251 206,264"/></g>',
    '  <g class="lb-anteojos">',
    '   <path d="' + LENTE_IZQ + '" fill="url(#lb-lente)" stroke="#141416" stroke-width="6.5" stroke-linejoin="round"/>',
    '   <path d="' + LENTE_DER + '" fill="url(#lb-lente)" stroke="#141416" stroke-width="6.5" stroke-linejoin="round"/>',
    '   <path d="M89,282 L113,245 L124,245 L100,282 Z M171,282 L195,245 L206,245 L182,282 Z" fill="#fff" opacity=".22"/>',
    '   <path d="M64,240 Q161,245 258,240 L258,245 Q161,250 64,245 Z" fill="#141416" stroke="#141416" stroke-width="3" stroke-linejoin="round"/>',
    '   <path d="M156,247 Q161,244 166,247" fill="none" stroke="#141416" stroke-width="6" stroke-linecap="round"/>',
    '   <rect x="67.5" y="241" width="8" height="3" rx="1.5" fill="#E9EAEE"/><rect x="246.5" y="241" width="8" height="3" rx="1.5" fill="#E9EAEE"/></g>',
    '  <path class="lb-boca" d="' + BOCA + '" fill="none" stroke="#141416" stroke-width="5" stroke-linecap="round"/>',
    '  <path class="lb-boca-risa" d="M132,296 Q161,296 190,296 Q184,322 161,322 Q138,322 132,296 Z" fill="#141416" opacity="0"/>',
    '  <path class="lb-lengua" d="M147,313 Q161,305 175,313 Q168,321 161,321 Q154,321 147,313 Z" fill="#FF7A6E" opacity="0"/>',
    '</g></g>',
    // brazo izquierdo (descansa)
    '<g class="lb-brazo lb-brazo--izq"><path d="M83,292 C68,300 58,312 53,326" fill="none" stroke="url(#lb-piel)" stroke-width="11" stroke-linecap="round"/>',
    ' <circle cx="51" cy="331" r="12" fill="url(#lb-piel)"/><circle cx="47" cy="327" r="3.6" fill="#fff" opacity=".25"/></g>',
    // brazo derecho (en reposo abajo; sube para saludar)
    '<g class="lb-brazo lb-brazo--der"><path d="M237,292 C252,300 262,312 267,326" fill="none" stroke="url(#lb-piel)" stroke-width="11" stroke-linecap="round"/>',
    ' <g class="lb-mano"><circle cx="269" cy="331" r="12" fill="url(#lb-piel)"/><path d="M277,335 L283,339 M275,339 L279,345 M271,341 L273,347" stroke="url(#lb-piel)" stroke-width="5" stroke-linecap="round"/>',
    ' <circle cx="265" cy="327" r="3.6" fill="#fff" opacity=".25"/></g></g>',
    // burbujas, en el mismo lugar que en el avatar
    '<g class="lb-burbujas"><circle class="lb-b lb-b1" cx="147" cy="83" r="9" fill="url(#lb-burbuja)"/><circle class="lb-b lb-b2" cx="150" cy="50" r="5.6" fill="url(#lb-burbuja)"/>',
    ' <g class="lb-b lb-b3"><circle cx="179" cy="69" r="18" fill="url(#lb-burbuja)"/><path d="M175,63 L169,69 L175,75 M183,63 L189,69 L183,75" fill="none" stroke="#55595F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g></g>',
    '<g class="lb-gotas"></g>',
    '<g class="lb-brillos"></g>',
    '</svg>'
  ].join("");

  var CSS = [
    ".labsin{position:relative;width:240px;max-width:100%;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;outline:none}",
    ".labsin:focus-visible .labsin__svg{filter:drop-shadow(0 0 0 #fff) drop-shadow(0 0 10px rgba(211,38,29,.6))}",
    ".labsin__svg{display:block;width:100%;height:auto;overflow:visible}",
    ".labsin .lb-fondo,.labsin .lb-piezas{filter:drop-shadow(0 6px 8px rgba(0,0,0,.22))}",
    ".labsin .lb-burbujas{filter:drop-shadow(0 2px 2px rgba(0,0,0,.18))}",
    ".labsin svg *{transform-box:fill-box}",
    ".labsin .lb-brazo--der{transform-origin:0% 0%}",
    ".labsin .lb-brazo--izq{transform-origin:100% 0%}",
    ".labsin .lb-pierna{transform-origin:50% 0%}",
    ".labsin svg .lb-liquido,.labsin svg .lb-cara-env{transform-box:view-box;transform-origin:160px 347px}",
    ".labsin .lb-cara{transform-origin:50% 50%}",
    ".labsin .lb-ojos,.labsin .lb-ojos-risa,.labsin .lb-boca,.labsin .lb-boca-risa,.labsin .lb-lengua{transition:opacity .18s ease}",
    ".labsin .lb-b{animation:lb-flota 2.4s ease-in-out infinite alternate}",
    ".labsin .lb-b1{animation-delay:-.8s}.labsin .lb-b2{animation-delay:-1.6s;animation-duration:2s}",
    "@keyframes lb-flota{from{transform:translateY(0)}to{transform:translateY(-6px)}}",
    ".labsin .lb-cuerpo-idle{animation:lb-respira 3s ease-in-out infinite}",
    "@keyframes lb-respira{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}",
    ".labsin .lb-ojos{animation:lb-parpadeo 4.5s infinite;transform-origin:50% 50%}",
    "@keyframes lb-parpadeo{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}",
    ".labsin__globo{position:absolute;left:64%;top:6px;z-index:2;margin:0;padding:12px 16px;border-radius:18px 18px 18px 4px;",
    " background:#fff;color:#17181C;font:800 1.05rem/1.2 var(--titulos,system-ui,sans-serif);letter-spacing:-.01em;white-space:nowrap;",
    " box-shadow:0 12px 30px -10px rgba(23,24,28,.35);border:2px solid #17181C;opacity:0;transform:translateY(8px) scale(.9);transform-origin:0% 100%;",
    " transition:opacity .3s ease,transform .35s cubic-bezier(.2,1.4,.4,1);pointer-events:none}",
    ".labsin__globo.visible{opacity:1;transform:none}",
    "@media (max-width:560px){.labsin{width:190px}.labsin__globo{font-size:.95rem;left:60%}}"
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
    var fondo = q(".lb-fondo"), caraEnv = q(".lb-cara-env"), vidrio = q(".lb-vidrio"), piezasG = q(".lb-piezas"), grietasG = q(".lb-grietas");
    var gotasG = q(".lb-gotas"), brillosG = q(".lb-brillos"), burbujas = q(".lb-burbujas");
    var ojos = q(".lb-ojos"), ojosRisa = q(".lb-ojos-risa"), bocaRisa = q(".lb-boca-risa"), lengua = q(".lb-lengua");

    // --- piezas de vidrio: cortes en abanico desde el punto del golpe ---
    var C = { x: 160, y: 250 }, N = 9, piezas = [];
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
      g.innerHTML = "<g opacity=\".35\">" + fondo.innerHTML + "</g>" + vidrio.innerHTML;
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
        { transform: "rotate(0deg)", easing: "cubic-bezier(.3,1.25,.5,1)" },
        { transform: "rotate(-112deg)", offset: .2, easing: "ease-in-out" },
        { transform: "rotate(-92deg)", offset: .33, easing: "ease-in-out" },
        { transform: "rotate(-122deg)", offset: .46, easing: "ease-in-out" },
        { transform: "rotate(-92deg)", offset: .59, easing: "ease-in-out" },
        { transform: "rotate(-118deg)", offset: .72, easing: "cubic-bezier(.45,0,.3,1)" },
        { transform: "rotate(-110deg)", offset: .8, easing: "cubic-bezier(.45,0,.3,1)" },
        { transform: "rotate(0deg)" }
      ], { duration: 2600 });
      anim(cara, [{ transform: "rotate(0)" }, { transform: "rotate(-4deg)" }, { transform: "rotate(3deg)" }, { transform: "rotate(0)" }], { duration: 2000, easing: "ease-in-out" });
      return w.finished.then(function () {
        return espera(600);
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
        var c = el("circle", { cx: 160, cy: 310, r: r, fill: i % 3 ? "#D3261D" : "#FF6B5C" }, gotasG);
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
      boca.setAttribute("d", "M151,303 Q161,292 171,303 Q161,314 151,303 Z");
      boca.setAttribute("fill", "#141416");
      lineas.forEach(function (l, i) {
        anim(l, [{ opacity: 1, strokeDashoffset: 160 }, { opacity: 1, strokeDashoffset: 0 }], { duration: 260, delay: i * 18 });
      });
      espera(480).then(function () {
        // 2) se rompe: el vidrio vuela en pedazos, el líquido cae y se derrama
        vidrio.style.opacity = "0"; fondo.style.opacity = "0";
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
        anim(brazoDer, [{ transform: "rotate(0)" }, { transform: "translate(10px,46px) rotate(60deg)" }], { duration: 700, easing: "cubic-bezier(.5,0,.8,.5)" });
        anim(brazoIzq, [{ transform: "rotate(0)" }, { transform: "translate(-10px,70px) rotate(-80deg)" }], { duration: 650, easing: "cubic-bezier(.5,0,.8,.5)" });
        piernas.forEach(function (pn, i) {
          anim(pn, [{ transform: "rotate(0)" }, { transform: "rotate(" + (i ? -70 : 70) + "deg) translateY(10px)" }], { duration: 500, easing: "ease-in" });
        });
        [liquido, caraEnv].forEach(function (n) { anim(n, [
          { transform: "translateY(0) scale(1,1)" },
          { transform: "translateY(14px) scale(1.15,.8)", offset: .35 },
          { transform: "translateY(26px) scale(1.7,.3)" }
        ], { duration: 650, easing: "cubic-bezier(.5,0,.6,1)" }); });
        anim(cara, [{ transform: "scale(1,1)" }, { transform: "scale(.7,2.2) translateY(-4px)" }], { duration: 650 });
        gotas();
        return espera(1500);
      }).then(function () {
        // 3) se cura: el líquido sube, los pedazos vuelven y todo brilla
        brillos();
        [liquido, caraEnv].forEach(function (n) { anim(n, [{ transform: "translateY(26px) scale(1.7,.3)" }, { transform: "translateY(-6px) scale(.95,1.08)", offset: .7 },
                       { transform: "translateY(0) scale(1,1)" }], { duration: 750, easing: "cubic-bezier(.3,1.3,.5,1)" }); });
        anim(cara, [{ transform: "scale(.7,2.2) translateY(-4px)" }, { transform: "scale(1,1)" }], { duration: 750, easing: "cubic-bezier(.3,1.3,.5,1)" });
        piezas.forEach(function (p, i) { if (p.anim && p.anim.reverse) { p.anim.playbackRate = 1.15; p.anim.reverse(); } });
        anim(brazoDer, [{ transform: "translate(10px,46px) rotate(60deg)" }, { transform: "rotate(0)" }], { duration: 800, delay: 200, easing: "cubic-bezier(.3,1.3,.5,1)" });
        anim(brazoIzq, [{ transform: "translate(-10px,70px) rotate(-80deg)" }, { transform: "rotate(0)" }], { duration: 800, delay: 200, easing: "cubic-bezier(.3,1.3,.5,1)" });
        piernas.forEach(function (pn, i) {
          anim(pn, [{ transform: "rotate(" + (i ? -70 : 70) + "deg) translateY(10px)" }, { transform: "rotate(0)" }], { duration: 700, delay: 150, easing: "cubic-bezier(.3,1.3,.5,1)" });
        });
        return espera(950);
      }).then(function () {
        vidrio.style.opacity = ""; fondo.style.opacity = "";
        piezas.forEach(function (p) { p.g.setAttribute("opacity", "0"); if (p.anim) p.anim.cancel(); });
        burbujas.style.opacity = "";
        boca.setAttribute("d", BOCA);
        boca.setAttribute("fill", "none");
        anim(cuerpo, [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 380, fill: "none", easing: "ease-out" });
        cuerpo.classList.add("lb-cuerpo-idle");
        return saludar();
      }).then(function () { ocupado = false; });
    }

    // --- reírse agarrándose la panza ---
    var riendo = false;
    function cara_risa(si) {
      ojos.style.opacity = si ? "0" : ""; ojosRisa.style.opacity = si ? "1" : "0";
      boca.style.opacity = si ? "0" : ""; bocaRisa.style.opacity = si ? "1" : "0"; lengua.style.opacity = si ? "1" : "0";
    }
    [ojosRisa, bocaRisa, lengua].forEach(function (n) { n.removeAttribute("opacity"); n.style.opacity = "0"; });
    function reir() {
      if (riendo) return;
      riendo = true;
      if (globo) { globo.textContent = risaTexto; globo.classList.add("visible"); }
      cara_risa(true);
      var DUR = 2000, suave = "cubic-bezier(.45,0,.55,1)";
      // las manos van a la panza y la acompañan en cada carcajada
      function manos(final) {
        var f = [{ transform: "rotate(0deg)", easing: "cubic-bezier(.3,1.1,.5,1)" }];
        for (var i = 1; i <= 5; i++) f.push({ transform: "rotate(" + (final + (i % 2 ? 0 : (final > 0 ? -6 : 6))) + "deg)", offset: .12 + i * .13, easing: suave });
        f[f.length - 1].offset = .82;
        f.push({ transform: "rotate(0deg)" });
        return f;
      }
      anim(brazoDer, manos(86), { duration: DUR, fill: "none" });
      anim(brazoIzq, manos(-87), { duration: DUR, fill: "none" });
      // carcajadas: rebote suave del cuerpo con un leve balanceo
      var f = [{ transform: "translateY(0) rotate(0deg) scale(1,1)", easing: suave }];
      for (var i = 1; i <= 6; i++) {
        var arriba = i % 2 === 1;
        f.push({ transform: arriba ? "translateY(-6px) rotate(" + (i % 4 === 1 ? -2 : 2) + "deg) scale(.98,1.03)" : "translateY(1px) rotate(0deg) scale(1.03,.97)",
                 offset: .1 + i * .12, easing: suave });
      }
      f.push({ transform: "translateY(0) rotate(0deg) scale(1,1)" });
      anim(cuerpo, f, { duration: DUR, fill: "none" });
      return espera(DUR - 450).then(function () {
        cara_risa(false);
        return espera(650);
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

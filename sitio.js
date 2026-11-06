// Pache Labs: animaciones al hacer scroll, recorrido de Ozone PDF y envío del formulario
// de sugerencias. Sin dependencias. Si JavaScript está apagado, todo se ve y funciona igual,
// solo que sin animaciones (el formulario se envía de la forma clásica).
(function () {
  "use strict";
  // 0) Formulario de sugerencias: se envía sin salir de la página con Web3Forms.
  //    Si el servicio no responde, se abre el programa de mail del usuario con el mensaje
  //    ya escrito, así la sugerencia nunca se pierde.
  var CORREO = "pache.labs@gmail.com";
  document.querySelectorAll("form[data-sugerencias]").forEach(function (f) {
    var estado = f.querySelector(".formulario__estado");
    var boton = f.querySelector("button[type=submit]");
    function avisar(html, clase) {
      estado.className = "formulario__estado" + (clase ? " " + clase : "");
      estado.innerHTML = html;
    }
    // tarjeta de agradecimiento con el avatar de Pache Labs
    function agradecer() {
      avisar("");
      var viejo = f.querySelector(".gracias");
      if (viejo) viejo.remove();
      var t = document.createElement("div");
      t.className = "gracias";
      t.setAttribute("role", "status");
      t.innerHTML = '<img class="gracias__avatar" src="img/avatar.webp" alt="" width="72" height="72">' +
        '<div class="gracias__globo"><strong>¡Gracias por la sugerencia!</strong>' +
        '<span>Ya me llegó y la voy a leer. Si dejaste tu email, te respondo.</span></div>';
      boton.insertAdjacentElement("afterend", t);
      setTimeout(function () { t.classList.add("gracias--visible"); }, 30);
      t.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    // plan B: abrir el programa de mail con el mensaje ya escrito
    function porMail() {
      var el = f.elements;
      var cuerpo = (el.mensaje ? el.mensaje.value : "") + "\n\n" +
        "Tema: " + (el.tema ? el.tema.value : "") +
        (el.nombre && el.nombre.value ? "\nNombre: " + el.nombre.value : "") +
        (el.email && el.email.value ? "\nEmail: " + el.email.value : "");
      var link = "mailto:" + CORREO + "?subject=" + encodeURIComponent("Sugerencia para Pache Labs") +
        "&body=" + encodeURIComponent(cuerpo);
      avisar('El servicio de envío no responde en este momento. Te abrí tu programa de mail con el ' +
        'mensaje ya escrito; si no se abrió, <a href="' + link + '">tocá acá</a> o escribime a ' +
        '<a href="mailto:' + CORREO + '">' + CORREO + '</a>.', "error");
      window.location.href = link;
    }
    if (/[?&]enviado=1/.test(location.search)) agradecer();
    // si falta el mensaje, decirlo claro (además del globito del navegador)
    f.addEventListener("invalid", function (e) {
      var campo = e.target;
      campo.classList.add("campo--error");
      avisar(campo.name === "mensaje" ? "Falta escribir tu mensaje: contame tu idea arriba y volvé a enviar."
        : "Revisá el campo marcado en rojo.", "error");
      if (!f.querySelector(".campo--error:focus")) campo.focus();
    }, true);
    f.addEventListener("input", function (e) {
      if (e.target.classList.contains("campo--error") && e.target.checkValidity()) {
        e.target.classList.remove("campo--error");
        if (!f.querySelector(".campo--error")) avisar("");
      }
    });
    f.addEventListener("submit", function (e) {
      if (f.elements.botcheck && f.elements.botcheck.checked) { e.preventDefault(); return; }  // robots
      if (location.protocol === "file:") {
        e.preventDefault();
        avisar("El formulario funciona cuando la página está publicada en internet, no abierta como archivo desde la PC.", "error");
        return;
      }
      if (!window.fetch || !window.FormData) return;  // navegador viejo: envío clásico
      e.preventDefault();
      boton.disabled = true;
      avisar("Enviando...");
      var datos = {};
      new FormData(f).forEach(function (v, k) { if (k !== "redirect" && k !== "botcheck") datos[k] = v; });
      var control = window.AbortController ? new AbortController() : null;
      var reloj = setTimeout(function () { if (control) control.abort(); }, 15000);
      fetch(f.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(datos),
        signal: control ? control.signal : undefined
      }).then(function (r) {
        return r.json().then(function (j) {
          if (!r.ok || !j.success) throw new Error(j.message || "rechazado");
        });
      }).then(function () {
        clearTimeout(reloj);
        f.reset();
        agradecer();
      }).catch(function () {
        clearTimeout(reloj);
        porMail();
      }).then(function () { boton.disabled = false; });
    });
  });

  // 0b) Al tocar "Descargar": un gracias con el avatar y, si quiere, cómo apoyar.
  //     No frena la descarga y se cierra con la X, con Escape o sola si no se usa.
  var tarjetaDescarga = null;
  function cerrarDescarga() {
    if (!tarjetaDescarga) return;
    var t = tarjetaDescarga; tarjetaDescarga = null;
    t.classList.remove("descarga-ok--visible");
    setTimeout(function () { t.remove(); }, 350);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href*="/releases/"][href*="/download/"]');
    if (!a) return;
    cerrarDescarga();
    var esMsi = /\.msi(\?|$)/i.test(a.href);
    var t = document.createElement("aside");
    t.className = "descarga-ok";
    t.setAttribute("role", "status");
    t.setAttribute("aria-live", "polite");
    t.innerHTML =
      '<button class="descarga-ok__cerrar" type="button" aria-label="Cerrar">×</button>' +
      '<img class="descarga-ok__avatar" src="img/avatar.webp" alt="" width="64" height="64">' +
      '<div class="descarga-ok__texto">' +
        '<strong>¡Gracias por descargar Ozone PDF!</strong>' +
        '<p>La descarga ya empezó. Cuando termine, abrí <b>' + (esMsi ? "Ozone_PDF.msi" : "Instalar_Ozone_PDF.exe") +
        '</b> para instalarlo.</p>' +
        '<p class="descarga-ok__suave">Es y va a seguir siendo gratis. Si te sirve y tenés ganas, podés ' +
        'invitarme un cafecito o contarme qué mejorarías. Totalmente opcional.</p>' +
        '<div class="descarga-ok__acciones">' +
          '<a class="boton boton--rojo" href="https://cafecito.app/pachelabs" rel="noopener" target="_blank">☕ Invitame un cafecito</a>' +
          '<a class="descarga-ok__link" href="#sugerencias">Dejar una sugerencia</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(t);
    tarjetaDescarga = t;
    t.querySelector(".descarga-ok__cerrar").addEventListener("click", cerrarDescarga);
    t.querySelector(".descarga-ok__link").addEventListener("click", cerrarDescarga);
    setTimeout(function () { t.classList.add("descarga-ok--visible"); }, 30);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarDescarga(); });

  var raiz = document.documentElement;
  var sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window)) return;
  raiz.classList.add("js");

  // 1) Los bloques aparecen cuando entran en pantalla (una sola vez)
  var aparecer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        aparecer.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
  document.querySelectorAll(".aparecer, .sinred__dibujo").forEach(function (el) {
    if (sinMovimiento) el.classList.add("visible");
    else aparecer.observe(el);
  });

  // 2) Recorrido: en pantallas grandes, la ventana de la derecha queda fija y muestra la
  //    captura del paso que está en el centro de la pantalla
  var pasos = Array.prototype.slice.call(document.querySelectorAll(".paso"));
  var cuadros = document.querySelectorAll(".escenario__cuadros img");
  function mostrar(nombre) {
    cuadros.forEach(function (img) { img.classList.toggle("activo", img.dataset.imagen === nombre); });
    pasos.forEach(function (p) { p.classList.toggle("es-actual", p.dataset.imagen === nombre); });
  }
  var centro = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) { if (e.isIntersecting) mostrar(e.target.dataset.imagen); });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
  pasos.forEach(function (p) { centro.observe(p); });
  if (pasos.length) mostrar(pasos[0].dataset.imagen);

  // 3) El menú "Programas" se cierra al elegir una opción, al tocar afuera o con Escape
  var menu = document.querySelector(".programas");
  if (menu) {
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) menu.removeAttribute("open"); });
    document.addEventListener("click", function (e) { if (!menu.contains(e.target)) menu.removeAttribute("open"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.hasAttribute("open")) {
        menu.removeAttribute("open");
        menu.querySelector("summary").focus();
      }
    });
  }
})();

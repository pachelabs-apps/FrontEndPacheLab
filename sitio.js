// Pache Labs: animaciones al hacer scroll, recorrido de Ozone PDF y envío del formulario
// de sugerencias. Sin dependencias. Si JavaScript está apagado, todo se ve y funciona igual,
// solo que sin animaciones (el formulario se envía de la forma clásica).
(function () {
  "use strict";
  // 0) Formulario de sugerencias: se envía sin salir de la página (FormSubmit, modo AJAX).
  //    Si el envío en segundo plano falla o tarda demasiado, se manda de la forma clásica
  //    (abre la página de FormSubmit), así el mensaje nunca se pierde.
  document.querySelectorAll("form[data-sugerencias]").forEach(function (f) {
    var estado = f.querySelector(".formulario__estado");
    var boton = f.querySelector("button[type=submit]");
    // tarjeta de agradecimiento con el avatar de Pache Labs
    function agradecer() {
      estado.className = "formulario__estado";
      estado.textContent = "";
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
    if (/[?&]enviado=1/.test(location.search)) agradecer();
    function avisar(texto, clase) {
      estado.className = "formulario__estado" + (clase ? " " + clase : "");
      estado.textContent = texto;
    }
    // si falta el mensaje, decirlo claro (además del globito del navegador)
    f.addEventListener("invalid", function () {
      avisar("Escribí tu mensaje antes de enviar.", "error");
    }, true);
    f.addEventListener("submit", function (e) {
      if (f.elements._honey && f.elements._honey.value) { e.preventDefault(); return; }
      if (location.protocol === "file:") {
        e.preventDefault();
        avisar("El formulario funciona cuando la página está publicada en internet, no abierta como archivo desde la PC.", "error");
        return;
      }
      if (!window.fetch || !window.FormData || f.dataset.clasico) return;  // envío clásico
      e.preventDefault();
      boton.disabled = true;
      avisar("Enviando...");
      var datos = {};
      new FormData(f).forEach(function (v, k) { datos[k] = v; });
      var control = window.AbortController ? new AbortController() : null;
      var reloj = setTimeout(function () { if (control) control.abort(); }, 15000);
      fetch(f.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(datos),
        signal: control ? control.signal : undefined
      }).then(function (r) {
        return r.json().then(function (j) {
          if (!r.ok || String(j.success) !== "true") throw new Error(j.message || "rechazado");
        });
      }).then(function () {
        clearTimeout(reloj);
        f.reset();
        agradecer();
        boton.disabled = false;
      }).catch(function () {
        clearTimeout(reloj);
        // plan B: envío clásico, que muestra la página de FormSubmit
        avisar("Abriendo el envío seguro de FormSubmit...");
        f.dataset.clasico = "1";
        boton.disabled = false;
        HTMLFormElement.prototype.submit.call(f);
      });
    });
  });

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

// Pache Labs: animaciones al hacer scroll, recorrido de Ozone PDF y envío del formulario
// de sugerencias. Sin dependencias. Si JavaScript está apagado, todo se ve y funciona igual,
// solo que sin animaciones (el formulario se envía de la forma clásica).
(function () {
  "use strict";
  // Idioma de la página (las versiones traducidas están en /en/, /de/, /zh/, /ja/ y /ru/)
  var IDIOMA = (document.documentElement.lang || "es").slice(0, 2);
  var hoja = document.querySelector('link[rel="stylesheet"]');
  var BASE = hoja && hoja.getAttribute("href").indexOf("../") === 0 ? "../" : "";
  var TEXTOS = {
    "en": {
      "¡Gracias por la sugerencia!": "Thanks for the suggestion!",
      "Ya me llegó y la voy a leer. Si dejaste tu email, te respondo.": "It reached me and I'll read it. If you left your email, I'll reply.",
      "El servicio de envío no responde en este momento. Te abrí tu programa de mail con el mensaje ya escrito; si no se abrió, {tocá acá} o escribime a {correo}.": "The sending service is not responding right now. I opened your email program with the message already written; if it didn't open, {click here} or write to me at {correo}.",
      "Falta escribir tu mensaje: contame tu idea arriba y volvé a enviar.": "Your message is missing: tell me your idea above and send it again.",
      "Revisá el campo marcado en rojo.": "Check the field marked in red.",
      "El formulario funciona cuando la página está publicada en internet, no abierta como archivo desde la PC.": "The form works when the page is published online, not opened as a file from your PC.",
      "Enviando...": "Sending...",
      "Cerrar": "Close",
      "¡Gracias por descargar Ozone PDF!": "Thanks for downloading Ozone PDF!",
      "La descarga ya empezó. Cuando termine, abrí {archivo} para instalarlo.": "The download has started. When it finishes, open {archivo} to install it.",
      "Es y va a seguir siendo gratis. Si te sirve y tenés ganas, podés invitarme un cafecito o contarme qué mejorarías. Totalmente opcional.": "It is and will stay free. If it helps you and you feel like it, you can buy me a coffee or tell me what you would improve. Totally optional.",
      "Invitame un cafecito": "Buy me a coffee",
      "Dejar una sugerencia": "Leave a suggestion"
    },
    "de": {
      "¡Gracias por la sugerencia!": "Danke für den Vorschlag!",
      "Ya me llegó y la voy a leer. Si dejaste tu email, te respondo.": "Er ist angekommen und ich lese ihn. Wenn Sie Ihre E-Mail angegeben haben, antworte ich Ihnen.",
      "El servicio de envío no responde en este momento. Te abrí tu programa de mail con el mensaje ya escrito; si no se abrió, {tocá acá} o escribime a {correo}.": "Der Versanddienst antwortet gerade nicht. Ich habe Ihr E-Mail-Programm mit der fertigen Nachricht geöffnet; falls es sich nicht geöffnet hat, {klicken Sie hier} oder schreiben Sie mir an {correo}.",
      "Falta escribir tu mensaje: contame tu idea arriba y volvé a enviar.": "Die Nachricht fehlt: Beschreiben Sie oben Ihre Idee und senden Sie erneut.",
      "Revisá el campo marcado en rojo.": "Prüfen Sie das rot markierte Feld.",
      "El formulario funciona cuando la página está publicada en internet, no abierta como archivo desde la PC.": "Das Formular funktioniert, wenn die Seite online veröffentlicht ist, nicht als Datei vom PC geöffnet.",
      "Enviando...": "Wird gesendet...",
      "Cerrar": "Schließen",
      "¡Gracias por descargar Ozone PDF!": "Danke, dass Sie Ozone PDF herunterladen!",
      "La descarga ya empezó. Cuando termine, abrí {archivo} para instalarlo.": "Der Download hat begonnen. Wenn er fertig ist, öffnen Sie {archivo}, um es zu installieren.",
      "Es y va a seguir siendo gratis. Si te sirve y tenés ganas, podés invitarme un cafecito o contarme qué mejorarías. Totalmente opcional.": "Es ist und bleibt kostenlos. Wenn es Ihnen hilft und Sie Lust haben, können Sie mir einen Kaffee spendieren oder mir sagen, was Sie verbessern würden. Ganz freiwillig.",
      "Invitame un cafecito": "Spendier mir einen Kaffee",
      "Dejar una sugerencia": "Vorschlag hinterlassen"
    },
    "zh": {
      "¡Gracias por la sugerencia!": "感谢您的建议！",
      "Ya me llegó y la voy a leer. Si dejaste tu email, te respondo.": "我已经收到，会认真阅读。如果您留了邮箱，我会回复您。",
      "El servicio de envío no responde en este momento. Te abrí tu programa de mail con el mensaje ya escrito; si no se abrió, {tocá acá} o escribime a {correo}.": "发送服务暂时没有响应。已为您打开邮件程序并写好了消息；如果没有打开，请{点击这里}，或写信到 {correo}。",
      "Falta escribir tu mensaje: contame tu idea arriba y volvé a enviar.": "还没有填写消息：请在上方写下您的想法后再发送。",
      "Revisá el campo marcado en rojo.": "请检查标红的字段。",
      "El formulario funciona cuando la página está publicada en internet, no abierta como archivo desde la PC.": "表单只能在网页发布到网上后使用，不能在电脑上以文件方式打开使用。",
      "Enviando...": "正在发送...",
      "Cerrar": "关闭",
      "¡Gracias por descargar Ozone PDF!": "感谢下载 Ozone PDF！",
      "La descarga ya empezó. Cuando termine, abrí {archivo} para instalarlo.": "下载已开始。完成后，打开 {archivo} 进行安装。",
      "Es y va a seguir siendo gratis. Si te sirve y tenés ganas, podés invitarme un cafecito o contarme qué mejorarías. Totalmente opcional.": "它现在免费，以后也会一直免费。如果对您有帮助，也愿意的话，可以请我喝杯咖啡，或者告诉我可以改进什么。完全自愿。",
      "Invitame un cafecito": "请我喝杯咖啡",
      "Dejar una sugerencia": "留下建议"
    },
    "ja": {
      "¡Gracias por la sugerencia!": "ご意見ありがとうございます！",
      "Ya me llegó y la voy a leer. Si dejaste tu email, te respondo.": "無事に届きました。必ず読みます。メールアドレスを書いてくださった方には返信します。",
      "El servicio de envío no responde en este momento. Te abrí tu programa de mail con el mensaje ya escrito; si no se abrió, {tocá acá} o escribime a {correo}.": "送信サービスが現在応答していません。メッセージを入力した状態でメールソフトを開きました。開かない場合は{こちらをクリック}するか、{correo} までご連絡ください。",
      "Falta escribir tu mensaje: contame tu idea arriba y volvé a enviar.": "メッセージが入力されていません。上にアイデアを書いて、もう一度送信してください。",
      "Revisá el campo marcado en rojo.": "赤で示された項目を確認してください。",
      "El formulario funciona cuando la página está publicada en internet, no abierta como archivo desde la PC.": "フォームは、ページをインターネットで公開したときに使えます。パソコンからファイルとして開いた場合は使えません。",
      "Enviando...": "送信中...",
      "Cerrar": "閉じる",
      "¡Gracias por descargar Ozone PDF!": "Ozone PDF をダウンロードいただきありがとうございます！",
      "La descarga ya empezó. Cuando termine, abrí {archivo} para instalarlo.": "ダウンロードを開始しました。完了したら {archivo} を開いてインストールしてください。",
      "Es y va a seguir siendo gratis. Si te sirve y tenés ganas, podés invitarme un cafecito o contarme qué mejorarías. Totalmente opcional.": "無料で、これからも無料です。役に立ち、もしよければ、コーヒーをおごっていただくか、改善点を教えてください。まったくの任意です。",
      "Invitame un cafecito": "コーヒーをおごる",
      "Dejar una sugerencia": "ご意見を送る"
    },
    "ru": {
      "¡Gracias por la sugerencia!": "Спасибо за предложение!",
      "Ya me llegó y la voy a leer. Si dejaste tu email, te respondo.": "Оно дошло, я его прочитаю. Если вы оставили email, я отвечу.",
      "El servicio de envío no responde en este momento. Te abrí tu programa de mail con el mensaje ya escrito; si no se abrió, {tocá acá} o escribime a {correo}.": "Сервис отправки сейчас не отвечает. Я открыл вашу почтовую программу с уже написанным сообщением; если она не открылась, {нажмите здесь} или напишите мне на {correo}.",
      "Falta escribir tu mensaje: contame tu idea arriba y volvé a enviar.": "Не хватает сообщения: опишите свою идею выше и отправьте снова.",
      "Revisá el campo marcado en rojo.": "Проверьте поле, отмеченное красным.",
      "El formulario funciona cuando la página está publicada en internet, no abierta como archivo desde la PC.": "Форма работает, когда страница опубликована в интернете, а не открыта как файл с компьютера.",
      "Enviando...": "Отправка...",
      "Cerrar": "Закрыть",
      "¡Gracias por descargar Ozone PDF!": "Спасибо, что скачали Ozone PDF!",
      "La descarga ya empezó. Cuando termine, abrí {archivo} para instalarlo.": "Загрузка началась. Когда она закончится, откройте {archivo}, чтобы установить программу.",
      "Es y va a seguir siendo gratis. Si te sirve y tenés ganas, podés invitarme un cafecito o contarme qué mejorarías. Totalmente opcional.": "Программа бесплатная и останется такой. Если она вам пригодилась и есть желание, можете угостить меня кофе или рассказать, что улучшить. Совершенно необязательно.",
      "Invitame un cafecito": "Угостить меня кофе",
      "Dejar una sugerencia": "Оставить предложение"
    }
  };
  function tx(s) { return (TEXTOS[IDIOMA] && TEXTOS[IDIOMA][s]) || s; }
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
      t.innerHTML = '<img class="gracias__avatar" src="' + BASE + 'img/avatar.webp" alt="" width="72" height="72">' +
        '<div class="gracias__globo"><strong>' + tx("¡Gracias por la sugerencia!") + '</strong>' +
        '<span>' + tx("Ya me llegó y la voy a leer. Si dejaste tu email, te respondo.") + '</span></div>';
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
      avisar(tx("El servicio de envío no responde en este momento. Te abrí tu programa de mail con el mensaje ya escrito; si no se abrió, {tocá acá} o escribime a {correo}.")
        .replace(/\{([^}]*)\}/, '<a href="' + link + '">$1</a>')
        .replace("{correo}", '<a href="mailto:' + CORREO + '">' + CORREO + '</a>'), "error");
      window.location.href = link;
    }
    if (/[?&]enviado=1/.test(location.search)) agradecer();
    // si falta el mensaje, decirlo claro (además del globito del navegador)
    f.addEventListener("invalid", function (e) {
      var campo = e.target;
      campo.classList.add("campo--error");
      avisar(campo.name === "mensaje" ? tx("Falta escribir tu mensaje: contame tu idea arriba y volvé a enviar.")
        : tx("Revisá el campo marcado en rojo."), "error");
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
        avisar(tx("El formulario funciona cuando la página está publicada en internet, no abierta como archivo desde la PC."), "error");
        return;
      }
      if (!window.fetch || !window.FormData) return;  // navegador viejo: envío clásico
      e.preventDefault();
      boton.disabled = true;
      avisar(tx("Enviando..."));
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
      '<button class="descarga-ok__cerrar" type="button" aria-label="' + tx("Cerrar") + '">×</button>' +
      '<img class="descarga-ok__avatar" src="' + BASE + 'img/avatar.webp" alt="" width="64" height="64">' +
      '<div class="descarga-ok__texto">' +
        '<strong>' + tx("¡Gracias por descargar Ozone PDF!") + '</strong>' +
        '<p>' + tx("La descarga ya empezó. Cuando termine, abrí {archivo} para instalarlo.")
          .replace("{archivo}", "<b>" + (esMsi ? "Ozone_PDF.msi" : "Instalar_Ozone_PDF.exe") + "</b>") + '</p>' +
        '<p class="descarga-ok__suave">' + tx("Es y va a seguir siendo gratis. Si te sirve y tenés ganas, podés invitarme un cafecito o contarme qué mejorarías. Totalmente opcional.") + '</p>' +
        '<div class="descarga-ok__acciones">' +
          '<a class="boton boton--rojo" href="https://cafecito.app/pachelabs" rel="noopener" target="_blank">☕ ' + tx("Invitame un cafecito") + '</a>' +
          '<a class="descarga-ok__link" href="#sugerencias">' + tx("Dejar una sugerencia") + '</a>' +
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

  // 3b) El menú de idiomas se cierra al tocar afuera o con Escape
  document.querySelectorAll(".idiomas").forEach(function (m) {
    document.addEventListener("click", function (e) { if (!m.contains(e.target)) m.removeAttribute("open"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") m.removeAttribute("open"); });
  });

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

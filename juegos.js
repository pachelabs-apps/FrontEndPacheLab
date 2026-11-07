/* Juegos de Labcin — Pache Labs
   Labcin Salta y Atrapá tus datos. Todo corre en el navegador: no hay servidores,
   cuentas ni publicidad. Los récords se guardan solo en este equipo. */
(function () {
  "use strict";

  // ---------- textos en los seis idiomas ----------
  var TX = {
    es: {
      tocar: "Tocá o apretá Espacio para empezar", otraVez: "Tocá o apretá Espacio para jugar otra vez",
      puntos: "Puntos", record: "Récord", nuevoRecord: "¡Nuevo récord!", pausa: "Pausa",
      chocaste: "¡Ups! Te agarró un bug", compartir: "Compartir", copiado: "¡Copiado!",
      vidas: "Vidas", nivel: "Nivel", protegidos: "Datos protegidos",
      perdiste: "Se terminó la partida", sonido: "Sonido",
      compartirSalta: "Hice {n} puntos en Labcin Salta 🧪 ¿Me superás?",
      compartirDatos: "Protegí {n} datos en Atrapá tus datos 🧪 ¿Me superás?",
      dni: "DNI", clave: "Contraseña", foto: "Foto", tarjeta: "Tarjeta", ubicacion: "Ubicación", mail: "Mail",
      virus: "Virus", phishing: "Phishing", espia: "Espía",
      tips: {
        dni: "Antes de mandar una foto del DNI, tapá lo que no hace falta. Con Ozone PDF lo podés censurar.",
        clave: "Nunca compartas tus contraseñas, ni siquiera con alguien que dice ser del banco.",
        foto: "Las fotos guardan la ubicación donde se sacaron. Sacala antes de publicarlas.",
        tarjeta: "Ningún banco te va a pedir el código de seguridad de tu tarjeta por mensaje.",
        ubicacion: "Revisá qué apps saben dónde estás y apagá la ubicación a las que no la necesitan.",
        mail: "Usá una contraseña distinta para tu mail: es la llave para recuperar todas las demás.",
        virus: "No instales programas de páginas raras: bajalos siempre del sitio oficial.",
        phishing: "Antes de tocar un link, mirá bien la dirección: los falsos se parecen mucho a los reales.",
        espia: "Si una app pide permisos que no necesita (cámara, contactos), desconfiá."
      }
    },
    en: {
      tocar: "Tap or press Space to start", otraVez: "Tap or press Space to play again",
      puntos: "Score", record: "Best", nuevoRecord: "New best!", pausa: "Paused",
      chocaste: "Oops! A bug got you", compartir: "Share", copiado: "Copied!",
      vidas: "Lives", nivel: "Level", protegidos: "Data protected",
      perdiste: "Game over", sonido: "Sound",
      compartirSalta: "I scored {n} in Labcin Jump 🧪 Can you beat me?",
      compartirDatos: "I protected {n} pieces of data in Catch your data 🧪 Can you beat me?",
      dni: "ID", clave: "Password", foto: "Photo", tarjeta: "Card", ubicacion: "Location", mail: "Email",
      virus: "Virus", phishing: "Phishing", espia: "Spyware",
      tips: {
        dni: "Before sending a photo of your ID, cover what isn't needed. Ozone PDF can redact it.",
        clave: "Never share your passwords, not even with someone who says they're from the bank.",
        foto: "Photos store where they were taken. Remove the location before posting them.",
        tarjeta: "No bank will ever ask for your card's security code by message.",
        ubicacion: "Check which apps know where you are and turn location off for the ones that don't need it.",
        mail: "Use a unique password for your email: it's the key to recovering all the others.",
        virus: "Don't install programs from shady sites: always download them from the official one.",
        phishing: "Before tapping a link, check the address: fake ones look very similar to the real ones.",
        espia: "If an app asks for permissions it doesn't need (camera, contacts), be suspicious."
      }
    },
    de: {
      tocar: "Tippe oder drück die Leertaste zum Starten", otraVez: "Tippe oder drück die Leertaste für eine neue Runde",
      puntos: "Punkte", record: "Rekord", nuevoRecord: "Neuer Rekord!", pausa: "Pause",
      chocaste: "Hoppla! Ein Bug hat dich erwischt", compartir: "Teilen", copiado: "Kopiert!",
      vidas: "Leben", nivel: "Level", protegidos: "Geschützte Daten",
      perdiste: "Spiel vorbei", sonido: "Ton",
      compartirSalta: "Ich habe {n} Punkte in Labcin Springt 🧪 Schaffst du mehr?",
      compartirDatos: "Ich habe {n} Daten in Fang deine Daten geschützt 🧪 Schaffst du mehr?",
      dni: "Ausweis", clave: "Passwort", foto: "Foto", tarjeta: "Karte", ubicacion: "Standort", mail: "E-Mail",
      virus: "Virus", phishing: "Phishing", espia: "Spyware",
      tips: {
        dni: "Bevor du ein Foto deines Ausweises schickst, deck ab, was nicht nötig ist. Ozone PDF kann es schwärzen.",
        clave: "Teile deine Passwörter nie – auch nicht mit jemandem, der angeblich von der Bank ist.",
        foto: "Fotos speichern, wo sie aufgenommen wurden. Entferne den Standort vor dem Posten.",
        tarjeta: "Keine Bank fragt dich per Nachricht nach dem Sicherheitscode deiner Karte.",
        ubicacion: "Prüfe, welche Apps deinen Standort kennen, und schalte ihn aus, wo er nicht nötig ist.",
        mail: "Nutze für deine E-Mail ein eigenes Passwort: Sie ist der Schlüssel zu allen anderen Konten.",
        virus: "Installiere keine Programme von dubiosen Seiten – lade sie immer von der offiziellen.",
        phishing: "Schau dir vor dem Tippen die Adresse genau an: Fälschungen sehen echt aus.",
        espia: "Wenn eine App unnötige Rechte will (Kamera, Kontakte), sei misstrauisch."
      }
    },
    zh: {
      tocar: "点击或按空格键开始", otraVez: "点击或按空格键再玩一次",
      puntos: "得分", record: "最高分", nuevoRecord: "新纪录！", pausa: "暂停",
      chocaste: "哎呀！被 bug 抓住了", compartir: "分享", copiado: "已复制！",
      vidas: "生命", nivel: "关卡", protegidos: "已保护数据",
      perdiste: "游戏结束", sonido: "声音",
      compartirSalta: "我在 Labcin 跳跳 得了 {n} 分 🧪 你能超过我吗？",
      compartirDatos: "我在 抓住你的数据 里保护了 {n} 个数据 🧪 你能超过我吗？",
      dni: "身份证", clave: "密码", foto: "照片", tarjeta: "银行卡", ubicacion: "位置", mail: "邮箱",
      virus: "病毒", phishing: "钓鱼", espia: "间谍软件",
      tips: {
        dni: "发送身份证照片前，遮住不需要的信息。Ozone PDF 可以帮你涂黑。",
        clave: "永远不要分享密码，即使对方自称是银行的人。",
        foto: "照片会记录拍摄地点。发布前请先删除位置信息。",
        tarjeta: "没有银行会通过消息向你索要银行卡安全码。",
        ubicacion: "检查哪些应用知道你的位置，关掉不需要的。",
        mail: "邮箱要用单独的密码：它是找回其他所有账号的钥匙。",
        virus: "不要从可疑网站安装软件，一定要从官网下载。",
        phishing: "点链接前看清网址：假网站和真的长得很像。",
        espia: "如果应用要求不需要的权限（相机、通讯录），要小心。"
      }
    },
    ja: {
      tocar: "タップかスペースキーでスタート", otraVez: "タップかスペースキーでもう一度",
      puntos: "スコア", record: "ベスト", nuevoRecord: "ベスト更新！", pausa: "一時停止",
      chocaste: "あっ！バグにつかまった", compartir: "シェア", copiado: "コピーしました！",
      vidas: "ライフ", nivel: "レベル", protegidos: "守ったデータ",
      perdiste: "ゲームオーバー", sonido: "サウンド",
      compartirSalta: "Labcin ジャンプで {n} 点とったよ 🧪 超えられる？",
      compartirDatos: "データをキャッチで {n} 個のデータを守ったよ 🧪 超えられる？",
      dni: "身分証", clave: "パスワード", foto: "写真", tarjeta: "カード", ubicacion: "位置情報", mail: "メール",
      virus: "ウイルス", phishing: "フィッシング", espia: "スパイウェア",
      tips: {
        dni: "身分証の写真を送る前に、必要ない部分は隠そう。Ozone PDF で墨消しできるよ。",
        clave: "パスワードは誰にも教えないで。銀行を名乗る人にもね。",
        foto: "写真には撮影場所が残るよ。投稿する前に位置情報を消そう。",
        tarjeta: "銀行がメッセージでカードのセキュリティコードを聞くことはないよ。",
        ubicacion: "どのアプリが位置情報を使っているか確認して、不要なものはオフに。",
        mail: "メールには専用のパスワードを。ほかのアカウントを取り戻す鍵だからね。",
        virus: "あやしいサイトからソフトを入れないで。必ず公式サイトから。",
        phishing: "リンクを押す前にアドレスをよく見て。偽物は本物そっくりだよ。",
        espia: "必要のない権限（カメラ、連絡先）を求めるアプリには注意しよう。"
      }
    },
    ru: {
      tocar: "Нажмите или пробел, чтобы начать", otraVez: "Нажмите или пробел, чтобы сыграть ещё",
      puntos: "Очки", record: "Рекорд", nuevoRecord: "Новый рекорд!", pausa: "Пауза",
      chocaste: "Ой! Вас поймал баг", compartir: "Поделиться", copiado: "Скопировано!",
      vidas: "Жизни", nivel: "Уровень", protegidos: "Защищено данных",
      perdiste: "Игра окончена", sonido: "Звук",
      compartirSalta: "Я набрал {n} очков в «Прыжках Лабсина» 🧪 Обгонишь?",
      compartirDatos: "Я защитил {n} данных в «Поймай свои данные» 🧪 Обгонишь?",
      dni: "Паспорт", clave: "Пароль", foto: "Фото", tarjeta: "Карта", ubicacion: "Геолокация", mail: "Почта",
      virus: "Вирус", phishing: "Фишинг", espia: "Шпион",
      tips: {
        dni: "Прежде чем отправить фото паспорта, закройте лишнее. В Ozone PDF это можно скрыть.",
        clave: "Никогда не сообщайте пароли — даже тем, кто называет себя сотрудником банка.",
        foto: "В фото сохраняется место съёмки. Удаляйте геоданные перед публикацией.",
        tarjeta: "Ни один банк не спросит код безопасности карты в сообщении.",
        ubicacion: "Проверьте, каким приложениям известна ваша геолокация, и отключите лишним.",
        mail: "Для почты — отдельный пароль: это ключ к восстановлению всех остальных.",
        virus: "Не устанавливайте программы с сомнительных сайтов — только с официальных.",
        phishing: "Перед нажатием на ссылку проверьте адрес: подделки очень похожи на оригинал.",
        espia: "Если приложению нужны лишние разрешения (камера, контакты) — насторожитесь."
      }
    }
  };
  var idioma = (document.documentElement.lang || "es").slice(0, 2);
  var L = TX[idioma] || TX.es;

  // ---------- utilidades ----------
  function leer(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // sonidos cortitos hechos con el navegador (sin archivos)
  var audio = null, sonido = leer("pl.juegos.sonido", "1") === "1";
  function beep(f, d, tipo, vol) {
    if (!sonido) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
      o.type = tipo || "sine"; o.frequency.setValueAtTime(f, t);
      o.frequency.exponentialRampToValueAtTime(f * 1.6, t + d * 0.6);
      g.gain.setValueAtTime(vol || 0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(audio.destination); o.start(t); o.stop(t + d + 0.02);
    } catch (e) { /* sin audio */ }
  }

  // no robar teclas cuando se escribe o se usa un botón
  function esCampo(e) { var t = e.target; return t && t !== document.body && /^(INPUT|TEXTAREA|SELECT|BUTTON|A|SUMMARY)$/.test(t.tagName); }

  function prepararLienzo(c, alto) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = c.clientWidth;
    c.width = Math.round(w * dpr); c.height = Math.round(alto * dpr);
    var ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: alto };
  }

  function redondo(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  // ---------- Labcin dibujado para los juegos ----------
  // (x, y) = centro de la base del frasco. e = { t, paso, triste, brazos, aire }
  function dibujarLabcin(ctx, x, y, s, e) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s, s);
    var t = e.t || 0;
    // piernas
    var p = e.aire ? 0.5 : Math.sin(e.paso || 0);
    ctx.strokeStyle = "#26282E"; ctx.lineWidth = 5; ctx.lineCap = "round";
    [[-11, p], [11, -p]].forEach(function (l) {
      ctx.beginPath(); ctx.moveTo(l[0], -4); ctx.lineTo(l[0] + l[1] * 7, 14); ctx.stroke();
      ctx.fillStyle = "#D3261D"; ctx.beginPath(); ctx.ellipse(l[0] + l[1] * 7 + 3, 16, 8, 4.5, 0, 0, Math.PI * 2); ctx.fill();
    });
    // brazos
    var b = e.brazos === "arriba" ? -1 : e.brazos === "escudo" ? -0.6 : Math.sin((e.paso || 0) + 1) * 0.35;
    ctx.beginPath(); ctx.moveTo(-26, -26); ctx.quadraticCurveTo(-38, -26 + b * 18, -36, -14 + b * 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(26, -26); ctx.quadraticCurveTo(38, -26 + b * 18, 36, -14 + b * 30); ctx.stroke();
    ctx.fillStyle = "#26282E";
    ctx.beginPath(); ctx.arc(-36, -14 + b * 30, 5.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(36, -14 + b * 30, 5.5, 0, Math.PI * 2); ctx.fill();
    // frasco
    function frasco() {
      ctx.beginPath();
      ctx.moveTo(-9, -84); ctx.lineTo(-9, -58); ctx.lineTo(-31, -10); ctx.quadraticCurveTo(-34, 0, -24, 0);
      ctx.lineTo(24, 0); ctx.quadraticCurveTo(34, 0, 31, -10); ctx.lineTo(9, -58); ctx.lineTo(9, -84); ctx.closePath();
    }
    frasco(); ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.fill();
    // líquido con dos lomos
    ctx.save(); frasco(); ctx.clip();
    var ola = Math.sin(t * 4) * 1.5;
    var g = ctx.createLinearGradient(0, -44, 0, 0); g.addColorStop(0, "#E8342A"); g.addColorStop(1, "#9E140F");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(-40, -30);
    ctx.quadraticCurveTo(-18, -48 + ola, -2, -36); ctx.quadraticCurveTo(14, -50 - ola, 40, -32);
    ctx.lineTo(40, 4); ctx.lineTo(-40, 4); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.ellipse(-16, -38, 6, 2.5, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    frasco(); ctx.strokeStyle = "#C9D1DC"; ctx.lineWidth = 3.5; ctx.stroke();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.6; ctx.stroke();
    redondo(ctx, -13, -90, 26, 8, 4); ctx.fillStyle = "#fff"; ctx.fill(); ctx.strokeStyle = "#C9D1DC"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = "#D3261D"; ctx.font = "700 11px ui-monospace, monospace"; ctx.textAlign = "center"; ctx.fillText("{ }", 0, -66);
    // anteojos y cara
    var cy = -26;
    ctx.fillStyle = "rgba(255,205,200,.45)"; ctx.strokeStyle = "#141416"; ctx.lineWidth = 3.2;
    redondo(ctx, -27, cy - 8, 23, 17, 5); ctx.fill(); ctx.stroke();
    redondo(ctx, 4, cy - 8, 23, 17, 5); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4, cy - 3); ctx.quadraticCurveTo(0, cy - 6, 4, cy - 3); ctx.stroke();
    ctx.fillStyle = "#141416";
    if (e.triste) {
      ctx.lineWidth = 2.4;
      [-15.5, 15.5].forEach(function (ox) {
        ctx.beginPath(); ctx.moveTo(ox - 4, cy - 3); ctx.lineTo(ox + 4, cy + 4); ctx.moveTo(ox + 4, cy - 3); ctx.lineTo(ox - 4, cy + 4); ctx.stroke();
      });
      ctx.beginPath(); ctx.arc(0, cy + 20, 5, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
    } else {
      var parpadeo = (t % 4) > 3.85 ? 0.2 : 1;
      ctx.beginPath(); ctx.ellipse(-15.5, cy, 4.2, 4.2 * parpadeo, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(15.5, cy, 4.2, 4.2 * parpadeo, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(-14, cy - 1.5, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(17, cy - 1.5, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.lineWidth = 2.6; ctx.beginPath(); ctx.arc(0, cy + 11, 7, Math.PI * 0.15, Math.PI * 0.85); ctx.stroke();
    }
    ctx.restore();
  }

  function burbuja(ctx, x, y, r, conCodigo) {
    var g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
    g.addColorStop(0, "#fff"); g.addColorStop(1, "#BFC5CE");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(23,24,28,.15)"; ctx.lineWidth = 1; ctx.stroke();
    if (conCodigo) {
      ctx.strokeStyle = "#4A4F57"; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(x - r * 0.15, y - r * 0.35); ctx.lineTo(x - r * 0.5, y); ctx.lineTo(x - r * 0.15, y + r * 0.35);
      ctx.moveTo(x + r * 0.15, y - r * 0.35); ctx.lineTo(x + r * 0.5, y); ctx.lineTo(x + r * 0.15, y + r * 0.35); ctx.stroke();
    }
  }

  function bug(ctx, x, y, s, t, vuela) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.strokeStyle = "#17181C"; ctx.lineWidth = 2; ctx.lineCap = "round";
    var m = Math.sin(t * 18) * 3;
    if (vuela) {
      ctx.fillStyle = "rgba(200,220,255,.75)";
      ctx.beginPath(); ctx.ellipse(-6, -12 - Math.abs(m), 9, 5, -0.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6, -12 - Math.abs(m), 9, 5, 0.5, 0, Math.PI * 2); ctx.fill();
    } else {
      for (var i = -1; i <= 1; i++) {
        ctx.beginPath(); ctx.moveTo(i * 7, 0); ctx.lineTo(i * 7 - 6, 9 + (i % 2 ? m : -m)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(i * 7, 0); ctx.lineTo(i * 7 + 6, 9 + (i % 2 ? -m : m)); ctx.stroke();
      }
    }
    ctx.fillStyle = "#D3261D"; ctx.beginPath(); ctx.ellipse(0, -4, 15, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#17181C"; ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(0, 7); ctx.stroke();
    [[-6, -6], [6, -2], [-5, 2]].forEach(function (pt) { ctx.beginPath(); ctx.arc(pt[0], pt[1], 2.4, 0, Math.PI * 2); ctx.fill(); });
    ctx.beginPath(); ctx.arc(-16, -6, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-18, -7, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-19, -11); ctx.quadraticCurveTo(-24, -18, -27, -16); ctx.stroke();
    ctx.restore();
  }

  // ---------- panel compartido: marcador, botón de sonido y compartir ----------
  function panel(cont, claveRecord, textoCompartir) {
    var puntosEl = cont.querySelector("[data-puntos]"), recordEl = cont.querySelector("[data-record]");
    var record = Number(leer(claveRecord, "0")) || 0;
    if (recordEl) recordEl.textContent = record;
    var btnSonido = cont.querySelector("[data-sonido]");
    function pintarSonido() { if (btnSonido) { btnSonido.setAttribute("aria-pressed", sonido ? "true" : "false"); btnSonido.textContent = (sonido ? "🔊 " : "🔇 ") + L.sonido; } }
    if (btnSonido) btnSonido.addEventListener("click", function () { sonido = !sonido; guardar("pl.juegos.sonido", sonido ? "1" : "0"); pintarSonido(); });
    pintarSonido();
    var btnCompartir = cont.querySelector("[data-compartir]");
    var ultimo = 0;
    if (btnCompartir) {
      btnCompartir.textContent = L.compartir;
      btnCompartir.addEventListener("click", function () {
        var texto = textoCompartir.replace("{n}", ultimo) + " " + location.href.split("#")[0];
        if (navigator.share) navigator.share({ text: texto }).catch(function () {});
        else if (navigator.clipboard) navigator.clipboard.writeText(texto).then(function () {
          btnCompartir.textContent = L.copiado; setTimeout(function () { btnCompartir.textContent = L.compartir; }, 1800);
        });
      });
    }
    return {
      puntos: function (n) { if (puntosEl) puntosEl.textContent = n; },
      terminar: function (n) {
        ultimo = n;
        if (btnCompartir) btnCompartir.hidden = false;
        if (n > record) { record = n; guardar(claveRecord, String(n)); if (recordEl) recordEl.textContent = n; return true; }
        return false;
      },
      empezar: function () { if (btnCompartir) btnCompartir.hidden = true; },
      record: function () { return record; }
    };
  }

  function mensaje(ctx, w, h, lineas) {
    ctx.save();
    ctx.fillStyle = "rgba(14,15,18,.55)"; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = "center"; ctx.fillStyle = "#fff";
    var y = h / 2 - (lineas.length - 1) * 16;
    lineas.forEach(function (l, i) {
      ctx.font = (i === 0 ? "800 " + Math.min(30, w / 16) + "px" : "700 " + Math.min(17, w / 26) + "px") + " Bricolage, Atkinson, system-ui, sans-serif";
      ctx.fillStyle = l.color || "#fff";
      envolver(ctx, l.t || l, w / 2, y, w * 0.85, i === 0 ? 34 : 22);
      y += i === 0 ? 40 : 30;
    });
    ctx.restore();
  }

  function envolver(ctx, texto, x, y, max, alto) {
    var palabras = String(texto).split(" "), linea = "", lineas = [];
    palabras.forEach(function (p) {
      var prueba = linea ? linea + " " + p : p;
      if (ctx.measureText(prueba).width > max && linea) { lineas.push(linea); linea = p; } else linea = prueba;
    });
    lineas.push(linea);
    lineas.forEach(function (l, i) { ctx.fillText(l, x, y + i * alto); });
  }

  // ======================================================================
  //  LABCIN SALTA
  // ======================================================================
  function labcinSalta(cont) {
    var c = cont.querySelector("canvas");
    var titulo = (cont.querySelector("h1") || {}).textContent || "";
    var ALTO = 320, lz, ctx, W, H, suelo, E = 1, RITMO = 1;
    var marcador = panel(cont, "pl.juegos.salta.record", L.compartirSalta);
    var estado = "inicio", t = 0, ultimo = 0, puntos = 0, velocidad = 0, distancia = 0, proximo = 0, proximaBurbuja = 0, temblor = 0;
    var labcin, obstaculos, burbujas, chispas, nuevoRecord = false, saltoPedido = false, sosteniendo = false;
    var fondo = [];

    function medir() {
      lz = prepararLienzo(c, Math.min(ALTO, Math.max(240, c.clientWidth * 0.45)));
      ctx = lz.ctx; W = lz.w; H = lz.h; suelo = H - 46;
      E = W < 600 ? 0.78 : 1; RITMO = Math.max(0.62, Math.min(1, W / 880));
      fondo = [];
      for (var i = 0; i < Math.ceil(W / 140) + 2; i++) fondo.push({ x: i * 140, tipo: i % 3 });
    }

    function reiniciar() {
      labcin = { x: Math.min(110, W * 0.2), y: suelo, vy: 0, enSuelo: true, paso: 0 };
      obstaculos = []; burbujas = []; chispas = [];
      puntos = 0; distancia = 0; velocidad = 330; proximo = 1.1; proximaBurbuja = 0.8; nuevoRecord = false;
      marcador.puntos(0); marcador.empezar();
    }

    function saltar() {
      if (estado === "inicio" || estado === "fin") { if (estado === "fin" && t < 0.5) return; estado = "jugando"; t = 0; reiniciar(); beep(520, 0.12, "triangle"); return; }
      if (estado === "pausa") { estado = "jugando"; return; }
      if (labcin.enSuelo) { labcin.vy = -760 * E; labcin.enSuelo = false; beep(440, 0.14, "square", 0.035); }
    }

    function crearObstaculo() {
      var n = puntos;
      var vuela = n > 150 && Math.random() < 0.35;
      var s = (0.85 + Math.random() * 0.45) * E;
      obstaculos.push({ x: W + 40, y: vuela ? suelo - (Math.random() < 0.5 ? 70 : 108) * E : suelo - 10 * s, s: s, vuela: vuela, ancho: 30 * s, alto: 22 * s });
      if (n > 300 && !vuela && Math.random() < 0.25) obstaculos.push({ x: W + 40 + 34 * s, y: suelo - 10 * s, s: s, vuela: false, ancho: 30 * s, alto: 22 * s });
      var minimo = Math.max(0.55, 1.25 - velocidad / 1500);
      proximo = minimo + Math.random() * 0.9;
    }

    function actualizar(dt) {
      t += dt;
      if (estado !== "jugando") return;
      velocidad = Math.min(900, velocidad + dt * 9);
      var dx = velocidad * RITMO * dt;
      distancia += dx;
      puntos = Math.floor(distancia / 40) + burbujasJuntadas * 10;
      marcador.puntos(puntos);
      // física del salto: si se suelta antes, salta más bajito
      labcin.vy += (sosteniendo && labcin.vy < 0 ? 1650 : 2900) * E * dt;
      labcin.y += labcin.vy * dt;
      if (labcin.y >= suelo) { labcin.y = suelo; labcin.vy = 0; if (!labcin.enSuelo) beep(180, 0.06, "sine", 0.03); labcin.enSuelo = true; }
      labcin.paso += dt * velocidad / 30;
      fondo.forEach(function (f) { f.x -= dx * 0.3; if (f.x < -140) f.x += fondo.length * 140; });
      proximo -= dt; if (proximo <= 0) crearObstaculo();
      proximaBurbuja -= dt;
      if (proximaBurbuja <= 0) {
        burbujas.push({ x: W + 30, y: suelo - (60 + Math.random() * 90) * E, r: 11 * E, fase: Math.random() * 6 });
        proximaBurbuja = 0.9 + Math.random() * 1.6;
      }
      obstaculos.forEach(function (o) { o.x -= dx * (o.vuela ? 1.12 : 1); });
      obstaculos = obstaculos.filter(function (o) { return o.x > -60; });
      burbujas.forEach(function (b) { b.x -= dx; });
      burbujas = burbujas.filter(function (b) { return b.x > -30 && !b.tomada; });
      chispas.forEach(function (p) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 500 * dt; p.v -= dt; });
      chispas = chispas.filter(function (p) { return p.v > 0; });
      // choques (caja un poco más chica que el dibujo, para que sea justo)
      var lx0 = labcin.x - 22 * E, lx1 = labcin.x + 22 * E, ly0 = labcin.y - 72 * E, ly1 = labcin.y + 8 * E;
      for (var i = 0; i < obstaculos.length; i++) {
        var o = obstaculos[i];
        if (o.x + o.ancho * 0.45 > lx0 && o.x - o.ancho * 0.55 < lx1 && o.y + o.alto * 0.4 > ly0 && o.y - o.alto * 0.6 < ly1) { perder(); return; }
      }
      burbujas.forEach(function (b) {
        if (Math.abs(b.x - labcin.x) < 28 * E && b.y > ly0 - 14 && b.y < ly1) {
          b.tomada = true; burbujasJuntadas++; beep(880, 0.12, "sine", 0.05);
          for (var k = 0; k < 8; k++) chispas.push({ x: b.x, y: b.y, vx: (Math.random() - 0.5) * 220, vy: -Math.random() * 220, v: 0.5 });
        }
      });
    }
    var burbujasJuntadas = 0;

    function perder() {
      estado = "fin"; t = 0; temblor = 0.35;
      beep(150, 0.35, "sawtooth", 0.05);
      nuevoRecord = marcador.terminar(puntos);
      burbujasJuntadas = 0;
    }

    function dibujar() {
      ctx.save();
      if (temblor > 0 && !quieto) { ctx.translate((Math.random() - 0.5) * 8 * temblor, (Math.random() - 0.5) * 8 * temblor); temblor -= 1 / 60; }
      // fondo del laboratorio
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#F6F7F9"); g.addColorStop(1, "#E9EBEF");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(23,24,28,.05)"; ctx.lineWidth = 1;
      for (var gx = (-(distancia * 0.15) % 32); gx < W; gx += 32) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, suelo); ctx.stroke(); }
      for (var gy = 0; gy < suelo; gy += 32) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
      // estantes con frascos
      fondo.forEach(function (f) {
        var y = suelo - 150;
        ctx.fillStyle = "rgba(23,24,28,.08)"; ctx.fillRect(f.x, y, 110, 6);
        for (var k = 0; k < 3; k++) {
          var fx = f.x + 18 + k * 34, alto = 26 + ((f.tipo + k) % 3) * 8;
          ctx.fillStyle = ["rgba(211,38,29,.18)", "rgba(29,91,216,.15)", "rgba(30,138,76,.15)"][(f.tipo + k) % 3];
          redondo(ctx, fx, y - alto, 18, alto, 5); ctx.fill();
        }
      });
      // piso
      ctx.fillStyle = "#17181C"; ctx.fillRect(0, suelo + 18, W, H - suelo);
      ctx.fillStyle = "#D3261D"; ctx.fillRect(0, suelo + 18, W, 4);
      ctx.fillStyle = "rgba(255,255,255,.08)";
      for (var px = (-distancia % 60); px < W; px += 60) ctx.fillRect(px, suelo + 34, 30, 3);
      // burbujas, bugs y chispas
      burbujas.forEach(function (b) { burbuja(ctx, b.x, b.y + Math.sin(t * 3 + b.fase) * 4, b.r, true); });
      obstaculos.forEach(function (o) { bug(ctx, o.x, o.y, o.s, t, o.vuela); });
      chispas.forEach(function (p) { ctx.globalAlpha = Math.max(0, p.v * 2); burbuja(ctx, p.x, p.y, 3, false); ctx.globalAlpha = 1; });
      // sombra y Labcin
      var alto = (suelo - labcin.y) / (140 * E);
      ctx.fillStyle = "rgba(0,0,0," + (0.18 - alto * 0.1) + ")";
      ctx.beginPath(); ctx.ellipse(labcin.x, suelo + 19, Math.max(8, (30 - alto * 10) * E), 5, 0, 0, Math.PI * 2); ctx.fill();
      dibujarLabcin(ctx, labcin.x, labcin.y, 0.85 * E, { t: t, paso: estado === "jugando" ? labcin.paso : t * 2, aire: !labcin.enSuelo, triste: estado === "fin", brazos: !labcin.enSuelo ? "arriba" : null });
      ctx.restore();
      if (estado === "inicio") mensaje(ctx, W, H, [titulo, { t: L.tocar, color: "#FFD9D6" }]);
      if (estado === "pausa") mensaje(ctx, W, H, [L.pausa, { t: L.tocar, color: "#FFD9D6" }]);
      if (estado === "fin") mensaje(ctx, W, H, [nuevoRecord ? L.nuevoRecord : L.chocaste, { t: L.puntos + ": " + puntos + "  ·  " + L.record + ": " + marcador.record() }, { t: L.otraVez, color: "#FFD9D6" }]);
    }

    function bucle(ahora) {
      var dt = Math.min(0.033, (ahora - (ultimo || ahora)) / 1000);
      ultimo = ahora;
      actualizar(dt); dibujar();
      requestAnimationFrame(bucle);
    }

    // controles: espacio, flecha arriba, clic o toque
    function abajo(e) { if (e) e.preventDefault(); sosteniendo = true; saltar(); }
    function arriba() { sosteniendo = false; }
    c.addEventListener("pointerdown", function (e) { abajo(e); });
    window.addEventListener("pointerup", arriba);
    window.addEventListener("keydown", function (e) {
      if (esCampo(e)) return;
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "Enter") { if (!e.repeat) abajo(e); else e.preventDefault(); }
      if (e.code === "KeyP" || e.code === "Escape") { if (estado === "jugando") estado = "pausa"; }
    });
    window.addEventListener("keyup", function (e) { if (e.code === "Space" || e.code === "ArrowUp" || e.code === "Enter") arriba(); });
    document.addEventListener("visibilitychange", function () { if (document.hidden && estado === "jugando") estado = "pausa"; });
    window.addEventListener("resize", function () { medir(); if (labcin) { labcin.y = Math.min(labcin.y, suelo); if (labcin.enSuelo) labcin.y = suelo; } });
    medir(); reiniciar();
    requestAnimationFrame(bucle);
  }

  // ======================================================================
  //  ATRAPÁ TUS DATOS
  // ======================================================================
  var DATOS = [
    { id: "dni", icono: "🪪" }, { id: "clave", icono: "🔑" }, { id: "foto", icono: "📷" },
    { id: "tarjeta", icono: "💳" }, { id: "ubicacion", icono: "📍" }, { id: "mail", icono: "✉️" }
  ];
  var AMENAZAS = [{ id: "virus", icono: "🦠" }, { id: "phishing", icono: "🎣" }, { id: "espia", icono: "🕵️" }];

  function atrapaDatos(cont) {
    var c = cont.querySelector("canvas");
    var titulo = (cont.querySelector("h1") || {}).textContent || "";
    var tipEl = cont.querySelector("[data-tip]");
    var marcador = panel(cont, "pl.juegos.datos.record", L.compartirDatos);
    var vidasEl = cont.querySelector("[data-vidas]"), nivelEl = cont.querySelector("[data-nivel]");
    var lz, ctx, W, H, estado = "inicio", t = 0, ultimo = 0;
    var labcin, cosas, chispas, puntos, vidas, nivel, proximo, objetivoX = null, teclas = {}, nuevoRecord = false, golpe = 0, festejo = 0;

    function medir() {
      lz = prepararLienzo(c, Math.min(460, Math.max(360, c.clientWidth * 0.7)));
      ctx = lz.ctx; W = lz.w; H = lz.h;
      if (labcin) labcin.y = H - 26;
    }
    function reiniciar() {
      labcin = { x: W / 2, y: H - 26, paso: 0 };
      cosas = []; chispas = []; puntos = 0; vidas = 3; nivel = 1; proximo = 0.6; nuevoRecord = false;
      marcador.puntos(0); marcador.empezar(); pintarVidas();
      if (tipEl) tipEl.textContent = "";
    }
    function pintarVidas() {
      if (vidasEl) vidasEl.textContent = "❤️".repeat(Math.max(0, vidas)) + "🤍".repeat(Math.max(0, 3 - vidas));
      if (nivelEl) nivelEl.textContent = nivel;
    }
    function empezar() {
      if (estado === "fin" && t < 0.6) return;
      if (estado !== "jugando") { if (estado !== "pausa") reiniciar(); estado = "jugando"; t = 0; beep(520, 0.12, "triangle"); }
    }
    function crear() {
      var amenaza = Math.random() < Math.min(0.42, 0.18 + nivel * 0.03);
      var tipo = amenaza ? AMENAZAS[Math.floor(Math.random() * AMENAZAS.length)] : DATOS[Math.floor(Math.random() * DATOS.length)];
      var v = (95 + nivel * 20 + Math.random() * 50) * Math.max(0.75, Math.min(1, H / 460));
      cosas.push({ x: 30 + Math.random() * (W - 60), y: -30, vy: v, tipo: tipo, amenaza: amenaza, giro: (Math.random() - 0.5) * 2, a: 0, vx: amenaza && nivel > 2 ? (Math.random() - 0.5) * 60 : 0 });
      proximo = Math.max(0.4, 1.3 - nivel * 0.09) * (0.7 + Math.random() * 0.6);
    }
    function tip(id) { if (tipEl) { tipEl.textContent = "💡 " + L.tips[id]; tipEl.classList.remove("juego__tip--ver"); void tipEl.offsetWidth; tipEl.classList.add("juego__tip--ver"); } }
    function perderVida(id) {
      vidas--; golpe = 0.4; pintarVidas(); tip(id);
      beep(160, 0.3, "sawtooth", 0.05);
      if (vidas <= 0) { estado = "fin"; t = 0; nuevoRecord = marcador.terminar(puntos); }
    }
    function actualizar(dt) {
      t += dt;
      if (estado !== "jugando") return;
      // mover a Labcin: mouse o dedo (lo sigue suave) y flechas
      var vel = 520 * dt;
      if (teclas.izq) { objetivoX = null; labcin.x -= vel; }
      if (teclas.der) { objetivoX = null; labcin.x += vel; }
      if (objetivoX !== null) labcin.x += (objetivoX - labcin.x) * Math.min(1, dt * 14);
      labcin.x = Math.max(36, Math.min(W - 36, labcin.x));
      labcin.paso += dt * 8 * (teclas.izq || teclas.der ? 1 : 0.2);
      proximo -= dt; if (proximo <= 0) crear();
      var cx = labcin.x, cy = labcin.y - 88; // la "boca" del frasco atrapa
      cosas.forEach(function (o) {
        o.y += o.vy * dt; o.x += o.vx * dt; o.a += o.giro * dt;
        if (o.x < 20 || o.x > W - 20) o.vx *= -1;
        if (!o.fin && Math.abs(o.x - cx) < 42 && o.y > cy - 20 && o.y < cy + 40) {
          o.fin = true;
          if (o.amenaza) perderVida(o.tipo.id);
          else {
            puntos++; marcador.puntos(puntos); festejo = 0.3; beep(700 + (puntos % 5) * 60, 0.1, "sine", 0.05);
            for (var k = 0; k < 10; k++) chispas.push({ x: o.x, y: o.y, vx: (Math.random() - 0.5) * 240, vy: -Math.random() * 240, v: 0.6 });
            if (puntos % 10 === 0) { nivel++; pintarVidas(); beep(990, 0.25, "triangle", 0.05); }
          }
        }
        if (!o.fin && o.y > H + 10) { o.fin = true; if (!o.amenaza) perderVida(o.tipo.id); }
      });
      cosas = cosas.filter(function (o) { return !o.fin; });
      chispas.forEach(function (p) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 520 * dt; p.v -= dt; });
      chispas = chispas.filter(function (p) { return p.v > 0; });
      golpe = Math.max(0, golpe - dt); festejo = Math.max(0, festejo - dt);
    }
    function dibujar() {
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#17181C"); g.addColorStop(1, "#2A1513");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // código de fondo
      ctx.fillStyle = "rgba(255,255,255,.05)"; ctx.font = "13px ui-monospace, monospace"; ctx.textAlign = "left";
      for (var i = 0; i < 14; i++) ctx.fillText(["def proteger():", "  return 🔒", "{ datos: tuyos }", "</>", "if privado:", "  no_subir()"][i % 6], (i * 97) % W, 30 + i * 32);
      if (golpe > 0) { ctx.fillStyle = "rgba(211,38,29," + golpe * 0.6 + ")"; ctx.fillRect(0, 0, W, H); }
      // cosas que caen
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      cosas.forEach(function (o) {
        ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.a * 0.3);
        ctx.fillStyle = o.amenaza ? "rgba(211,38,29,.25)" : "rgba(255,255,255,.12)";
        ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = o.amenaza ? "#FF6B5E" : "rgba(255,255,255,.5)"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.font = "26px 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif"; ctx.fillText(o.tipo.icono, 0, 1);
        ctx.font = "700 10px Atkinson, system-ui, sans-serif"; ctx.fillStyle = o.amenaza ? "#FF9C94" : "#fff";
        ctx.fillText(L[o.tipo.id], 0, 36);
        ctx.restore();
      });
      chispas.forEach(function (p) { ctx.globalAlpha = Math.max(0, p.v * 1.6); burbuja(ctx, p.x, p.y, 3, false); ctx.globalAlpha = 1; });
      // escudo arriba del frasco y Labcin
      var salto = festejo > 0 && !quieto ? Math.sin(festejo * 10) * 6 : 0;
      ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(labcin.x, H - 8, 34, 5, 0, 0, Math.PI * 2); ctx.fill();
      dibujarLabcin(ctx, labcin.x, labcin.y - 18 - Math.abs(salto), 0.9, { t: t, paso: labcin.paso, triste: estado === "fin" || golpe > 0.2, brazos: "escudo" });
      ctx.save(); ctx.translate(labcin.x, labcin.y - 108 - Math.abs(salto));
      ctx.fillStyle = "rgba(211,38,29,.18)"; ctx.strokeStyle = "#D3261D"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(0, 22, 40, 0); ctx.lineTo(34, -6); ctx.quadraticCurveTo(0, 12, -34, -6); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.font = "16px 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif"; ctx.fillText("🔒", 0, 2);
      ctx.restore();
      ctx.textBaseline = "alphabetic";
      if (estado === "inicio") mensaje(ctx, W, H, [titulo, { t: L.tocar, color: "#FFD9D6" }]);
      if (estado === "pausa") mensaje(ctx, W, H, [L.pausa, { t: L.tocar, color: "#FFD9D6" }]);
      if (estado === "fin") mensaje(ctx, W, H, [nuevoRecord ? L.nuevoRecord : L.perdiste, { t: L.protegidos + ": " + puntos + "  ·  " + L.record + ": " + marcador.record() }, { t: L.otraVez, color: "#FFD9D6" }]);
    }
    function bucle(ahora) {
      var dt = Math.min(0.033, (ahora - (ultimo || ahora)) / 1000);
      ultimo = ahora; actualizar(dt); dibujar(); requestAnimationFrame(bucle);
    }
    function posicion(e) { var r = c.getBoundingClientRect(); objetivoX = e.clientX - r.left; }
    c.addEventListener("pointerdown", function (e) { e.preventDefault(); if (estado !== "jugando") empezar(); posicion(e); });
    c.addEventListener("pointermove", function (e) { if (estado === "jugando" && (e.pointerType === "mouse" || e.buttons)) posicion(e); });
    window.addEventListener("keydown", function (e) {
      if (esCampo(e)) return;
      if (e.code === "ArrowLeft" || e.code === "KeyA") { teclas.izq = true; e.preventDefault(); }
      if (e.code === "ArrowRight" || e.code === "KeyD") { teclas.der = true; e.preventDefault(); }
      if ((e.code === "Space" || e.code === "Enter") && estado !== "jugando") { e.preventDefault(); empezar(); }
      if ((e.code === "KeyP" || e.code === "Escape") && estado === "jugando") estado = "pausa";
    });
    window.addEventListener("keyup", function (e) {
      if (e.code === "ArrowLeft" || e.code === "KeyA") teclas.izq = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") teclas.der = false;
    });
    document.addEventListener("visibilitychange", function () { if (document.hidden && estado === "jugando") estado = "pausa"; });
    window.addEventListener("resize", medir);
    medir(); reiniciar(); requestAnimationFrame(bucle);
  }

  // ---------- arranque ----------
  document.querySelectorAll("[data-juego]").forEach(function (cont) {
    if (cont.dataset.juego === "salta") labcinSalta(cont);
    if (cont.dataset.juego === "datos") atrapaDatos(cont);
  });
})();

# -*- coding: utf-8 -*-
"""Genera las versiones en otros idiomas del sitio de Pache Labs.

Las páginas en español (index.html, ozone-pdf.html, privacidad.html, en la raíz) son las
originales. Este script toma cada bloque de texto, busca su traducción en w_<idioma>.py
(mismo número que en claves.json) y escribe en/, de/, zh/, ja/ y ru/. También agrega el
selector de idioma y las etiquetas hreflang a todas las páginas, incluidas las de español.

Uso:  python _idiomas/generar.py          (desde la carpeta del sitio)
Si cambiás un texto en español, corré antes:  python _idiomas/generar.py --claves
y completá las traducciones nuevas que te indique.
"""
import json, os, re, sys
from bs4 import BeautifulSoup, NavigableString, Comment, Tag

AQUI = os.path.dirname(os.path.abspath(__file__))
SITIO = os.path.dirname(AQUI)
PAGINAS = ["index.html", "ozone-pdf.html", "privacidad.html"]
IDIOMAS = [("es", "Español"), ("en", "English"), ("de", "Deutsch"), ("zh", "中文"),
           ("ja", "日本語"), ("ru", "Русский")]
DOMINIO = "https://pachelabs.net/"
INLINE = {'a', 'strong', 'b', 'em', 'i', 'code', 'span', 'br', 'small', 'abbr', 'kbd', 'sup'}
SKIP = {'script', 'style', 'svg', 'noscript'}
ATTRS = ('alt', 'placeholder', 'aria-label', 'title')
LOCALES = ('img/', 'fuentes/', 'estilos.css', 'sitio.js')


def norm(s):
    return re.sub(r'\s+', ' ', s).strip()


def tiene_texto(el):
    return any(isinstance(t, NavigableString) and not isinstance(t, Comment)
               and re.search(r'[A-Za-zÁÉÍÓÚáéíóúñ¿¡]', t) for t in el.descendants)


def todo_inline(el):
    for c in el.children:
        if isinstance(c, Comment):
            continue
        if isinstance(c, Tag) and (c.name not in INLINE or not todo_inline(c)):
            return False
    return True


def bloques(raiz):
    out = []

    def recorrer(el):
        for c in el.children:
            if not isinstance(c, Tag) or c.name in SKIP:
                continue
            if tiene_texto(c) and todo_inline(c) and c.name != 'br':
                out.append(c)
            else:
                recorrer(c)
    recorrer(raiz)
    return out


def interior(el):
    return norm(''.join(str(x) for x in el.contents if not isinstance(x, Comment)))


def quitar_agregados(soup):
    for el in soup.select('.idiomas, link[rel=alternate][hreflang]'):
        el.decompose()


def leer(pagina):
    soup = BeautifulSoup(open(os.path.join(SITIO, pagina), encoding='utf-8').read(), 'html.parser')
    quitar_agregados(soup)
    return soup


def claves_de(soup):
    ks = []
    if soup.title and soup.title.string:
        ks.append(norm(soup.title.string))
    for m in soup.find_all('meta'):
        if m.get('name') == 'description' or m.get('property') in ('og:title', 'og:description'):
            ks.append(norm(m['content']))
    ks += [interior(b) for b in bloques(soup.body)]
    for el in soup.body.find_all(True):
        for a in ATTRS:
            v = el.get(a)
            if v and re.search('[a-záéíóúñ]{2,}', v, re.I):
                ks.append(norm(v))
    return ks


def ruta_pagina(codigo, pagina):
    return pagina if codigo == "es" else f"{codigo}/{pagina}"


def selector(codigo_actual, pagina):
    prefijo = "" if codigo_actual == "es" else "../"
    items = []
    for codigo, nombre in IDIOMAS:
        actual = ' aria-current="true"' if codigo == codigo_actual else ''
        items.append(f'<li><a href="{prefijo}{ruta_pagina(codigo, pagina)}" hreflang="{codigo}" lang="{codigo}"'
                     f'{actual}>{nombre}</a></li>')
    etiqueta = {"es": "Idioma", "en": "Language", "de": "Sprache", "zh": "语言", "ja": "言語", "ru": "Язык"}[codigo_actual]
    return BeautifulSoup(
        f'<details class="idiomas"><summary aria-label="{etiqueta}"><span aria-hidden="true">🌐</span> '
        f'{codigo_actual.upper()}</summary><ul class="idiomas__lista">{"".join(items)}</ul></details>',
        'html.parser')


def agregar_idiomas(soup, codigo, pagina):
    head = soup.head
    for c, _ in IDIOMAS:
        url = DOMINIO + ("" if c == "es" else c + "/") + ("" if pagina == "index.html" else pagina)
        head.append(BeautifulSoup(f'<link rel="alternate" hreflang="{c}" href="{url}">', 'html.parser'))
    head.append(BeautifulSoup(f'<link rel="alternate" hreflang="x-default" href="{DOMINIO}'
                              f'{"" if pagina == "index.html" else pagina}">', 'html.parser'))
    interior_barra = soup.select_one('.barra__interior')
    if interior_barra:
        interior_barra.append(selector(codigo, pagina))


def traducir(soup, tabla, codigo, pagina):
    faltan = []

    def t(s):
        k = norm(s)
        if k in tabla:
            return tabla[k]
        faltan.append(k)
        return s
    soup.html['lang'] = codigo
    if soup.title and soup.title.string:
        soup.title.string = t(soup.title.string)
    for m in soup.find_all('meta'):
        if m.get('name') == 'description' or m.get('property') in ('og:title', 'og:description'):
            m['content'] = t(m['content'])
    for b in bloques(soup.body):
        nuevo = t(interior(b))
        b.clear()
        for x in list(BeautifulSoup(nuevo, 'html.parser').contents):
            b.append(x)
    for el in soup.body.find_all(True):
        for a in ATTRS:
            v = el.get(a)
            if v and re.search('[a-záéíóúñ]{2,}', v, re.I):
                el[a] = t(v)
    # recursos compartidos: están en la carpeta de arriba
    for el in soup.find_all(True):
        for a in ('src', 'href'):
            v = el.get(a)
            if v and v.startswith(LOCALES):
                el[a] = '../' + v
    for el in soup.find_all(['link', 'meta']):
        for a in ('href', 'content'):
            v = el.get(a)
            if v and v.startswith(DOMINIO) and '/img/' not in v and el.get('rel') != ['alternate']:
                el[a] = v.replace(DOMINIO, DOMINIO + codigo + '/', 1)
    for inp in soup.select('input[name=redirect]'):
        inp['value'] = inp['value'].replace(DOMINIO, DOMINIO + codigo + '/', 1)
    return faltan


def main():
    claves = json.load(open(os.path.join(AQUI, 'claves.json'), encoding='utf-8'))
    if '--claves' in sys.argv:
        actuales = []
        for p in PAGINAS:
            for k in claves_de(leer(p)):
                if k not in actuales and re.search('[A-Za-zÁÉÍÓÚáéíóúñ]', k):
                    actuales.append(k)
        nuevas = [k for k in actuales if k not in claves]
        print(len(nuevas), "textos nuevos sin traducir:")
        for k in nuevas:
            print(" -", k)
        return
    for codigo, _ in IDIOMAS:
        if codigo == "es":
            tabla = None
        else:
            ns = {}
            exec(open(os.path.join(AQUI, f'w_{codigo}.py'), encoding='utf-8').read(), ns)
            tabla = {claves[i]: v for i, v in ns['D'].items()}
        for p in PAGINAS:
            soup = leer(p)
            if tabla is not None:
                faltan = traducir(soup, tabla, codigo, p)
                if faltan:
                    print(f"[{codigo}] {p}: {len(faltan)} textos sin traducción (quedan en español)")
            agregar_idiomas(soup, codigo, p)
            destino = os.path.join(SITIO, p) if codigo == "es" else os.path.join(SITIO, codigo, p)
            os.makedirs(os.path.dirname(destino), exist_ok=True)
            open(destino, 'w', encoding='utf-8').write(str(soup))
    print("listo")


if __name__ == '__main__':
    main()

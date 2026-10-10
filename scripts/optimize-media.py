#!/usr/bin/env python3
"""Regenerate responsive media, inline previews and font subsets.

Requires: Pillow, fonttools, brotli. Run manually from any directory.
Use --fonts-only after wording changes to refresh the font subsets only.
If the retained original fonts lack a CJK character, the official complete
Noto Sans SC source is fetched once and cached in scripts/.generated.
"""

from pathlib import Path
from PIL import Image, ImageOps
import base64
import io
import json
import sys
from urllib.request import urlopen
import re
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
GENERATED = Path(__file__).resolve().parent / '.generated'
OUT = ROOT / 'assets' / 'optimized'
FONTS_ONLY = '--fonts-only' in sys.argv
GENERATED.mkdir(parents=True, exist_ok=True)


def rel(path):
    return path.relative_to(ROOT).as_posix()


def scale(image, width):
    width = min(width, image.width)
    return image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS) if width < image.width else image.copy()


def encode(image, width, quality):
    image = scale(image, width)
    output = io.BytesIO()
    image.save(output, 'WEBP', quality=quality, method=6)
    return output.getvalue(), image.size


def image_group(source):
    key = rel(source)
    if source.name == 'hero-keyboard.webp':
        return 'hero', {'small': (640, 79), 'large': (1600, 84), 'full': (1600, 84)}
    if '/design/images/' in key:
        return 'gallery', {'small': (420, 78), 'large': (760, 84), 'full': (1600, 90)}
    if source.name.endswith('-preview.webp') or source.name == 'unity-courses.png':
        return 'cover', {'small': (480, 80), 'large': (960, 85), 'full': (1600, 90)}
    if source.name == 'portrait.png':
        return 'portrait', {'small': (180, 83), 'large': (180, 83), 'full': (180, 83)}
    return 'detail', {'small': (760, 84), 'large': (1600, 88), 'full': (1600, 88)}


def build_images():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest, stats, aliases = {}, [], {}
    sources = [ROOT / 'assets/hero-keyboard.webp', ROOT / 'assets/portrait.png']
    sources += sorted((ROOT / 'assets/projects').glob('*.webp'))
    sources += sorted((ROOT / 'assets/projects').glob('*.png'))
    sources += sorted(p for p in (ROOT / 'assets/design/images').glob('*.webp') if not p.stem.endswith('-t'))
    for source in sources:
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert('RGBA' if 'A' in opened.getbands() else 'RGB')
        key = rel(source)
        group, sizes = image_group(source)
        preview, _ = encode(image, 28, 22)
        entry = {'width': image.width, 'height': image.height, 'preview': 'data:image/webp;base64,' + base64.b64encode(preview).decode('ascii')}
        cache = {}
        row = {'source': key, 'group': group, 'original': source.stat().st_size}
        for name, (width, quality) in sizes.items():
            width = min(width, image.width)
            if width in cache:
                entry[name] = cache[width]
            else:
                data, dimensions = encode(image, width, quality)
                if width == image.width and source.suffix == '.webp' and len(data) > source.stat().st_size:
                    data = source.read_bytes()
                prefix = ('design-' if group == 'gallery' else 'project-' if '/projects/' in key else '') + source.stem
                dest = OUT / f'{prefix}-{width}.webp'
                dest.write_bytes(data)
                entry[name] = {'src': rel(dest), 'width': dimensions[0], 'height': dimensions[1]}
                cache[width] = entry[name]
            row[name] = (ROOT / entry[name]['src']).stat().st_size
        manifest[key] = entry
        stats.append(row)
        if group == 'gallery':
            thumbnail = source.with_name(source.stem + '-t.webp')
            if thumbnail.exists():
                aliases[rel(thumbnail)] = key
    js = '/* Generated responsive media and inline previews. Regenerate with scripts/optimize-media.py. */\nwindow.MEDIA = ' + json.dumps(manifest, ensure_ascii=False, separators=(',', ':')) + ';\n'
    js += 'Object.entries(' + json.dumps(aliases, separators=(',', ':')) + ').forEach(([alias, source]) => { window.MEDIA[alias] = window.MEDIA[source]; });\n'
    (ROOT / 'assets/media-manifest.js').write_text(js, encoding='utf-8')
    (GENERATED / 'media-stats.json').write_text(json.dumps(stats, ensure_ascii=False, indent=2), encoding='utf-8')
    for path in OUT.glob('*.webp'):
        with Image.open(path) as image:
            image.verify()
    return stats, len(manifest), len(aliases)


def build_fonts():
    # Only consume text already published in this static site, including demos.
    corpus = set(chr(i) for i in range(32, 127))
    for path in ROOT.rglob('*'):
        if any(part in ('.git', '.generated', 'optimized') for part in path.parts) or path.name == 'media-manifest.js':
            continue
        if path.suffix.lower() in ('.html', '.js', '.css', '.json', '.md'):
            corpus.update(path.read_text(encoding='utf-8-sig', errors='ignore'))
    corpus.update('←→↑↓↗↘…·—–×©®™★✓✕○●□■△▲，。！？：；（）【】《》〈〉“”‘’「」『』〔〕、￥')
    with TTFont(ROOT / 'assets/fonts/noto-400.woff2') as original_font:
        original_cmap = original_font.getBestCmap()
        missing_from_original = sorted(c for c in corpus if 0x3400 <= ord(c) <= 0x9fff and ord(c) not in original_cmap)
    complete_sources = {}
    if missing_from_original:
        license_path = ROOT / 'assets/fonts/OFL-NotoSansSC.txt'
        cache_missing = any(not (GENERATED / f'noto-complete-{weight}.ttf').exists() or (GENERATED / f'noto-complete-{weight}.ttf').stat().st_size == 0 for weight in (400, 700))
        font_urls = [None, None]
        if cache_missing:
            css_url = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700'
            with urlopen(css_url, timeout=60) as response:
                font_urls = re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+\.ttf)\)', response.read().decode('utf-8'))
            if len(font_urls) != 2:
                raise RuntimeError('Unable to locate complete Noto Sans SC source from Google Fonts')
        for weight, font_url in zip((400, 700), font_urls):
            source = GENERATED / f'noto-complete-{weight}.ttf'
            if not source.exists() or source.stat().st_size == 0:
                with urlopen(font_url, timeout=60) as response:
                    source.write_bytes(response.read())
            complete_sources[weight] = source
        if not license_path.exists():
            license_url = 'https://api.github.com/repos/google/fonts/contents/ofl/notosanssc/OFL.txt'
            with urlopen(license_url, timeout=60) as response:
                license_path.write_bytes(base64.b64decode(json.loads(response.read())['content']))
    stats = []
    for weight in (400, 700):
        src = ROOT / f'assets/fonts/noto-{weight}.woff2'
        dst = ROOT / f'assets/fonts/noto-subset-{weight}.woff2'
        options = subset.Options()
        options.flavor = 'woff2'
        options.desubroutinize = True
        options.layout_features = ['*']
        options.name_IDs = [1, 2, 3, 4, 5, 6]
        options.name_legacy = True
        font = subset.load_font(str(complete_sources.get(weight, src)), options)
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(text=''.join(sorted(corpus)))
        subsetter.subset(font)
        subset.save_font(font, str(dst), options)
        with TTFont(dst) as check_font, TTFont(src) as original_font:
            cmap = check_font.getBestCmap()
            original_cmap = original_font.getBestCmap()
            supported = {ord(c) for c in corpus if ord(c) in original_cmap}
            assert supported.issubset(cmap), 'Font subset lost supported website characters'
            missing_cjk = sorted(c for c in corpus if 0x3400 <= ord(c) <= 0x9fff and ord(c) not in cmap)
            assert not missing_cjk, 'Website CJK characters missing from font: ' + ''.join(missing_cjk)
        stats.append({'weight': weight, 'original': src.stat().st_size, 'subset': dst.stat().st_size, 'covered': len(set(cmap) & {ord(c) for c in corpus}), 'missing_cjk': missing_cjk, 'source': 'complete Noto Sans SC (OFL)' if complete_sources else 'retained original', 'original_missing_cjk': missing_from_original})
    (GENERATED / 'font-stats.json').write_text(json.dumps(stats, ensure_ascii=False, indent=2), encoding='utf-8')
    return stats


def kb(n):
    return f'{n / 1024:.1f} KB'


def write_report(image_stats, font_stats):
    lines = ['# Media optimization measurements', '', 'All originals are retained. Responsive images use real work assets.', '']
    if image_stats:
        lines += ['| Group | Images | Original total | Small total | Large total | Full total |', '| --- | ---: | ---: | ---: | ---: | ---: |']
        for group in ('hero', 'cover', 'gallery', 'detail', 'portrait'):
            rows = [s for s in image_stats if s['group'] == group]
            lines.append(f'| {group} | {len(rows)} | ' + ' | '.join(kb(sum(s[k] for s in rows)) for k in ('original', 'small', 'large', 'full')) + ' |')
        lines.append('')
    lines += ['| Font | Original | Subset | Reduction | Supported characters covered |', '| --- | ---: | ---: | ---: | ---: |']
    for s in font_stats:
        lines.append(f'| Noto {s["weight"]} | {kb(s["original"])} | {kb(s["subset"])} | {100 * (1-s["subset"]/s["original"]):.1f}% | {s["covered"]} |')
    lines += ['', 'Font validation: every CJK character used in the published site is covered; no original supported website glyphs are omitted.', '', 'Schema: `window.MEDIA[originalPath] = {width,height,preview,small:{src,width,height},large:{src,width,height},full:{src,width,height}}`.', '', 'Gallery: 420 / 760 px, full for zoom. Covers: 480 / 960 px. Hero: 640 / 1600 px. Portrait: 180 px. Same-sized variants share a file.', '', 'Font corpus includes published HTML, JavaScript, CSS, JSON and Markdown, including demos. Run with --fonts-only after wording changes.', '']
    (GENERATED / 'report.md').write_text('\n'.join(lines), encoding='utf-8')


if __name__ == '__main__':
    if FONTS_ONLY:
        measurements = GENERATED / 'media-stats.json'
        image_stats = json.loads(measurements.read_text(encoding='utf-8')) if measurements.exists() else []
        images, aliases = None, None
    else:
        image_stats, images, aliases = build_images()
    font_stats = build_fonts()
    write_report(image_stats, font_stats)
    print(json.dumps({'mode': 'fonts-only' if FONTS_ONLY else 'all', 'images': images, 'aliases': aliases, 'fonts': font_stats}, indent=2))

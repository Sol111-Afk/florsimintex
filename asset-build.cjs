/* Generează variante responsive AVIF + WebP din JPG-urile sursă.
   Redimensionare cu canvas (Chromium/Playwright), AVIF prin avifenc.
   Scrie assets/img-manifest.json folosit de build.js. */
const { chromium } = require('/home/sol/Projects/cig-cli/node_modules/playwright');
const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const DIR = path.join(__dirname, 'assets/images');
const TMP = path.join(require('os').tmpdir(), 'flx-imgtmp');
fs.mkdirSync(TMP, { recursive: true });
const WIDTHS = [480, 800, 1200, 1600];
const files = fs.readdirSync(DIR).filter(f => /\.jpg$/i.test(f));
(async () => {
  const ctx = await chromium.launchPersistentContext(TMP + '/pw', { headless: true });
  const page = await ctx.newPage();
  const manifest = {};
  for (const f of files) {
    const name = f.replace(/\.jpg$/i, '');
    const b64 = fs.readFileSync(path.join(DIR, f)).toString('base64');
    const dataUrl = 'data:image/jpeg;base64,' + b64;
    const nat = await page.evaluate(async (u) => {
      const img = new Image(); img.src = u; await img.decode();
      return { w: img.naturalWidth, h: img.naturalHeight };
    }, dataUrl);
    const widths = WIDTHS.filter(w => w <= nat.w);
    if (!widths.length) widths.push(nat.w);
    manifest[name] = { w: nat.w, h: nat.h, ar: +(nat.h / nat.w).toFixed(4), widths };
    for (const W of widths) {
      const H = Math.round(W * nat.h / nat.w);
      // webp direct din canvas
      const webp = await page.evaluate(async (args) => {
        const [u, w, h] = args;
        const img = new Image(); img.src = u; await img.decode();
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(img, 0, 0, w, h);
        return c.toDataURL('image/webp', 0.80).split(',')[1];
      }, [dataUrl, W, H]);
      fs.writeFileSync(path.join(DIR, `${name}-${W}.webp`), Buffer.from(webp, 'base64'));
      // jpeg temp (calitate mare) → avif via avifenc
      const jpg = await page.evaluate(async (args) => {
        const [u, w, h] = args;
        const img = new Image(); img.src = u; await img.decode();
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(img, 0, 0, w, h);
        return c.toDataURL('image/jpeg', 0.92).split(',')[1];
      }, [dataUrl, W, H]);
      const tj = path.join(TMP, `${name}-${W}.jpg`);
      fs.writeFileSync(tj, Buffer.from(jpg, 'base64'));
      execFileSync('avifenc', ['-q', '58', '-s', '5', '-j', 'all', tj, path.join(DIR, `${name}-${W}.avif`)], { stdio: 'ignore' });
    }
    process.stdout.write(`✓ ${name} (${nat.w}x${nat.h}) → ${widths.join(',')}\n`);
  }
  fs.writeFileSync(path.join(__dirname, 'assets/img-manifest.json'), JSON.stringify(manifest, null, 2));
  await ctx.close();
  console.log('manifest scris.');
})().catch(e => { console.error(e); process.exit(1); });

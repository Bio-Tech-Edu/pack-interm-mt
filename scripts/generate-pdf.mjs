import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT_DIR = process.cwd();
// Ajuste para path.join(ROOT_DIR, 'pdf', 'roteiro-forcas-intermoleculares-pack.pdf')
// caso o GitHub Pages publique a partir da raiz (/) em vez da pasta /docs.
const OUTPUT_PDF = path.join(
  ROOT_DIR,
  'docs',
  'pdf',
  'roteiro-forcas-intermoleculares-pack.pdf'
);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startStaticServer(baseDir) {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      try {
        const cleanUrl = (req.url || '/').split('?')[0];
        const relativePath = cleanUrl === '/' ? 'index.html' : cleanUrl.replace(/^\/+/, '');
        const filePath = path.join(baseDir, relativePath);

        const data = await fs.readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Arquivo não encontrado');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, url: `http://127.0.0.1:${port}/index.html` });
    });
  });
}

async function generatePdf() {
  const { server, url } = await startStaticServer(ROOT_DIR);
  let browser;

  try {
    await fs.mkdir(path.dirname(OUTPUT_PDF), { recursive: true });

    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });

    const headerTemplate = `
      <div style="width:100%; font-family: Arial, sans-serif; font-size: 8px; color: #475569; padding: 0 14mm; display: flex; justify-content: space-between; border-bottom: 0.5px solid #cbd5e1; padding-bottom: 4px;">
        <span><strong>Pré-Enem Digit@l MT • SEDUC-MT</strong> — Roteiro PACK de Química</span>
        <span>Polaridade, Forças Intermoleculares e Tensoativos</span>
      </div>
    `;

    const footerTemplate = `
      <div style="width:100%; font-family: Arial, sans-serif; font-size: 8px; color: #475569; padding: 0 14mm; display: flex; justify-content: space-between; border-top: 0.5px solid #cbd5e1; padding-top: 4px;">
        <span>Preparação ENEM 2027 • Matriz de Referência: C5/H18 e C7/H24–H25</span>
        <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `;

    await page.pdf({
      path: OUTPUT_PDF,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '14mm',
        right: '14mm',
      },
    });

    console.log(`PDF gerado com sucesso em: ${OUTPUT_PDF}`);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

generatePdf().catch((err) => {
  console.error('Erro ao gerar o PDF:', err);
  process.exit(1);
});
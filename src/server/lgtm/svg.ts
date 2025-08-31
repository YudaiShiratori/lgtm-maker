import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Inter Bold (700) フォントのbase64エンコード
function getInterFontBase64(): string {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fontPath = join(
      __dirname,
      '../../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2'
    );
    const fontBuffer = readFileSync(fontPath);
    return fontBuffer.toString('base64');
  } catch (_error) {
    // フォールバック：空のbase64文字列
    return '';
  }
}

/**
 * LGTM用のSVGオーバーレイを生成
 * 仕様：
 * - キャンバス：1200×630
 * - 枠線：黒ボーダー24px
 * - テキスト：中央の白文字「LGTM」、Inter Bold
 */
export function generateLgtmSvg(): string {
  const fontBase64 = getInterFontBase64();

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'InterLocal';
        src: url(data:font/woff2;base64,${fontBase64}) format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: block;
      }
    </style>
  </defs>
  
  <!-- 黒ボーダー24px -->
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#000" stroke-width="24" />
  
  <!-- 中央の白文字「LGTM」 -->
  <text 
    x="600" 
    y="315" 
    fill="#fff" 
    font-weight="700" 
    text-anchor="middle" 
    dominant-baseline="middle" 
    font-family="InterLocal, system-ui, sans-serif" 
    font-size="320">
    LGTM
  </text>
</svg>`;
}

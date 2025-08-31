import { Resvg } from '@resvg/resvg-js';

/**
 * SVGをPNG Bufferに変換
 * @param svgString SVG文字列
 * @returns PNG Buffer
 */
export function svgToPngBuffer(svgString: string): Buffer {
  try {
    const resvg = new Resvg(svgString, {
      background: 'transparent', // 背景透明でオーバーレイとして使用
      fitTo: {
        mode: 'original',
      },
    });

    const pngData = resvg.render();
    return Buffer.from(pngData.asPng());
  } catch (_error) {
    throw new Error('SVG to PNG conversion failed');
  }
}

/**
 * PNG BufferをData URLに変換
 * @param buffer PNG Buffer
 * @returns Data URL string
 */
export function pngBufferToDataUrl(buffer: Buffer): string {
  const base64 = buffer.toString('base64');
  return `data:image/png;base64,${base64}`;
}

/**
 * SVGからData URLに直接変換
 * @param svgString SVG文字列
 * @returns Data URL string
 */
export function svgToDataUrl(svgString: string): string {
  const buffer = svgToPngBuffer(svgString);
  return pngBufferToDataUrl(buffer);
}

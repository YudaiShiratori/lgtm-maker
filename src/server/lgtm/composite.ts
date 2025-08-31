import sharp from 'sharp';
import { pngBufferToDataUrl, svgToPngBuffer } from './png';
import { generateLgtmSvg } from './svg';

/**
 * ファイルbase64からBufferを生成
 * @param fileBase64 base64文字列（dataURLヘッダなし）
 * @returns Buffer
 */
function base64ToBuffer(fileBase64: string): Buffer {
  return Buffer.from(fileBase64, 'base64');
}

/**
 * URLから画像を取得してBufferに変換
 * @param url 画像URL
 * @returns Buffer
 */
async function urlToBuffer(url: string): Promise<Buffer> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    throw new Error(
      `画像の取得に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * 背景画像を正規化（1200x630、cover fit、EXIF対応）
 * @param buffer 元画像のBuffer
 * @returns 正規化された画像Buffer
 */
async function normalizeBackground(buffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(buffer)
      .rotate() // EXIF情報に基づいて自動回転
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center',
      })
      .png() // PNG形式で出力
      .toBuffer();
  } catch (_error) {
    throw new Error('背景画像の処理に失敗しました');
  }
}

/**
 * オーバーレイPNGを生成
 * @returns オーバーレイPNG Buffer
 */
function generateOverlay(): Buffer {
  const svg = generateLgtmSvg();
  return svgToPngBuffer(svg);
}

/**
 * 背景とオーバーレイを合成
 * @param backgroundBuffer 背景画像Buffer
 * @param overlayBuffer オーバーレイ画像Buffer
 * @returns 合成後のPNG Buffer
 */
async function compositeImages(
  backgroundBuffer: Buffer,
  overlayBuffer: Buffer
): Promise<Buffer> {
  try {
    return await sharp(backgroundBuffer)
      .composite([
        {
          input: overlayBuffer,
          top: 0,
          left: 0,
          blend: 'over', // 通常の重ね合わせ
        },
      ])
      .png()
      .toBuffer();
  } catch (_error) {
    throw new Error('画像の合成に失敗しました');
  }
}

/**
 * LGTM画像を生成
 * @param input ファイルbase64またはURL
 * @returns 生成結果
 */
export async function generateLgtmImage(input: {
  fileBase64?: string;
  fileName?: string;
  url?: string;
}): Promise<{
  imageUrl: string;
  markdown: string;
  meta: {
    bytes: number;
    generatedAt: string;
  };
}> {
  // 1. 背景画像を取得
  let backgroundBuffer: Buffer;

  if (input.fileBase64) {
    backgroundBuffer = base64ToBuffer(input.fileBase64);
  } else if (input.url) {
    backgroundBuffer = await urlToBuffer(input.url);
  } else {
    throw new Error('画像ファイルまたはURLを指定してください');
  }

  // 2. 背景画像を正規化
  const normalizedBackground = await normalizeBackground(backgroundBuffer);

  // 3. オーバーレイを生成
  const overlayBuffer = generateOverlay();

  // 4. 画像を合成
  const finalBuffer = await compositeImages(
    normalizedBackground,
    overlayBuffer
  );

  // 5. Data URLに変換
  const imageUrl = pngBufferToDataUrl(finalBuffer);
  const markdown = `![LGTM](${imageUrl})`;

  return {
    imageUrl,
    markdown,
    meta: {
      bytes: finalBuffer.length,
      generatedAt: new Date().toISOString(),
    },
  };
}

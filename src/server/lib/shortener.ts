// メモリ内ストレージ（本番環境では永続化が必要）
const urlStore = new Map<string, string>();
const shortIdStore = new Map<string, string>();

function generateShortId(length = 8): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export interface ShortenResult {
  shortId: string;
  shortUrl: string;
  originalUrl: string;
}

export function shortenUrl(url: string): ShortenResult {
  // 既に短縮済みかチェック
  const existingShortId = shortIdStore.get(url);
  if (existingShortId) {
    return {
      shortId: existingShortId,
      shortUrl: `/s/${existingShortId}`,
      originalUrl: url,
    };
  }

  // 新しい短縮IDを生成
  let shortId: string;
  do {
    shortId = generateShortId();
  } while (urlStore.has(shortId));

  // ストレージに保存
  urlStore.set(shortId, url);
  shortIdStore.set(url, shortId);

  return {
    shortId,
    shortUrl: `/s/${shortId}`,
    originalUrl: url,
  };
}

export function expandUrl(shortId: string): string | null {
  return urlStore.get(shortId) || null;
}

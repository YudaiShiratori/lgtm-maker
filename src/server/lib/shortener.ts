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
  const trimmedUrl = url.trim();
  // 既に短縮済みかチェック
  const existingShortId = shortIdStore.get(trimmedUrl);
  if (existingShortId) {
    return {
      shortId: existingShortId,
      shortUrl: `/s/${existingShortId}`,
      originalUrl: trimmedUrl,
    };
  }

  // 新しい短縮IDを生成
  let shortId = '';
  for (let i = 0; i < 10_000; i++) {
    shortId = generateShortId();
    if (!urlStore.has(shortId)) {
      break;
    }
  }
  if (!shortId || urlStore.has(shortId)) {
    throw new Error('短縮IDの生成に失敗しました');
  }

  // ストレージに保存
  urlStore.set(shortId, trimmedUrl);
  shortIdStore.set(trimmedUrl, shortId);

  return {
    shortId,
    shortUrl: `/s/${shortId}`,
    originalUrl: trimmedUrl,
  };
}

export function expandUrl(shortId: string): string | null {
  return urlStore.get(shortId) || null;
}

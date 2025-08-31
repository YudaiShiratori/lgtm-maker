import { redirect } from 'next/navigation';
import { api } from '~/trpc/server';

interface PageProps {
  params: {
    shortId: string;
  };
}

export default async function ShortUrlPage({ params }: PageProps) {
  try {
    const result = await api.shortener.expand({ shortId: params.shortId });

    // Data URLの場合は画像として表示
    if (result.originalUrl.startsWith('data:image/')) {
      return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-bold text-2xl">LGTM画像</h1>
            <p className="text-muted-foreground">
              短縮URL: /s/{params.shortId}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="LGTM"
              className="h-auto w-full"
              src={result.originalUrl}
            />
          </div>

          <div className="mt-4 text-center">
            <a
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              download={`lgtm-${params.shortId}.png`}
              href={result.originalUrl}
            >
              画像をダウンロード
            </a>
          </div>
        </div>
      );
    }

    // その他のURLの場合はリダイレクト
    redirect(result.originalUrl);
  } catch (_error) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center">
          <h1 className="mb-2 font-bold text-2xl">短縮URLが見つかりません</h1>
          <p className="mb-4 text-muted-foreground">
            指定された短縮URL (/s/{params.shortId})
            は存在しないか、期限切れです。
          </p>
          <a
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            href="/"
          >
            ホームに戻る
          </a>
        </div>
      </div>
    );
  }
}

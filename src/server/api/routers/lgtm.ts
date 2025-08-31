import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { generateLgtmImage } from '~/server/lgtm/composite';
import { shortenUrl } from '~/server/lib/shortener';

const generateInput = z
  .object({
    fileBase64: z.string().min(1).optional(), // "iVBORw0KGgo..."（dataURLヘッダなし）
    fileName: z.string().optional(),
    url: z.string().url().optional(),
  })
  .refine((v) => !!v.fileBase64 || !!v.url, {
    message: '画像ファイルまたはURLを指定してください',
  });

export type GenerateResult = {
  imageUrl: string; // data:image/png;base64,...
  shortUrl: string; // "/s/abc123"
  markdown: string; // "![LGTM](shortUrl)"
  meta: {
    shortId: string;
  };
};

export const lgtmRouter = createTRPCRouter({
  generate: publicProcedure
    .input(generateInput)
    .mutation(async ({ input, ctx }): Promise<GenerateResult> => {
      try {
        const result = await generateLgtmImage(input);

        // 短縮URL生成
        const shortResult = shortenUrl(result.imageUrl);

        // 絶対URLを構築
        const headers = ctx.req?.headers;
        const host = headers?.host || 'localhost:3000';
        const protocol =
          headers?.['x-forwarded-proto'] ||
          (host.includes('localhost') ? 'http' : 'https');
        const absoluteShortUrl = `${protocol}://${host}${shortResult.shortUrl}`;

        return {
          imageUrl: result.imageUrl,
          shortUrl: shortResult.shortUrl, // UIでは相対パスを使用
          markdown: `![LGTM](${absoluteShortUrl})`, // Markdownでは絶対URLを使用
          meta: {
            shortId: shortResult.shortId,
          },
        };
      } catch (error) {
        // エラーメッセージを分かりやすく変換
        let errorMessage = 'LGTM画像の生成に失敗しました';
        if (error instanceof Error) {
          errorMessage = error.message;
        }

        throw new Error(errorMessage);
      }
    }),
});

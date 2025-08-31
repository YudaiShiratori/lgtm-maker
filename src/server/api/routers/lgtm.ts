import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { generateLgtmImage } from '~/server/lgtm/composite';

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
  markdown: string; // "![LGTM](imageUrl)"
  meta: {
    bytes: number;
    generatedAt: string;
  };
};

export const lgtmRouter = createTRPCRouter({
  generate: publicProcedure
    .input(generateInput)
    .mutation(async ({ input }): Promise<GenerateResult> => {
      try {
        const result = await generateLgtmImage(input);
        return result;
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

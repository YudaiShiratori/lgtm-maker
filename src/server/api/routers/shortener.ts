import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import {
  expandUrl,
  type ShortenResult,
  shortenUrl,
} from '~/server/lib/shortener';

const shortenInput = z.object({
  url: z.string().min(1, 'URLが必要です'),
});

const expandInput = z.object({
  shortId: z.string().min(1, 'Short IDが必要です'),
});

export const shortenerRouter = createTRPCRouter({
  shorten: publicProcedure
    .input(shortenInput)
    .mutation(({ input }): ShortenResult => {
      try {
        return shortenUrl(input.url);
      } catch (_error) {
        throw new Error('URL短縮に失敗しました');
      }
    }),

  expand: publicProcedure.input(expandInput).query(({ input }) => {
    const originalUrl = expandUrl(input.shortId);
    if (!originalUrl) {
      throw new Error('短縮URLが見つかりません');
    }
    return {
      originalUrl,
      shortId: input.shortId,
    };
  }),
});

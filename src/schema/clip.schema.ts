import * as z from 'zod';

export const getSingleClipSchema = z.object({
  id: z.string().cuid(),
});

export const createClipSchema = z.object({
  title: z.string(),
  fileName: z.string(),
  public: z.boolean(),
  userId: z.string().cuid(),
});

export type CreateClipInput = z.TypeOf<typeof createClipSchema>;

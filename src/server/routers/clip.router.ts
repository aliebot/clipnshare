import { TRPCError } from "@trpc/server";

import { createRouter } from "../createRouter";
import { prisma } from "../../utils/prisma";
import {
  getSingleClipSchema,
  createClipSchema,
} from "../../schema/clip.schema";

export const clipRouter = createRouter()
  /**
   * @api {get} /clip.get-all-public-clips Request all clips from Prisma that are Public
   */
  .query("get-all-public-clips", {
    async resolve({ ctx }) {
      const publicClips = await ctx.prisma.clip.findMany({
        where: {
          public: true,
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      return publicClips;
    },
  })
  /**
   * @api {get} /clip.get-all-public-clips Request all clips from Prisma that are Private
   *
   * @apiBody (Login) {String} pass
   */
  .query("get-all-private-clips", {
    // get user ID as input from FRONTEND
    async resolve({ ctx }) {
      const privateClips = await ctx.prisma.clip.findMany({
        where: {
          public: false,
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      return privateClips;
    },
  })
  /**
   * @api {get} /clip.get-single-clip Request a clip with same ID
   *
   * @api {String} clipID
   */
  .query("get-single-clip", {
    input: getSingleClipSchema,
    async resolve({ ctx, input }) {
      const clip = await ctx.prisma.clip.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      return clip;
    },
  })
  /**
   * @api {post} /clip.upload-clip Upload a single clip to Prisma
   * @apiBody {String} title
   * @apiBody {String} url
   * @apiBody {Boolean} public="false"
   * @apiBody {String} userId
   *
   * @apiBody (Login) {String} pass
   */
  .mutation("upload-clip", {
    input: createClipSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.clip.create({
        data: {
          title: input.title,
          url: input.fileName,
          public: input.public,
          userId: input.userId,
        },
      });
    },
  });

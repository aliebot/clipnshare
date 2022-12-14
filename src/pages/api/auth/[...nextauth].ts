import NextAuth, { type NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './../../../utils/prisma';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user = user;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);

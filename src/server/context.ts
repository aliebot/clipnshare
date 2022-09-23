import { NextApiRequest, NextApiResponse } from 'next';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import {
  Session,
  unstable_getServerSession as getServerSession,
} from 'next-auth';
import { prisma } from '../utils/prisma';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export default function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = getServerSession(req, res, authOptions);
  return {
    req,
    res,
    prisma,
    session,
  };
}

export type Context = ReturnType<typeof createContext>;

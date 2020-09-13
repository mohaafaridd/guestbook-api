import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { ApolloError } from 'apollo-server-express';

export const getUserId = (request: Request, requireAuth = true) => {
  const header = request.headers.authorization;

  if (header) {
    const [, token] = header.split(' ');
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || 'hard jwt secret'
    );

    return decoded.userId;
  }

  if (requireAuth) {
    throw new ApolloError('Authorization required');
  }

  return undefined;
};

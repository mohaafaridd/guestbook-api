import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

interface LoadApolloServerArgs {
  schema: GraphQLSchema;
}

export class ApolloServerLoader {
  private static server: ApolloServer | undefined = undefined;

  public static load(args: LoadApolloServerArgs): ApolloServer {
    if (this.server) return this.server;

    const validEnvironments = ['development', 'staging'];

    this.server = new ApolloServer({
      tracing: true,
      introspection: validEnvironments.includes(process.env.NODE_ENV || ''),
      playground: validEnvironments.includes(process.env.NODE_ENV || ''),
      schema: args.schema,
    });

    return this.server;
  }
}

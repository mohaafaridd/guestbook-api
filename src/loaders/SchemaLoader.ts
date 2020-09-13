import { GraphQLSchema } from 'graphql';
import { buildSchema, Resolver, Query } from 'type-graphql';

@Resolver()
export class TemporaryResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World';
  }
}

export class SchemaLoader {
  private static schema: GraphQLSchema | undefined = undefined;

  public static async load() {
    if (this.schema) return this.schema;

    this.schema = await buildSchema({
      resolvers: [TemporaryResolver],
    });

    return this.schema;
  }
}

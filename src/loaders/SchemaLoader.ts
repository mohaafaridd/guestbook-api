import { GraphQLSchema } from 'graphql';
import { buildSchema, Resolver, Query, Arg } from 'type-graphql';
import { User, UserModel } from '../models';
import { CreateUserResolver } from '../resolvers';
@Resolver()
export class TemporaryResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World';
  }

  @Query(() => User)
  async getUserById(@Arg('id') id: string) {
    const user = await UserModel.findById(id);
    console.log('user', user);
    return user;
  }
}

export class SchemaLoader {
  private static schema: GraphQLSchema | undefined = undefined;

  public static async load() {
    if (this.schema) return this.schema;

    this.schema = await buildSchema({
      resolvers: [TemporaryResolver, CreateUserResolver],
    });

    return this.schema;
  }
}

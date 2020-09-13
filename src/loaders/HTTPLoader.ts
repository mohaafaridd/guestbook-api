import 'reflect-metadata';
import http from 'http';
import Express from 'express';
import Chalk from 'chalk';
import { ApolloServerLoader } from './ServerLoader';
import { SchemaLoader } from './SchemaLoader';

export class HTTPLoader {
  private static app: Express.Application | undefined = undefined;
  private static port: string | number = process.env.PORT || 4020;
  private static httpServer: http.Server | undefined = undefined;

  private static loadExpressApp() {
    if (this.app) return this.app;
    this.app = Express();
    return this.app;
  }

  public static async init() {
    const app = this.loadExpressApp();
    const schema = await SchemaLoader.load();
    const apolloServer = ApolloServerLoader.load({ schema });

    apolloServer.applyMiddleware({ app });
    this.httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(this.httpServer);

    this.httpServer.listen({ port: this.port }, () => {
      console.log(
        Chalk.green('•••••••••••••••••••••••••••••••••••••••••••••••••••••••')
      );
      console.log(
        `${Chalk.green('•')} Server is ${Chalk.green(
          'ready'
        )} at http://localhost:${this.port}${apolloServer.graphqlPath}`
      );
      console.log(
        `${Chalk.green('•')} Subscriptions ${Chalk.green(
          'ready'
        )} at ws://localhost:${this.port}${apolloServer.subscriptionsPath}`
      );
      console.log(
        Chalk.green('•••••••••••••••••••••••••••••••••••••••••••••••••••••••')
      );
    });
  }

  public static close() {
    if (this.httpServer) this.httpServer.close();
  }
}

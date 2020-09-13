import 'reflect-metadata';
import http from 'http';
import Express from 'express';
import Chalk from 'chalk';
import mongoose from 'mongoose';
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

  private static async connectDB() {
    try {
      if (!process.env.MONGODB_URL)
        throw new Error(
          'Database URL required ( check you environment variables )'
        );

      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });

      console.log(
        Chalk.green('•••••••••••••••••••••••••••••••••••••••••••••••••••••••')
      );

      console.log(`${Chalk.greenBright('•')} MongoDB Connected`);
    } catch (error) {
      console.error(Chalk.red(error.message));
      process.exit(1);
    }
  }

  public static async init() {
    await this.connectDB();
    const app = this.loadExpressApp();
    const schema = await SchemaLoader.load();
    const apolloServer = ApolloServerLoader.load({ schema });

    apolloServer.applyMiddleware({ app });
    this.httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(this.httpServer);

    this.httpServer.listen({ port: this.port }, () => {
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

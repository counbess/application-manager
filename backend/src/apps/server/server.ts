import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import createDebugger from 'debug';

import { Factory } from '~/core/domain/factory/Factory';
import { UsersController } from './controllers/Users';
import { UsersRoutes } from './routes/Users';
import { ApplicationManagerError } from '~/core/common/interfaces/error';

const debug = createDebugger('server');

export class Server {
  private app = express();

  constructor(private factory: Factory, readonly port: number) {
    if (!port) {
      throw new Error();
    }
  }

  private setupUsersRoutes() {
    const usersController = new UsersController(this.factory);
    const usersRoutes = new UsersRoutes(usersController);

    this.app.use('/users', usersRoutes.getRoutes());
  }

  async boot(): Promise<void> {
    this.app.use(express.json());

    this.setupUsersRoutes();

    this.app.use((error: Error, _request: Request, response: Response, next: NextFunction) => {
      if (error instanceof ApplicationManagerError) {
        return response.status(500).json({
          code: error.code,
          message: error.message,
        });
      }

      return next(error);
    });
  }

  start() {
    const server = this.app.listen(this.port, '127.0.0.1', () => {
      const { address, port } = server.address() as { address: string, port: number };

      debug(`Application listening on ${address}:${port}`);
    });
  }
}

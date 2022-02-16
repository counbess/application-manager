import { Router } from 'express';
import { UsersController } from '../controllers/Users';

export class UsersRoutes {
  constructor(private readonly controller: UsersController) {
    if (!controller) {
      throw new Error();
    }
  }

  getRoutes() {
    const router = Router();

    router.get('/', this.controller.handleListUsersRequest.bind(this.controller));
    router.post('/', this.controller.handleAddUserRequest.bind(this.controller));

    return router;
  }
}

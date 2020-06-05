import { Request, Response, NextFunction } from 'express';
import { UserController } from '../Controller';

export class UserRoutes {
  public UserController: UserController = new UserController();

  public routes(app): void {
    app.route('/list').post(this.UserController.createNewList);

    app
      .route('/list/:listId')
      .get(this.UserController.getExistingUserById)
      .put(this.UserController.updateExistingUserById)
      .delete(this.UserController.deleteExistingUserById);
  }
}

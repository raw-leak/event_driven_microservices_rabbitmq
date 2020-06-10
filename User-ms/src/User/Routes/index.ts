import { UserController } from '../Controller';
import { UserDataValidation } from '../Validator';

export class UserRoutes {

  public UserController: UserController = new UserController();
  public UserDataValidation: UserDataValidation = new UserDataValidation();

  // Router
  public routes(app): void {
   
    app.route('/login',
      this.UserDataValidation.toCheckLoginData
    )
      .post(this.UserController.loginExistingUser);

    app.route('/user', 
      this.UserDataValidation.toCheckBodyEssentialInformation,
      this.UserDataValidation.toCheckUserPasswords
    )
      .post(this.UserController.createNewUser);

    app.route('/user/:userId', 
      this.UserDataValidation.toCheckIdFormat
    )
      .get(this.UserController.readExistingUserById)
  }
}

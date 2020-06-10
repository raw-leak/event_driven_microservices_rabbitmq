import { Request, Response, NextFunction } from 'express';

// Model
import { User } from '../Model';

// Message broker (RabbitMQ)
import { MessageBroker } from '../../MessageBroker';

export class UserController {
  public MessageBroker: MessageBroker = new MessageBroker();

  public loginExistingUser = async (req: Request, res: Response) => {
    try {


      const newUser = new User(req.body);
      const response = await this.MessageBroker.createNewWalletByDefault({
        userId: newUser._id.toString(),
      });
      await newUser.save();
      debugger;
      res.status(201).json({ message: 'User Created' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };

  public createNewUser = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const newUser = new User(req.body);

      const response = await this.MessageBroker.createNewTodoListByDefault({
        userId: newUser._id.toString(),
      });

      if(response) await newUser.save();
      else throw new Error("Queue not connected")
    
      res.status(201).json({ message: 'User Created' });
    } catch (err) {
      console.warn(err);
      next(err);
    }
  };

  public  readExistingUserById = async (req: Request, res: Response, next:NextFunction)=> {
    try {
      const userId = req.params.userId
      const foundUser = await User.findById(userId).orFail();

      res.status(200).json(foundUser);
    } catch (err) {
      console.warn(err);
      next(err);
    }
  }


}

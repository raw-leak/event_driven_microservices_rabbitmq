// Model
import { TodoList } from '../Model/index';

export class TodoListController {

  Model = TodoList;

  public createNew = ({userId}) => new Promise( async(resolve, reject) => {
    try {
      const newWallet = await this.Model.create({ userId });

      resolve(newWallet);
    } catch (err) {
      console.warn(err);
      reject(err);
    }
  });
}

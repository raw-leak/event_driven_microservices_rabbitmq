import { startBroker } from './Events';
import { TodoListController } from './TodoList/Controller';
import './Database';

(async () => {
  const Broker = await startBroker();
  const TodoList = new TodoListController()

  Broker.subscribe('new-list', async(msg, ack) => {
    try{
      const data = JSON.parse(msg.content)

      await TodoList.createNew(data)
      
      ack();

    }catch(err){
      console.warn(err)
    }
  });

})();

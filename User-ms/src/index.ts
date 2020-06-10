// db config
import './configs/database';

// server config
import app from './configs/app';

(async () => {
  console.log(`app running on port ${app.get('port')}`);
  await app.listen(app.get('port'));
})();

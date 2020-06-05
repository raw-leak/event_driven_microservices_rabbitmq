const express = require('express');
const router = express.Router();
const publishToQueue = require('../../services/RabbitMQ');

router.post('/msg', async (req, res) => {
  debugger;
  let { payload, queueName } = req.body;

  const resp = await publishToQueue(queueName, payload);

  if (!resp) return res.status(500).json({ message: 'Error' });
  res.status(200).json({ message: 'OK message' });
});

module.exports = router;

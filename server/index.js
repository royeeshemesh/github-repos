const axios = require('axios');
const Redis = require('ioredis');
const express = require('express');
const cors = require('cors');

const REPOSITORIES_SEARCH_URI = 'https://api.github.com/search';
const redisConf = {
  port: 6379,
  host: "127.0.0.1",
  family: 4,
  ttl: 60,
};

const startServer = async () => {
  const _redisClient = new Redis(redisConf);

  _redisClient.on('error', error => {
    console.info(`connection error, reason="${error && error.message}"`);
    _redisClient.disconnect();
  });

  _redisClient.on('connect', () => {
    console.info('connected');
  });

  _redisClient.on('ready', () => {
    console.info('ready');
  });


  const app = express();
  const port = 8080;

  app.use(cors());

  app.get('/repositories', async (req, res) => {
    const startTime = Date.now();
    const queryUrl = req.originalUrl;

    try {
      const fromCache = await _redisClient.get(queryUrl);

      if (fromCache) {
        const elapsedTime = Date.now() - startTime;
        return res.status(200).json({result: JSON.parse(fromCache), elapsedTime});
      }
    } catch (e) {
      console.error('redis error');
    }

    const gihubUrl = `${REPOSITORIES_SEARCH_URI}${queryUrl}`;
    try {
      const result = await axios.get(gihubUrl);

      try {
        await _redisClient.set(queryUrl, JSON.stringify(result.data));
        await _redisClient.expire(queryUrl, redisConf.ttl);
      } catch (e) {
        console.error('redis error');
      }

      const elapsedTime = Date.now() - startTime;
      res.status(200).json({result: result.data, elapsedTime});
    } catch (e) {
      const {response: {status, data}} = e;
      res.status(status || 400).json(data);
    }
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
};

setImmediate(startServer);

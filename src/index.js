const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const PORT = 4000;
const app = express();

//connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', err => console.log('connected to redis'));
redisClient.connect();

//connect db
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 27017;
const DB_HOST = 'mongo'

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;



mongoose
    .connect(URI)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log('failed', err));

    app.get('/', (req, res) => {
        redisClient.set('key', 'test docker hub');
         res.send('<h1>hello amro yami dev test docker hub</h1>');
    });
    app.get('/data', async (req, res) => {
       const val = await redisClient.get('key');
         res.send(`<h1>hello amro yami dev</h1><h2>${val}</h2>`);
    });

app.listen(PORT, () => console.log(`app is up and running on port : ${PORT}`))
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');

const PORT = 4000;
const app = express();

//connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

//connect to postgres

//connect db
const DB_USER_POSTGRES = "root";
const DB_PASSWORD_POSTGRES = "example";
const DB_PORT_POSTGRES = 5432;
const DB_HOST_POSTGRES = 'postgres'

const URI_POSTGRES = `postgresql://${DB_USER_POSTGRES}:${DB_PASSWORD_POSTGRES}@${DB_HOST_POSTGRES}:${DB_PORT_POSTGRES}`;

const client = new Client({
    connectionString: URI_POSTGRES,
  });

  client.connect()
    .then(() => console.log('connected to postgres'))
    .catch((err) => console.log('failed postgres', err));

    //redis

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', err => console.log('connected to redis'));
redisClient.connect();

//connect mongo db
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
        redisClient.set('key', 'value');
         res.send('<h1>hello amro yami dev NODE AWS using docker hub test</h1>');
    });
    app.get('/data', async (req, res) => {
       const val = await redisClient.get('key');
         res.send(`<h1>hello amro yami dev</h1><h2>${val}</h2>`);
    });

app.listen(PORT, () => console.log(`app is up and running on port : ${PORT}`))
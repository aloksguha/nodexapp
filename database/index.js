'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;


const FIRST_CONNECTION_RETRY_INTERVAL = 1000;

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const parts = process.env.MONGO_URL.split('://');
const newUrl = `${parts[0]}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${parts[1]}${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTHSOURCE}&retryWrites=true`; // eslint-disable-line max-len
// e.g. 'mongodb://localhost:27017/platform_db'
const db = mongoose.createConnection(newUrl, options); // Default connection
db.catch(() => {}); // avoid unhandled promise rejection on first connection error

db.on('connected', () => {
  console.log('Connected to platform_db');
});
db.on('disconnected', () => {
  console.log('Disconnected platform_db');
});
db.once('open', () => {
  console.log('Connection with Database platform_db succeeded');
});

db.on('error', err => {
  console.error('Connection with Database platform_db failed', err);
  if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
    // Wait for a bit, then try to connect again
    setTimeout(() => {
      console.log('Retrying first connect...');
      db.openUri(newUrl)
        .catch(() => {}); // avoid unhandled promise rejection
    }, FIRST_CONNECTION_RETRY_INTERVAL);
  }
});

exports.Database = db;

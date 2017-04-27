/**
 * Created by petersquicciarini on 4/26/17.
 */

if (!process.env.apiKey || !process.env.engineId || !process.env.mongoUri) {
  console.log('Error ** Please provide apiKey, engineId, and mongoUri in env vars.');
  process.exit();
}

const express = require('express');
const routes = require('./lib/routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.mongoUri);

app.use(routes);

app.listen(process.env.PORT || 8080);

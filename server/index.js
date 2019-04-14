/* const { Nuxt, Builder} = require('nuxt')

let config = require('../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)
 */
import express from 'express';
import mongoose from 'mongoose';
import keys from './config/keys';

const app = express();
const dbUrl = keys.mongoURI;

import router from './routes/routes';

router(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbUrl, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Import API Routes
app.use(router);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

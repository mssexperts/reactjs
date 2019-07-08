const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const Routes = require('./routes');
const logger = require('./config/logger');

const router = new Routes(express.Router()).register();

const server = express();

const dirs = ['./coverage', './logs'];

/**
 * Create Dir if not exist
 */
try {
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });
} catch (e) {
  logger.log('error', 'Error while creating directory', { detail: e.toString() });
}

/**
 * List of all Middlewares used in project cors, compression, helmet
 * */
try {
  server.use(cors());
  server.use(compression());
  server.use(helmet());
  server.use(express.static(path.join(__dirname, 'dist')));
  server.use('/assets', express.static(path.join(__dirname, 'assets')));
  server.use('/', router);
  server.set('view engine', 'ejs');
  server.engine('.html', ejs.renderFile);
  server.set('views', path.join(__dirname, 'views'));
} catch (e) {
  logger.log('error', 'Error while loading middleware', { detail: e.toString() });
  server.close();
}

/**
 * Generating access.log to generate the logs using morgan logs are generated in
 * access.logs file inside logs folder
 * */
try {
  server.use(morgan('combined', { stream: fs.createWriteStream(path.resolve(process.cwd(), 'logs', 'access.log'), { flags: 'a' }) }));
} catch (e) {
  logger.log('error', 'morgan error', { detail: e.toString() });
}

server.listen(config.PORT);

module.exports = server;

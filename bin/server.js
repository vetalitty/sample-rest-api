const { server: { port } } = require('../config');
const serverApp = require('../app');

/**
 * Error handling for system calls
 *
 * @param {object} error - errors
 * return {object} throw - or process.exit
 * */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind;
  if (typeof port === 'string') {
    bind = `Pipe ${port}`;
  } else {
    bind = `Port ${port}`;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      return process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      return process.exit(1);
    default:
      throw error;
  }
}

/**
 * On listening event
 * */
function onListening() {
  console.log(`Server has been started on port ${port}`);
}

async function start(app) {
  app.server.listen(port);
  app.server.on('error', onError);
  app.server.on('listening', onListening);
}

start(serverApp);

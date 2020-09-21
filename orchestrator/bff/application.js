process.title = 'orchestrator';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRouter = require('./src/main/gateways/http/router')(express.Router());
const port = 8081;

const app = express();
app.disable('x-powered-by');

// middlewares
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

// routers
app.use('/', mainRouter);

app.listen(port, () => {
  console.info('Orchestrator application running port: ', { port });
});

process.title = 'profile';
const express = require('express');
var cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mainRouter = require('./src/main/gateways/http/router')(express.Router());
const port = 8083;

const app = express();
app.disable('x-powered-by');

// middlewares
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public', {
  setHeaders: function(res, path) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  }
}));

app.use(cors({
  origin: 'http://localhost:8081',
}));

// routers
app.use('/', mainRouter);

app.listen(port, () => {
  console.info('Profile application running port: ', { port });
});

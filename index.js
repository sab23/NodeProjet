// Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const messageRoute = require('./routes/message');
const authRoute = require('./routes/auth');

const app = express();

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/topic', messageRoute);
app.use('/auth', authRoute);

app.use('/api-docs', swaggerUi.serve,  swaggerUi.setup(swaggerDocument));


mongoose
  .connect(
    'mongodb+srv://Kant1:12345@cluster0.jc0k3df.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(3080);
  })
  .catch(err => console.log(err));

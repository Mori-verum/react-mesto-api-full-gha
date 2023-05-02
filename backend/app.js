require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateUserBody, validateLoginParametrs } = require('./utils/validateRequestParameters');
const routes = require('./routes/index');
const {
  createUser,
  login,
  // logout,
} = require('./controllers/usersControllers');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();
app.use(cors());
mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', validateLoginParametrs, login);
app.post('/signup', validateUserBody, createUser);
// app.get('/signout', logout);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

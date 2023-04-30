const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { validateUserBody, validateLoginParametrs } = require('./utils/validateRequestParameters');
const routes = require('./routes/index');
const {
  createUser,
  login,
  logout,
} = require('./controllers/usersControllers');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', validateLoginParametrs, login);
app.post('/signup', validateUserBody, createUser);
app.get('/signout', logout);

app.use(routes);

app.use(errors());
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

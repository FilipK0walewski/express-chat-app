const createError = require('http-errors');
const express = require('express');

const path = require('path');
const session = require('express-session');

const http = require('http');
const { Server } = require("socket.io");

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'dasasdasd 1321231 asd asd a'
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);



io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

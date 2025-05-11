import express from 'express';
import usersRouter from './routes/users.mjs';
import songsRouter from './routes/songs.mjs';
import logger from './middleware/loggedin.mjs';


const app = express();

import bodyParser from 'body-parser';
import session from 'express-session';

app.use(
    session({
      secret: "secret-key",
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', usersRouter);

app.use('/songs', songsRouter);

app.listen(3000);
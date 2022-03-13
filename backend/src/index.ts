import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: __dirname + '/../.env' });

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import routes from './routes/index';
import mongoStore from 'connect-mongo';

// Middleware
const app = express();
app.use(express.json());

app.use(express.static( path.resolve(__dirname, '../../client/build') ) );

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  })
);

app.use(
  morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined', {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24, //1Sec * 1H * 24 = 1 Day
      secure: process.env.NODE_ENV !== 'production' ? false : true,
    },
    store: mongoStore.create({
      mongoUrl: `${process.env.MONGODB_URL}`,
    }),
  })
);
app.use((err: any, req: any, res: any, next: any) => {
  if (!err.status) err.status = 500;

  return res.status(err.status).json({ error: err.toString() });
});

// Passport
import './config/passport/passport';
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', routes);
app.get("*", (request, response)=> { 
  response.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
})

// Database
import './config/database';


const PORT = process.env.PORT || process.env.BACKEND_DEV_PORT;

app.listen(PORT, () => {
  console.log(`Serving running on PORT ${PORT}`);
});

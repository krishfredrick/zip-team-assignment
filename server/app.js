require('dotenv').config();
require('express-async-errors');
// express
const express = require('express');
const app = express();
// IMPORTS
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoute');
const donationRouter = require('./routes/donations');


// middleware
const { authenticateUser: Auth } = require('./middleware/authentication');
const NOT_FOUND_MIDDLEWARE = require('./middleware/not-found');
const ERROR_HANDLER_MIDDLEWARE = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15*60*1000,
    max: 60,
  })
);
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));


// routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/donation', Auth, donationRouter);


app.use(NOT_FOUND_MIDDLEWARE);
app.use(ERROR_HANDLER_MIDDLEWARE);


const port = process.env.PORT || 5050;
const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URL);
    app.listen(port, ()=>{
      console.log(`app is running smoothly`);
      console.log(`http://localhost:${port}`);
    })
  }catch(error){
    console.dir(error);
  }
};

start();
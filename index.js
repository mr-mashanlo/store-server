require( 'dotenv' ).config();
const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cookieParser = require( 'cookie-parser' );
const cors = require( 'cors' );
const path = require( 'path' );
const mediaRouter = require( './routers/mediaRouter' );
const authRouter = require( './routers/authRouter' );
const errorMiddleware = require( './middlewares/errorMiddleware' );

const app = express();
app.use( cors( { origin: [ process.env.FRONT_URI ] } ) );
app.use( cookieParser() );
app.use( express.json() );
app.use( '/uploads', express.static( path.join( __dirname, 'uploads' ) ) );
app.use( '/media', mediaRouter );
app.use( '/auth', authRouter );
app.use( errorMiddleware );

const start = async () => {
  try {
    await mongoose.connect( process.env.MONGODB_URI );
    app.listen( process.env.PORT, () => console.log( `Server is running on port ${process.env.PORT}` ) );
  } catch ( error ) {
    console.log( error );
  }
};

start();
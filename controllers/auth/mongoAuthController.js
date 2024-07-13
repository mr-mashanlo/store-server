const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const { validationResult } = require( 'express-validator' );
const UserModel = require( '../../schemas/userModel' );
const TokenModel = require( '../../schemas/tokenModel' );
const TokenService = require( '../../services/token' );
const { BadRequest } = require( '../../services/error' );

module.exports = class MongoAuthController {

  signin = async ( req, res, next ) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne( { email } );

      if ( !user ) {
        throw new BadRequest( [ { path: 'email', msg: 'User not found' } ] );
      }

      const validPassword = bcrypt.compareSync( password, user.password );
      if ( !validPassword ) {
        throw new BadRequest( [ { path: 'password', msg: 'Incorrect password' } ] );
      }

      const tokens = await TokenService.create( user );
      res.cookie( 'AToken', tokens.AToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true } );
      res.send( { ...tokens } );
    } catch ( error ) {
      next( error );
    }
  };

  signup = async ( req, res, next ) => {
    try {
      const { email, password, confirm } = req.body;

      const candidate = await UserModel.findOne( { email } );
      if ( candidate ) {
        throw new BadRequest( [ { path: 'email', msg: 'Email already exists' } ] );
      }

      const errors = validationResult( req );
      if ( !errors.isEmpty() ) {
        throw new BadRequest( errors.errors );
      }

      if ( password !== confirm ) {
        throw new BadRequest( [ { path: 'confirm', msg: 'Passwords do not match' } ] );
      }

      const hashPassword = bcrypt.hashSync( password, 7 );
      const user = await UserModel.create( { email, password: hashPassword } );
      const tokens = await TokenService.create( user );
      res.cookie( 'AToken', tokens.AToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true } );
      res.send( { ...tokens } );
    } catch ( error ) {
      next( error );
    }
  };

  logout = async ( req, res, next ) => {
    try {
      await TokenModel.deleteOne( { user: req.me.id } );
      res.send( { success: true, msg: 'Logouted' } );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      await UserModel.deleteOne( { _id: req.me.id } );
      await TokenModel.deleteOne( { user: req.me.id } );
      res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

  token = async ( req, res, next ) => {
    try {
      const { AToken } = req.cookies;
      const tokens = await TokenModel.findOne( { AToken } );
      const user = jwt.verify( tokens.RToken, process.env.REFRESH_KEY );
      const updatedTokens = await TokenService.create( user );
      res.cookie( 'AToken', updatedTokens.AToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true } );
      res.send( { ...updatedTokens } );
    } catch ( error ) {
      next( error );
    }
  };

};
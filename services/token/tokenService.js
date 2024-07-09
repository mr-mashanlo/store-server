const jwt = require( 'jsonwebtoken' );
const TokenModel = require( '../../schemas/tokenModel' );

class TokenService {

  create = async ( user ) => {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const RToken = jwt.sign( payload, process.env.REFRESH_KEY, { expiresIn: '30d' } );
    const AToken = jwt.sign( payload, process.env.ACCESS_KEY, { expiresIn: '1h' } );

    const existsToken = await TokenModel.findOne( { user: user.id } );
    if ( existsToken ) {
      await TokenModel.updateOne( { user: user.id }, { $set: { AToken, RToken } } );
      return { RToken, AToken };
    }

    await TokenModel.create( { user: user.id, RToken, AToken } );
    return { RToken, AToken };
  };

  async delete( AToken ) {
    const existsToken = await TokenModel.deleteOne( { AToken } );
    return existsToken;
  }

}

module.exports = TokenService;
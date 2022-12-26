import jwt from 'jsonwebtoken';

/**
 * Token service class
 */
class TokenService {
  /**
   * * Generate token
   * @param {string} data
   * @returns {string} string
   */
  static generateToken(data) {
    return jwt.sign(data, process.env.SECRET, {
      expiresIn: process.env.EXPIRE_TIME,
    });
  }

  /**
   * * Verify token
   * @param  {string} token
   * @returns {object} object
   */
  static verifyToken(token) {
    return jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return err;
      }
      return decoded;
    });
  }
}

export default TokenService;

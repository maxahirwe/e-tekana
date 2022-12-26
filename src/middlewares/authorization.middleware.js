import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import { JsonWebTokenError } from 'jsonwebtoken';
import TokenService from '../services/token.service';
import ResponseService from '../services/response.service';

/**
 * * Authorize a user to access a protected route
 * @param  {object} req
 * @param  {object} res
 * @param  {Function} next
 * @return {object} object
 */
export default (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      const tokenVerification = TokenService.verifyToken(req.token);
      if (tokenVerification instanceof JsonWebTokenError) {
        return ResponseService.handleErrorResponse(
          UNAUTHORIZED,
          `Unauthorized, Bearer Token Verification: ${tokenVerification.message}`,
          res,
        );
      }
      req.userData = tokenVerification;
      next();
    } else {
      return ResponseService.handleErrorResponse(
        FORBIDDEN,
        'You can not proceed without setting authorization token',
        res,
      );
    }
  } catch (err) {
    next(err);
  }
};

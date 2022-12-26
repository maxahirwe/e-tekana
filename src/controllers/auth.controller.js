import { CREATED, OK, UNAUTHORIZED, BAD_REQUEST } from 'http-status';
import _ from 'lodash';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import UserService from '../services/user.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';
import TokenService from '../services/token.service';
import models from '../database/models';
import logger from '../utils/logger';
import Utils from '../utils/index';

const authenticationLogger = logger('authentication');

const { User } = models;

/**
 * Auth controller class
 */
class AuthController {
  /**
   * Registration
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} object
   */
  static async register(req, res, next) {
    try {
      const { body } = req;
      const confirmationToken = uuidv4();
      body.password = BcryptService.hashPassword(body.password);
      const user = await UserService.register({
        ...body,
        confirmationToken,
      });
      // TODO NOTIFICATION EMAIL, SMS
      await user.update({
        confirmationSentAt: new Date(),
      });
      ResponseService.handleSuccessResponse(
        CREATED,
        'user created',
        {
          user: _.omit(user.dataValues, [
            'password',
            'confirmationToken',
            'resetToken',
          ]),
        },
        res,
      );
    } catch (err) {
      next(err);
    }
  }

  /**
   * Login
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} object
   */
  static async login(req, res, next) {
    try {
      const { body } = req;
      const { email, phone, preferredLanguage } = body;
      const user = await UserService.findBy({
        [Op.or]: {
          email,
          phone,
        },
      });
      if (!user) {
        const wrongInput = email ? 'email' : 'phone';
        return ResponseService.handleErrorResponse(
          UNAUTHORIZED,
          `User with provided ${wrongInput} does not exist`,
          res,
        );
      }
      if (
        user &&
        BcryptService.comparePassword(body.password, user.password) &&
        user.confirmationApproved
      ) {
        const { loginCount } = user;
        await user.update({
          preferredLanguage,
          loginCount: loginCount + 1,
          lastSignedInDate: new Date(),
          lastSignedInIpAddress:
            req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        });
        const userData = _.omit(user.dataValues, [
          'password',
          'confirmationToken',
          'wallets',
          'emailChangeToken',
          'resetToken',
        ]);
        return ResponseService.handleSuccessResponse(
          OK,
          'User login successfully',
          {
            token: TokenService.generateToken(userData),
            user: userData,
          },
          res,
        );
      } else if (
        user &&
        BcryptService.comparePassword(body.password, user.password) &&
        !user.confirmationApproved
      ) {
        return ResponseService.handleErrorResponse(
          UNAUTHORIZED,
          'User has not yet confirmed their account',
          res,
        );
      } else {
        return ResponseService.handleErrorResponse(
          UNAUTHORIZED,
          'Wrong credentials',
          res,
        );
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * Confirmation
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} object
   */
  static async confirmation(req, res, next) {
    try {
      const { body } = req;
      const { confirmationToken } = body;
      if (!confirmationToken) {
        return ResponseService.handleErrorResponse(
          UNAUTHORIZED,
          'No confirmation tokn provided',
          res,
        );
      }

      const user = await User.findOne({
        where: { confirmationToken },
      });
      if (user) {
        if (user.confirmationApproved) {
          return ResponseService.handleErrorResponse(
            BAD_REQUEST,
            'User Already confirmed',
            res,
          );
        }
        user.confirmationApproved = true;
        user.confirmationApprovedAt = new Date();
        await user.save();
        // TODO NOTIFICATION VIA EMAIL, PHONE
        const userData = _.omit(user.dataValues, [
          'password',
          'confirmationToken',
          'wallets',
          'emailChangeToken',
          'resetToken',
        ]);
        return ResponseService.handleSuccessResponse(
          OK,
          'User confirmed',
          {
            token: TokenService.generateToken(userData),
            user: userData,
          },
          res,
        );
      } else {
        return ResponseService.handleErrorResponse(
          UNAUTHORIZED,
          'Invalid Confirmation token',
          res,
        );
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * Reset Token
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} object
   */
  static async refreshToken(req, res, next) {
    try {
      const { userData } = req;
      const { id } = userData;
      const user = await UserService.findBy({
        id,
      });
      return ResponseService.handleSuccessResponse(
        OK,
        'Refreshed Token',
        {
          token: TokenService.generateToken(
            _.omit(user.dataValues, ['password', 'confirmationToken']),
          ),
        },
        res,
      );
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;

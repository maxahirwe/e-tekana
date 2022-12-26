/* eslint-disable object-curly-newline */
import { CONFLICT } from 'http-status';
import _ from 'lodash';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

export const checkUserDuplicate = async (req, res, next) => {
  try {
    const { nationalId, email, phone } = req.body;
    const userEmail = await UserService.findBy({ email });
    const userPhone = await UserService.findBy({ phone });
    if (nationalId) {
      const idNumber = await UserService.findBy({ nationalId });
      if (idNumber) {
        return ResponseService.handleErrorResponse(
          CONFLICT,
          'National Id has already been registered',
          res,
        );
      }
    }

    if (userEmail) {
      return ResponseService.handleErrorResponse(
        CONFLICT,
        'Email has already been registered',
        res,
      );
    }

    if (userPhone) {
      return ResponseService.handleErrorResponse(
        CONFLICT,
        'Phone number has already been registered',
        res,
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

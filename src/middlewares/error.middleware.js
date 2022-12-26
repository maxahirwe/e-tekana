import { INTERNAL_SERVER_ERROR } from 'http-status';
import _ from 'lodash';
import logger from '../utils/logger';
import ResponseService from '../services/response.service';

const errorLogger = logger('');
export default (err, req, res, next) => {
  console.log(err);
  errorLogger.error(err.message);
  return ResponseService.handleErrorResponse(
    _.get(err, 'httpCode') || INTERNAL_SERVER_ERROR,
    err.message,
    res,
  );
};

import { NOT_FOUND, OK } from 'http-status';
import ResponseService from '../services/response.service';

/**
 * App controller class
 */
class AppController {
  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} object
   */
  static landRoute(req, res) {
    ResponseService.setSuccess(OK, 'E-Tekana landing route');
    return ResponseService.send(res);
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @returns {object} object
   */
  static notFoundRoute(req, res) {
    return ResponseService.handleErrorResponse(
      NOT_FOUND,
      'Route does not exist, check well the path or the method',
      res,
    );
  }
}

export default AppController;

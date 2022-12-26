/**
 * Response service class
 */
class ResponseService {
  /**
   * * function to set a success response
   * @param  {integer} statusCode
   * @param  {string} message
   * @param  {object} data
   * @returns {object} object
   */
  static setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  /**
   * * function to set response error
   * @param  {integer} statusCode
   * @param  {string} message
   * @returns {object} object
   */
  static setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
   * * function to send a response
   * @param  {object} res
   * @returns {object} object
   */
  static send(res) {
    if (this.type === 'success') {
      return res.status(this.statusCode).json({
        status: this.statusCode,
        message: this.message,
        data: this.data,
      });
    }
    return res.status(this.statusCode).json({
      status: this.statusCode,
      message: this.message,
    });
  }

  /**
   * * Handle Success Response
   * @param  {integer} statusCode
   * @param  {string} message
   * @param  {object} data
   * @param  {object} res
   * @returns {object} Object
   */
  static handleSuccessResponse(statusCode, message, data, res) {
    this.setSuccess(statusCode, message, data);
    return this.send(res);
  }

  /**
   * * Handle Error Response
   * @param  {integer} statusCode
   * @param  {string} message
   * @param  {object} res
   * @returns {object} Object
   */
  static handleErrorResponse(statusCode, message, res) {
    this.setError(statusCode, message);
    return this.send(res);
  }
}
export default ResponseService;

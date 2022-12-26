import Joi from 'joi';
import { CURRENCIES, WALLET_TYPES } from '../utils/variable';

/**
 * Validation for wallets
 */
class WalletValidation {
  /**
   * validates user object upon wallet creation
   * @param {Object} body
   * @returns {Joi.ValidationResult} Joi validation result
   */
  static async create(body) {
    const schema = Joi.object({
      type: Joi.string()
        .trim()
        .valid(...WALLET_TYPES)
        .required(),
      currency: Joi.string()
        .trim()
        .valid(...CURRENCIES)
        .required(),
    });
    return schema.validate(body, { abortEarly: false });
  }
}
export default WalletValidation;

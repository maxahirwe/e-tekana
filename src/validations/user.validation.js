import _ from 'lodash';
import JoiDefault from 'joi';
import JoiPhoneNumber from 'joi-phone-number';
import { Op } from 'sequelize';
import models from '../database/models';
import { SUPPORTED_LANGUAGES } from '../utils/variable';

const Joi = JoiDefault.extend(JoiPhoneNumber);

const { UserRole, User } = models;

const NidLength = 16;
const minPassword = 8;
const maxPassword = 30;

/**
 * Validation for users
 */
class UserValidation {
  /**
   * validates user object upon registration
   * @param {Object} body contains key firstName, lastName, email, password, cPassword, role
   * @returns {Joi.ValidationResult} Joi validation result
   */
  static async registration(body) {
    const schema = Joi.object({
      nationalId: Joi.string()
        .trim()
        .required()
        .length(NidLength)
        .messages({
          'any.required': 'nationalId is required',
          'string.length': `nationalId must be ${NidLength} characters`,
          'string.empty': 'nationalId is not allowed to be empty',
        }),
      email: Joi.string().trim().email().required().messages({
        'any.required': 'email is required',
        'string.empty': 'email is not allowed to be empty',
        'string.email': 'email has incorrect format',
      }),
      phone: Joi.string()
        .trim()
        .phoneNumber({
          defaultCountry: 'RW',
          format: 'e164',
          strict: true,
        })
        .required()
        .messages({
          'any.required': 'phone is required',
          'phoneNumber.invalid': 'phone has incorrect format',
        }),
      password: Joi.string()
        .trim()
        .min(minPassword)
        .max(maxPassword)
        .required()
        .messages({
          'any.required': 'password is required',
          'string.empty': 'password is not allowed to be empty',
          'string.min': `password length must be at least ${minPassword} characters long`,
          'string.max': `password length must be at most ${maxPassword} characters long`,
        }),
      confirmationPassword: Joi.string()
        .trim()
        .equal(Joi.ref('password'))
        .required()
        .messages({
          'any.required': 'confirmationPassword is required',
          'string.empty': 'confirmationPassword is not allowed to be empty',
          'any.only': 'confirmationPassword must be equal to password',
        }),
      preferredLanguage: Joi.string()
        .trim()
        .valid(...SUPPORTED_LANGUAGES)
        .default(SUPPORTED_LANGUAGES[0])
        .optional(),
      gender: Joi.string()
        .trim()
        .valid(...['Male', 'Female'])
        .default('Male')
        .optional(),
      role: Joi.string()
        .trim()
        .valid(...['customer', 'admin'])
        .default('customer')
        .optional(),
    });
    return schema.validate(body, { abortEarly: false });
  }

  /**
   * validates user object upon user confirming account
   * @param {Object} body
   * @returns {Joi.ValidationResult} Joi validation result
   */
  static async confirm(body) {
    const schema = Joi.object({
      confirmationToken: Joi.string().guid().required(),
    });
    return schema.validate(body, { abortEarly: false });
  }

  /**
   * validates user object upon login
   * @param {Object} body contains email, password
   * @returns {void}
   */
  static login(body) {
    const emailPattern = /^.*@.*$/;
    const emailOrPhone = _.get(body, 'emailOrPhone', '');
    const isEmail = emailOrPhone.match(emailPattern) != null;
    const email = isEmail ? emailOrPhone : null;
    const phone = !isEmail ? emailOrPhone : null;
    const adjustedBody = { ...body, email, phone };
    const schema = Joi.object({
      emailOrPhone: Joi.string().required().label('Email or Phone'),
      email: Joi.string().trim().email().label('Email').allow(null).optional(),
      phone: Joi.string()
        .phoneNumber({
          defaultCountry: 'RW',
          format: 'e164',
          strict: true,
        })
        .trim()
        .label('Phone')
        .messages({
          'phoneNumber.invalid':
            'Phone number did not seem have the right format',
        })
        .allow(null)
        .optional(),

      password: Joi.string().trim().required().messages({
        'any.required': 'password is required',
        'string.empty': 'password is not allowed to be empty',
      }),
      preferredLanguage: Joi.string()
        .trim()
        .valid(...SUPPORTED_LANGUAGES)
        .optional(),
    });
    return schema.validate(adjustedBody, { abortEarly: true });
  }
}
export default UserValidation;

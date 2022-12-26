/**
 *  Utility
 */
class Utils {
  /**
   * Generates Reference number of each transaction
   * @returns {Strin} Registered User
   */
  static generateTransactionRefNumber() {
    return `E-TKN${new Date().getTime()}`;
  }
}

export default Utils;

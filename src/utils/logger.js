import winston from 'winston';
import Transport from 'winston-transport';
import 'winston-daily-rotate-file';
import path from 'path';

/**
 * Transport to save all logs to the database
 */
class DbTransport extends Transport {
  /**
   * Constructor
   * @param {Object} opts
   * @returns {void}
   */
  constructor(opts) {
    super(opts);
    this.pool = opts.dbPool;
    this.dbQuery = opts.dbQuery;
  }

  /**
   * @param {String} info
   * @param {Function} callback
   * @returns {void}
   */
  async log(info, callback) {
    // do whatever you want with log data
    await this.dbQuery(this.pool, info.level, info.message);
    callback();
  }
}

const logger = (logsPath = '', dbPool, dbQuery) => {
  const logPath = path.join(__dirname, '../..', 'logs', logsPath);
  const exceptionsLogPath = path.join(
    __dirname,
    '../..',
    'logs',
    logsPath,
    'exceptions.log',
  );
  const rejectionsLogPath = path.join(
    __dirname,
    '../..',
    'logs',
    logsPath,
    'rejections.log',
  );
  const winstonFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
  );
  const transports = [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      dirname: logPath,
      filename: 'application',
      extension: '.log',
      datePattern: 'YYYY-w',
    }),
  ];
  if (dbPool && dbQuery) {
    transports.push(new DbTransport({ dbPool, dbQuery }));
  }
  const createdLogger = winston.createLogger({
    format: winstonFormat,
    transports,
  });
  if (process.env.NODE_ENV.toLowerCase() === 'production'.toLowerCase()) {
    createdLogger.exceptions.handle(
      new winston.transports.File({ filename: exceptionsLogPath }),
    );
    createdLogger.rejections.handle(
      new winston.transports.File({ filename: rejectionsLogPath }),
    );
  }
  return createdLogger;
};

export default logger;

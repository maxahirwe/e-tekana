import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import configureSwagger from './swagger';
import errorMiddleware from './middlewares/error.middleware';
import requestLogger, { loggerFormat } from './utils/requestLogger';

const app = express();

app.use(cors());
configureSwagger(app);
app.use(helmet());
app.use(morgan('dev'));
app.use(morgan(loggerFormat, { stream: requestLogger.stream }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '2mb' }));
app.use('/', routes);
app.use('/', errorMiddleware);

export default app;

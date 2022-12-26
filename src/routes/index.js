import express from 'express';
import AppController from '../controllers/app.controller';
import authRoute from './auth.route';
import walletRoute from './wallet.route';
import transactionRoute from './transaction.route';

const app = express();

app.use('/api/auth', authRoute);
app.use('/api/wallet', walletRoute);
app.use('/api/transaction', transactionRoute);

app.get('/', AppController.landRoute);
app.use('/', AppController.notFoundRoute);

export default app;

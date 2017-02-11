import { Router } from 'express';
import UsersController from './controllers/users.js';

export default (app) => {
    const api = Router();

    api.use('/users', UsersController);
}
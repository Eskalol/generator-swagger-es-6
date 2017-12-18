/* eslint-disable import/prefer-default-export */

import mongoose from 'mongoose';
import config from '../config/environment';
import User from '../models/user';
import { isAuthenticated } from './auth.service';

require('./local/passport').setup(User, config);

/**
 * @brief json web token middleware for swagger.
 * @details this middleware is called by swagger-express-mw.
 *  See swagger.yaml for security definition.
 *
 * @param req request object
 * @param res response object
 * @param next next middleware
 * @return returns null
 */
export function jwt(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).end();
    return null;
  }
  isAuthenticated(req, res)
    .then(user => user.hasAccess(req.swagger.operation['x-security-scope']))
    .then(() => {
      next();
      return null;
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(500).end();
      } else {
        res.status(err.error).json({ message: err.message });
      }
      return null;
    });
  return null;
}

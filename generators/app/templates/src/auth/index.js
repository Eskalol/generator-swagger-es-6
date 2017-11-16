import config from '../config/environment';
import User from '../models/User';
import { isAuthenticated } from './auth.service';
import mongoose from 'mongoose';

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
    .then(user => {
      return user.hasAccess(req.swagger.operation['x-security-scope']);
    })
    .then(user => {
      next();
      return null;
    })
    .catch(err => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(500).end();
      } else {
        res.status(err.error).json({ message: err.message });
      }
      return null;
    });
}

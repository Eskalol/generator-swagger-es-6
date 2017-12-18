import jwt from 'jsonwebtoken';
import { promisify } from 'bluebird';
import config from '../config/environment';
import User from '../models/user';

const verify = promisify(jwt.verify);

/**
 * @brief checks if user is authenticated.
 * @details [long description]
 *
 * @param req request
 * @return [description]
 */
export function isAuthenticated(req) {
  return verify(req.headers.authorization, config.secrets.session)
    .then(decode =>
    // find user model
      User.findById(decode._id).exec(),
    )
    .then((user) => {
      if (!user) {
      // reject promise with custom message
        return Promise.reject({ error: 401, message: 'User not found' });
      }
      // attach user to request object.
      req.user = user;
      return user;
    });
}

/**
 * @brief Returns a jwt token signed by the app secret.
 *
 * @param id of user
 * @param role of user
 *
 * @return jwt token signed by the app secret.
 */
export function signToken(id, role) {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5,
  });
}

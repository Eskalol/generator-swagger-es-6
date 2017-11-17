/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /user              ->  index
 * POST    /user              ->  create
 * GET     /user/:id          ->  show
 * DELETE  /user/:id          ->  destroy
 * GET     /user/me           ->  showUserMe
 * PUT     /user/me           ->  upsertUserMe
 */

import User from '../../models/user';
import { signToken } from '../../auth/auth.service';
import {
  respondWithResult,
  handleError,
  handleEntityNotFound,
  removeEntity,
} from './helpers';

// Gets a list of persons
export function indexUser(req, res) {
  return User.find().exec()
    .then(users => users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a specific User by id
export function showUser(req, res) {
  return User.findById(req.swagger.params.id.value).exec()
    .then(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Request user
export function showUserMe(req, res) {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
}

// change email or password
export function upsertUserMe(req, res) {
  let message = '';
  if (req.body.email) {
    req.user.email = req.body.email;
    message += 'Email has been updated. ';
  }
  if (req.body.password) {
    req.user.password = req.body.password;
    message += 'Password has been updated.';
  }
  return req.user.save()
    .then(() => {
      res.status(200).json({
        message,
      });
      return null;
    })
    .catch(handleError(res));
}

// Creates a User
export function createUser(req, res) {
  const newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  return newUser.save()
    .then(user => ({ token: signToken(user._id, user.role) }))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// destroy a specifix User
export function destroyUser(req, res) {
  return User.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


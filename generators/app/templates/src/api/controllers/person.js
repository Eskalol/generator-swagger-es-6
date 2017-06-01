/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /person              ->  index
 * POST    /person              ->  create
 * GET     /person/:id          ->  show
 * PUT     /person/:id          ->  upsert
 * PATCH   /person/:id          ->  patch
 * DELETE  /person/:id          ->  destroy
 */

import Person from '../../models/person';
import {
  respondWithResult,
  handleError,
  handleEntityNotFound,
  patchUpdates,
  removeEntity,
} from './helpers';

// Gets a list of persons
function index(req, res) {
  return Person.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a specific person by id
function show(req, res) {
  return Person.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a person
function create(req, res) {
  return Person.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// upsert(put) a specific person
function upsert(req, res) {
  return Person.findOneAndUpdate({
    _id: req.swagger.params.id.value,
  },
  req.body,
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    }).exec()
  .then(respondWithResult(res, 200))
  .catch(handleError(res));
}

// patch a specific person
function patch(req, res) {
  return Person.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// destroy a specifix person
function destroy(req, res) {
  return Person.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export { index, show, upsert, patch, destroy, create };

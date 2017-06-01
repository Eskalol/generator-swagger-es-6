/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     <%= route %>              ->  index
 * POST    <%= route %>              ->  create
 * GET     <%= route %>/:id          ->  show
 * PUT     <%= route %>/:id          ->  upsert
 * PATCH   <%= route %>/:id          ->  patch
 * DELETE  <%= route %>/:id          ->  destroy
 */

import <%= model %> from '../../models/<%= model %>';
import {
  respondWithResult,
  handleError,
  handleEntityNotFound,
  patchUpdates,
  removeEntity,
} from './helpers';

// Gets a list of persons
function index(req, res) {
  return <%= model %>.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a specific <%= model %> by id
function show(req, res) {
  return <%= model %>.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a <%= model %>
function create(req, res) {
  return <%= model %>.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// upsert(put) a specific <%= model %>
function upsert(req, res) {
  return <%= model %>.findOneAndUpdate({
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

// patch a specific <%= model %>
function patch(req, res) {
  return <%= model %>.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// destroy a specifix <%= model %>
function destroy(req, res) {
  return <%= model %>.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export { index, show, upsert, patch, destroy, create };

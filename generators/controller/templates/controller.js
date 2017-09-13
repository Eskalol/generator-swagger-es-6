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
export function index<%= model %>(req, res) {
  return <%= model %>.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a specific <%= model %> by id
export function show<%= model %>(req, res) {
  return <%= model %>.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a <%= model %>
export function create<%= model %>(req, res) {
  return <%= model %>.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// upsert(put) a specific <%= model %>
export function upsert<%= model %>(req, res) {
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
export function patch<%= model %>(req, res) {
  return <%= model %>.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// destroy a specifix <%= model %>
export function destroy<%= model %>(req, res) {
  return <%= model %>.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


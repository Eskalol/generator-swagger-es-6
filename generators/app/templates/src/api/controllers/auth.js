/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /auth              ->  index
 * POST    /auth              ->  create
 * GET     /auth/:id          ->  show
 * PUT     /auth/:id          ->  upsert
 * PATCH   /auth/:id          ->  patch
 * DELETE  /auth/:id          ->  destroy
 */
import {
  respondWithResult,
  handleError,
} from './helpers';

import local from '../../auth/local';

export function login(req, res, next) {
  local(req, res, next);
}

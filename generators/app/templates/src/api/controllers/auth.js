/* eslint-disable import/prefer-default-export */

/**
 * POST     /auth/login         ->  login
 */
import local from '../../auth/local';

export function login(req, res, next) {
  local(req, res, next);
}

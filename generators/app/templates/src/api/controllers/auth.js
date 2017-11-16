/**
 * POST     /auth/login         ->  login
 */
import local from '../../auth/local';

export function login(req, res, next) {
  local(req, res, next);
}

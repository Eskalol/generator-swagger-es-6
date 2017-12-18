/* eslint-disable import/prefer-default-export, consistent-return */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase(),
  }).exec()
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.',
        });
      }
      user.authenticate(password, (authError, authenticated) => {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'The password is not correct.' });
        }
        return done(null, user);
      });
    })
    .catch(err => done(err));
}

export function setup(User/* , config */) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', // this is the virtual field on the model
  }, ((email, password, done) => localAuthenticate(User, email, password, done))));
}

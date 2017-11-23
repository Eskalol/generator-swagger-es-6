'use strict';

import app from '../../app';
import User from '../../models/user';

var user;
const genUser = () => {
  user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@example.com',
    password: 'password'
  });
  return user;
};

describe('User Model', () => {
  before(() => {
    // Clear users before testing
    return User.remove();
  });

  beforeEach(() => {
    genUser();
  });

  afterEach(() => {
    return User.remove();
  });

  it('should begin with no users', () => {
    return expect(User.find({}).exec()).to
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', () => {
    return expect(user.save()
      .then(() => {
        var userDup = genUser();
        return userDup.save();
      })).to.be.rejected;
  });

  describe('#email', () => {
    it('should fail when saving with a blank email', () => {
      user.email = '';
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving with a null email', () => {
      user.email = null;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving without an email', () => {
      user.email = undefined;
      return expect(user.save()).to.be.rejected;
    });
  });

  describe('#password', () => {
    it('should fail when saving with a blank password', () => {
      user.password = '';
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving with a null password', () => {
      user.password = null;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving without a password', () => {
      user.password = undefined;
      return expect(user.save()).to.be.rejected;
    });

    describe('given the user has been previously saved', () => {
      beforeEach(() => {
        return user.save();
      });

      it('should authenticate user if valid', () => {
        expect(user.authenticate('password')).to.be.true;
      });

      it('should not authenticate user if invalid', () => {
        expect(user.authenticate('blah')).to.not.be.true;
      });

      it('should remain the same hash unless the password is updated', () => {
        user.name = 'Test User';
        return expect(user.save()
          .then((u) => {
            return u.authenticate('password');
          })).to.eventually.be.true;
      });
    });
  });
});

import should from 'should';
import request from 'supertest';
import server from '../../index';
import User from '../../models/user';
import { promisify } from 'bluebird';
import jwt from 'jsonwebtoken';
import config from '../../config/environment';

const verify = promisify(jwt.verify);

var requestUser, token;

const generateUser = (name, email, password, role) => {
  return new User({
    provider: 'local',
    name,
    email,
    password,
    role
  }).save();
}

const generateRequestUser = (role) => {
  requestUser = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@example.com',
    password: 'password',
    role: role
  });
  return requestUser;
};

describe('controllers', () => {
  describe('Not authenticated', () => {
    describe('POST /user', () => {
      after(() => {
        return User.remove();
      })
      it('should create user normally', (done) => {
        request(server)
          .post('/user')
          .send({
            name: 'test user',
            email: 'some@example.com',
            password: 'password'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.token.should.be.an.instanceOf(String);
            verify(res.body.token, config.secrets.session)
              .then((decode) => {
                return User.findById(decode._id);
              })
              .then(user => {
                should(user.name).eql('test user');
                should(user.email).eql('some@example.com');
                should(user.role).eql('user');
                done();
                return null;
              });
          });
      });
    });

    describe('GET /user', () => {
      var testUser1, testUser2;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return generateUser('Name2', 'email2@example.com', 'abc', 'admin');
          })
          .then((user) => {
            testUser2 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove()
          .then(() => {
            return testUser2.remove();
          });
      });

      it('should respond with 401 when not authenticated', (done) => {
        request(server)
          .get('/user')
          .expect(401)
          .end(done);
      });
    });

    describe('GET /user/:id', () => {
      var testUser1;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove();
      });

      it('should respond with 401 when not authenticated', (done) => {
        request(server)
          .get(`/user/${testUser1._id}`)
          .expect(401)
          .end(done);
      });
    });

    describe('GET /user/me', () => {
      it('should respond with 401 when not authenticated', (done) => {
        request(server)
          .get('/user/me')
          .expect(401)
          .end(done);
      });
    });

    describe('PUT /user/me', () => {
      it('should respond with 401 when not authenticated', (done) => {
        request(server)
          .put('/user/me')
          .send({
            password: '123',
            email: 'lol@example.com'
          })
          .set('Accept', 'application/json')
          .expect(401)
          .end(done);
      });
    });

    describe('DELETE /user/:id', () => {
      var testUser1;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove();
      });

      it('should respond with 401 when not authenticated', (done) => {
        request(server)
          .delete(`/user/${testUser1._id}`)
          .expect(401)
          .end(done);
      });
    });
  });

  describe('User with role user', () => {
    before(() => {
      return User.remove()
        .then(() => {
          return generateRequestUser('user');
        })
        .then(user => {
          return user.save();
        })
        .then(() => {
          return request(server)
            .post('/auth/login')
            .send({
              email: 'test@example.com',
              password: 'password'
            })
            .expect(200)
            .expect('Content-Type', /json/);
        })
        .then(res => {
          token = res.body.token;
        });
    });

    describe('GET /user', () => {
      var testUser1, testUser2;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return generateUser('Name2', 'email2@example.com', 'abc', 'admin');
          })
          .then((user) => {
            testUser2 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove()
          .then(() => {
            return testUser2.remove();
          });
      });

      it('should return a list with Users', (done) => {
        request(server)
          .get('/user')
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Array);
            res.body.should.have.length(3);
            res.body[0].name.should.eql('Fake User');
            res.body[0].email.should.eql('test@example.com');
            res.body[0].role.should.eql('user');
            res.body[0]._id.should.eql(`${requestUser._id}`);
            should.not.exists(res.body[0].password);
            should.not.exists(res.body[0].salt);
            should.not.exists(res.body[0].provider);

            res.body[1].name.should.eql('Name1');
            res.body[1].email.should.eql('email1@example.com');
            res.body[1].role.should.eql('user');
            res.body[1]._id.should.eql(`${testUser1._id}`);
            should.not.exists(res.body[1].password);
            should.not.exists(res.body[1].salt);
            should.not.exists(res.body[1].provider);

            res.body[2].name.should.eql('Name2');
            res.body[2].email.should.eql('email2@example.com');
            res.body[2].role.should.eql('admin');
            res.body[2]._id.should.eql(`${testUser2._id}`);
            should.not.exists(res.body[2].password);
            should.not.exists(res.body[2].salt);
            should.not.exists(res.body[2].provider);
            done();
          });
      });
    });

    describe('GET /user/:id', () => {
      var testUser1;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove();
      });

      it('should return a specific user by id', (done) => {
        request(server)
          .get(`/user/${testUser1._id}`)
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Object);
            res.body.name.should.eql('Name1');
            res.body.email.should.eql('email1@example.com');
            res.body.role.should.eql('user');
            res.body._id.should.eql(`${testUser1._id}`);
            should.not.exists(res.body.password);
            should.not.exists(res.body.salt);
            should.not.exists(res.body.provider);
            done();
          });
      });
    });

    describe('GET /user/me', () => {
      it('should return request user', (done) => {
        request(server)
          .get('/user/me')
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Object);
            res.body.name.should.eql('Fake User');
            res.body.email.should.eql('test@example.com');
            res.body.role.should.eql('user');
            res.body._id.should.eql(`${requestUser._id}`);
            should.not.exists(res.body.password);
            should.not.exists(res.body.salt);
            should.not.exists(res.body.provider);
            done();
          });
      });
    });

    describe('PUT /user/me', () => {
      it('should update password', (done) => {
        let passwordHash = requestUser.password;
        let email = requestUser.email;
        request(server)
          .put('/user/me')
          .send({
            password: '123'
          })
          .set('Accept', 'application/json')
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.message.should.eql('Password has been updated.');
            User.findById(requestUser._id).exec()
              .then(user => {
                should(passwordHash).not.be.eql(user.password);
                should(email).eql(user.email);
                requestUser = user;
                done();
              });
          });
      });

      it('should update email', (done) => {
        let passwordHash = requestUser.password;
        let email = requestUser.email;
        request(server)
          .put('/user/me')
          .send({
            email: 'lol@example.com'
          })
          .set('Accept', 'application/json')
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.message.should.eql('Email has been updated. ');
            User.findById(requestUser._id).exec()
              .then(user => {
                should(passwordHash).eql(user.password);
                should(email).not.be.eql(user.email);
                should(user.email).eql('lol@example.com');
                done();
              });
          });
      });
    });

    describe('DELETE /user/:id', () => {
      var testUser1;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove();
      });

      it('should respond with 403 permission denied', (done) => {
        request(server)
          .delete(`/user/${testUser1._id}`)
          .set('authorization', `${token}`)
          .expect(403)
          .end((err, res) => {
            should.not.exists(err);
            res.body.message.should.eql('The user does not have permission');
            done();
          });
      });
    });
  });

  describe('User with role admin', () => {
    before(() => {
      return User.remove()
        .then(() => {
          return generateRequestUser('admin');
        })
        .then(user => {
          return user.save();
        })
        .then(() => {
          return request(server)
            .post('/auth/login')
            .send({
              email: 'test@example.com',
              password: 'password'
            })
            .expect(200)
            .expect('Content-Type', /json/);
        })
        .then(res => {
          token = res.body.token;
        });
    });

    describe('GET /user', () => {
      var testUser1, testUser2;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return generateUser('Name2', 'email2@example.com', 'abc', 'admin');
          })
          .then((user) => {
            testUser2 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove()
          .then(() => {
            return testUser2.remove();
          });
      });

      it('should return a list with Users', (done) => {
        request(server)
          .get('/user')
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Array);
            res.body.should.have.length(3);
            res.body[0].name.should.eql('Fake User');
            res.body[0].email.should.eql('test@example.com');
            res.body[0].role.should.eql('admin');
            res.body[0]._id.should.eql(`${requestUser._id}`);
            should.not.exists(res.body[0].password);
            should.not.exists(res.body[0].salt);
            should.not.exists(res.body[0].provider);

            res.body[1].name.should.eql('Name1');
            res.body[1].email.should.eql('email1@example.com');
            res.body[1].role.should.eql('user');
            res.body[1]._id.should.eql(`${testUser1._id}`);
            should.not.exists(res.body[1].password);
            should.not.exists(res.body[1].salt);
            should.not.exists(res.body[1].provider);

            res.body[2].name.should.eql('Name2');
            res.body[2].email.should.eql('email2@example.com');
            res.body[2].role.should.eql('admin');
            res.body[2]._id.should.eql(`${testUser2._id}`);
            should.not.exists(res.body[2].password);
            should.not.exists(res.body[2].salt);
            should.not.exists(res.body[2].provider);
            done();
          });
      });
    });

    describe('GET /user/:id', () => {
      var testUser1;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove();
      });

      it('should return a specific user by id', (done) => {
        request(server)
          .get(`/user/${testUser1._id}`)
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Object);
            res.body.name.should.eql('Name1');
            res.body.email.should.eql('email1@example.com');
            res.body.role.should.eql('user');
            res.body._id.should.eql(`${testUser1._id}`);
            should.not.exists(res.body.password);
            should.not.exists(res.body.salt);
            should.not.exists(res.body.provider);
            done();
          });
      });
    });

    describe('GET /user/me', () => {
      it('should return request user', (done) => {
        request(server)
          .get('/user/me')
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Object);
            res.body.name.should.eql('Fake User');
            res.body.email.should.eql('test@example.com');
            res.body.role.should.eql('admin');
            res.body._id.should.eql(`${requestUser._id}`);
            should.not.exists(res.body.password);
            should.not.exists(res.body.salt);
            should.not.exists(res.body.provider);
            done();
          });
      });
    });

    describe('PUT /user/me', () => {
      it('should update password', (done) => {
        let passwordHash = requestUser.password;
        let email = requestUser.email;
        request(server)
          .put('/user/me')
          .send({
            password: '123'
          })
          .set('Accept', 'application/json')
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.message.should.eql('Password has been updated.');
            User.findById(requestUser._id).exec()
              .then(user => {
                should(passwordHash).not.be.eql(user.password);
                should(email).eql(user.email);
                requestUser = user;
                done();
              });
          });
      });

      it('should update email', (done) => {
        let passwordHash = requestUser.password;
        let email = requestUser.email;
        request(server)
          .put('/user/me')
          .send({
            email: 'lol@example.com'
          })
          .set('Accept', 'application/json')
          .set('authorization', `${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.message.should.eql('Email has been updated. ');
            User.findById(requestUser._id).exec()
              .then(user => {
                should(passwordHash).eql(user.password);
                should(email).not.be.eql(user.email);
                should(user.email).eql('lol@example.com');
                done();
              });
          });
      });
    });

    describe('DELETE /user/:id', () => {
      var testUser1;
      before(() => {
        return generateUser('Name1', 'email1@example.com', '123', 'user')
          .then(user => {
            testUser1 = user;
            return null;
          });
      });

      after(() => {
        return testUser1.remove();
      });

      it('should delete user normally', (done) => {
        let userid = testUser1._id;
        request(server)
          .delete(`/user/${testUser1._id}`)
          .set('authorization', `${token}`)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            User.findById(testUser1)
              .then(user => {
                should.not.exists(user);
                done();
              });
          });
      });
    });
  });
});

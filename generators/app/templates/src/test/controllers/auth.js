import should from 'should';
import request from 'supertest';
import server from '../../index';
import User from '../../models/user';
import { promisify } from 'bluebird';
import jwt from 'jsonwebtoken';
import config from '../../config/environment';

const verify = promisify(jwt.verify);

var user;
const genUser = () => {
  user = new User({
    name: 'Fake User',
    email: 'test@example.com',
    password: 'password',
    provider: 'local',
    role: 'user'
  });
  return user;
}

describe('controllers', () => {
  describe('auth', () => {
    before(() => {
      return User.remove()
        .then(() => {
          return genUser();
        })
        .then(user => {
          return user.save();
        });
    });

    describe('POST /auth/login', () => {
      it('should authenticate and receive correct jwt token', (done) => {
        request(server)
          .post('/auth/login')
          .send({
            email: `${user.email}`,
            password: 'password'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
            res.body.token.should.be.an.instanceOf(String);
            return verify(res.body.token, config.secrets.session);
          })
          .then((decode) => {
            should(decode._id).eql(`${user._id}`)
            done();
          });
      });
      it('should not authenticate with wrong password', (done) => {
        request(server)
          .post('/auth/login')
          .send({
            email: `${user.email}`,
            password: 'drowssap'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            res.body.message.should.eql('The password is not correct.');
            done();
          });
      });
      it('should not authenticate with wrong email', (done) => {
        request(server)
          .post('/auth/login')
          .send({
            email: 'awesome@example.com',
            password: 'password'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            res.body.message.should.eql('This email is not registered.');
            done();
          });
      });
      it('should not authenticate with wrong email and password', (done) => {
        request(server)
          .post('/auth/login')
          .send({
            email: 'awesome@example.com',
            password: 'drowssap'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            res.body.message.should.eql('This email is not registered.');
            done();
          });
      });
    });
  });
});

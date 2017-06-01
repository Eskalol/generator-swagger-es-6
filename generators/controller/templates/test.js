import should from 'should';
import request from 'supertest';
import server from '../../index';
import <%= model %> from '../../models/person';

describe('controllers', () => {
  describe('<%= controller %>', () => {

    describe('GET <%= route %>', () => {
      it('should return a list with <%= model %>s', (done) => {
        done();
      });
    });

    describe('POST <%= route %>', () => {
      it('should create a <%= model %>', (done) => {
        done();
      })
    });

    describe('GET <%= route %>/:id', () => {
      it('should return the correct <%= model %>', (done) => {
        done();
      });
    });

    describe('PUT <%= route %>/:id', () => {
      it('should update a <%= model %>', (done) => {
        done();
      });
    });

    describe('DELETE <%= route %>/:id', () => {
      it('should delete a <%= model %>', (done) => {
        done();
      });
    });
  });
});

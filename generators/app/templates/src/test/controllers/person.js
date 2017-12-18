import should from 'should';
import request from 'supertest';
import server from '../../index';
import Person from '../../models/person';

describe('controllers', () => {
  describe('person', () => {
    var person;
    before(() => {
      return Person.remove().then(() => {
        person = new Person({
          name: 'coo',
          description: 'coo coo',
          age: 3,
        });

        return person.save().then(() => {
          person = new Person({
            name: 'imba',
            description: 'insane',
            age: 42,
          });
          return person.save();
        });
      });
    });

    after(() => {
      Person.remove();
    });

    describe('GET /person', () => {
      it('should return a list with persons', (done) => {
        request(server)
          .get('/person')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Array);
            res.body.should.have.length(2);
            res.body[0].name.should.eql('coo');
            res.body[0].description.should.eql('coo coo');
            res.body[0].age.should.eql(3);
            done();
          });
      });
    });

    describe('POST /person', () => {
      it('should create a person', (done) => {
        request(server)
          .post(`/person`)
          .send({
            name: 'awesome',
            description: 'totally awesome',
            age: 20,
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Object);
            res.body.name.should.eql('awesome');
            res.body.description.should.eql('totally awesome');
            res.body.age.should.eql(20);
            done();
          });
      });
    });

    describe('GET /person/:id', () => {
      it('should return the correct person', (done) => {
        request(server)
          .get(`/person/${person._id}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.should.be.an.instanceOf(Object);
            res.body.name.should.eql('imba');
            res.body.description.should.eql('insane');
            res.body.age.should.eql(42);
            done();
          });
      });
    });

    describe('PUT /person/:id', () => {
      it('should update a person', (done) => {
        request(server)
          .put(`/person/${person._id}`)
          .send({
            name: 'imba',
            description: 'sane',
            age: 42,
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
              should.not.exists(err);
              res.body.should.be.an.instanceOf(Object);
              res.body.name.should.eql('imba');
              res.body.description.should.eql('sane');
              res.body.age.should.eql(42);
              done();
          });
      });
    });

    describe('DELETE /person/:id', () => {
      it('should delete a person', (done) => {
        request(server)
          .delete(`/person/${person._id}`)
          .expect(200)
          .end((err, res) => {
            should.not.exists(err);
            res.body.message.should.eql('entity deleted');
            done();
          });
      });
    });
  });
});

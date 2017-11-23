import server from '../../index';
import Person from '../../models/person';

var person;
const genPerson = () => {
  person = new Person({
    name: 'coo',
    description: 'coo man, coo',
    age: 42,
  });
};

describe('Person model', () => {
  before(() => {
    return Person.remove();
  });

  beforeEach(() => {
    genPerson();
  });

  afterEach(() => {
    Person.remove();
  });

  it('should begin with no persons', () => {
    return expect(Person.find({}).exec()).to
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate person', () => {
    return expect(person.save()
      .then(() => {
        const userDup = genUser();
        return userDup.save();
      })).to.be.rejected;
  });

  describe('#name', () => {
    it('should reject when saving with a blank name', () => {
      person.name = '';
      return expect(person.save()).to.be.rejected;
    });

    it('should fail when saving with a null name', function() {
      person.name = null;
      return expect(person.save()).to.be.rejected;
    });

    it('should fail when saving without a name', function() {
      person.name = undefined;
      return expect(person.save()).to.be.rejected;
    });
  });
});

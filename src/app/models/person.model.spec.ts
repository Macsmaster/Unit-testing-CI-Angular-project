import { Person } from './person.model';

describe('', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Migue', 'Coy', 31, 74, 176);
  });

  describe('Params test', () => {
    it('attrs', () => {
      expect(person.name).toEqual('Migue');
      expect(person.lastName).toEqual('Coy');
      expect(person.age).toEqual(31);
      expect(person.weight).toEqual(74);
      expect(person.height).toEqual(176);
    });
  });

  describe('Test for calcIMC', () => {
    it('Should return a string: Down', () => {
      // Arrange
      person.weight = 40;
      person.height = 1.65;
      // Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Down');
    });
    it('Should return a string: Normal', () => {
      // Arrange
      person.weight = 60;
      person.height = 1.65;
      // Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Normal');
    });
    it('Should return a string: Overweight', () => {
      // Arrange
      person.weight = 70;
      person.height = 1.65;
      // Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Overweight');
    });
    it('Should return a string: Overweight level 1', () => {
      // Arrange
      person.weight = 80;
      person.height = 1.65;
      // Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Overweight level 1');
    });
    it('Should return a string: Overweight level 2', () => {
      // Arrange
      person.weight = 90;
      person.height = 1.65;
      // Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Overweight level 2');
    });

    it('Should return a string: Overweight level 3', () => {
      // Arrange
      person.weight = 150;
      person.height = 1.65;
      // Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Overweight level 3');
    });

    it('should return a string: not found', () => {
      person.weight = 0;
      person.height = 0
      expect(person.calcIMC()).toEqual('Not found');
      person.weight = -48;
      person.height = -1.70;
      expect(person.calcIMC()).toEqual('Not found');
    })
  });
});

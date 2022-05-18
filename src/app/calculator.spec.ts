import { Calculator } from './calculator';

describe('Unit testing for Calculator', () => {

  describe('test for fn multiply', () => {
    it('#Multiply, Should return the result of the numbers multiplied', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const result = calculator.multiply(3, 3);
      // Assert
      expect(result).toBe(9);
    });
  })
  describe('test for fn divide', () => {
    it('#Divide, Should return the result of the numbers divided', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const result = calculator.divide(3, 3);
      // Assert
      expect(result).toBe(1);
    });

    it('#Divide, Should return null if the number is divide by 0', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const result = calculator.divide(3, 0);
      // Assert
      expect(result).toBeNull();
    });
  })



});

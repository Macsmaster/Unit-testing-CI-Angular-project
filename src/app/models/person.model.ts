export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number
    ) {

  }

  calcIMC(): string {
    const result = Math.round(this.weight / (this.height * this.height));

    if (result < 0) {
      return 'Not found'
    }
    else if(result >= 0 && result < 18){
      return 'Down'
    }
    else if(result >= 18 && result <= 24){
      return 'Normal'
    }
    else if(result >= 25 && result <= 26){
      return 'Overweight'
    }
    else if(result >= 27 && result <= 29){
      return 'Overweight level 1'
    }
    else if(result >= 30 && result <= 39 ){
      return 'Overweight level 2'
    }
    else if(result >= 40){
      return 'Overweight level 3'
    }
    return 'Not found'
  }
}

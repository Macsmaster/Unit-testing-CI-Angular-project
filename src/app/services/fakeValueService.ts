export class FakeValueService {

  constructor() { }

  getValue(): string {
    return 'Fake Value Service';
  }

  setValue(value: string) {}

  getPromiseValue(): Promise<string> {
    return Promise.resolve('Promise Value')
  }
}

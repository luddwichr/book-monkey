import {Book} from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book('123456789123', 'someTitle', [], new Date())).toBeTruthy();
  });
});

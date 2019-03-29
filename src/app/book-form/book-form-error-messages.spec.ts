import {ErrorMessage} from './book-form-error-messages';

describe('ErrorMessage', () => {
  it('should create an instance with the correct properties', () => {
    const errorMessage = new ErrorMessage('testControl', 'testValidator', 'testText');
    expect(errorMessage.forControl).toEqual('testControl');
    expect(errorMessage.forValidator).toEqual('testValidator');
    expect(errorMessage.text).toEqual('testText');
  });
});

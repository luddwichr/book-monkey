import {Thumbnail} from './thumbnail';

export {Thumbnail} from './thumbnail';

describe('Thumbnail', () => {
  it('should create an instance', () => {
    expect(new Thumbnail('x.y.com', 'someTitle')).toBeTruthy();
  });
});

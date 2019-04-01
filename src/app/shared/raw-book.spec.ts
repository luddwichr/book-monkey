import {RawBook, toBook} from './raw-book';

describe('RawBook', () => {
  describe('toBook', () => {
    it('should map correctly to a Book instance', () => {
      const rawBook: RawBook = {
        isbn: '1234567890',
        title: 'testTitle',
        authors: ['A', 'B'],
        published: '2019-04-01',
        subtitle: 'testSubtitle',
        rating: 5,
        thumbnails: [{url: 'x', title: 'y'}],
        description: 'testDescription'
      };

      expect(toBook(rawBook)).toEqual({
        isbn: '1234567890',
        title: 'testTitle',
        authors: ['A', 'B'],
        published: new Date(Date.UTC(2019, 3, 1)),
        subtitle: 'testSubtitle',
        rating: 5,
        thumbnails: [{url: 'x', title: 'y'}],
        description: 'testDescription'
      });
    });
  });
});

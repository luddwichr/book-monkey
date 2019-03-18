import {advanceTo, clear} from 'jest-date-mock';
import {Book} from './book';
import {BookFactory} from './book-factory';
describe('BookFactory', () => {
  describe('createEmptyBook', () => {
    it('should create an empty book', () => {
      const publicationDate = new Date(Date.UTC(2019, 2, 17));
      advanceTo(publicationDate);

      const expectedBook = {
        isbn: '',
        title: '',
        authors: [],
        published: publicationDate,
        subtitle: '',
        rating: 0,
        thumbnails: [{url: '', title: ''}],
        description: ''
      };

      expect(BookFactory.createEmptyBook()).toEqual(expectedBook);
    });

    afterEach(() => clear());
  });

  describe('fromObject', () => {
    const expectedBook = {
      isbn: '123',
      title: 'testTitle',
      authors: ['A', 'B'],
      published: new Date(Date.UTC(2019, 2, 18)),
      subtitle: 'testSubtitle',
      rating: 5,
      thumbnails: [{url: 'http://test.com', title: 'testThumbnail'}],
      description: 'testDescription'
    };
    it('should create a book with the fields retrieved from a raw object', () => {
      const actualBook: Book = BookFactory.createFromObject(expectedBook);
      expect(actualBook).toEqual(expectedBook);
    });

    it('should parse `published` as Date if it is provided as string', () => {
      const actualBook: Book = BookFactory.createFromObject({...expectedBook, published: '2019-03-18'});
      expect(actualBook).toEqual(expectedBook);
    });
  });
});

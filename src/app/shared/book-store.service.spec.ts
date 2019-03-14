import {TestBed} from '@angular/core/testing';
import {BookStoreService} from './book-store.service';

describe('BookStoreService', () => {
  let bookStoreService: BookStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookStoreService]
    });
    bookStoreService = TestBed.get(BookStoreService);
  });

  describe('getAll', () => {
    it('should return two books', done => {
      bookStoreService.getAll().subscribe(allBooks => {
        expect(allBooks).toHaveLength(2);
        done();
      });
    });
  });

  describe('getByIsbn', () => {
    it('should return the book matching the given isbn', done => {
      bookStoreService.getByIsbn('9783864906466').subscribe(book => {
        expect(book.isbn).toEqual('9783864906466');
        done();
      });
    });
  });
});

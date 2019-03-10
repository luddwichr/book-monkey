import {TestBed} from '@angular/core/testing';

import {BookStoreService} from './book-store.service';

describe('BookStoreService', () => {
  let bookStoreService: BookStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    bookStoreService = TestBed.get(BookStoreService);
  });

  it('should be created', () => {
    expect(bookStoreService).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return two books', () => {
      expect(bookStoreService.getAll()).toHaveLength(2);
    });
  });

  describe('getByIsbn', () => {
    it('should return the book matching the given isbn', () => {
      expect(bookStoreService.getByIsbn('9783864906466').isbn).toEqual('9783864906466');
    });
  });
});

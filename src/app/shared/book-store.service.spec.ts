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

  it('should return two books', () => {
    expect(bookStoreService.getAll()).toHaveLength(2);
  });
});

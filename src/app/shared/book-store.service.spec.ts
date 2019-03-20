import {HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Book} from './book';
import {BookFactory} from './book-factory';
import {BookStoreService} from './book-store.service';

describe('BookStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookStoreService],
      imports: [HttpClientTestingModule]
    });
  });

  function setup() {
    const bookStoreService: BookStoreService = TestBed.get(BookStoreService);
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    return {bookStoreService, httpMock};
  }

  afterEach(() => {
    const {httpMock} = setup();
    httpMock.verify();
  });

  describe('getAll', () => {
    it('should return all books retrieved from the Book Monkey API', done => {
      const expectedBooks = [BookFactory.createEmptyBook(), BookFactory.createEmptyBook()];
      const {bookStoreService, httpMock} = setup();
      bookStoreService.getAll().subscribe((allBooks: Book[]) => {
        expect(allBooks).toEqual(expectedBooks);
        done();
      });
      httpMock.expectOne({url: 'https://book-monkey2-api.angular-buch.com/books', method: 'GET'}).flush(expectedBooks);
    });

    it('should throw an error if the API call failed', done => {
      const {bookStoreService, httpMock} = setup();
      const expectedError = new ErrorEvent('Network error', {message: 'Some Error'});

      bookStoreService.getAll().subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );

      httpMock.expectOne({url: 'https://book-monkey2-api.angular-buch.com/books', method: 'GET'}).error(expectedError);
    });
  });

  describe('getByIsbn', () => {
    it('should return the book retrieved from the Book Monkey API for the given isbn', done => {
      const {bookStoreService, httpMock} = setup();
      const expectedBook = BookFactory.createEmptyBook();
      bookStoreService.getByIsbn('123').subscribe(book => {
        expect(book).toEqual(expectedBook);
        done();
      });
      httpMock
        .expectOne({url: 'https://book-monkey2-api.angular-buch.com/book/123', method: 'GET'})
        .flush(expectedBook);
    });

    it('should throw an error if the API call failed', done => {
      const {bookStoreService, httpMock} = setup();
      const expectedError = new ErrorEvent('Network error', {message: 'Some Error'});

      bookStoreService.getByIsbn('123').subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );

      httpMock
        .expectOne({url: 'https://book-monkey2-api.angular-buch.com/book/123', method: 'GET'})
        .error(expectedError);
    });
  });

  describe('create', () => {
    it('should send a request to the Book Monkey API to create the given book', done => {
      const {bookStoreService, httpMock} = setup();
      const bookToCreate = {...BookFactory.createEmptyBook(), isbn: '123'};
      const expectedCreatedBook = BookFactory.createEmptyBook();
      bookStoreService.create(bookToCreate).subscribe((createdBook: Book) => {
        expect(createdBook).toEqual(expectedCreatedBook);
        done();
      });

      const mockRequest = httpMock.expectOne(
        request =>
          request.url === 'https://book-monkey2-api.angular-buch.com/book' &&
          request.method === 'POST' &&
          request.body === JSON.stringify(bookToCreate) &&
          request.headers.get('Content-Type') === 'application/json'
      );

      mockRequest.flush(expectedCreatedBook);
    });

    it('should throw an error if the API call failed', done => {
      const {bookStoreService, httpMock} = setup();
      const expectedError = new ErrorEvent('Network error', {message: 'Some Error'});

      bookStoreService.create(BookFactory.createEmptyBook()).subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );

      httpMock.expectOne({url: 'https://book-monkey2-api.angular-buch.com/book', method: 'POST'}).error(expectedError);
    });
  });

  describe('update', () => {
    it('should send a request to the Book Monkey API to update the given book', done => {
      const {bookStoreService, httpMock} = setup();
      const bookToUpdate = {...BookFactory.createEmptyBook(), isbn: '123'};
      const expectedUpdatedBook = BookFactory.createEmptyBook();
      bookStoreService.update(bookToUpdate).subscribe((updatedBook: Book) => {
        expect(updatedBook).toEqual(expectedUpdatedBook);
        done();
      });

      const mockRequest = httpMock.expectOne(
        request =>
          request.url === 'https://book-monkey2-api.angular-buch.com/book/123' &&
          request.method === 'PUT' &&
          request.body === JSON.stringify(bookToUpdate) &&
          request.headers.get('Content-Type') === 'application/json'
      );

      mockRequest.flush(expectedUpdatedBook);
    });

    it('should throw an error if the API call failed', done => {
      const {bookStoreService, httpMock} = setup();
      const bookToUpdate = {...BookFactory.createEmptyBook(), isbn: '123'};
      const expectedError = new ErrorEvent('Network error', {message: 'Some Error'});

      bookStoreService.update(bookToUpdate).subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );

      httpMock
        .expectOne({url: 'https://book-monkey2-api.angular-buch.com/book/123', method: 'PUT'})
        .error(expectedError);
    });
  });

  describe('remove', () => {
    it('should send a request to the Book Monkey API to remove the given book', done => {
      const {bookStoreService, httpMock} = setup();
      const bookToRemove = {...BookFactory.createEmptyBook(), isbn: '123'};
      bookStoreService.remove(bookToRemove).subscribe(response => {
        expect(response).toEqual({});
        done();
      });

      httpMock.expectOne({url: 'https://book-monkey2-api.angular-buch.com/book/123', method: 'DELETE'}).flush({});
    });

    it('should throw an error if the API call failed', done => {
      const {bookStoreService, httpMock} = setup();
      const bookToRemove = {...BookFactory.createEmptyBook(), isbn: '123'};
      const expectedError = new ErrorEvent('Network error', {message: 'Some Error'});

      bookStoreService.remove(bookToRemove).subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );

      httpMock
        .expectOne({url: 'https://book-monkey2-api.angular-buch.com/book/123', method: 'DELETE'})
        .error(expectedError);
    });
  });

  describe('search', () => {
    it('should return all books from the Book Monkey API that match the given search term', done => {
      const {bookStoreService, httpMock} = setup();
      const expectedMatchingBooks = [BookFactory.createEmptyBook(), BookFactory.createEmptyBook()];
      bookStoreService.search('test').subscribe((matchingBooks: Book[]) => {
        expect(matchingBooks).toEqual(expectedMatchingBooks);
        done();
      });

      httpMock
        .expectOne({url: 'https://book-monkey2-api.angular-buch.com/books/search/test', method: 'GET'})
        .flush(expectedMatchingBooks);
    });

    it('should throw an error if the API call failed', done => {
      const {bookStoreService, httpMock} = setup();
      const expectedError = new ErrorEvent('Network error', {message: 'Some Error'});

      bookStoreService.search('test').subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );

      httpMock
        .expectOne({url: 'https://book-monkey2-api.angular-buch.com/books/search/test', method: 'GET'})
        .error(expectedError);
    });
  });
});

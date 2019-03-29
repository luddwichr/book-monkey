import {HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {BookBuilder} from 'src/testing';
import {Book} from './book';
import {BookStoreService} from './book-store.service';

const baseUrl = 'https://book-monkey2-api.angular-buch.com/';

describe('BookStoreService', () => {
  let bookStoreService: BookStoreService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookStoreService],
      imports: [HttpClientTestingModule]
    });
    bookStoreService = TestBed.get(BookStoreService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAll', () => {
    it('should return all books retrieved from the Book Monkey API', done => {
      const expectedBooks = [BookBuilder.createSomeBook(), BookBuilder.createSomeBook()];
      bookStoreService.getAll().subscribe((allBooks: Book[]) => {
        expect(allBooks).toEqual(expectedBooks);
        done();
      });
      httpMock.expectOne({url: baseUrl + 'books', method: 'GET'}).flush(expectedBooks);
    });

    it('should throw an error if retrieving all books failed', done => {
      const expectedError = new ErrorEvent('getAllError');
      bookStoreService.getAll().subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );
      httpMock.expectOne({url: baseUrl + 'books', method: 'GET'}).error(expectedError);
    });
  });

  describe('getByIsbn', () => {
    it('should return the book retrieved from the Book Monkey API for the given isbn', done => {
      const expectedBook = BookBuilder.createSomeBook();
      bookStoreService.getByIsbn('123').subscribe(book => {
        expect(book).toEqual(expectedBook);
        done();
      });
      httpMock.expectOne({url: baseUrl + 'book/123', method: 'GET'}).flush(expectedBook);
    });

    it('should  throw an error if retrieving a book by isbn failed', done => {
      const expectedError = new ErrorEvent('getByIsbnError');
      bookStoreService.getByIsbn('123').subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );
      httpMock.expectOne({url: baseUrl + 'book/123', method: 'GET'}).error(expectedError);
    });
  });

  describe('create', () => {
    it('should send a request to the Book Monkey API to create the given book', done => {
      const bookToCreate = BookBuilder.createSomeBook();
      bookStoreService.create(bookToCreate).subscribe(done);

      httpMock
        .expectOne(
          request =>
            request.url === baseUrl + 'book' &&
            request.method === 'POST' &&
            request.body === JSON.stringify(bookToCreate) &&
            request.headers.get('Content-Type') === 'application/json'
        )
        .flush(null);
    });

    it('should throw an error if creating a book failed', done => {
      const expectedError = new ErrorEvent('createError');
      bookStoreService.create(BookBuilder.createSomeBook()).subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );
      httpMock.expectOne({url: baseUrl + 'book', method: 'POST'}).error(expectedError);
    });
  });

  describe('update', () => {
    it('should send a request to the Book Monkey API to update the given book', done => {
      const bookToUpdate = BookBuilder.createSomeBookWithIsbn('123');
      const expectedUpdatedBook = BookBuilder.createSomeBook();
      bookStoreService.update(bookToUpdate).subscribe((updatedBook: Book) => {
        expect(updatedBook).toEqual(expectedUpdatedBook);
        done();
      });

      const mockRequest = httpMock.expectOne(
        request =>
          request.url === baseUrl + 'book/123' &&
          request.method === 'PUT' &&
          request.body === JSON.stringify(bookToUpdate) &&
          request.headers.get('Content-Type') === 'application/json'
      );

      mockRequest.flush(expectedUpdatedBook);
    });

    it('should throw an error if updating a book failed failed', done => {
      const expectedError = new ErrorEvent('updateError');
      bookStoreService.update(BookBuilder.createSomeBookWithIsbn('123')).subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );
      httpMock.expectOne({url: baseUrl + 'book/123', method: 'PUT'}).error(expectedError);
    });
  });

  describe('remove', () => {
    it('should send a request to the Book Monkey API to remove the given book', done => {
      bookStoreService.remove(BookBuilder.createSomeBookWithIsbn('123')).subscribe(done);
      httpMock.expectOne({url: baseUrl + 'book/123', method: 'DELETE'}).flush(null);
    });

    it('should throw an error if removing a book failed', done => {
      const expectedError = new ErrorEvent('removeError');
      bookStoreService.remove(BookBuilder.createSomeBookWithIsbn('123')).subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );
      httpMock.expectOne({url: baseUrl + 'book/123', method: 'DELETE'}).error(expectedError);
    });
  });

  describe('search', () => {
    it('should return all books from the Book Monkey API that match the given search term', done => {
      const expectedMatchingBooks = [BookBuilder.createSomeBook(), BookBuilder.createSomeBook()];
      bookStoreService.search('test').subscribe((matchingBooks: Book[]) => {
        expect(matchingBooks).toEqual(expectedMatchingBooks);
        done();
      });

      httpMock.expectOne({url: baseUrl + 'books/search/test', method: 'GET'}).flush(expectedMatchingBooks);
    });

    it('should throw an error if searching for books failed', done => {
      const expectedError = new ErrorEvent('searchError');
      bookStoreService.search('test').subscribe(
        () => done.fail(),
        (error: HttpErrorResponse) => {
          expect(error.error).toBe(expectedError);
          done();
        }
      );
      httpMock.expectOne({url: baseUrl + 'books/search/test', method: 'GET'}).error(expectedError);
    });
  });
});

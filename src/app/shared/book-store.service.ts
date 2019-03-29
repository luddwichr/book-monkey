import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private readonly apiBase = 'https://book-monkey2-api.angular-buch.com';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get(`${this.apiBase}/books`).pipe(
      map((rawBooks: any[]) => rawBooks.map(rawBook => this.createFromObject(rawBook))),
      catchError(this.errorHandler)
    );
  }

  getByIsbn(isbn: string): Observable<Book> {
    return this.http.get(`${this.apiBase}/book/${isbn}`).pipe(
      map((rawBook: any) => this.createFromObject(rawBook)),
      catchError(this.errorHandler)
    );
  }

  create(book: Book): Observable<void> {
    return this.http
      .post(`${this.apiBase}/book`, JSON.stringify(book), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  update(book: Book): Observable<Book> {
    return this.http.put(`${this.apiBase}/book/${book.isbn}`, JSON.stringify(book), this.httpOptions).pipe(
      map((rawBook: any) => this.createFromObject(rawBook)),
      catchError(this.errorHandler)
    );
  }

  remove(book: Book): Observable<void> {
    return this.http.delete(`${this.apiBase}/book/${book.isbn}`).pipe(catchError(this.errorHandler));
  }

  search(searchTerm: string): Observable<Book[]> {
    return this.http.get(`${this.apiBase}/books/search/${searchTerm}`).pipe(
      map((rawBooks: any[]) => rawBooks.map(rawBook => this.createFromObject(rawBook))),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: Error): Observable<any> {
    return throwError(error);
  }

  private createFromObject(rawBook: any): Book {
    return {
      isbn: rawBook.isbn,
      title: rawBook.title,
      authors: rawBook.authors,
      published: new Date(rawBook.published),
      subtitle: rawBook.subtitle,
      rating: rawBook.rating,
      thumbnails: rawBook.thumbnails,
      description: rawBook.description
    };
  }
}

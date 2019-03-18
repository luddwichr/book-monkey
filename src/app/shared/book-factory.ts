import {Book} from './book';

export class BookFactory {
  static createFromObject(rawBook: any): Book {
    return {
      isbn: rawBook.isbn,
      title: rawBook.title,
      authors: rawBook.authors,
      published: typeof rawBook.published === 'string' ? new Date(rawBook.published) : rawBook.published,
      subtitle: rawBook.subtitle,
      rating: rawBook.rating,
      thumbnails: rawBook.thumbnails,
      description: rawBook.description
    };
  }
  static createEmptyBook(): Book {
    return {
      isbn: '',
      title: '',
      authors: [],
      published: new Date(),
      subtitle: '',
      rating: 0,
      thumbnails: [{url: '', title: ''}],
      description: ''
    };
  }
}

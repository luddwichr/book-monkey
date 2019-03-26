import {Book} from 'src/app/shared/book';

export class BookBuilder {
  static createSomeBook(): Book {
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

  static createSomeBookWithIsbn(isbn: string): Book {
    return {...BookBuilder.createSomeBook(), isbn};
  }

  static createSomeBookWithTitle(title: string): Book {
    return {...BookBuilder.createSomeBook(), title};
  }
}

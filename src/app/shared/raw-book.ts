import {Book, Thumbnail} from './book';

export interface RawBook {
  isbn: string;
  title: string;
  authors: string[];
  published: string;
  subtitle?: string;
  rating?: number;
  thumbnails?: Thumbnail[];
  description?: string;
}

export function toBook(rawBook: RawBook): Book {
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

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';

const isbnParameter = 'isbn';
@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(private bookStoreService: BookStoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.book = this.bookStoreService.getByIsbn(paramMap.get(isbnParameter));
    });
  }

  getRating(num: number) {
    return new Array(num);
  }
}

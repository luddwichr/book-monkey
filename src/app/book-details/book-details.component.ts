import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(private bookStoreService: BookStoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.book = this.bookStoreService.getByIsbn(params['isbn']);
  }

  getRating(num: number) {
    return new Array(num);
  }
}

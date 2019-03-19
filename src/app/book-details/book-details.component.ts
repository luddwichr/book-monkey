import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
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

  constructor(private bookStoreService: BookStoreService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(flatMap(params => this.bookStoreService.getByIsbn(params.get(isbnParameter))))
      .subscribe(book => {
        this.book = book;
      });
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    this.bookStoreService.remove(this.book).subscribe(() => this.router.navigate(['../'], {relativeTo: this.route}));
  }
}

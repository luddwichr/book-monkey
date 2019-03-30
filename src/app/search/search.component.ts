import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  @Output()
  bookSelected = new EventEmitter<Book>();
  keyup = new EventEmitter<string>();
  isLoading = false;
  foundBooks: Book[] = [];

  constructor(private bookStoreService: BookStoreService) {}

  ngOnInit() {
    this.keyup
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => (this.isLoading = true)),
        switchMap(searchTerm => this.bookStoreService.search(searchTerm)),
        tap(() => (this.isLoading = false))
      )
      .subscribe(foundBooks => (this.foundBooks = foundBooks));
  }

  selectBook(book: Book, event: MouseEvent) {
    event.preventDefault();
    this.bookSelected.emit(book);
  }
}

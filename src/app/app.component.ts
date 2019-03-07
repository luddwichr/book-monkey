import {Component} from '@angular/core';
import {Book} from './shared/book';

@Component({
  selector: 'bm-root',
  template: `
    <bm-book-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"> </bm-book-list>
    <bm-book-details *ngIf="detailsOn" [book]="book" (showListEvent)="showList()"> </bm-book-details>
  `,
  styles: []
})
export class AppComponent {
  listOn = true;
  detailsOn = false;
  book: Book;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book: Book) {
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }
}

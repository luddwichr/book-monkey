import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {Thumbnail} from '../shared/thumbnail';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor() {}

  ngOnInit() {
    this.books = [
      new Book(
        '1234567890123',
        'Angular',
        ['Johannes Hoppe', 'Danny Koppenhagen', 'Ferdinand Malcher', 'Gregor Woiwode'],
        new Date(2017, 3, 1),
        'Grundlagen, blabla',
        5,
        [new Thumbnail('https://ng-buch.de/cover2.jpg', 'Buchcover')],
        'Lorem ipsum dolor sit amet, consectetur adipisici elit,...'
      ),
      new Book(
        '0987654321',
        'AngularJS',
        ['Philipp Tarasiewicz', 'Robin Böhm'],
        new Date(2014, 5, 29),
        'Eine praktische Einführung',
        4.5,
        [new Thumbnail('https://ng-buch.de/cover1.jpg', 'Buchcover')],
        'Dieses Buch führt Sie anhand eines zusammenhängennden Beispielprojekts...'
      )
    ];
  }
}

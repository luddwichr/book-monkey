import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {BookFormErrorMessages} from './book-form-error-messages';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styles: []
})
export class BookFormComponent implements OnInit {
  @ViewChild('bookForm') bookForm: NgForm;
  book: Book = this.emptyBook();
  errors: {[key: string]: string} = {};

  constructor(private bookStoreService: BookStoreService) {}

  ngOnInit() {
    this.bookForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages(): void {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.bookForm.form.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !control.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    this.book.authors = this.bookForm.value.authors.split(',');
    this.book.thumbnails = [this.bookForm.value.thumbnail];
    this.bookStoreService.create(this.book).subscribe(() => {
      this.book = this.emptyBook();
      this.bookForm.resetForm();
    });
  }

  private emptyBook(): Book {
    return {
      isbn: null,
      title: null,
      subtitle: null,
      authors: [null],
      published: null,
      thumbnails: [{url: null, title: null}],
      description: null
    };
  }
}

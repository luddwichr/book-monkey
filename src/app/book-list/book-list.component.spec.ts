import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookListComponent} from './book-list.component';
import {BookListItemComponent} from '../book-list-item/book-list-item.component';
import {MockComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {Mock} from 'ts-mockery';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookStoreServiceMock: BookStoreService;
  const books: Book[] = [
    {
      isbn: '123',
      title: 'someTitle',
      authors: ['A', 'B'],
      published: new Date(2019, 4, 30)
    },
    {
      isbn: '456',
      title: 'someOtherTitle',
      authors: ['D'],
      published: new Date(2019, 1, 1)
    }
  ];

  beforeEach(async(() => {
    bookStoreServiceMock = Mock.of<BookStoreService>({getAll: () => books});
    TestBed.configureTestingModule({
      providers: [{provide: BookStoreService, useValue: bookStoreServiceMock}],
      declarations: [BookListComponent, MockComponent(BookListItemComponent)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain two book list items, each for one of the books', () => {
    const bookListItems = fixture.debugElement
      .queryAll(By.css('bm-book-list-item'))
      .map(element => element.componentInstance as BookListItemComponent);
    expect(bookListItems).toHaveLength(2);
    expect(bookListItems[0].book).toBe(component.books[0]);
    expect(bookListItems[1].book).toBe(component.books[1]);
  });

  it('should emit an event if a book list item was clicked on, with the book as payload', done => {
    component.showDetailsEvent.subscribe((book: Book) => {
      expect(book).toBe(component.books[0]);
      done();
    });
    fixture.debugElement.queryAll(By.css('bm-book-list-item'))[0].triggerEventHandler('click', null);
    fixture.detectChanges();
  });
});

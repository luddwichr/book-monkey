import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookListComponent} from './book-list.component';
import {BookListItemComponent} from '../book-list-item/book-list-item.component';
import {MockComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {mock, when, instance, verify} from 'ts-mockito';
import {RouterTestingModule} from '@angular/router/testing';

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
    bookStoreServiceMock = mock(BookStoreService);
    when(bookStoreServiceMock.getAll()).thenReturn(books);
    TestBed.configureTestingModule({
      providers: [{provide: BookStoreService, useValue: instance(bookStoreServiceMock)}],
      declarations: [BookListComponent, MockComponent(BookListItemComponent)],
      imports: [RouterTestingModule]
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
    verify(bookStoreServiceMock.getAll()).called();
    const bookListItems = fixture.debugElement
      .queryAll(By.css('bm-book-list-item'))
      .map(element => element.componentInstance as BookListItemComponent);
    expect(bookListItems).toHaveLength(2);
    console.log(bookListItems[0]);
    expect(bookListItems[0].book).toBe(component.books[0]);
    expect(bookListItems[1].book).toBe(component.books[1]);
  });
});

import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BookListComponent} from './book-list/book-list.component';
import {MockComponent, MockedComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {BookDetailsComponent} from './book-details/book-details.component';
import {Book} from './shared/book';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponent(BookListComponent), MockComponent(BookDetailsComponent)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially render only the book list', () => {
    expect(getBookList()).toBeTruthy();
    expect(getBookDetais()).toBeFalsy();
  });

  it('should render book details when a book list entry triggered a show book details event', () => {
    const book: Book = {isbn: '', title: '', authors: [], published: new Date()};

    getBookList().showDetailsEvent.emit(book);
    fixture.detectChanges();

    const bookDetailsComponent = getBookDetais();
    expect(bookDetailsComponent).toBeTruthy();
    expect(bookDetailsComponent.book).toBe(book);
    expect(getBookList()).toBeFalsy();
  });

  it('should render a book list when triggered by book details', () => {
    getBookList().showDetailsEvent.emit();
    fixture.detectChanges();

    getBookDetais().showListEvent.emit();
    fixture.detectChanges();

    expect(getBookList()).toBeTruthy();
    expect(getBookDetais()).toBeFalsy();
  });

  function getBookList(): BookListComponent {
    return getComponent<BookListComponent>('bm-book-list');
  }

  function getBookDetais(): BookDetailsComponent {
    return getComponent<BookDetailsComponent>('bm-book-details');
  }

  function getComponent<T>(selector: string): T {
    const element = fixture.debugElement.query(By.css(selector));
    return element ? (element.componentInstance as T) : null;
  }
});

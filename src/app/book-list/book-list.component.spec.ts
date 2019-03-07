import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookListComponent} from './book-list.component';
import {BookListItemComponent} from '../book-list-item/book-list-item.component';
import {MockComponent, MockedComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
});

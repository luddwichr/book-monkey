import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MockComponent} from 'ng-mocks';
import {asyncData, click, RouterLinkStubDirective} from 'src/testing';
import {instance, mock, verify, when} from 'ts-mockito';
import {BookListItemComponent} from '../book-list-item/book-list-item.component';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {BookListComponent} from './book-list.component';

describe('BookListComponent', () => {
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
    when(bookStoreServiceMock.getAll()).thenReturn(asyncData(books));
    TestBed.configureTestingModule({
      providers: [{provide: BookStoreService, useValue: instance(bookStoreServiceMock)}],
      declarations: [BookListComponent, MockComponent(BookListItemComponent), RouterLinkStubDirective]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<BookListComponent> = TestBed.createComponent(BookListComponent);
    const component: BookListComponent = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    return {fixture, component};
  }

  it('should retrieve all books from the book store service', fakeAsync(() => {
    const {component} = setup();
    expect(component.books).toBe(books);
    verify(bookStoreServiceMock.getAll()).called();
  }));

  it('should display a book list item for each book', fakeAsync(() => {
    const {fixture} = setup();
    const bookListItems = fixture.debugElement
      .queryAll(By.directive(BookListItemComponent))
      .map(element => element.componentInstance as BookListItemComponent);
    expect(bookListItems).toHaveLength(2);
    expect(bookListItems[0].book).toBe(books[0]);
    expect(bookListItems[1].book).toBe(books[1]);
  }));

  it('should navigate to the book details when clicking on a book list item', fakeAsync(() => {
    const {fixture} = setup();
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));

    links.forEach(link => {
      const routerLink = link.injector.get(RouterLinkStubDirective);
      expect(routerLink.navigatedTo).toBeNull();
      click(link);
      fixture.detectChanges();
      expect(routerLink.navigatedTo).toEqual(routerLink.linkParams);
    });
  }));

  it('should display a note that books are being loaded until the books are received', fakeAsync(() => {
    const fixture = TestBed.createComponent(BookListComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('Daten werden geladen...');
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).not.toContain('Daten werden geladen...');
  }));

  it('should display a note that no books are available if no books were received', fakeAsync(() => {
    when(bookStoreServiceMock.getAll()).thenReturn(asyncData([]));
    const {fixture} = setup();
    expect(fixture.nativeElement.innerHTML).toContain('Es wurden noch keine Bücher eingetragen');
  }));

  it('should not display a note that no books are available if books were received', fakeAsync(() => {
    const {fixture} = setup();
    expect(fixture.nativeElement.innerHTML).not.toContain('Es wurden noch keine Bücher eingetragen');
  }));
});

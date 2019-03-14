import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MockComponent} from 'ng-mocks';
import {click, RouterLinkStubDirective} from 'src/testing';
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
    when(bookStoreServiceMock.getAll()).thenReturn(books);
    TestBed.configureTestingModule({
      providers: [{provide: BookStoreService, useValue: instance(bookStoreServiceMock)}],
      declarations: [BookListComponent, MockComponent(BookListItemComponent), RouterLinkStubDirective]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<BookListComponent> = TestBed.createComponent(BookListComponent);
    const component: BookListComponent = fixture.componentInstance;
    fixture.detectChanges();
    return {fixture, component};
  }

  it('should retrieve all books from the book store service', () => {
    const {component} = setup();
    expect(component.books).toBe(books);
    verify(bookStoreServiceMock.getAll()).called();
  });

  it('should display a book list item for each book', () => {
    const {fixture} = setup();
    const bookListItems = fixture.debugElement
      .queryAll(By.directive(BookListItemComponent))
      .map(element => element.componentInstance as BookListItemComponent);
    expect(bookListItems).toHaveLength(2);
    expect(bookListItems[0].book).toBe(books[0]);
    expect(bookListItems[1].book).toBe(books[1]);
  });

  it('should navigate to the book details when clicking on a book list item', () => {
    const {fixture} = setup();
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    const routerLinks = links.map(link => link.injector.get(RouterLinkStubDirective));

    routerLinks.forEach(routerLink => expect(routerLink.navigatedTo).toBeNull());

    click(links[0]);
    fixture.detectChanges();
    expect(routerLinks[0].navigatedTo).toEqual('123');
  });
});

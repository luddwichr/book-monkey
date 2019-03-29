import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, asyncData, BookBuilder} from 'src/testing';
import {anyString, deepEqual, instance, mock, verify, when} from 'ts-mockito';
import {BookStoreService} from '../shared/book-store.service';
import {BookDetailsComponent} from './book-details.component';

describe('BookDetailsComponent', () => {
  const bookStoreServiceMock: BookStoreService = mock(BookStoreService);
  const routerMock: Router = mock(Router);
  const activeRouteStub = new ActivatedRouteStub({isbn: '123'});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: BookStoreService, useValue: instance(bookStoreServiceMock)},
        {provide: ActivatedRoute, useValue: activeRouteStub},
        {provide: Router, useValue: instance(routerMock)}
      ],
      declarations: [BookDetailsComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<BookDetailsComponent> = TestBed.createComponent(BookDetailsComponent);
    const component: BookDetailsComponent = fixture.componentInstance;
    return {fixture, component};
  }

  it('should render the details for a book', fakeAsync(() => {
    const {fixture, component} = setup();
    const book = {
      isbn: '123',
      title: 'someTitle',
      authors: ['A', 'B'],
      published: new Date(2019, 4, 30),
      rating: 3,
      thumbnails: [{url: 'someUrl', title: 'someImageTitle'}],
      subtitle: 'someSubTitle',
      description: 'someDescription'
    };
    when(bookStoreServiceMock.getByIsbn(book.isbn)).thenReturn(asyncData(book));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.book).toBe(book);
    expect(fixture.nativeElement).toMatchSnapshot();
  }));

  it('should not render anything if no book is given', fakeAsync(() => {
    const {fixture, component} = setup();
    when(bookStoreServiceMock.getByIsbn(anyString())).thenReturn(asyncData(null));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.book).toBeNull();
    expect(fixture.nativeElement.textContent).toBeFalsy();
  }));

  it('should request to delete the book if the delete button is clicked', fakeAsync(() => {
    const {fixture} = setup();
    const book = BookBuilder.createSomeBookWithIsbn('123');
    when(bookStoreServiceMock.getByIsbn(book.isbn)).thenReturn(asyncData(book));
    when(bookStoreServiceMock.remove(book)).thenReturn(asyncData(null));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    fixture.debugElement.query(By.css('#delete-button')).nativeElement.click();
    tick();

    verify(routerMock.navigate(deepEqual(['../']), deepEqual({relativeTo: activeRouteStub}))).called();
  }));
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from 'src/testing';
import {instance, mock, when} from 'ts-mockito';
import {BookStoreService} from '../shared/book-store.service';
import {BookDetailsComponent} from './book-details.component';

describe('BookDetailsComponent', () => {
  const bookStoreServiceMock: BookStoreService = mock(BookStoreService);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: BookStoreService, useValue: instance(bookStoreServiceMock)},
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub()}
      ],
      declarations: [BookDetailsComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<BookDetailsComponent> = TestBed.createComponent(BookDetailsComponent);
    const component: BookDetailsComponent = fixture.componentInstance;
    const activatedRouteStub: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    return {fixture, component, activatedRouteStub};
  }

  it('should render the details for a book', () => {
    const {fixture, component, activatedRouteStub} = setup();
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
    activatedRouteStub.setParamMap({isbn: book.isbn});
    when(bookStoreServiceMock.getByIsbn(book.isbn)).thenReturn(book);

    fixture.detectChanges();

    expect(component.book).toBe(book);
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should not render anything if no book is given', () => {
    const {fixture, component} = setup();
    fixture.detectChanges();
    expect(component.book).toBeNull();
    expect(fixture.nativeElement.textContent).toBeFalsy();
  });
});

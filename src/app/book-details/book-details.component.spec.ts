import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {BookDetailsComponent} from './book-details.component';
import {BookStoreService} from '../shared/book-store.service';
import {mock, verify, when, instance} from 'ts-mockito';
import {of} from 'rxjs';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let bookStoreServiceMock: BookStoreService;
  const bookId = '123';

  beforeEach(async(() => {
    bookStoreServiceMock = mock(BookStoreService);
    when(bookStoreServiceMock.getByIsbn(bookId)).thenReturn({
      isbn: '123',
      title: 'someTitle',
      authors: ['A', 'B'],
      published: new Date(2019, 4, 30),
      rating: 3,
      thumbnails: [{url: 'someUrl', title: 'someImageTitle'}],
      subtitle: 'someSubTitle',
      description: 'someDescription'
    });
    TestBed.configureTestingModule({
      providers: [
        {provide: BookStoreService, useValue: instance(bookStoreServiceMock)},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                isbn: bookId
              }
            }
          }
        }
      ],
      declarations: [BookDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the details for a book', () => {
    verify(bookStoreServiceMock.getByIsbn(bookId)).called();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {BookDetailsComponent} from './book-details.component';
import {BookStoreService} from '../shared/book-store.service';
import {Mock} from 'ts-mockery';
import {of} from 'rxjs';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let bookStoreServiceMock: BookStoreService;

  beforeEach(async(() => {
    bookStoreServiceMock = Mock.of<BookStoreService>({
      getByIsbn: isbn =>
        isbn === '123'
          ? {
              isbn: '123',
              title: 'someTitle',
              authors: ['A', 'B'],
              published: new Date(2019, 4, 30)
            }
          : null
    });
    TestBed.configureTestingModule({
      providers: [
        {provide: BookStoreService, useValue: bookStoreServiceMock},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({id: 123})
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
    component.book = book;
    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});

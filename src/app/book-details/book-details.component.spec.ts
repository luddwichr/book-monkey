import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookDetailsComponent} from './book-details.component';
import {By} from '@angular/platform-browser';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

  it('should emit an event to signal that the book list should be shown', done => {
    component.showListEvent.subscribe(() => {
      done();
    });
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    fixture.detectChanges();
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

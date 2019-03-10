import {async, TestBed} from '@angular/core/testing';
import {BookListItemComponent} from './book-list-item.component';
import {MockRender} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {Book} from '../shared/book';

describe('BookListItemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookListItemComponent]
    }).compileComponents();
  }));

  it('should render a complete book', () => {
    const book = {
      ...basicBook(),
      rating: 3,
      thumbnails: [{url: 'someUrl', title: 'someImageTitle'}],
      subtitle: 'someSubTitle',
      description: 'someDescription'
    };
    const fixture = MockRender('<bm-book-list-item [book]=book></bm-book-list-item>', {book});
    const componentInstance = fixture.debugElement.query(By.directive(BookListItemComponent))
      .componentInstance as BookListItemComponent;
    expect(componentInstance).toBeTruthy();
    expect(fixture.debugElement.query(By.css('div.header')).nativeElement.textContent).toEqual('someTitle');
    expect(fixture.debugElement.query(By.css('div.description')).nativeElement.textContent).toEqual('someSubTitle');
    expect(fixture.debugElement.query(By.css('div.metadata')).nativeElement.textContent).toEqual('A, B');
    expect(fixture.debugElement.query(By.css('div.extra')).nativeElement.textContent).toEqual('ISBN 123');
    expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toContain('someUrl');
    expect(fixture.debugElement.query(By.css('img')).nativeElement.alt).toEqual('someImageTitle');
  });

  it('should not render a description section if no subtitle is provided for a book', () => {
    const book = basicBook();
    const fixture = MockRender('<bm-book-list-item [book]=book></bm-book-list-item>', {book});
    const componentInstance = fixture.debugElement.query(By.directive(BookListItemComponent))
      .componentInstance as BookListItemComponent;
    expect(componentInstance).toBeTruthy();
    expect(fixture.debugElement.query(By.css('div.description'))).toBeNull();
  });

  it('should not render a thumbnail image if no thumbnails are provided for a book', () => {
    const book = basicBook();
    const fixture = MockRender('<bm-book-list-item [book]=book></bm-book-list-item>', {book});
    const componentInstance = fixture.debugElement.query(By.directive(BookListItemComponent))
      .componentInstance as BookListItemComponent;
    expect(componentInstance).toBeTruthy();
    expect(fixture.debugElement.query(By.css('img'))).toBeNull();
  });

  it('should not render a thumbnail image if an empty thumbnail array is provided for a book', () => {
    const book = {
      ...basicBook(),
      thumbnails: []
    };
    const fixture = MockRender('<bm-book-list-item [book]=book></bm-book-list-item>', {book});
    const componentInstance = fixture.debugElement.query(By.directive(BookListItemComponent))
      .componentInstance as BookListItemComponent;
    expect(componentInstance).toBeTruthy();
    expect(fixture.debugElement.query(By.css('img'))).toBeNull();
  });

  function basicBook(): Book {
    return {
      isbn: '123',
      title: 'someTitle',
      authors: ['A', 'B'],
      published: new Date(2019, 4, 30)
    };
  }
});

import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MockRender} from 'ng-mocks';
import {Book} from '../shared/book';
import {BookListItemComponent} from './book-list-item.component';

describe('BookListItemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookListItemComponent]
    }).compileComponents();
  }));

  function setup(book: Book) {
    const fixture = MockRender('<bm-book-list-item [book]=book></bm-book-list-item>', {book});
    const component = fixture.debugElement.query(By.directive(BookListItemComponent))
      .componentInstance as BookListItemComponent;
    return {fixture, component};
  }

  it('should take a book as input', () => {
    const book = basicBook();
    const {component} = setup(book);
    expect(component.book).toBe(book);
  });

  it('should render a complete book', () => {
    const book = {
      ...basicBook(),
      rating: 3,
      thumbnails: [{url: 'someUrl', title: 'someImageTitle'}],
      subtitle: 'someSubTitle',
      description: 'someDescription'
    };
    const {fixture} = setup(book);
    expect(fixture.debugElement.query(By.css('div.header')).nativeElement.textContent).toEqual('someTitle');
    expect(fixture.debugElement.query(By.css('div.description')).nativeElement.textContent).toEqual('someSubTitle');
    expect(fixture.debugElement.query(By.css('div.metadata')).nativeElement.textContent).toEqual('A, B');
    expect(fixture.debugElement.query(By.css('div.extra')).nativeElement.textContent).toEqual('ISBN 123');
    expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toContain('someUrl');
    expect(fixture.debugElement.query(By.css('img')).nativeElement.alt).toEqual('someImageTitle');
  });

  it('should not render a description section if no subtitle is provided for a book', () => {
    const {fixture} = setup(basicBook());
    expect(fixture.debugElement.query(By.css('div.description'))).toBeNull();
  });

  it('should not render a thumbnail image if no thumbnails are provided for a book', () => {
    const {fixture} = setup(basicBook());
    expect(fixture.debugElement.query(By.css('img'))).toBeNull();
  });

  it('should not render a thumbnail image if an empty thumbnail array is provided for a book', () => {
    const book = {
      ...basicBook(),
      thumbnails: []
    };
    const {fixture} = setup(book);

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

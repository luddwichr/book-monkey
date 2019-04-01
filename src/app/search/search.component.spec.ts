import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {delay} from 'rxjs/operators';
import {asyncData, BookBuilder} from 'src/testing';
import {anyString, instance, mock, verify, when} from 'ts-mockito';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {SearchComponent} from './search.component';

class SearchComponentPage {
  constructor(private fixture: ComponentFixture<SearchComponent>) {}

  getSearchDiv() {
    return this.fixture.debugElement.query(By.css('div.search'));
  }

  getResultsDiv() {
    return this.fixture.debugElement.query(By.css('div.results'));
  }

  getFirstResultDiv() {
    return this.fixture.debugElement.query(By.css('a.result'));
  }

  getBookTitles(): any {
    return this.fixture.debugElement.queryAll(By.css('div.title')).map(element => element.nativeElement.textContent);
  }

  triggerSearch(searchTerm: string): any {
    const searchInput = this.fixture.debugElement.query(By.css('input'));
    searchInput.nativeElement.value = searchTerm;
    this.fixture.detectChanges();
    searchInput.triggerEventHandler('keyup', null);
  }
}

describe('SearchComponent', () => {
  const bookStoreServiceMock: BookStoreService = mock(BookStoreService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: BookStoreService, useValue: instance(bookStoreServiceMock)}],
      declarations: [SearchComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<SearchComponent> = TestBed.createComponent(SearchComponent);
    const component: SearchComponent = fixture.componentInstance;
    const page: SearchComponentPage = new SearchComponentPage(fixture);
    fixture.detectChanges();
    return {fixture, component, page};
  }

  it('should use the `loading` css class depending on the state of `isLoading`', () => {
    const {component, fixture, page} = setup();
    const searchDiv = page.getSearchDiv();

    expect(searchDiv.classes.loading).toBeFalsy();

    component.isLoading = true;
    fixture.detectChanges();

    expect(searchDiv.classes.loading).toBeTruthy();
  });

  it('should display the results section depending on the length of `foundBooks`', () => {
    const {component, fixture, page} = setup();
    const resultsDiv = page.getResultsDiv();

    expect(resultsDiv.classes.visible).toBeFalsy();

    component.foundBooks = [BookBuilder.createSomeBook()];
    fixture.detectChanges();

    expect(resultsDiv.classes.visible).toBeTruthy();
  });

  it('should display the titles of found books', () => {
    const {component, fixture, page} = setup();
    component.foundBooks = [BookBuilder.createSomeBookWithTitle('A'), BookBuilder.createSomeBookWithTitle('B')];
    fixture.detectChanges();

    const titles = page.getBookTitles();

    expect(titles).toEqual(['A', 'B']);
  });

  it('should trigger an event on `bookSelected` with the selected book when clicking on a search result', done => {
    const {component, fixture, page} = setup();
    const expectedBook = BookBuilder.createSomeBookWithTitle('A');
    component.foundBooks = [expectedBook];
    const clickEvent = new MouseEvent('click', {bubbles: true, cancelable: true});
    component.bookSelected.subscribe((book: Book) => {
      expect(book).toBe(expectedBook);
      expect(clickEvent.defaultPrevented).toBeTruthy();
      done();
    });
    fixture.detectChanges();
    const resultDiv = page.getFirstResultDiv();

    resultDiv.nativeElement.dispatchEvent(clickEvent);
  });

  describe('Search', () => {
    it('should perform a search for 500ms after a search term was entered', fakeAsync(() => {
      const expectedSearchTerm = 'testSearchTerm';
      const foundBooks = [BookBuilder.createSomeBook()];
      when(bookStoreServiceMock.search(expectedSearchTerm)).thenReturn(asyncData(foundBooks));
      const {component, page} = setup();
      page.triggerSearch(expectedSearchTerm);
      tick(500);
      expect(component.foundBooks).toEqual(foundBooks);
    }));

    it('should set `isLoading=true` before search is triggered and `isLoading=false` after it finished', fakeAsync(() => {
      when(bookStoreServiceMock.search(anyString())).thenReturn(asyncData([]).pipe(delay(200)));
      const {component, page} = setup();
      page.triggerSearch('');
      tick(500);
      expect(component.isLoading).toBeTruthy();
      tick(200);
      expect(component.isLoading).toBeFalsy();
    }));

    it('should dispatch search requests only if no new requests was dispatched 500ms afterwards', fakeAsync(() => {
      when(bookStoreServiceMock.search('b')).thenReturn(asyncData([]));
      when(bookStoreServiceMock.search('c')).thenReturn(asyncData([]));
      const {page} = setup();
      page.triggerSearch('a');
      tick(300);
      page.triggerSearch('b');
      tick(500);
      page.triggerSearch('c');
      tick(500);
      verify(bookStoreServiceMock.search('a')).never();
      verify(bookStoreServiceMock.search('b')).once();
      verify(bookStoreServiceMock.search('c')).once();
    }));

    it('should not dispatch new searches if the search term has not changed', fakeAsync(() => {
      when(bookStoreServiceMock.search(anyString())).thenReturn(asyncData([]));
      const {page} = setup();
      page.triggerSearch('');
      tick(500);
      page.triggerSearch('');
      tick(500);
      verify(bookStoreServiceMock.search(anyString())).once();
    }));
  });
});

import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {RouteTester} from 'src/testing';
import {instance, mock} from 'ts-mockito';
import {routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookListItemComponent} from './book-list-item/book-list-item.component';
import {BookListComponent} from './book-list/book-list.component';
import {HomeComponent} from './home/home.component';
import {BookStoreService} from './shared/book-store.service';

describe('AppRoutingModule', () => {
  let routeTester: RouteTester;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        BookListComponent,
        BookListItemComponent,
        BookDetailsComponent,
        BookFormComponent
      ],
      providers: [RouteTester, {provide: BookStoreService, useValue: instance(mock(BookStoreService))}],
      imports: [RouterTestingModule.withRoutes(routes)]
    });
    fixture = TestBed.overrideComponent(AppComponent, {set: {template: '<router-outlet></router-outlet>'}})
      .overrideComponent(HomeComponent, {set: {template: ''}})
      .overrideComponent(BookListComponent, {set: {template: ''}})
      .overrideComponent(BookListItemComponent, {set: {template: ''}})
      .overrideComponent(BookDetailsComponent, {set: {template: ''}})
      .overrideComponent(BookFormComponent, {set: {template: ''}})
      .createComponent(AppComponent);
    routeTester = TestBed.get(RouteTester);
  });

  it('should route `/home` to the home component', fakeAsync(() => {
    validateRouting('/home', '/home', HomeComponent);
  }));

  it('should route `/` to the home component', fakeAsync(() => {
    validateRouting('/', '/home', HomeComponent);
  }));

  it('should route `/books` to the book list component', fakeAsync(() => {
    validateRouting('/books', '/books', BookListComponent);
  }));

  it('should route `/books:isbn` to the book details component', fakeAsync(() => {
    validateRouting('/books/123', '/books/123', BookDetailsComponent);
  }));

  it('should route `/admin` to the book form component', fakeAsync(() => {
    validateRouting('/admin', '/admin', BookFormComponent);
  }));

  it('should throw an error when routing to an unkown URL', fakeAsync(() => {
    routeTester.navigateTo('/unknown').catch((error: Error) => {
      expect(error.message).toEqual(`Cannot match any routes. URL Segment: 'unknown'`);
    });
  }));

  function validateRouting(urlToNativateTo: string, expectedRoute: string, expectedComponent: any) {
    routeTester.navigateTo(urlToNativateTo);
    tick();
    expect(routeTester.getCurrentRoute()).toBe(expectedRoute);
    expect(routeTester.getRenderedComponent(fixture)).toBeInstanceOf(expectedComponent);
  }
});

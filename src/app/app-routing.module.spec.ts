import {TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {routes} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {BookListComponent} from './book-list/book-list.component';
import {AppComponent} from './app.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookStoreService} from './shared/book-store.service';
import {instance, mock} from 'ts-mockito';
import {BookListItemComponent} from './book-list-item/book-list-item.component';
import {RouterTestingModule} from '@angular/router/testing';
import {RouteTester} from './route-tester';

describe('AppRoutingModule', () => {
  let routeTester: RouteTester;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HomeComponent, BookListComponent, BookListItemComponent, BookDetailsComponent],
      providers: [RouteTester, {provide: BookStoreService, useValue: instance(mock(BookStoreService))}],
      imports: [RouterTestingModule.withRoutes(routes)]
    });
    fixture = TestBed.overrideComponent(AppComponent, {set: {template: '<router-outlet></router-outlet>'}})
      .overrideComponent(HomeComponent, {set: {template: ''}})
      .overrideComponent(BookListComponent, {set: {template: ''}})
      .overrideComponent(BookListItemComponent, {set: {template: ''}})
      .overrideComponent(BookDetailsComponent, {set: {template: ''}})
      .createComponent(AppComponent);
    routeTester = TestBed.get(RouteTester);
  }));

  it('should route `/home` to the home component', fakeAsync(() => {
    routeTester.navigateTo('/home');
    tick();
    expect(routeTester.getCurrentRoute()).toBe('/home');
    expect(routeTester.getRenderedComponent(fixture)).toBeInstanceOf(HomeComponent);
  }));

  it('should route `/` to the home component', fakeAsync(() => {
    routeTester.navigateTo('/');
    tick();
    expect(routeTester.getCurrentRoute()).toBe('/home');
    expect(routeTester.getRenderedComponent(fixture)).toBeInstanceOf(HomeComponent);
  }));

  it('should route `/books` to the book list component', fakeAsync(() => {
    routeTester.navigateTo('/books');
    tick();
    expect(routeTester.getCurrentRoute()).toBe('/books');
    expect(routeTester.getRenderedComponent(fixture)).toBeInstanceOf(BookListComponent);
  }));

  it('should route `/books:isbn` to the book details component', fakeAsync(() => {
    routeTester.navigateTo('/books/123');
    tick();
    expect(routeTester.getCurrentRoute()).toBe('/books/123');
    expect(routeTester.getRenderedComponent(fixture)).toBeInstanceOf(BookDetailsComponent);
  }));

  it('should throw an error when routing to an unkown URL', fakeAsync(() => {
    routeTester.navigateTo('/unknown').catch((error: Error) => {
      expect(error.message).toEqual(`Cannot match any routes. URL Segment: 'unknown'`);
    });
  }));
});

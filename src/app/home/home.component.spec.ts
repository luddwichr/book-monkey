import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {MockComponent} from 'ng-mocks';
import {BookBuilder, click, RouterLinkStubDirective} from 'src/testing';
import {deepEqual, instance, mock, verify} from 'ts-mockito';
import {SearchComponent} from '../search/search.component';
import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  const routerMock: Router = mock(Router);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: instance(mock(ActivatedRoute))},
        {provide: Router, useValue: instance(routerMock)}
      ],
      declarations: [HomeComponent, MockComponent(SearchComponent), RouterLinkStubDirective]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<HomeComponent> = TestBed.createComponent(HomeComponent);
    const component: HomeComponent = fixture.componentInstance;
    fixture.detectChanges();
    return {fixture, component};
  }

  it('should route to the book details for the book selected in the search component', () => {
    const {fixture} = setup();
    const searchComponent = fixture.debugElement.query(By.directive(SearchComponent)).componentInstance;
    const book = BookBuilder.createSomeBookWithIsbn('123');
    const activatedRouteMock = TestBed.get(ActivatedRoute);

    searchComponent.bookSelected.emit(book);

    verify(routerMock.navigate(deepEqual(['../books', '123']), deepEqual({relativeTo: activatedRouteMock}))).called();
  });

  it('should route to the books route if the back button is clicked', () => {
    const {fixture} = setup();
    const link = fixture.debugElement.query(By.directive(RouterLinkStubDirective));
    const routerLink = link.injector.get(RouterLinkStubDirective);

    expect(routerLink.navigatedTo).toBeNull();

    click(link);
    fixture.detectChanges();
    expect(routerLink.navigatedTo).toEqual('../books');
  });
});

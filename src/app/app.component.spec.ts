import {DebugElement} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {DummyComponent, RouteTester as RoutingTester} from 'src/testing';
import {AppComponent} from './app.component';

class AppComponentPage {
  constructor(private fixture: ComponentFixture<AppComponent>) {}

  getHomeMenuItem(): DebugElement {
    return this.fixture.debugElement.query(By.css('#home'));
  }

  getBooksMenuItem(): DebugElement {
    return this.fixture.debugElement.query(By.css('#books'));
  }
}

describe('AppComponent', () => {
  let routeTester: RoutingTester;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, DummyComponent],
      providers: [RoutingTester],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: DummyComponent
          },
          {
            path: 'books',
            component: DummyComponent
          }
        ])
      ]
    }).compileComponents();
    routeTester = TestBed.get(RoutingTester);
  }));

  function setup() {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.componentInstance;
    const page = new AppComponentPage(fixture);
    fixture.detectChanges();
    return {page, component};
  }

  it('should create', () => {
    const {component} = setup();
    expect(component).toBeTruthy();
  });

  describe('Home navigation', () => {
    it('should route to /home', () => {
      const {page} = setup();
      const routerLink = routeTester.getRouterLink(page.getHomeMenuItem());
      expect(routerLink.href).toEqual('/home');
    });

    it('should be marked as active if on /home', fakeAsync(() => {
      const {page} = setup();
      const routerLinkActive = routeTester.getRouterLinkActive(page.getHomeMenuItem());
      expect(routerLinkActive.isActive).toBeFalsy();
      routeTester.navigateTo('home');
      tick();
      expect(routerLinkActive.isActive).toBeTruthy();
    }));
  });

  describe('Books navigation', () => {
    it('should route to /books', () => {
      const {page} = setup();
      const routerLink = routeTester.getRouterLink(page.getBooksMenuItem());
      expect(routerLink.href).toEqual('/books');
    });

    it('should be marked as active if on /books', fakeAsync(() => {
      const {page} = setup();
      const routerLinkActive = routeTester.getRouterLinkActive(page.getBooksMenuItem());
      expect(routerLinkActive.isActive).toBeFalsy();
      routeTester.navigateTo('books');
      tick();
      expect(routerLinkActive.isActive).toBeTruthy();
    }));
  });
});

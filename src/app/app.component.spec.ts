import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MockComponent} from 'ng-mocks';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {HomeComponent} from './home/home.component';
import {RouteTester, DummyComponent} from './route-tester';
import {BookListComponent} from './book-list/book-list.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routeTester: RouteTester;
  const activeLinkClass = 'active';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, DummyComponent],
      providers: [RouteTester],
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
    routeTester = TestBed.get(RouteTester);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Home navigation', () => {
    it('should route to /home', () => {
      const href = fixture.debugElement.query(By.css('#home')).nativeElement.getAttribute('href');
      expect(href).toEqual('/home');
    });
    it('should be marked as active if on /home', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('#home')).classes[activeLinkClass]).toBeFalsy();
      routeTester.navigateTo('home');
      tick();
      expect(fixture.debugElement.query(By.css('#home')).classes[activeLinkClass]).toBeTruthy();
    }));
  });

  describe('Books navigation', () => {
    it('should route to /books', () => {
      const href = fixture.debugElement.query(By.css('#books')).nativeElement.getAttribute('href');
      expect(href).toEqual('/books');
    });
    it('should be marked as active if on /books', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('#books')).classes[activeLinkClass]).toBeFalsy();
      routeTester.navigateTo('books');
      tick();
      expect(fixture.debugElement.query(By.css('#books')).classes[activeLinkClass]).toBeTruthy();
    }));
  });
});

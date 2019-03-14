import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {click, RouterLinkStubDirective} from 'src/testing';
import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, RouterLinkStubDirective]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<HomeComponent> = TestBed.createComponent(HomeComponent);
    const component: HomeComponent = fixture.componentInstance;
    fixture.detectChanges();
    return {fixture, component};
  }

  it('should create', () => {
    const {component} = setup();
    expect(component).toBeTruthy();
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

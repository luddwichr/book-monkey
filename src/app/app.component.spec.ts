import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BookListComponent} from './book-list/book-list.component';
import {MockComponent, MockedComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponent(BookListComponent)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a book list', () => {
    const bookList = fixture.debugElement.query(By.css('bm-book-list')).componentInstance as BookListComponent;
    expect(bookList).toBeTruthy();
  });
});

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {instance, mock} from 'ts-mockito';
import {BookStoreService} from '../shared/book-store.service';
import {BookFormComponent} from './book-form.component';

describe('BookFormComponent', () => {
  const bookStoreServiceMock: BookStoreService = mock(BookStoreService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      providers: [{provide: BookStoreService, useValue: instance(bookStoreServiceMock)}],
      imports: [FormsModule]
    }).compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<BookFormComponent> = TestBed.createComponent(BookFormComponent);
    const component: BookFormComponent = fixture.componentInstance;
    reflectChanges(fixture);
    return {fixture, component};
  }

  function reflectChanges(fixture: ComponentFixture<BookFormComponent>) {
    fixture.detectChanges();
    tick();
  }

  function elementByName(fixture: ComponentFixture<BookFormComponent>, name: string) {
    return fixture.debugElement.query(By.css('[name="' + name + '"]')).nativeElement;
  }

  it('should require a title', fakeAsync(() => {
    const {component, fixture} = setup();
    elementByName(fixture, 'title').dispatchEvent(new Event('input'));
    reflectChanges(fixture);

    expect(component.errors.title).toEqual('Es muss ein Buchtitel angeben werden');
  }));

  it('should be invalid initially, but without errors shown', fakeAsync(() => {
    const {component} = setup();
    expect(component.bookForm.valid).toBeFalsy();
    expect(component.errors).toEqual({});
  }));

  it('should be valid when all validations pass', fakeAsync(() => {
    const {component, fixture} = setup();

    component.book = {
      title: 'testTitle',
      authors: ['testAuthor'],
      published: new Date(),
      isbn: '1234567890',
      thumbnails: [{url: '', title: ''}]
    };
    reflectChanges(fixture);

    expect(component.bookForm.valid).toBeTruthy();
    expect(component.errors).toEqual({});
  }));
});

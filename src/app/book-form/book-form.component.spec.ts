import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {asyncData} from 'src/testing';
import {anything, capture, instance, mock, verify, when} from 'ts-mockito';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {BookFormComponent} from './book-form.component';

class BookFormComponentPage {
  constructor(private fixture: ComponentFixture<BookFormComponent>) {}

  triggerSaveAction() {
    this.submitButton().click();
  }

  saveButtonDisabledState() {
    return this.submitButton().disabled;
  }

  private submitButton() {
    return this.fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
  }

  triggerInput(inputName: string, input: string) {
    const element = this.fixture.debugElement.query(By.css('[name="' + inputName + '"]')).nativeElement;
    element.value = input;
    element.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
    tick();
  }
}

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
    const page: BookFormComponentPage = new BookFormComponentPage(fixture);
    reflectChanges(fixture);
    return {fixture, component, page};
  }

  function reflectChanges(fixture: ComponentFixture<BookFormComponent>) {
    fixture.detectChanges();
    tick();
  }

  function expectInputValidationError(inputName: string, input: string, errorName: string, expectedError: string) {
    const {component, page} = setup();
    page.triggerInput(inputName, input);
    expect(component.errors[errorName]).toEqual(expectedError);
  }

  it('should require a title', fakeAsync(() => {
    expectInputValidationError('title', '', 'title', 'Es muss ein Buchtitel angeben werden');
  }));

  it('should require an author', fakeAsync(() => {
    expectInputValidationError('authors', '', 'authors', 'Es muss ein Autor angeben werden');
  }));

  it('should require an isbn', fakeAsync(() => {
    expectInputValidationError('isbn', '', 'isbn', 'Es muss eine ISBN angeben werden');
  }));

  it('should require an isbn with minimum length 10', fakeAsync(() => {
    expectInputValidationError('isbn', '123456789', 'isbn', 'Die ISBN muss mindestens 10 Zeichen haben');
  }));

  it('should require an isbn with maximum length 13', fakeAsync(() => {
    expectInputValidationError('isbn', '12345678901234', 'isbn', 'Die ISBN darf höchstens 13 Zeichen haben');
  }));

  it('should require a publication date', fakeAsync(() => {
    expectInputValidationError('title', '', 'title', 'Es muss ein Buchtitel angeben werden');
    const {component, page} = setup();
    page.triggerInput('published', '');
    expect(component.errors.published).toEqual('Es muss ein Erscheinungsdatum angeben werden');
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

  it('should deactivate the `Speichern` button if the form is invalid', fakeAsync(() => {
    const {fixture, page} = setup();
    fixture.detectChanges();
    expect(page.saveButtonDisabledState()).toBeTruthy();
  }));

  it('should submit the book to the BookStore API when clicking `Speichern` button', fakeAsync(() => {
    when(bookStoreServiceMock.create(anything())).thenReturn(asyncData(null));
    const {component, fixture, page} = setup();
    component.book = {
      title: 'testTitle',
      subtitle: 'testSubtitle',
      authors: ['A,B'],
      published: new Date(2019, 4, 1),
      isbn: '1234567890',
      thumbnails: [{url: 'x', title: 'y'}]
    };
    reflectChanges(fixture);
    fixture.detectChanges();

    page.triggerSaveAction();

    verify(bookStoreServiceMock.create(anything())).once();
    const [bookToCreate] = capture(bookStoreServiceMock.create).last();
    expect(bookToCreate).toEqual({
      title: 'testTitle',
      subtitle: 'testSubtitle',
      authors: ['A', 'B'],
      published: new Date(2019, 4, 1),
      isbn: '1234567890',
      thumbnails: [{url: 'x', title: 'y'}]
    });

    fixture.detectChanges();
    tick();

    expect(component.book).toEqual(emptyBook());
  }));
});

function emptyBook(): Book {
  return {
    isbn: null,
    title: null,
    subtitle: null,
    authors: [null],
    published: null,
    thumbnails: [{url: null, title: null}],
    description: null
  };
}

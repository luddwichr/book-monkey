export class ErrorMessage {
  constructor(public forControl: string, public forValidator: string, public text: string) {}
}

export const BookFormErrorMessages: ErrorMessage[] = [
  new ErrorMessage('title', 'required', 'Es muss ein Buchtitel angeben werden'),
  new ErrorMessage('isbn', 'required', 'Es muss eine ISBN angeben werden'),
  new ErrorMessage('isbn', 'minlength', 'Die ISBN muss mindestens 10 Zeichen haben'),
  new ErrorMessage('isbn', 'maxlength', 'Die ISBN darf höchstens 13 Zeichen haben'),
  new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angeben werden'),
  new ErrorMessage('authors', 'required', 'Es muss ein Autor angeben werden')
];

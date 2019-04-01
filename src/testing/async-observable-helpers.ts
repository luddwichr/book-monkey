import {defer, Observable} from 'rxjs';

export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data));
}

// code kept here for reference to show how async errors can be created
// export function asyncError<T>(errorObject: any) {
//   return defer(() => Promise.reject(errorObject));
// }

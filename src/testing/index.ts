import {Component, DebugElement} from '@angular/core';

export * from './activated-route-stub';
export * from './async-observable-helpers';
export * from './book-builder';
export * from './route-tester';
export * from './router-link-stub-directive';
export * from './router-outlet-component-stub';

@Component({
  selector: 'bm-dummy',
  template: '',
  styles: []
})
export class DummyComponent {}

export const ButtonClickEvents = {
  left: {button: 0},
  right: {button: 2}
};

export function click(element: DebugElement | HTMLElement, eventObject: any = ButtonClickEvents.left): void {
  if (element instanceof HTMLElement) {
    element.click();
  } else {
    element.triggerEventHandler('click', eventObject);
  }
}

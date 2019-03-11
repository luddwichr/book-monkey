import {ComponentFixture} from '@angular/core/testing';
import {Router} from '@angular/router';
import {AppComponent} from './app.component';
import {Location} from '@angular/common';
import {NgZone, Injectable, Component} from '@angular/core';

@Component({
  selector: 'bm-dummy',
  template: '',
  styles: []
})
export class DummyComponent {}

@Injectable()
export class RouteTester {
  constructor(private router: Router, private location: Location, private ngZone: NgZone) {}
  getCurrentRoute(): string {
    return this.location.path();
  }
  async navigateTo(url: string) {
    return this.ngZone.run(() => this.router.navigateByUrl(url));
  }
  getRenderedComponent(appComponentFixture: ComponentFixture<AppComponent>): string {
    return appComponentFixture.debugElement.children[1].componentInstance;
  }
}

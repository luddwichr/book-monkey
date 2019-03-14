import {Location} from '@angular/common';
import {DebugElement, Injectable, NgZone} from '@angular/core';
import {ComponentFixture} from '@angular/core/testing';
import {Router, RouterLinkActive, RouterLinkWithHref} from '@angular/router';

@Injectable()
export class RouteTester {
  constructor(private router: Router, private location: Location, private ngZone: NgZone) {}

  getCurrentRoute(): string {
    return this.location.path();
  }

  async navigateTo(url: string) {
    return this.ngZone.run(() => this.router.navigateByUrl(url));
  }

  getRenderedComponent<T>(rootFixture: ComponentFixture<T>): string {
    return rootFixture.debugElement.children[1].componentInstance;
  }

  getRouterLink(debugElement: DebugElement): RouterLinkWithHref {
    return debugElement.injector.get(RouterLinkWithHref);
  }

  getRouterLinkActive(debugElement: DebugElement): RouterLinkActive {
    return debugElement.injector.get(RouterLinkActive);
  }
}

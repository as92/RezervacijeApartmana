import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AdminApp';
  constructor(private router: Router) {
    // override the route reuse strategy
    // tslint:disable-next-line: only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

  }
  otvoriNav() {
    document.getElementById('myNav').style.width = '100%';
  }

  zatvoriNav() {
    document.getElementById('myNav').style.width = '0%';
  }


}

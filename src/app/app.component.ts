import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent /* implements OnInit */ {
  title = 'Flow Flashcard System';

  public hideSidebar = true;

  constructor(private auth: AuthService, private router: Router) { }

  /*ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideSidebar = this.router.url === '/';
      }
    });
  } */

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}

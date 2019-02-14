import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  private currentUser;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private router: Router) {
    this.auth.currentUser.subscribe(result => this.currentUser = result);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  get isStudent() {
    return this.currentUser && this.currentUser.role === 'student';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}

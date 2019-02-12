import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router: Router, private auth: AuthService) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const currentUser = this.auth.currentUserValue;
  if (currentUser) {
      if (!currentUser.role === route.data.role) {
          this.router.navigate(['/']);
          return false;
      }
      return true;
  }
  this.router.navigate(['/']);
  return false;
}
}

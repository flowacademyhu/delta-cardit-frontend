import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser = localStorage.getItem('current_user');
    let asd = JSON.parse(currentUser);
    if (currentUser) {
      if (route.data.role.includes(asd.role)) {
        return true;
      }
      this.router.navigate(['index']);
      return false;
    }
    this.router.navigate(['']);
    return false;
  }
}

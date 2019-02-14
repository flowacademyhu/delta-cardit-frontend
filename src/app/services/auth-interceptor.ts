import { AuthService } from 'src/app/services/auth.service';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private auth: AuthService) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.auth.getToken(); // auth is provided via constructor.
  if (token) {
    // Logged in. Add Bearer token.
    return next.handle(
      req.clone({
        headers: req.headers.set('authorization', token)
      })
    );
  }
  // Not logged in. Continue without modification.
  return next.handle(req);
  }
}

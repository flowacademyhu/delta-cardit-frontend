import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userEmail: string;
  public userPassword: string;
  public error: string;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);


  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'Az e-mail cím kitöltése kötelező!' :
      this.email.hasError('email') ? 'Nem megfelelő e-mail formátum!' :
        '';
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'A jelszó megadása kötelező!' : '';
  }

  constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit() {
  }

  public submit() {
    this.auth.login(this.userEmail, this.userPassword)
      .subscribe(
        result => {
          this.router.navigate(['index']).then(() => {
            this.snack.open('Sikeres bejelentkezés!', 'Ok', {
              duration: 3000,
            });
          });
        },
        err => {
          this.error = 'Could not authenticate';
          this.snack.open('Sikertelen bejejelentkezés!', 'Ok', {
            duration: 3000,
          });
        }
      );
  }
}

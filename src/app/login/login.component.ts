import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}

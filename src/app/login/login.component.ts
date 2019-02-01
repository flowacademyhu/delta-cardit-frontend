import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Az e-mail cím kitöltése kötelező' :
        this.email.hasError('email') ? 'Nem megfelelő e-mail formátum!' :
            '';
  }

  constructor() { }

  ngOnInit() {
  }

}

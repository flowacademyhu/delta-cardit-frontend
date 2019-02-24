import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private userEmail: string;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userService: UsersService, private router: Router, private snack: MatSnackBar
    ) { }

  ngOnInit() {
  }

  public submit() {
    this.userService.changePassword(this.userEmail).subscribe(result => {
      this.snack.open('Új jelszót küldtünk az e-mail címedre!', 'Ok', { duration : 3000});
      this.router.navigate(['']);
    }, err => {
      this.snack.open('A jelszót nem sikerült módosítani!', 'Ok', { duration : 3000});
    });
  }

}

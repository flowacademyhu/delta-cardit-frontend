import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss']
})
export class MyDetailsComponent implements OnInit {
  private userPassword: string;
  private currentUser;

  constructor(private userService: UsersService, private router: Router, private auth: AuthService, private snack: MatSnackBar) {
    this.auth.currentUser.subscribe(result => {
      this.currentUser = result;
    });
  }

  ngOnInit() {
  }

  public submit() {
    this.userService.changeOwnPassword(this.currentUser.id, this.userPassword).subscribe(result => {
      this.router.navigate(['index']).then(() => {
        this.snack.open('Sikeres jelszó módosítás!', 'Ok', { duration: 3000 });
      }, err => {
        this.snack.open('Sikertelen jelszó modosítás!', 'Ok', { duration: 3000 });
      });
    });
  }
}

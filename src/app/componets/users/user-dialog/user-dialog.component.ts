import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  private user: UserModel = {};

  private randomPassword: string = null;
  private role: string = null;
  private group: number = null;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  passwordGenerator() {
    this.randomPassword = Math.random().toString(36).slice(-8);
  }

  save() {
    this.user.password = this.randomPassword;
    this.user.role = this.role;
    this.user.GroupId = this.group;
    console.log(this.user);
    this.usersService.newUser(this.user).subscribe(result => {
      alert('Sikeres mentés!');
      this.router.navigate(['users']);
    },
    err => {
      alert('A mentés sikertelen!');
      this.router.navigate(['users']);
    });
  }

}

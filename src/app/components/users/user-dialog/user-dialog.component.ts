import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  private user: UserModel = {};

  private randomPassword: string = null;
  private role: string = null;

  private groups: GroupModel[] = [];

  constructor(private usersService: UsersService,
    private groupService: GroupsService,
    private router: Router,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.getGroups();
  }

  passwordGenerator() {
    this.randomPassword = Math.random().toString(36).slice(-8);
  }

  getGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  save() {
    this.user.password = this.randomPassword;
    this.user.role = this.role;
    console.log(this.user);
    this.usersService.newUser(this.user).subscribe(result => {
      this.router.navigate(['users']).then(() => {
        this.snack.open('A mentés sikeres!', 'Ok', { duration : 3000});
      });
    },
    err => {
      this.router.navigate(['users']).then(() => {
        this.snack.open('A mentés sikertelen!', 'Ok', { duration : 3000});
      });
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';

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

  constructor(private usersService: UsersService, private groupService: GroupsService, private router: Router) { }

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
      alert('Sikeres mentés!');
      this.router.navigate(['users']);
    },
    err => {
      alert('A mentés sikertelen!');
      this.router.navigate(['users']);
    });
  }

}

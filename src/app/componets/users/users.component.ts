import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: UserModel[] = [];

  public newUser: UserModel;

  constructor(private usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
    });
  }

}

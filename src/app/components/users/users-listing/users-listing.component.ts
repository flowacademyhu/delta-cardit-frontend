import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from 'src/app/components/users/user-dialog/user-dialog.component';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {

  public users: UserModel[] = [];

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

  handleUserDeleted() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

}

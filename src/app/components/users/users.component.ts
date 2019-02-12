import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() userModel: UserModel;

  @Output() userDeleted = new EventEmitter<UserModel>();

  private userName: string;

  constructor(private usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userName = this.userModel.lastName + ' ' + this.userModel.firstName;
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
    });
  }

  deleteUser() {
    this.usersService.deleteUser(this.userModel.id).subscribe(result => {
      alert('A törlés sikeres!');
      this.userDeleted.next(this.userModel);
    }, error => {
      console.log('Error', error);
    });
  }
}

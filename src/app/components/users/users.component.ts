import { Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() userModel: UserModel;

  @Output() userDeleted = new EventEmitter<UserModel>();

  private users: UserModel[] = [];
  private sendedUser: UserModel = {} as UserModel;
  private selectedUser: UserModel;

  private userName: string;

  constructor(private usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
    });
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  handleUserDeleted() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUser(id: number) {
    this.usersService.getOneUser(id).subscribe(user => {
      this.selectedUser = user;
      console.log(this.selectedUser);
    });
  }

  updateUser() {
    this.selectedUser = this.sendedUser;
    this.usersService.editUser(this.sendedUser).subscribe(result => {
      alert('A mentés sikeres!');
    }, err => {
      alert('A mentés sikertelen!');
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(result => {
      alert('A törlés sikeres!');
      this.userDeleted.next(this.userModel);
    }, error => {
      console.log('Error', error);
    });
  }
}

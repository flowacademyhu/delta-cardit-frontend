import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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

  @Input() userModel: UserModel;

  @Output() userDeleted = new EventEmitter<UserModel>();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
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

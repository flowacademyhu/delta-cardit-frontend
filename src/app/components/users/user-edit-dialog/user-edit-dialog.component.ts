import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  private selectedUser: UserModel = {};

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {}

}

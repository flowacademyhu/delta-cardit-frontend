import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() user: UserModel;

  constructor() { }

  ngOnInit() {
  }

}

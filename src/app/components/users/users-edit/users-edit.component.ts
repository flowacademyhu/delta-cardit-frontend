import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  private user: UserModel = {} as UserModel;
  private groups: GroupModel[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private groupService: GroupsService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.usersService.getOneUser(params.id).subscribe((result: UserModel) => {
          this.user = result ? result : {} as UserModel;
        });
      }
    });
    this.getGroups();
  }

  getGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  update() {
    console.log(this.user);
      this.usersService.editUser(this.user).subscribe((result) => {
        this.router.navigate(['users']).then(() => {
          this.snack.open('A mentés sikeres!', 'Ok', { duration : 3000});
        });
      }, (error) => {
        this.snack.open('A mentés sikerertelen!', 'Ok', { duration : 3000});
      });
    }
  }


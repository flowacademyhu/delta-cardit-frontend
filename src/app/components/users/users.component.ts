import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild} from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() userModel: UserModel;

  @Output() userDeleted = new EventEmitter<UserModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private users: UserModel[] = [];
  private groups: GroupModel[] = [];
  private sendedUser: UserModel = {} as UserModel;
  private selectedUser: UserModel;
  public dataSource;
  public displayedColumns: string[] = ['id', 'name', 'email', 'role', 'edit'];
  private userName: string;

  constructor(private usersService: UsersService,
    private dialog: MatDialog,
    private groupService: GroupsService,
    private snack: MatSnackBar) {
    dialog.afterAllClosed
    .subscribe(() => {
      this.ngOnInit();
    }
  );
   }

  ngOnInit() {
    this.loadUsers();
    this.getGroups();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
    });
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe(users => {
    this.dataSource = new MatTableDataSource<UserModel>(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  getGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
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
      this.snack.open('A törlés sikeres!', 'Ok', { duration : 3000});
      this.userDeleted.next(this.userModel);
      this.ngOnInit();
    }, error => {
      this.snack.open('A törlés sikertelen!', 'Ok', { duration : 3000});
    });
  }
}

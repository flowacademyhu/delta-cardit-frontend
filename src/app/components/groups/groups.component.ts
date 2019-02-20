import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Input() groupModel: GroupModel;

  @Output() groupDeleted = new EventEmitter<GroupModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private groups: GroupModel[] = [];
  private sendedGroup: GroupModel = {} as GroupModel;
  private selectedGroup: GroupModel;
  private deckIdsOfGroup: number[] = [];
  public dataSource;
  public displayedColumns: string[] = ['id', 'name', 'edit'];

  constructor(private groupService: GroupsService, private dialog: MatDialog,
    private snack: MatSnackBar) {
    dialog.afterAllClosed
    .subscribe(() => {
      this.ngOnInit();
    }
  );
   }

     ngOnInit() {
       this.loadGroups();
   }

   openDialog(): void {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
    });
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
     // this.groups = groups;
      this.dataSource = new MatTableDataSource<GroupModel>(groups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

  getUser(id: number) {
    this.groupService.getOneGroup(id).subscribe(group => {
      this.selectedGroup = group;
      console.log(this.selectedGroup);
    });
  }

  updateUser() {
    this.selectedGroup = this.sendedGroup;
    this.groupService.editGroup(this.sendedGroup).subscribe(result => {
      this.snack.open('A mentés sikeres!', 'Ok', { duration : 3000});
    }, err => {
      this.snack.open('A mentés sikertelen!', 'Ok', { duration : 3000});
    });
  }

  handleGroupDeleted() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

   deleteGroup(id: number) {
    this.groupService.deleteGroup(id).subscribe(result => {
      this.snack.open('A törlés sikeres!', 'Ok', { duration : 3000});
      this.groupDeleted.next(this.groupModel);
      this.ngOnInit();
    }, error => {
      this.snack.open('A törlés sikertelen!', 'Ok', { duration : 3000});
      console.log('Error', error);
    });
  }

}

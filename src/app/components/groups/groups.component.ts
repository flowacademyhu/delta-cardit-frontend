import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Input() groupModel: GroupModel;

  @Output() groupDeleted = new EventEmitter<GroupModel>();

  private groups: GroupModel[] = [];
  private sendedGroup: GroupModel = {} as GroupModel;
  private selectedGroup: GroupModel;

  constructor(private groupService: GroupsService, private dialog: MatDialog) { }

     ngOnInit() {
       this.loadGroups();
   }

   openDialog(): void {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
    });
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
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
      alert('A mentés sikeres!');
    }, err => {
      alert('A mentés sikertelen!');
    });
  }

  handleGroupDeleted() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

   deleteGroup(id: number) {
    this.groupService.deleteGroup(id).subscribe(result => {
      alert('A törlés sikeres!');
      this.groupDeleted.next(this.groupModel);
    }, error => {
      console.log('Error', error);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { GroupDialogComponent } from 'src/app/components/groups/group-dialog/group-dialog.component';
import { MatDialog } from '@angular/material';
import { GroupsService } from 'src/app/services/groups.service';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-group-listing',
  templateUrl: './group-listing.component.html',
  styleUrls: ['./group-listing.component.scss']
})
export class GroupListingComponent implements OnInit {

  private groups: GroupModel[] = [];

  constructor(private dialog: MatDialog, private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GroupDialogComponent, {
    });
  }

  handleGroupDeleted() {
    this.groupsService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public groups: GroupModel[] = [];

  constructor(private groupService: GroupsService) { }

     ngOnInit() {
     this.groupService.getAllGroups().subscribe(groups => {
       this.groups = groups;
     });
   }

}

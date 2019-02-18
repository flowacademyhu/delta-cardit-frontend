import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';
import { Router, ActivatedRoute } from '@angular/router';
import { group } from '@angular/animations';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-groups-data',
  templateUrl: './groups-data.component.html',
  styleUrls: ['./groups-data.component.scss']
})
export class GroupsDataComponent implements OnInit {
  usersData: any = [];
  deckData: any = [];
  groups: any = [];
  groupName: string = "name";
  myModel: number = 1;

  constructor(
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    var id = this.route.snapshot.params['id'];
    console.log(id);
    this.getUsersByGroup(id);
    this.getDecksByGroup(id);
    this.loadGroups();
    this.groups.forEach(group => {
      if (group.id = id) {
        this.groupName = group.name;
      } else {
        this.groupName = id;
      }
      this.groups.fi
    });
  }

  getUsersByGroup(id: number) {
    this.groupService.usersByGroupId(id).subscribe(group => {
      this.usersData = group;
      console.log(this.usersData);
    });
  }

  getDecksByGroup(id: number) {
    this.groupService.decksByGroupId(id).subscribe(group => {
      this.deckData = group;
      console.log(this.deckData);
    });
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  groupData(data: number) {
    this.myModel = data;
  }
}

import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-groups-data',
  templateUrl: './groups-data.component.html',
  styleUrls: ['./groups-data.component.scss']
})
export class GroupsDataComponent implements OnInit {
  usersData: any = [];
  deckData: any = [];
  group: GroupModel = {} as GroupModel;

  constructor(
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.getUsersByGroup(id);
    this.getDecksByGroup(id);
    this.loadGroup();
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

  loadGroup() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.groupService.getOneGroup(params.id).subscribe((result: GroupModel) => {
          this.group = result ? result : {} as GroupModel;
        });
      }
    });
  }
}

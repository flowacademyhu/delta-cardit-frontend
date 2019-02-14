import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-groups-edit',
  templateUrl: './groups-edit.component.html',
  styleUrls: ['./groups-edit.component.scss']
})
export class GroupsEditComponent implements OnInit {

  private group: GroupModel = {} as GroupModel;

  constructor(private router: Router, private route: ActivatedRoute, private groupService: GroupsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.groupService.getOneGroup(params.id).subscribe((result: GroupModel) => {
          this.group = result ? result : {} as GroupModel;
        });
      }
    });
  }

  update() {
    this.groupService.editGroup(this.group).subscribe((result) => {
      alert('Mentés sikeres');
      this.router.navigate(['groups']);
    }, (error) => {
      alert('Mentés sikertelen!');
      console.log('Error', error);
    });
  }
}

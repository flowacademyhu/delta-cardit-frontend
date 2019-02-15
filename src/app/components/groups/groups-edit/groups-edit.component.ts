import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GroupsService } from 'src/app/services/groups.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-groups-edit',
  templateUrl: './groups-edit.component.html',
  styleUrls: ['./groups-edit.component.scss']
})
export class GroupsEditComponent implements OnInit {

  private group: GroupModel = {} as GroupModel;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private snack: MatSnackBar) { }

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
      this.router.navigate(['groups']).then(() => {
        this.snack.open('A mentés sikeres!', 'Ok', { duration : 3000});
      });
    }, (error) => {
      this.snack.open('A mentés sikertelen!', 'Ok', { duration : 3000});
    });
  }
}

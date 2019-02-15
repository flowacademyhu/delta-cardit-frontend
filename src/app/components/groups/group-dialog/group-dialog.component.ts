import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  private group: GroupModel = {};

  private name: string = null;

  constructor(private groupsService: GroupsService,
    private router: Router,
    private snack: MatSnackBar) { }

  ngOnInit() {
  }

  save() {
    this.group.name = this.name;
    console.log(this.group);
    this.groupsService.newGroup(this.group).subscribe(result => {
      this.router.navigate(['groups']).then(() => {
        this.snack.open('A mentés sikeres!', 'Ok', { duration : 3000});
      });
    },
    err => {
      this.router.navigate(['groups']).then(() => {
        this.snack.open('A mentés sikertelen!', 'Ok', { duration : 3000});
      });
    });
  }
}

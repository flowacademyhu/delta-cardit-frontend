import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  private group: GroupModel = {};

  private name: string = null;

  constructor(private groupsService: GroupsService, private router: Router) { }

  ngOnInit() {
  }

  save() {
    this.group.name = this.name;
    console.log(this.group);
    this.groupsService.newGroup(this.group).subscribe(result => {
      alert('Sikeres mentés!');
      this.router.navigate(['groups']);
    },
    err => {
      alert('A mentés sikertelen!');
      this.router.navigate(['groups']);
    });
  }
}

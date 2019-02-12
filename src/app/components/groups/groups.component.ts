import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Input() groupModel: GroupModel;

  @Output() groupDeleted = new EventEmitter<GroupModel>();

  constructor(private groupService: GroupsService) { }

     ngOnInit() {
   }

   deleteGroup() {
    this.groupService.deleteGroup(this.groupModel.id).subscribe(result => {
      alert('A törlés sikeres!');
      this.groupDeleted.next(this.groupModel);
    }, error => {
      console.log('Error', error);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GroupModel } from 'src/app/models/group.model';
import { DecksService } from 'src/app/services/decks.service';
import { MatDialog } from '@angular/material';
import { DeckModel } from 'src/app/models/deck.model';
import { group } from '@angular/animations';
import { FooterRowOutlet } from '@angular/cdk/table';

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
    private decksService: DecksService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.getUsersByGroup(id);
    this.getDecksByGroup(id);
    this.loadGroup();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GroupDataDialogComponent, {
    });
  }

  getUsersByGroup(id: number) {
    this.groupService.usersByGroupId(id).subscribe(result => {
      this.usersData = result;
      console.log(this.usersData);
    });
  }

  getDecksByGroup(id: number) {
    this.groupService.decksByGroupId(id).subscribe(result => {
      this.deckData = result;
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

  deleteDeck(deckId: number) {
    const groupId = this.group.id;
    this.decksService.deleteGroupDecks(groupId, deckId).subscribe(result => {
      console.log('Mink vagyunk a legjobbak tesó!');
      this.ngOnInit();
    }, err => {
      console.log('Nooooooooooo');
    });
  }
}

@Component({
  selector: 'app-groups-data-dialog',
  templateUrl: 'groups-data-dialog.html',
  styleUrls: ['groups-data-dialog.scss'],
})
export class GroupDataDialogComponent implements OnInit {

  private decks: DeckModel[] = [];
  private deckIds: number[];
  private deckId: number;

  constructor(private dialog: MatDialog,
    private decksService: DecksService,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private groupData: GroupsDataComponent) { }

    ngOnInit() {
      this.decksService.getAllDecks().subscribe(decks => {
        this.decks = decks;
      });
    }

    save() {
      const currentGroup = this.groupData.group;
      console.log(currentGroup);
      this.decksService.addingDecks(currentGroup.id, this.deckIds).subscribe(result => {
        console.log('Mink vagyunk a legjobbak tesó!');
        this.ngOnInit();
      }, err => {
        console.log('Szoppantyú!');
      });
    }
}

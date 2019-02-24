import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DecksService } from 'src/app/services/decks.service';
import { ActivatedRoute, Params, ParamMap, Router } from '@angular/router';
import { GroupsService } from 'src/app/services/groups.service';
import { DeckModel } from 'src/app/models/deck.model';
import { GroupModel } from 'src/app/models/group.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-groups-data-dialog',
  templateUrl: './groups-data-dialog.component.html',
  styleUrls: ['./groups-data-dialog.component.scss']
})
export class GroupsDataDialogComponent implements OnInit {

  private decks: DeckModel[] = [];
  private currentGroup: GroupModel = {} as GroupModel;
  private deckId: number;
  private paramId: number;

  constructor(private decksService: DecksService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<GroupsDataDialogComponent>,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.getDecks();
    this.route.firstChild.params.subscribe((params) => {
      this.paramId = params.id;
    });
  }

  getDecks() {
    this.decksService.getAllDecks().subscribe(decks => {
      this.decks = decks;
    });
  }

  save() {
    this.decksService.addingDecks(this.paramId, this.deckId).subscribe(result => {
      this.snack.open('A hozzáadás sikeres!', 'Ok', { duration : 3000});
      this.dialogRef.close();
    }, err => {
      this.snack.open('A hozzáadás sikertelen!', 'Ok', { duration : 3000});
    });
  }
}

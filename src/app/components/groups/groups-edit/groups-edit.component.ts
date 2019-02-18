import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GroupsService } from 'src/app/services/groups.service';
import { MatSnackBar, MatCheckboxModule } from '@angular/material';
import { DecksService } from 'src/app/services/decks.service';
import { DeckModel } from 'src/app/models/deck.model';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-groups-edit',
  templateUrl: './groups-edit.component.html',
  styleUrls: ['./groups-edit.component.scss']
})
export class GroupsEditComponent implements OnInit {

  private group: GroupModel = {} as GroupModel;
  private selectableDecks: number[] = [];
  private selectableIds: number[] = [];
  private preSelectedDecks: number[] = [];
  private refreshedDecks: number[] = [];
  private checked = true;
  private isInTheArray: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private snack: MatSnackBar,
    private check: MatCheckboxModule,
    private deckService: DecksService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.groupService.getOneGroup(params.id).subscribe((result: GroupModel) => {
          this.group = result ? result : {} as GroupModel;
        });
        this.groupService.getAllGroupDecks(params.id).subscribe(decks => {
          this.preSelectedDecks = decks;
        });
        this.deckService.getAllDecks().subscribe(selectable => {
          this.selectableDecks = selectable;
        });
      }
    });
  }

  /* checkValue(event: any) {
     console.log(event.source.value);
     console.log(this.selectedDecks);
     if (this.selectableDecks.includes(event.source.value)) {
       this.selectedDecks.splice(event.source.value);
     } else {
       this.refreshedDecks.push(event.source.value);
     }
    } */

    checkValue(event: any) {
      console.log(this.preSelectedDecks);
      this.refreshedDecks.push(event.source.value);
      console.log(this.refreshedDecks);
    }

    update() {
      console.log(this.refreshedDecks);
      this.group.deckId = this.refreshedDecks;
      console.log(this.group.deckId);
      this.groupService.editGroup(this.group).subscribe((result) => {
        this.router.navigate(['groups']).then(() => {
          this.snack.open('A mentés sikeres!', 'Ok', { duration: 3000 });
        });
      }, (error) => {
        this.snack.open('A mentés sikertelen!', 'Ok', { duration: 3000 });
      });
    }
  }

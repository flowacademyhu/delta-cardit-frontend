import { Component, OnInit } from '@angular/core';
import { DecksService } from 'src/app/services/decks.service';
import { DeckModel } from 'src/app/models/deck.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { NewDeckComponent } from '../new-deck/new-deck.component';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
import { GroupModel } from 'src/app/models/group.model';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public decks: DeckModel[] = [];

  private currentUser: any = {};

  private group: GroupModel = {};

  constructor(private decksService: DecksService,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private auth: AuthService,
    private groupsService: GroupsService,
    private snack: MatSnackBar) {
    this.auth.currentUser.subscribe(result => {
      this.currentUser = result;
      if (this.currentUser.role === 'student') {
      this.getGroup();
      } else {
        this.loadDecks();
      }
    });
  }


  ngOnInit() {
    // this.loadDecks();
  }

  loadDecks() {
    this.decksService.getAllDecks().subscribe(decks => {
      this.decks = decks;
      console.log(decks);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewDeckComponent, {
    }).afterClosed().subscribe(result => {
      this.loadDecks();
    });
  }

  destroy(id: number) {
      const url = `${environment.apiUrl}/decks/${id}`;
      return this.httpClient.delete(url).toPromise()
        .then(() => {
          this.snack.open('A törlés sikeres!', 'Ok', { duration : 3000});
          if (this.currentUser.role === 'student') {
            this.getGroup();
            } else {
              this.loadDecks();
            }
        });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  get isStudent() {
    return this.currentUser && this.currentUser.role === 'student';
  }

  getGroup() {
    console.log(this.currentUser);
    this.groupsService.getOneGroup(this.currentUser.groupId).subscribe(group => {
      this.group = group;
      this.getUserDecks();
    });
  }

  getUserDecks() {
    this.decksService.getByGroup(this.group.id).subscribe(decks => {
      this.decks = decks;
    });
    console.log(this.group.id);
  }
}

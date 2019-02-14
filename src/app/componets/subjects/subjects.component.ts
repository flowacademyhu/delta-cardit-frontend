import { Component, OnInit } from '@angular/core';
import { DecksService } from 'src/app/services/decks.service';
import { DeckModel } from 'src/app/models/deck.model';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { NewDeckComponent } from '../new-deck/new-deck.component';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public decks: DeckModel[] = [];

  constructor(private decksService: DecksService, private httpClient: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.decksService.getAllDecks().subscribe(decks => {
      this.decks = decks;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewDeckComponent, {
    });
  }

  destroy(id: number) {
    if (confirm('Biztos véglegesen törli a kártyát?')) {
      const url = `${'http://localhost:8000/decks'}/${id}`;
      return this.httpClient.delete(url).toPromise()
        .then(() => {
          this.ngOnInit();
        });
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GroupModel } from 'src/app/models/group.model';
import { DecksService } from 'src/app/services/decks.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DeckModel } from 'src/app/models/deck.model';
import { group } from '@angular/animations';
import { FooterRowOutlet } from '@angular/cdk/table';
import { UserModel } from 'src/app/models/user.model';
import { GroupsDataDialogComponent } from './groups-data-dialog/groups-data-dialog.component';

@Component({
  selector: 'app-groups-data',
  templateUrl: './groups-data.component.html',
  styleUrls: ['./groups-data.component.scss']
})
export class GroupsDataComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usersData: any = [];
  deckData: any = [];
  group: GroupModel = {} as GroupModel;
  public dataSource;
  public deckDataSource;
  public displayedColumns: string[] = ['name', 'email', 'role'];
  public deckDisplayedColumns: string[] = ['name', 'edit'];

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
    const dialogRef = this.dialog.open(GroupsDataDialogComponent, {
    });
  }

  getUsersByGroup(id: number) {
    this.groupService.usersByGroupId(id).subscribe(result => {
    //  this.usersData = result;
      this.dataSource = new MatTableDataSource<UserModel>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.usersData);
    });
  }

  getDecksByGroup(id: number) {
    this.groupService.decksByGroupId(id).subscribe(result => {
    //  this.deckData = result;
      this.deckDataSource = new MatTableDataSource<DeckModel>(result);
      this.deckDataSource.paginator = this.paginator;
      this.deckDataSource.sort = this.sort;
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

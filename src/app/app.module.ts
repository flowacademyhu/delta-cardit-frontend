import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatDialogModule, MatSnackBar,
MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule,
MatSlideToggleModule, MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION, MatSortModule, MatTableModule } from '@angular/material';
import { CardComponent } from './components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CardListComponent } from './components/card-list/card-list.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { UsersService } from './services/users.service';
import { UsersComponent } from './components/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';
import { UserDialogComponent } from './components/users/user-dialog/user-dialog.component';
import { GroupDialogComponent } from './components/groups/group-dialog/group-dialog.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { GroupsEditComponent } from './components/groups/groups-edit/groups-edit.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardModeComponent } from './components/card-mode/card-mode.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewCardComponent } from './components/new-card/new-card.component';
import { NewDeckComponent } from './components/new-deck/new-deck.component';
import { EditCardComponent } from './components/card-list/edit-card/edit-card.component';
import { DecksService } from './services/decks.service';
import { EditDeckComponent } from './components/subjects/edit-deck/edit-deck.component';
import { ChangePasswordComponent } from './components/login/change-password/change-password.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GroupsDataComponent } from './components/groups/groups-data/groups-data.component';
import { GroupsDataDialogComponent } from './components/groups/groups-data/groups-data-dialog/groups-data-dialog.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MyDetailsComponent } from './components/my-details/my-details.component';
import { DeckStatisticsComponent } from './components/deck-statistics/deck-statistics.component';




export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    CardComponent,
    CardListComponent,
    SubjectsComponent,
    UsersComponent,
    GroupsComponent,
    UserDialogComponent,
    GroupDialogComponent,
    UsersEditComponent,
    GroupsEditComponent,
    GameCardComponent,
    CardModeComponent,
    UsersComponent,
    NewCardComponent,
    NewDeckComponent,
    EditCardComponent,
    EditDeckComponent,
    GroupsDataComponent,
    ChangePasswordComponent,
    GroupsDataDialogComponent,
    MainPageComponent,
    MyDetailsComponent,
    DeckStatisticsComponent
  ],
  imports: [
    HttpClientModule,
    MatDialogModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatCardModule,
    MatButtonModule,
    DragDropModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSlideToggleModule,
    MatTableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/users/login']
      }
    }),
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  entryComponents: [
    UserDialogComponent,
    GroupDialogComponent,
    NewCardComponent,
    NewDeckComponent,
    GroupsDataDialogComponent
  ],
  providers: [AuthGuard, AuthService, UsersService, DecksService, GroupsDataComponent, GameCardComponent, CardComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}, MatSnackBar],
  bootstrap: [AppComponent]
})

export class AppModule { }

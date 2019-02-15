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
import { MatButtonModule, MatDialogModule, MatSnackBar, MatSnackBarContainer } from '@angular/material';
import { CardComponent } from './components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CardListComponent } from './components/card-list/card-list.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { UsersService } from './services/users.service';
<<<<<<< HEAD
import { UsersComponent } from './components/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';
import { UserDialogComponent } from './components/users/user-dialog/user-dialog.component';
import { GroupDialogComponent } from './components/groups/group-dialog/group-dialog.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { GroupsEditComponent } from './components/groups/groups-edit/groups-edit.component';
import { CardsService } from './services/cards.service';
import { GameCardComponent } from './componets/game-card/game-card.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CardModeComponent } from './components/card-mode/card-mode.component';
import {MatTabsModule} from '@angular/material/tabs';
=======
import { UsersComponent } from './componets/users/users.component';
import { NewCardComponent } from './componets/new-card/new-card.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NewDeckComponent } from './componets/new-deck/new-deck.component';
import { EditCardComponent } from './componets/card-list/edit-card/edit-card.component';
>>>>>>> feature/edit-cards-decks



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
<<<<<<< HEAD
    UsersComponent,
    GroupsComponent,
    UserDialogComponent,
    GroupDialogComponent,
    UsersEditComponent,
    GroupsEditComponent,
    GameCardComponent,
    CardModeComponent
=======
    UserListingComponent,
    UsersComponent,
    NewCardComponent,
    NewDeckComponent,
    EditCardComponent
>>>>>>> feature/edit-cards-decks
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/users/login']
      }
    }),
    MatDialogModule
  ],
  entryComponents: [
    UserDialogComponent,
    GroupDialogComponent
  ],
<<<<<<< HEAD
  providers: [AuthGuard, AuthService, UsersService, CardsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, MatSnackBar],
=======
  entryComponents: [
    NewCardComponent, NewDeckComponent
  ],
  providers: [AuthGuard, AuthService, UsersService],
>>>>>>> feature/edit-cards-decks
  bootstrap: [AppComponent]
})

export class AppModule { }

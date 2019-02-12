import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatDialogModule } from '@angular/material';
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
import { UsersListingComponent } from './components/users/users-listing/users-listing.component';
import { GroupListingComponent } from './components/groups/group-listing/group-listing.component';
import { GroupDialogComponent } from './components/groups/group-dialog/group-dialog.component';
import { UserEditDialogComponent } from './components/users/user-edit-dialog/user-edit-dialog.component';
import { GroupEditDialogComponent } from './components/groups/group-edit-dialog/group-edit-dialog.component';


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
    UsersListingComponent,
    GroupListingComponent,
    GroupDialogComponent,
    UserEditDialogComponent,
    GroupEditDialogComponent
  ],
  imports: [
    HttpClientModule,
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
    GroupDialogComponent,
    UserEditDialogComponent,
    GroupEditDialogComponent
  ],
  providers: [AuthGuard, AuthService, UsersService],
  bootstrap: [AppComponent]
})

export class AppModule { }

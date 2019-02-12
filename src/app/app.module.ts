import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './componets/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material';
import { CardComponent } from './componets/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CardListComponent } from './componets/card-list/card-list.component';
import { SubjectsComponent } from './componets/subjects/subjects.component';
import { UserListingComponent } from './componets/user-listing/user-listing.component';
import { UsersService } from './services/users.service';
import { UsersComponent } from './componets/users/users.component';
import { EditCardComponent } from './componets/edit-card/edit-card.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditDeckComponent } from './componets/edit-deck/edit-deck.component';



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
    UserListingComponent,
    UsersComponent,
    EditCardComponent,
    EditDeckComponent
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/users/login']
      }
    })
  ],
  entryComponents: [
    EditCardComponent, EditDeckComponent
  ],
  providers: [AuthGuard, AuthService, UsersService],
  bootstrap: [AppComponent]
})

export class AppModule { }

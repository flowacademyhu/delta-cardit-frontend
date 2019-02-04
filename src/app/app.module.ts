import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material';
import { CardComponent } from './card/card.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    CardComponent
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { NavComponent } from './componets/nav/nav.component';
import { CardComponent } from './componets/card/card.component';
import { AuthGuard } from './services/auth.guard';
import { UserListingComponent } from './componets/user-listing/user-listing.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'index', component: NavComponent, canActivate: [AuthGuard]},
  { path: 'userlist', component: UserListingComponent},
  { path: 'flashcard', component: CardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

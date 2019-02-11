import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { NavComponent } from './componets/nav/nav.component';
import { CardComponent } from './componets/card/card.component';
import { AuthGuard } from './services/auth.guard';
import { CardListComponent } from './componets/card-list/card-list.component';
import { SubjectsComponent } from './componets/subjects/subjects.component';
import { UserListingComponent } from './componets/user-listing/user-listing.component';
import { UsersComponent } from './componets/users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'index', component: NavComponent, canActivate: [AuthGuard]},
  { path: 'flashcard', component: CardComponent},
  { path: 'learningcard', component: CardListComponent},
  { path: 'subjects', component: SubjectsComponent},
  { path: 'users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

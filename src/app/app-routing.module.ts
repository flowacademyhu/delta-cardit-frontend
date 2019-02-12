import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { CardComponent } from './components/card/card.component';
import { AuthGuard } from './services/auth.guard';
import { CardListComponent } from './components/card-list/card-list.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { UsersComponent } from './components/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';
import { UsersListingComponent } from './components/users/users-listing/users-listing.component';
import { GroupListingComponent } from './components/groups/group-listing/group-listing.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'index', component: NavComponent, canActivate: [AuthGuard]},
  { path: 'flashcard', component: CardComponent},
  { path: 'learningcard', component: CardListComponent},
  { path: 'subjects', component: SubjectsComponent},
  { path: 'users', component: UsersListingComponent},
  { path: 'groups', component: GroupListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

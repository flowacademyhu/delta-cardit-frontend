import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { NavComponent } from './componets/nav/nav.component';
import { CardComponent } from './componets/card/card.component';
import { AuthGuard } from './services/auth.guard';
import { CardListComponent } from './componets/card-list/card-list.component';
import { SubjectsComponent } from './componets/subjects/subjects.component';
import { UsersComponent } from './componets/users/users.component';
import { GroupsComponent } from './componets/groups/groups.component';
import { UsersListingComponent } from './componets/users/users-listing/users-listing.component';
import { GroupListingComponent } from './componets/groups/group-listing/group-listing.component';

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

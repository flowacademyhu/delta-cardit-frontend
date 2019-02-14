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
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { GroupsEditComponent } from './components/groups/groups-edit/groups-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'index', component: NavComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student'] } },
  { path: 'flashcard', component: CardComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student']} },
  { path: 'learningcard', component: CardListComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student']} },
  { path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student']} },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor']} },
  { path: 'users/edit/:id', component: UsersEditComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor']} },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor']} },
  { path: 'groups/edit/:id', component: GroupsEditComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor']} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

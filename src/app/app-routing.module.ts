import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { NavComponent } from './componets/nav/nav.component';
import { CardComponent } from './componets/card/card.component';
import { AuthGuard } from './services/auth.guard';
import { CardListComponent } from './componets/card-list/card-list.component';
import { SubjectsComponent } from './componets/subjects/subjects.component';
import { UserListingComponent } from './componets/user-listing/user-listing.component';
import { EditCardComponent } from './componets/card-list/edit-card/edit-card.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'index', component: NavComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student'] } },
  { path: 'flashcard', component: CardComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student']} },
  { path: 'learningcard', component: CardListComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student']} },
  { path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student']} },
  // tslint:disable-next-line:max-line-length
  { path: 'learningcard/edit/:id', component: EditCardComponent, canActivate: [AuthGuard], data: {role: ['admin', 'contributor', 'student']} },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

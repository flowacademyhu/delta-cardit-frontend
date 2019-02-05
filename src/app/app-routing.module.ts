import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { NavComponent } from './componets/nav/nav.component';
import { CardComponent } from './componets/card/card.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'index', component: NavComponent},
  { path: 'flashcard', component: CardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

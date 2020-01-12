import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Componenet1Component } from './componenet1/componenet1.component';
import { Componenet2Component } from './componenet2/componenet2.component';
import { Componenet3Component } from './componenet3/componenet3.component';


const routes: Routes = [
  { path: '', redirectTo: '/first', pathMatch: 'full' },
  { path: 'first', component:  Componenet1Component},
  { path: 'second', component:  Componenet2Component},
  { path: 'third', component: Componenet3Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { SobeComponent } from './sobe/sobe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RezervacijeComponent } from './rezervacije/rezervacije.component';
import { DodajSobuComponent } from './dodaj-sobu/dodaj-sobu.component';
import { UredisobuComponent } from './uredisobu/uredisobu.component';
import { CommonModule } from '@angular/common';
import { DodajRezervacijuComponent } from './dodaj-rezervaciju/dodaj-rezervaciju.component';
import { UrediRezervacijuComponent } from './uredi-rezervaciju/uredi-rezervaciju.component';
import { FilterComponent } from './filter/filter.component';

const routes: Routes = [
  { path: '', component: SobeComponent, pathMatch: 'full' },
  { path: 'rezervacije', component: RezervacijeComponent },
  { path: 'dodajsobu', component: DodajSobuComponent },
  { path: 'uredisobu/:id', component: UredisobuComponent },
  { path: 'dodajrezervaciju', component: DodajRezervacijuComponent },
  { path: 'uredirezervaciju/:id', component: UrediRezervacijuComponent },

  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

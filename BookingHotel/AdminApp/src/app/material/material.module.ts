import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


@NgModule({

  exports: [
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule
  ],

  providers: [

  ],
  declarations: []
})
export class MaterialModule { }
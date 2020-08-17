import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SobeComponent } from './sobe/sobe.component';
import { SobeservisService } from './services/sobeservis.service';
import { RezervacijeComponent } from './rezervacije/rezervacije.component';
import { DodajSobuComponent } from './dodaj-sobu/dodaj-sobu.component';
import { UredisobuComponent } from './uredisobu/uredisobu.component';
import { DodajRezervacijuComponent } from './dodaj-rezervaciju/dodaj-rezervaciju.component';
import { UrediRezervacijuComponent } from './uredi-rezervaciju/uredi-rezervaciju.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import localeHr from '@angular/common/locales/hr';
import { DatePipe } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FilterComponent } from './filter/filter.component';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
// import {
//    MatTableModule,
//    MatFormFieldModule,
//    MatInputModule,
//    MatButtonModule
// } from '@angular/material';
export class DefaultIntl extends OwlDateTimeIntl {

   /** A label for the cancel button */
   cancelBtnLabel = 'Odustani';

   /** A label for the set button */
   setBtnLabel = 'Potvrdi';

   /** A label for the range 'from' in picker info */
   rangeFromLabel = 'Od';

   /** A label for the range 'to' in picker info */
   rangeToLabel = 'Do';
}

registerLocaleData(localeHr, 'hr');
@NgModule({
   declarations: [
      AppComponent,
      SobeComponent,
      RezervacijeComponent,
      DodajSobuComponent,
      UredisobuComponent,
      DodajRezervacijuComponent,
      UrediRezervacijuComponent,
      FilterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      ReactiveFormsModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      BrowserAnimationsModule,
      FormsModule,
      MaterialModule,
      MatDialogModule,
      MatTableModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatTooltipModule

   ],
   entryComponents: [
      FilterComponent
   ],
   providers: [
      SobeservisService,
      { provide: OWL_DATE_TIME_LOCALE, useValue: 'hr' },
      { provide: LOCALE_ID, useValue: 'hr' },
      [DatePipe],
      {
         provide: MatDialogRef,
         useValue: {}
      },
      { provide: OwlDateTimeIntl, useClass: DefaultIntl }
      // tslint:disable-next-line: deprecation
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

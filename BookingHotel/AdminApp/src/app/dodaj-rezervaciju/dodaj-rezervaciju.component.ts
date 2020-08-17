import { Soba } from './../models/soba';
import { Rezervacija } from './../models/rezervacija';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { SobeservisService } from './../services/sobeservis.service';
import { formatDate } from '@angular/common';
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-dodaj-rezervaciju',
  templateUrl: './dodaj-rezervaciju.component.html',
  styleUrls: ['./dodaj-rezervaciju.component.css']
})
export class DodajRezervacijuComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  form: FormGroup;
  sobes$: Observable<Soba[]>;
  odaberisobu = '';
  ime = '';
  min: Date = new Date();
  raspon: Date[] = [];
  provjera: any = [];
  novaProvjera: any = [];
  datum = new Date();
  datum2: Date;
  rezervacija: Rezervacija = new Rezervacija();
  rezervacije: Rezervacija[] = [];

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) data, public dialogRef: MatDialogRef<DodajRezervacijuComponent>, private formBuilder: FormBuilder, private sobeservisService: SobeservisService) {
    this.rezervacije = data;
    this.form = this.formBuilder.group(
      {
        brojdodaj: ['', [Validators.required]],
        gost: ['', [Validators.required]],
        raspon: ['', [Validators.required]]
      })
  }
  ngOnInit() {
    this.loadSobes();
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.zatvori();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.zatvori();
    });
  }

  azurirajProvjeru() {
    this.provjera = [];
    this.rezervacije.map(x => {
      if (x.brojSobe === Number(this.odaberisobu)) {
        // tslint:disable-next-line: no-unused-expression
        this.provjera.push(x.datumDolaska, x.datumOdlaska);
      }
    })
    this.provjeri();
  }
  provjeri() {
    this.novaProvjera = [];
    let i = 0;
    while (i < this.provjera.length) {
      this.nizDatuma(this.provjera[i], this.provjera[i + 1]);
      i = i + 2;
    }
  }
  public myFilter = (d: Date): boolean => {
    const a = moment(d).format('YYYY/MM/DD');
    return (!this.novaProvjera.includes(a));
  }

  nizDatuma(start, stop) {
    // tslint:disable-next-line: prefer-const  
    let datumStart = moment(start).add(1, 'days');
    const datumStop = moment(stop);
    while (datumStart <= datumStop) {
      this.novaProvjera.push(moment(datumStart).format('YYYY/MM/DD'));
      datumStart = moment(datumStart).add(1, 'days');
    }
  }
  // dodajDan(datum, dani) {
  //   const result = new Date(datum);
  //   result.setDate(result.getDate() + dani);
  //   return result;
  // }
  loadSobes() {
    this.sobes$ = this.sobeservisService.getSobe();
  }
  zatvori() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  dodaj() {
    if (!this.form.valid) {
      return;
    }
    this.datum = this.raspon[0];
    this.datum2 = this.raspon[1];
    let usporedi = this.usporedidatume(this.datum, this.datum2);
    if (usporedi === 1 || usporedi === 0) {
      swal('Datum dolaska mora biti prije datuma odlaska!');
      return;
    }
    if ((this.datum.getHours() < 14) || ((this.datum.getHours() > 21) && (this.datum.getMinutes() > 0))) {
      swal('Check in je od 14:00 do 22:00');
      return;
    }
    if ((this.datum2.getHours() < 7) || (this.datum2.getHours() > 10) && (this.datum2.getMinutes() > 0)) {
      swal('Check out je od 07:00 do 11:00');
      return;
    }
    this.rezervacija.brojSobe = Number(this.odaberisobu);
    this.rezervacija.imeGosta = this.ime;
    this.rezervacija.datumDolaska = this.datum;
    this.rezervacija.datumOdlaska = this.datum2;
    this.sobeservisService.saveRezervacija(this.rezervacija)
      .subscribe((data) => {
        this.dialogRef.close({ event: 'close' });
      });
  }
  usporedidatume(datum, datum2) {
    if (datum > datum2) {
      return 1;
    }
    else if (datum < datum2) {
      return 2;
    }
    else {
      return 0;
    }
  }
}



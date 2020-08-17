import { Soba } from './../models/soba';
import { Rezervacija } from './../models/rezervacija';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { SobeservisService } from './../services/sobeservis.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-uredi-rezervaciju',
  templateUrl: './uredi-rezervaciju.component.html',
  styleUrls: ['./uredi-rezervaciju.component.css']
})
export class UrediRezervacijuComponent implements OnInit {
  form: FormGroup;
  sobes$: Observable<Soba[]>;
  raspon: Date[] = [];
  provjera: any = [];
  novaProvjera: any = [];
  rezervacije: Rezervacija[] = [];
  rezervacijaId: number;
  min: Date = new Date();
  rez: Rezervacija = new Rezervacija();

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) data, public dialogRef: MatDialogRef<UrediRezervacijuComponent>, private sobeservisService: SobeservisService, private formBuilder: FormBuilder, private router: Router) {
    // const idParam = 'id';
    // if (this.avRoute.snapshot.params[idParam]) {
    //   this.rezervacijaId = this.avRoute.snapshot.params[idParam];
    // }
    this.rezervacijaId = data[0];
    this.rezervacije = data[1];
    this.form = this.formBuilder.group(
      {
        brojdodaj: ['', [Validators.required]],
        gost: ['', [Validators.required]],
        raspon: ['', [Validators.required]]
      })
  }

  ngOnInit() {
    this.loadSobes();
    this.sobeservisService.getRezervacija(this.rezervacijaId)
      .subscribe(result => (
        this.rez.brojSobe = result.brojSobe,
        this.rez.imeGosta = result.imeGosta,
        this.rez.rezervacijeId = Number(this.rezervacijaId),
        this.raspon = [new Date(result.datumDolaska), new Date(result.datumOdlaska)]
      ));
  }
  azurirajProvjeru() {

    this.provjera = [];
    let a = moment(this.raspon[0]).format('YYYY/MM/DD');
    let b = moment(this.raspon[1]).format('YYYY/MM/DD');

    this.rezervacije.map(x => {
      let c = moment(x.datumDolaska).format('YYYY/MM/DD');
      let d = moment(x.datumOdlaska).format('YYYY/MM/DD');
      // tslint:disable-next-line: max-line-length
      // isključujemo zabranjene datume rezervacije koju uređujemo iz provjere kod uređivanja rezervacije
      if ((x.brojSobe === this.rez.brojSobe) && (a !== c && b !== d)) {
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

  loadSobes() {
    this.sobes$ = this.sobeservisService.getSobe();
  }
  zatvori() {
    this.provjera = [];
    this.dialogRef.close({ event: 'Cancel' });
  }
  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  uredi() {
    if (!this.form.valid) {
      return;
    }
    this.rez.datumDolaska = this.raspon[0];
    this.rez.datumOdlaska = this.raspon[1];
    let usporedi = this.usporedidatume(this.rez.datumDolaska, this.rez.datumOdlaska);
    if (usporedi === 1 || usporedi === 0) {
      swal('Datum dolaska mora biti prije datuma odlaska!');
      return;
    }
    if ((this.rez.datumDolaska.getHours() < 14) || ((this.rez.datumDolaska.getHours() > 21) && (this.rez.datumDolaska.getMinutes() > 0))) {
      swal("Check in je od 14:00 do 22:00");
      return;
    }
    if ((this.rez.datumOdlaska.getHours() < 7) || (this.rez.datumOdlaska.getHours() > 10) && (this.rez.datumOdlaska.getMinutes() > 0)) {
      swal("Check out je od 07:00 do 11:00");
      return;
    }

    this.sobeservisService.updateRezervacija(this.rezervacijaId, this.rez)
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

import { DodajRezervacijuComponent } from './../dodaj-rezervaciju/dodaj-rezervaciju.component';
import { formatDate } from '@angular/common';
import { SobeservisService } from './../services/sobeservis.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit, Inject, Directive, Attribute, Input, ViewChild, Optional } from '@angular/core';
import { Rezervacija } from './../models/rezervacija';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Soba } from '../models/soba';
import { DatePipe } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { MatTable } from '@angular/material/table';
import { FilterComponent } from '../filter/filter.component';
import { map, tap, filter } from 'rxjs/operators';
import swal from 'sweetalert';
import { ReturnStatement } from '@angular/compiler';
import { UrediRezervacijuComponent } from '../uredi-rezervaciju/uredi-rezervaciju.component';

export interface Niz {
  velicina: number;
  item: Array<number>;
}
// @Directive({ selector: 'input' })

@Component({
  selector: 'app-rezervacije',
  templateUrl: './rezervacije.component.html',
  styleUrls: ['./rezervacije.component.css']
})


// tslint:disable-next-line: directive-class-suffix
export class RezervacijeComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  //@Input('disabled') tip = 'true';
  rezervacijes$: Observable<Rezervacija[]>;
  sobes$: Observable<Soba[]>;
  rezervacije: Rezervacija[] = [];
  broj = '';
  datum = null;
  min: Date = new Date();
  ime = '';
  Rez: Rezervacija = new Rezervacija();
  constructor(public dialog: MatDialog, private sobeservisService: SobeservisService, private datePipe: DatePipe) {
  }
  openDialogDodaj(): void {
    const dialogRef = this.dialog.open(DodajRezervacijuComponent, {
      width: '500px',
      height: '450px',
      autoFocus: false,
      data: this.rezervacije,
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'close') {
        this.ngOnInit();
        swal('Rezervacija uspješno dodana!', '', 'success');
      }
    });

  }
  openDialogUredi(id): void {
    const dialogRef = this.dialog.open(UrediRezervacijuComponent, {
      width: '500px',
      height: '450px',
      data: [id, this.rezervacije,],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'close') {
        this.ngOnInit();
        swal('Rezervacija uspješno uređena!', '', 'success');
      }
    });
  }
  openDialogTrazi(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '500px',
      height: '400px',
      autoFocus: false

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'close') {
        this.broj = result.data.broj2;
        this.ime = result.data.ime2;
        this.datum = result.data.datum2;
        this.trazi();
      }
    });
  }

  ngOnInit() {
    this.loadRezervacije();
    this.rezervacijes$.subscribe(rezervacije => this.rezervacije = rezervacije);
    this.loadSobe();
  }

  loadRezervacije() {
    this.rezervacijes$ = this.sobeservisService.getRezervacije();
  }
  loadSobe() {
    this.sobes$ = this.sobeservisService.getSobe();
  }
  izbrisi(rezervacijaId) {
    swal({
      title: 'Da li ste sigurni?',
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Odustani',
          value: false,
          visible: true,
          // className: 'botun'
        },
        confirm: {
          text: 'Da',
          value: true,
          visible: true,
          // className: 'botun'
        }
      },
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Rezervacija je izbrisana!', {
            icon: 'success'
          }),
            this.sobeservisService.deleteRezervacija(rezervacijaId).subscribe((data) => {
              this.ngOnInit();
            });
        }
      });
  }
  trazi() {

    if (this.ime === '' && this.datum === null && this.broj === '') {
      this.ngOnInit();
    }
    else if (this.ime !== '' && this.datum === null && this.broj !== '') {
      this.rezervacijes$.subscribe(rezervac => {
        this.rezervacije = rezervac;
        this.rezervacije = this.rezervacije.filter(x => {
          return (x.imeGosta.toLowerCase().includes(this.ime.toLowerCase()) && x.brojSobe.toString() === this.broj);
        });
        if (this.rezervacije.length === 0) {
          swal('Nijedna rezervacija nije pronađena!');
          this.rezervacijes$.subscribe(rezervacije => this.rezervacije = rezervacije);
        }
      }
      );
    }
    else if (this.ime !== '' && this.datum !== null && this.broj === '') {
      this.rezervacijes$.subscribe(rezervac => {
        this.rezervacije = rezervac;
        this.rezervacije = this.rezervacije.filter(x => {
          // tslint:disable-next-line: max-line-length
          return (x.imeGosta.toLowerCase().includes(this.ime.toLowerCase()) && new Date(x.datumDolaska) <= new Date(this.datePipe.transform(this.datum, 'yyyy-MM-ddTHH:mm:ss')) && (new Date(x.datumOdlaska) >= new Date(this.datePipe.transform(this.datum, 'yyyy-MM-ddTHH:mm:ss'))));
        });
        if (this.rezervacije.length === 0) {
          swal('Nijedna rezervacija nije pronađena!');
          this.rezervacijes$.subscribe(rezervacije => this.rezervacije = rezervacije);
        }
      }
      );
    }
    else if (this.ime === '' && this.datum !== null && this.broj === '') {
      this.rezervacijes$.subscribe(rezervac => {
        this.rezervacije = rezervac;
        this.rezervacije = this.rezervacije.filter(x => {
          // tslint:disable-next-line: max-line-length
          return (new Date(x.datumDolaska) <= new Date(this.datePipe.transform(this.datum, 'yyyy-MM-ddTHH:mm:ss')) && (new Date(x.datumOdlaska) >= new Date(this.datePipe.transform(this.datum, 'yyyy-MM-ddTHH:mm:ss'))));
        });
        if (this.rezervacije.length === 0) {
          swal('Nijedna rezervacija nije pronađena!');
          this.rezervacijes$.subscribe(rezervacije => this.rezervacije = rezervacije);
        }
      }
      );
    }
    else if (this.ime === '' && this.datum === null && this.broj !== '') {
      this.rezervacijes$.subscribe(rezervac => {
        this.rezervacije = rezervac;
        this.rezervacije = this.rezervacije.filter(x => {
          return x.brojSobe.toString() === this.broj;
        });
        if (this.rezervacije.length === 0) {
          swal('Nijedna rezervacija nije pronađena!');
          this.rezervacijes$.subscribe(rezervacije => this.rezervacije = rezervacije);
        }
      }
      );
    }
    else if (this.ime !== '' && this.datum !== null && this.broj !== '') {
      this.rezervacijes$.subscribe(rezervac => {
        this.rezervacije = rezervac;
        this.rezervacije = this.rezervacije.filter(x => {
          // tslint:disable-next-line: max-line-length
          return (x.imeGosta.toLowerCase().includes(this.ime.toLowerCase()) && x.brojSobe.toString() === this.broj && new Date(x.datumDolaska) <= new Date(this.datePipe.transform(this.datum, 'yyyy-MM-ddTHH:mm:ss')) && (new Date(x.datumOdlaska) >= new Date(this.datePipe.transform(this.datum, 'yyyy-MM-ddTHH:mm:ss'))));
        });
        if (this.rezervacije.length === 0) {
          swal('Nijedna rezervacija nije pronađena!');
          this.rezervacijes$.subscribe(rezervacije => this.rezervacije = rezervacije);
        }
      }
      );
    }
    else if (this.ime === '' && this.datum !== null && this.broj !== '') {
      this.rezervacijes$.subscribe(rezervac => {
        this.rezervacije = rezervac;
        this.rezervacije = this.rezervacije.filter(x => {
          return (x.brojSobe.toString() === this.broj && new Date(x.datumDolaska) <= new Date(this.datePipe.transform(this.datum, 'yyyy-MM-ddTHH:mm:ss')) && (new Date(x.datumOdlaska) >= new Date(this.datePipe.transform(this.datum, 'yyyy-MM-ddTHH:mm:ss'))));
        });
        if (this.rezervacije.length === 0) {
          swal('Nijedna rezervacija nije pronađena!');
          this.rezervacijes$.subscribe(rezervacije => this.rezervacije = rezervacije);
        }
      }
      );
    }
    else {
      this.rezervacijes$.subscribe(rezervac => {
        this.rezervacije = rezervac;
        this.rezervacije = this.rezervacije.filter(x => {
          return x.imeGosta.toLowerCase().includes(this.ime.toLowerCase());
        });
        if (this.rezervacije.length === 0) {
          swal('Nijedna rezervacija nije pronađena!');
          this.rezervacijes$.subscribe(rezervacije => this.rezervacije = rezervacije);
        }
      }
      );

    }

  }
}







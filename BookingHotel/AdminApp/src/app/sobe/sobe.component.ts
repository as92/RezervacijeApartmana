import { SobeservisService } from './../services/sobeservis.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Soba } from '../models/soba';
import swal from 'sweetalert';
import { MatDialog } from '@angular/material/dialog';
import { DodajSobuComponent } from '../dodaj-sobu/dodaj-sobu.component';
import { UredisobuComponent } from '../uredisobu/uredisobu.component';

@Component({
  selector: 'app-sobe',
  templateUrl: './sobe.component.html',
  styleUrls: ['./sobe.component.css']
})
export class SobeComponent implements OnInit {
  sobes$: Observable<Soba[]>;
  constructor(public dialog: MatDialog, private sobeservisService: SobeservisService) {

  }

  openDialogDodaj(): void {
    const dialogRef = this.dialog.open(DodajSobuComponent, {
      width: '500px',
      height: '400px',
      autoFocus: false

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'close') {
        this.ngOnInit();
        swal('Soba uspješno dodana!', '', 'success');
      }
    });

  }

  openDialogUredi(id): void {
    const dialogRef = this.dialog.open(UredisobuComponent, {
      width: '500px',
      height: '400px',
      data: id,
      autoFocus: false

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'close') {
        this.ngOnInit();
        swal('Soba uspješno uređena!', '', 'success');
      }
    });

  }


  ngOnInit() {
    this.loadSobes();

  }
  loadSobes() {
    this.sobes$ = this.sobeservisService.getSobe();
  }
  delete(sobaId) {

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
          swal('Soba je izbrisana!', {
            icon: 'success'
          }),
            this.sobeservisService.deleteSoba(sobaId).subscribe((data) => {
              this.loadSobes();
            });
        }
      });
  }
}

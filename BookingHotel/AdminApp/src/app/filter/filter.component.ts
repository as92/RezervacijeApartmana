import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SobeservisService } from './../services/sobeservis.service';
import { Observable } from 'rxjs';
import { Soba } from '../models/soba';

export class FilterData {
  broj2: string;
  ime2: string;
  datum2: null;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  localdata = new FilterData();
  broj = '';
  ime = '';
  datum = null;
  sobes$: Observable<Soba[]>;
  sobe: Soba[] = [];
  min: Date = new Date();

  // tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<FilterComponent>,
    // tslint:disable-next-line: align
    private sobeservisService: SobeservisService,
    // tslint:disable-next-line: align
  ) {
  }

  ngOnInit(): void {
    this.sobes$ = this.sobeservisService.getSobe();
    this.sobes$.subscribe(sobe => this.sobe = sobe);
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.zatvori();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.zatvori();
    });
  }
  trazi() {
    this.localdata.broj2 = this.broj.toString();
    this.localdata.ime2 = this.ime;
    this.localdata.datum2 = this.datum;
    this.dialogRef.close({ event: 'close', data: this.localdata });
  }

  zatvori() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

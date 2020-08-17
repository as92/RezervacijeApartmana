import { DodajRezervacijuComponent } from './../dodaj-rezervaciju/dodaj-rezervaciju.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Soba } from '../models/soba';
import { SobeservisService } from './../services/sobeservis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dodaj-sobu',
  templateUrl: './dodaj-sobu.component.html',
  styleUrls: ['./dodaj-sobu.component.css']
})
export class DodajSobuComponent implements OnInit {
  form: FormGroup;
  broj = '';
  tips = ['jednokreventa', 'dvokrevetna', 'trokrevetna'];
  tip = '';
  // tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<DodajSobuComponent>, private sobeservisService: SobeservisService, private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group(
      {
        broj: ['', [Validators.required]],
        tip: ['', [Validators.required]]
      }
    )
  }
  ngOnInit() {

    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.zatvori();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.zatvori();
    });
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
    let soba: Soba = {
      brojSobe: Number(this.broj),
      tipSobe: this.tip
    };
    this.sobeservisService.saveSoba(soba)
      .subscribe((data) => {
        this.dialogRef.close({ event: 'close' });
      });

  }


}

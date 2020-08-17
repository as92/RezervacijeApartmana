import { Component, OnInit, ComponentFactoryResolver, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Soba } from '../models/soba';
import { SobeservisService } from './../services/sobeservis.service';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-uredisobu',
  templateUrl: './uredisobu.component.html',
  styleUrls: ['./uredisobu.component.css']
})
export class UredisobuComponent implements OnInit {
  form: FormGroup;
  sobeId: number;
  tips = ['jednokreventa', 'dvokrevetna', 'trokrevetna'];
  broj = '';
  tip = '';
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) data, public dialogRef: MatDialogRef<UredisobuComponent>, private sobeservisService: SobeservisService, private formBuilder: FormBuilder) {
    // const idParam = 'id';
    // if (this.avRoute.snapshot.params[idParam]) {
    //   this.sobeId = this.avRoute.snapshot.params[idParam];
    // }
    this.sobeId = data;
    this.form = this.formBuilder.group(
      {

        broj: [null, [Validators.required]],
        tip2: ['', [Validators.required]]

      }
    )
  }
  ngOnInit() {

    this.sobeservisService.getSoba(this.sobeId)
      .subscribe(data => (
        this.broj = data.brojSobe.toString(),
        this.tip = data.tipSobe
      ));

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
  uredi() {
    if (!this.form.valid) {
      return;
    }
    let soba: Soba = {
      sobeId: Number(this.sobeId),
      brojSobe: Number(this.broj),
      tipSobe: this.tip
    };
    this.sobeservisService.updateSoba(this.sobeId, soba)
      .subscribe((data) => {
        this.dialogRef.close({ event: 'close' });
      });

  }

}




import swal from 'sweetalert';
import { Rezervacija } from './../models/rezervacija';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Soba } from '../models/soba';
import { Subscription } from 'rxjs/internal/Subscription';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SobeservisService {
  myAppUrl: string;
  myApiRezervacijeUrl: string;
  myApiSobeUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiRezervacijeUrl = 'api/Rezervacijes/';
    this.myApiSobeUrl = 'api/Sobes/';

  }

  getRezervacije(): Observable<Rezervacija[]> {
    return this.http.get<Rezervacija[]>(this.myAppUrl + this.myApiRezervacijeUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  getRezervacija(rezervacijaId: number): Observable<Rezervacija> {
    return this.http.get<Rezervacija>(this.myAppUrl + this.myApiRezervacijeUrl + rezervacijaId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  saveRezervacija(rezervacija): Observable<Rezervacija> {
    return this.http.post<Rezervacija>(this.myAppUrl + this.myApiRezervacijeUrl, JSON.stringify(rezervacija), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  updateRezervacija(rezervacijaId: number, rezervacija): Observable<Rezervacija> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<Rezervacija>(this.myAppUrl + this.myApiRezervacijeUrl + rezervacijaId, JSON.stringify(rezervacija), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  deleteRezervacija(rezervacijaId: number): Observable<Rezervacija> {
    return this.http.delete<Rezervacija>(this.myAppUrl + this.myApiRezervacijeUrl + rezervacijaId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  getSobe(): Observable<Soba[]> {
    return this.http.get<Soba[]>(this.myAppUrl + this.myApiSobeUrl)
      .pipe(
        // tslint:disable-next-line: deprecation
        retry(1),
        catchError(this.errorHandler),
        tap(results => {
          results.sort((a, b) => a.brojSobe - b.brojSobe);
        }
        )
      );
  }
  getSoba(sobaId: number): Observable<Soba> {
    return this.http.get<Soba>(this.myAppUrl + this.myApiSobeUrl + sobaId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  saveSoba(soba): Observable<Soba> {
    return this.http.post<Soba>(this.myAppUrl + this.myApiSobeUrl, JSON.stringify(soba), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  deleteSoba(sobaId: number): Observable<Soba> {
    return this.http.delete<Soba>(this.myAppUrl + this.myApiSobeUrl + sobaId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateSoba(sobeId: number, soba): Observable<Soba> {
    return this.http.put<Soba>(this.myAppUrl + this.myApiSobeUrl + sobeId, JSON.stringify(soba), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    swal(error.error.message, 'Pokušajte ponovno!', 'warning');
    return throwError(error.error.message);

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {of} from "rxjs/observable/of";
import { map, catchError, tap } from 'rxjs/operators';
//import arrdelay from "app/queries/result_eigth_query.json";
//import depdelay from "app/queries/result_ninth_query.json";
declare function require(name:string);
var arr = require('app/queries/result_eigth_query.json');
var dep = require('app/queries/result_ninth_query.json');
var q10 = require('app/queries/result_tenth_query.json');
var q11 = require('app/queries/result_eleventh_query.json');
var q12 = require('app/queries/result_twelfth_query.json');
var q13 = require('app/queries/result_thirteenth_query.json');
var q14 = require('app/queries/result_fourteenth_query.json');
var q15 = require('app/queries/result_fifteenth_query.json');
var q16 = require('app/queries/result_sixteenth_query.json');
var q17 = require('app/queries/result_airports.json');

// Cambiar por API de pyspark
const endpoint = 'http://25.10.13.68:3200/';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  /* ----------==========     Conteo de retrasos por ruta llegada/salida    ==========---------- */
  //getDelayCount(arr_dep): Observable<any>{
  getDelayCount(arr_dep): any[]{
    /*
    return this.http.get(endpoint + 'consulta' + arr_dep).pipe(
      map(this.extractData));
    */
    return (arr_dep === "8") ? arr : dep;
  }

  /* ----------==========     Historico de vuelos no cancelados    ==========---------- */
  //getNotCancelledFlights(): Observable<any> {
  getNotCancelledFlights(): any[] {
    /*
    return this.http.get(endpoint + 'consulta10').pipe(
      map(this.extractData));
    */
    return q10;
  }

  /* ----------==========     Historico de vuelos cancelados por origen/destino    ==========---------- */
  //getCancelledFlights(): Observable<any> {
  getCancelledFlights(): any[] {
    /*
    return this.http.get(endpoint + 'consulta11').pipe(
      map(this.extractData));
    */
    return q11;
  }

  /* ----------==========     Categorias por las que se cancelan    ==========---------- */
  //getCategoryCount(): Observable<any> {
  getCategoryCount(): any[] {
    /*
    return this.http.get(endpoint + 'consulta12').pipe(
      map(this.extractData));
    */
    return q12;
  }

  /* ----------==========     Historico de vuelos por origen/destino    ==========---------- */
  //getOriginCount(arr): Observable<any> {
  getOriginCount(arr): any[] {
    /*
    return this.http.get(endpoint + 'consulta15/'+arr).pipe(
      map(this.extractData));
    */
    return q15;
  }

  //getDestinationCount(dep): Observable<any> {
  getDestinationCount(dep): any[] {
    /*
    return this.http.get(endpoint + 'consulta16/'+dep).pipe(
      map(this.extractData));
    */
    return q16;
  }

  /* ----------==========     Vuelos no cancelados según el aeropuerto de salida   ==========---------- */
  //getAirportArr(): Observable<any> {
  getAirportArr(): any[] {
    /*
    return this.http.get(endpoint + 'consulta13').pipe(
      map(this.extractData));
    */  
    return q13;
  }

  /* ----------==========     Vuelos no cancelados segun aeropuertos de llegada   ==========---------- */
  //getAirportDep(): Observable<any> {
  getAirportDep(): any[] {
    /*
    return this.http.get(endpoint + 'consulta14').pipe(
      map(this.extractData));
    */
    return q14;
  }

  /* ----------==========     Obtain All Airports  ==========---------- */
  //getAirports(): Observable<any> {
  getAirports(): any[] {
    /*
    return this.http.get(endpoint + 'airports').pipe(
      map(this.extractData));
    */
    return q17;
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}
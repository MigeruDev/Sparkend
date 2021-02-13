import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {of} from "rxjs/observable/of";
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://localhost:8000/flights/';
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

  getFlightNumber(number): Observable<any> {
    return this.http.get(endpoint + 'number/'+number).pipe(
      map(this.extractData));
  }

  addNewFlight (flight): Observable<any> {
    console.log(flight);
    return this.http.post<any>(endpoint + 'new', JSON.stringify(flight), httpOptions).pipe(
      tap((flight) => console.log(`generate flights w/ id=${flight}`)),
      catchError(this.handleError<any>('generar Vuelo'))
    );
  }

  updateFlight (_id, flight): Observable<any> {
    console.log(flight);
    return this.http.put<any>(endpoint + 'update/'+_id, JSON.stringify(flight), httpOptions).pipe(
      tap((flight) => console.log(`generate flights w/ id=${flight}`)),
      catchError(this.handleError<any>('actualizar Vuelo'))
    );
  }  

  deleteFlight (_id): Observable<any> {
    console.log();
    return this.http.delete<any>(endpoint + 'delete/'+_id, httpOptions).pipe(
      tap((flight) => console.log(`delete flight w/ id=${flight}`)),
      catchError(this.handleError<any>('eliminar vuelo'))
    );

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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsultaRutas } from 'model/1-2-consulta-rutas/consulta-rutas.model';
import { ConsultaRuta } from 'model/3-consulta-ruta/consulta-ruta.model';
import { ConsultaAerolineas } from 'model/4-5-consulta-aerolineas/consulta-aerolineas.model';
import { ConsultaAerolinea } from 'model/6-7-consulta-aerolinea/consulta-aerolinea.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http';
declare function require(name:string);
var q1 = require('app/queries/result_first_query.json');
var q2 = require('app/queries/result_second_query.json');
var q3 = require('app/queries/result_third_query.json');
var q4 = require('app/queries/result_fourth_query.json');
var q5 = require('app/queries/result_fifth_query.json');
var q6 = require('app/queries/result_sixth_query.json');
var q7 = require('app/queries/result_seventh_query.json');

@Injectable()
export class QueryPrimeraService {

  constructor(private httpClient: HttpClient) { }
  
  //public getConsulta1(): Observable<ConsultaRutas[]> {
  public getConsulta1(): any[] {
    var uri = `http://25.10.13.68:3200/consulta1`;
    /*
    return this.httpClient.get<ConsultaRutas[]>(uri).pipe(
      map(data => data.map(data => new ConsultaRutas().deserialize(data)))
    );
    */
    return q1.map(q1 => new ConsultaRutas().deserialize(q1));
  }
  
  //public getConsulta2(): Observable<ConsultaRutas[]> {
  public getConsulta2(): any[] {
    var uri = `http://25.10.13.68:3200/consulta2`;
    /*
    return this.httpClient.get<ConsultaRutas[]>(uri).pipe(
      map(data => data.map(data => new ConsultaRutas().deserialize(data)))
    );
    */
    return q2.map(q2 => new ConsultaRutas().deserialize(q2));
  }

  //public getConsulta3(origin:any, dest: any): Observable<ConsultaRuta[]> {
  public getConsulta3(origin:any, dest: any): any [] {
    // var params=`/origin=${origin}/dest=${dest}`;
    var uri = 'http://25.10.13.68:3200/consulta3/'+origin+'/'+dest;
    /*
    return this.httpClient.get<ConsultaRuta[]>(uri).pipe(
      map(data => data.map(data => new ConsultaRuta().deserialize(data)))
    );
    */
    return q3.map(q3 => new ConsultaRuta().deserialize(q3));
  }

  //public getConsulta4(): Observable<ConsultaAerolineas[]> {
  public getConsulta4(): any[] {
    var uri = `http://25.10.13.68:3200/consulta4`;
    /*
    return this.httpClient.get<ConsultaAerolineas[]>(uri).pipe(
      map(data => data.map(data => new ConsultaAerolineas().deserialize(data)))
    );
    */
    return q4.map(q4 => new ConsultaAerolineas().deserialize(q4));
  }

  //public getConsulta5(): Observable<ConsultaAerolineas[]> {
  public getConsulta5(): any[] {
    var uri = `http://25.10.13.68:3200/consulta5`;
    /*
    return this.httpClient.get<ConsultaAerolineas[]>(uri).pipe(
      map(data => data.map(data => new ConsultaAerolineas().deserialize(data)))
    );
    */
    return q5.map(q5 => new ConsultaAerolineas().deserialize(q5));
  }

  //public getConsulta6(): Observable<ConsultaAerolinea[]> {
  public getConsulta6(): any[] {
    var uri = `http://25.10.13.68:3200/consulta6`;
    /*
    return this.httpClient.get<ConsultaAerolinea[]>(uri).pipe(
      map(data => data.map(data => new ConsultaAerolinea().deserialize(data)))
    );
    */
    return q6.map(q6 => new ConsultaAerolinea().deserialize(q6));
  }

  //public getConsulta7(): Observable<ConsultaAerolinea[]> {
  public getConsulta7(): any[] {
    var uri = `http://25.10.13.68:3200/consulta7`;
    /*
    return this.httpClient.get<ConsultaAerolinea[]>(uri).pipe(
      map(data => data.map(data => new ConsultaAerolinea().deserialize(data)))
    );
    */
    return q7.map(q7 => new ConsultaAerolinea().deserialize(q7));
  }
}

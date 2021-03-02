import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsultaRutas } from 'model/1-2-consulta-rutas/consulta-rutas.model';
import { ConsultaRuta } from 'model/3-consulta-ruta/consulta-ruta.model';
import { ConsultaAerolineas } from 'model/4-5-consulta-aerolineas/consulta-aerolineas.model';
import { ConsultaAerolinea } from 'model/6-7-consulta-aerolinea/consulta-aerolinea.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http'
@Injectable()
export class QueryPrimeraService {

  constructor(private httpClient: HttpClient) { }
  public getConsulta1(): Observable<ConsultaRutas[]> {
    var uri = `http://25.10.13.68:3200/consulta1`;
    return this.httpClient.get<ConsultaRutas[]>(uri).pipe(
      map(data => data.map(data => new ConsultaRutas().deserialize(data)))
    );
  }
  
  public getConsulta2(): Observable<ConsultaRutas[]> {
    var uri = `http://25.10.13.68:3200/consulta2`;
    return this.httpClient.get<ConsultaRutas[]>(uri).pipe(
      map(data => data.map(data => new ConsultaRutas().deserialize(data)))
    );
  }

  public getConsulta3(origin:any, dest: any): Observable<ConsultaRuta[]> {
    // var params=`/origin=${origin}/dest=${dest}`;
    var uri = 'http://25.10.13.68:3200/consulta3/'+origin+'/'+dest;
    return this.httpClient.get<ConsultaRuta[]>(uri).pipe(
      map(data => data.map(data => new ConsultaRuta().deserialize(data)))
    );
  }

  public getConsulta4(): Observable<ConsultaAerolineas[]> {
    var uri = `http://25.10.13.68:3200/consulta4`;
    return this.httpClient.get<ConsultaAerolineas[]>(uri).pipe(
      map(data => data.map(data => new ConsultaAerolineas().deserialize(data)))
    );
  }
  public getConsulta5(): Observable<ConsultaAerolineas[]> {
    var uri = `http://25.10.13.68:3200/consulta5`;
    return this.httpClient.get<ConsultaAerolineas[]>(uri).pipe(
      map(data => data.map(data => new ConsultaAerolineas().deserialize(data)))
    );
  }
  public getConsulta6(): Observable<ConsultaAerolinea[]> {
    var uri = `http://25.10.13.68:3200/consulta6`;
    return this.httpClient.get<ConsultaAerolinea[]>(uri).pipe(
      map(data => data.map(data => new ConsultaAerolinea().deserialize(data)))
    );
  }
  public getConsulta7(): Observable<ConsultaAerolinea[]> {
    var uri = `http://25.10.13.68:3200/consulta7`;
    return this.httpClient.get<ConsultaAerolinea[]>(uri).pipe(
      map(data => data.map(data => new ConsultaAerolinea().deserialize(data)))
    );
  }
}

import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';
import { ConsultaRutas } from 'model/1-2-consulta-rutas/consulta-rutas.model';
import { ConsultaRuta } from 'model/3-consulta-ruta/consulta-ruta.model';
import { ConsultaAerolineas } from 'model/4-5-consulta-aerolineas/consulta-aerolineas.model';
import { ConsultaAerolinea } from 'model/6-7-consulta-aerolinea/consulta-aerolinea.model';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

//import 'chartist-plugin-legend';
import { element } from 'protractor';
import { QueryPrimeraService } from 'services/query-primera.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /// FREDDY 
  public consultaRutasLlegada: ConsultaRutas[];
  public consultaRutasDestino: ConsultaRutas[];
  public consultaRutaEspecifico: ConsultaRuta[];
  public consultaRutaEspecifico1: ConsultaRuta;
  public consultaAerolineasLlegada: ConsultaAerolineas[];
  public consultaAerolineasSalida: ConsultaAerolineas[];
  public consultaAerolineaMasRetraso: ConsultaAerolinea[];
  public consultaAerolineaMenosRetraso: ConsultaAerolinea[];
  public consultaAerolineaMasRetraso1: ConsultaAerolinea;
  public consultaAerolineaMenosRetraso1: ConsultaAerolinea;
  public puntos = [];


  constructor(public rest: RestService, private route: ActivatedRoute,
    private router: Router, private cdRef: ChangeDetectorRef, private queryPrimeraService: QueryPrimeraService) {

    this.puntos=[
      { value: 'ABE', viewValue: 'ABE' },
      { value: 'ABQ', viewValue: 'ABQ' },
      { value: 'ACY', viewValue: 'ACY' },
      { value: 'ALB', viewValue: 'ALB' },
      { value: 'AMA', viewValue: 'AMA' },
      { value: 'ANC', viewValue: 'ANC' },
      { value: 'ATL', viewValue: 'ATL' },
      { value: 'AUS', viewValue: 'AUS' },
      { value: 'AVL', viewValue: 'AVL' },
      { value: 'AVP', viewValue: 'AVP' },
      { value: 'BDL', viewValue: 'BDL' },
      { value: 'BGM', viewValue: 'BGM' },
      { value: 'BHM', viewValue: 'BHM' },
      { value: 'BNA', viewValue: 'BNA' },
      { value: 'BOI', viewValue: 'BOI' },
      { value: 'BOS', viewValue: 'BOS' },
      { value: 'BTV', viewValue: 'BTV' },
      { value: 'BUF', viewValue: 'BUF' },
      { value: 'BUR', viewValue: 'BUR' },
      { value: 'BWI', viewValue: 'BWI' },
    ];
    this.getConsulta1();
    this.getConsulta2();
    this.getConsulta3(NaN, NaN);
    this.getConsulta4();
    this.getConsulta5();
    this.getConsulta6();
    this.getConsulta7();

  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  public getConsulta1() {
    this.queryPrimeraService.getConsulta1().subscribe(_consultaLlegadaRutas => {
      this.consultaRutasLlegada = _consultaLlegadaRutas;
    });
  }
  public getConsulta2() {
    this.queryPrimeraService.getConsulta2().subscribe(_consultaDestinoRutas => {
      this.consultaRutasDestino = _consultaDestinoRutas;
    });
  }
  public getConsulta3(selectedValueOrigin, selectedValueDest) {
    if (selectedValueOrigin== NaN || selectedValueDest== NaN || selectedValueDest == selectedValueOrigin) {
      alert('Error');
    } 
    else {
      this.queryPrimeraService.getConsulta3(selectedValueOrigin, selectedValueDest).subscribe(_consultaRutaEspecifico => {
        this.consultaRutaEspecifico1 = _consultaRutaEspecifico[0];
      });
    }

  }
  public getConsulta4() {
    this.queryPrimeraService.getConsulta4().subscribe(_consultaAerolineasLlegada => {
      this.consultaAerolineasLlegada = _consultaAerolineasLlegada;
    });
  }
  public getConsulta5() {
    this.queryPrimeraService.getConsulta5().subscribe(_consultaAerolineasSalida => {
      this.consultaAerolineasSalida = _consultaAerolineasSalida;
    });
  }
  public getConsulta6() {
    this.queryPrimeraService.getConsulta6().subscribe(_consultaAerolineaMasRetraso => {
      this.consultaAerolineaMasRetraso = _consultaAerolineaMasRetraso;
      this.consultaAerolineaMasRetraso1 = _consultaAerolineaMasRetraso[0];
    });
  }
  public getConsulta7() {
    this.queryPrimeraService.getConsulta7().subscribe(_consultaAerolineaMenosRetraso => {
      this.consultaAerolineaMenosRetraso = _consultaAerolineaMenosRetraso;
      this.consultaAerolineaMenosRetraso1 = _consultaAerolineaMenosRetraso[0];
    });
  }

}

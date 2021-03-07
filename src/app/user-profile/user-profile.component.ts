import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

declare function require(name: string);
require('chartist-plugin-legend');

//import 'chartist-plugin-legend';
import { element } from 'protractor';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})




export class UserProfileComponent implements OnInit {

  panelOpenState: boolean = false;

  airport15 = "00M";
  airport16 = "SF0";

  airports15: any;
  airports16: any;

  displayedColumns = ['aerolinea', 'origen', 'destino', 'conteo'];
  displayedColumns12 = ['categoria', 'conteo'];

  q10 = [];
  q11 = [];

  q15 = [];
  q16 = [];

  dataSource8: MatTableDataSource<any>;
  dataSource9: MatTableDataSource<any>;
  dataSource12: MatTableDataSource<any>;

  private paginator8: MatPaginator;
  private paginator9: MatPaginator;

  @ViewChild('paginator8') set matPaginator(mp: MatPaginator) {
    this.paginator8 = mp;
    this.dataSource8.paginator = this.paginator8;
  }

  @ViewChild('paginator9') set matPaginator9(mp: MatPaginator) {
    this.paginator9 = mp;
    this.dataSource9.paginator = this.paginator9;
  }

  constructor(public rest: RestService, private route: ActivatedRoute,
    public dialog: MatDialog, private router: Router, private cdRef: ChangeDetectorRef) { 
    //var aux = new legend(); //without this line, you get 'Chartist.plugins undefined'

    // Assign the data to the data source for the table to render
    this.dataSource8 = new MatTableDataSource();
    this.dataSource9 = new MatTableDataSource();
    this.dataSource12 = new MatTableDataSource();

    this.dataSource8.paginator = this.paginator8;
    this.dataSource9.paginator = this.paginator9;

    this.getCategoryCount();
    this.getDelayCount();
    this.getNotCancelledFlights();
    this.getCancelledFlights();    
    this.getAirports();
    this.getOriginCount(this.airport15);
    this.getDestinationCount(this.airport16);
  }

  
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  ngOnInit() {

    //this.getAirports();

    /* ----------==========     Historico de vuelos cancelados por origen/destino    ==========---------- */
    this.drawQuery11();

    /* ----------==========     Historico de vuelos no cancelados    ==========---------- */
    this.drawQuery10();

    /* ----------==========     Historico de vuelos por origen/destino    ==========---------- */
    /* This two draw functions run into problems when using API REST async. For JSON read only, everything's OK */

    this.drawQuery15();

    this.drawQuery16();
  }

  ngAfterViewInit() {
    this.dataSource8.paginator = this.paginator8;
    this.dataSource9.paginator = this.paginator9;
    this.dataSource12.paginator = this.paginator9;
    this.cdRef.detectChanges();
  }

  /* ----------==========     Conteo de retrasos por ruta llegada/salida    ==========---------- */
  getDelayCount() {
    /*
    this.rest.getDelayCount('8').subscribe((data: any[]) => {
      this.dataSource8.data = data;
    });
    
    this.rest.getDelayCount('9').subscribe((data: any[]) => {
      this.dataSource9.data = data;
    });
    */
    this.dataSource8.data = this.rest.getDelayCount('8');
    this.dataSource9.data = this.rest.getDelayCount('9');
  }

  /* ----------==========     Categorias por las que se cancelan    ==========---------- */
  getCategoryCount() {
    /*
    this.rest.getCategoryCount().subscribe((data: any[]) => {
      this.dataSource12.data = data;
    });
    */
    this.dataSource12.data = this.rest.getCategoryCount();
  }

  /* ----------==========     Historico de vuelos no cancelados    ==========---------- */
  getNotCancelledFlights() {
    /*
    this.rest.getNotCancelledFlights().subscribe((data: any[]) => {
      this.q10 = data;
    });  
    */
    this.q10 = this.rest.getNotCancelledFlights();
  }

  /* ----------==========     Historico de vuelos cancelados por origen/destino    ==========---------- */
  getCancelledFlights(){
    /*
    this.rest.getCancelledFlights().subscribe((data: any[]) => {
      this.q11 = data;
    });
    */
    this.q11 = this.rest.getCancelledFlights();
  }

  /* ----------==========     GRAFICAR - Historico de vuelos no cancelados    ==========---------- */
  drawQuery10() {

    var dataQuery10 = {
      labels: [],
      series: [
        []
      ]
    };

    //this.rest.getNotCancelledFlights().subscribe((data: any[]) => {
      //this.q10 = data;
      this.q10.forEach((element) => {
        dataQuery10.labels.push(element.Time);
        dataQuery10.series[0].push(element.count);
      }); 
  
      var optionsQuery10 = {
        axisX: {
          showGrid: false
        },
        axisY: {
          showLabel: true,
          scaleMinSpace: 15,
        },
        low: 0,
        high: 2100,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
      };
  
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var Query10 = new Chartist.Bar('#Query10', dataQuery10, optionsQuery10, responsiveOptions);
  
      //start animation for the NotCancelledFlights History Chart
      let seq2: any, delays2: any, durations2: any;
  
      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      Query10.on('draw', function (data) {
        if (data.type === 'bar') {
          seq2++;
          //setup style settings for line barchart
          data.element.attr({
            style: "stroke-width: 5px;"
          });
          // We use the group element of the current series to append a simple circle 
          // with the bar peek coordinates and a circle radius that is depending on the value
          var circle = new Chartist.Svg('circle', {
            cx: data.x2,
            cy: data.y2,
            r: 5
          }, 'ct-slice-pie');
          //setup style settings for lollipop radius
          data.group.append(circle.attr({
            style: "fill: rgba(232, 230, 227, 0.95);" +
              "stroke: rgba(232, 230, 227, 0.95);"
          }, "style"));
  
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
        }
      });
      
    //}); 
  }

  /* ----------==========     GRAFICAR - Historico de vuelos cancelados por origen/destino    ==========---------- */
  drawQuery11() {

    var dataQuery11 = {
      labels: [],
      series: [
        []
      ]
    };

    //this.rest.getCancelledFlights().subscribe((data: any[]) => {
      //this.q11 = data;

      this.q11.forEach((element) => {
        dataQuery11.labels.push(element.time);
        dataQuery11.series[0].push(element.count);
      });
  
      //q11.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
  
      const optionsQuery11: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 250,
        showArea: true,
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
      }
  
      var Query11 = new Chartist.Line('#Query11', dataQuery11, optionsQuery11);
  
      // start animation for the History of Cancelled Flights Chart - Line Chart
      this.startAnimationForLineChart(Query11);


    //});

    
  }


  /* ----------==========     Historico de vuelos por origen/destino    ==========---------- */
  getOriginCount(airport){
    this.q15 = this.rest.getOriginCount(airport);
  }

  /* ----------==========     GRAFICAR - Historico de vuelos por origen/destino    ==========---------- */
  drawQuery15() {

    var dataQuery15 = {
      labels: [],
      series: [
        []
      ]
    };

    //this.rest.getOriginCount(this.airport15).subscribe((data: any[]) => {
      //this.q15 = data;
      this.q15.forEach((element) => {
        dataQuery15.labels.push(element.agno);
        dataQuery15.series[0].push(element.count);
      });

      const optionsQuery15: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
          fillHoles: true
        }),
        low: 0,
        high: 250,
        showArea: true,
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
      }
  
      var Query15 = new Chartist.Line('#Query15', dataQuery15, optionsQuery15);
  
      // start animation for the Origin Flights History Chart - Line Chart
      this.startAnimationForLineChart(Query15);
    //});

    //q15.sort((a, b) => a.agno < b.agno ? -1 : a.agno > b.agno ? 1 : 0);

    
  }

  /* ----------==========     Historico de vuelos por origen/destino    ==========---------- */
  getDestinationCount(airport){
    this.q16 = this.rest.getDestinationCount(airport);
  }

  drawQuery16() {

    var dataQuery16 = {
      labels: [],
      series: [
        []
      ]
    };

    //this.rest.getDestinationCount(this.airport16).subscribe((data: any[]) => {
      //this.q16= data;
      this.q16.forEach((element) => {
        dataQuery16.labels.push(element.agno);
        dataQuery16.series[0].push(element.count);
      });
      const optionsQuery16: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
          fillHoles: true
        }),
        low: 0,
        high: 2050,
        showArea: true,
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
      }
  
      var Query16 = new Chartist.Line('#Query16', dataQuery16, optionsQuery16);
  
      // start animation for the Origin Flights History Chart - Line Chart
      this.startAnimationForLineChart(Query16);
    //});

    //q16.sort((a, b) => a.agno < b.agno ? -1 : a.agno > b.agno ? 1 : 0);
  }

  /* ----------==========     Historico de vuelos por origen/destino    ==========---------- */
  getAirports(){
    /*
    this.rest.getAirports().subscribe((data: any[]) => {
      this.airports15 = data;
      this.airports16 = data;
    });
    */
    this.airports15 = this.rest.getAirports();
    this.airports16 = this.rest.getAirports();
  }


  refresh() {
    // Assign the data to the data source for the table to render
    this.dataSource8 = new MatTableDataSource();
    this.dataSource9 = new MatTableDataSource();
    this.dataSource12 = new MatTableDataSource();
    this.dataSource8.paginator = this.paginator8;
    this.dataSource9.paginator = this.paginator9;
  }
  

}

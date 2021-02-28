import { Component, OnInit,ViewChild, Inject, ChangeDetectorRef, ViewChildren} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  panelOpenState: boolean = false;

  displayedColumns = ['aerolinea', 'origen','destino', 'conteo'];

  dataSource8: MatTableDataSource<any>;
  dataSource9: MatTableDataSource<any>;

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


  constructor(public rest:RestService, private route: ActivatedRoute, 
    public dialog: MatDialog, private router: Router, private cdRef:ChangeDetectorRef) {

    // Assign the data to the data source for the table to render
    this.dataSource8 = new MatTableDataSource();
    this.dataSource9 = new MatTableDataSource();
    
    this.dataSource8.paginator = this.paginator8;
    this.dataSource9.paginator = this.paginator9;
    this.getDelayCount();
    //this.setDelayCount("eigth");
  }



  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
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

  startAnimationForBarChart(chart, style={}){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.attr(style);
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

      seq2 = 0;
  };


  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Historico de vuelos cancelados por origen/destino    ==========---------- */
      this.drawQuery11();

      /* ----------==========     Historico de vuelos no cancelados    ==========---------- */
      this.drawQuery10();      
  }
  
  ngAfterViewInit() {
    this.dataSource8.paginator = this.paginator8;
    this.dataSource9.paginator = this.paginator9;
    this.cdRef.detectChanges();
  }

  getDelayCount() {
    /*this.rest.getDelayCount(arr_dep).subscribe((data: any[]) => {
      this.dataSource.data = data
      console.log(data)
    });*/
    this.dataSource8.data = this.rest.getDelayCount("eigth");
    this.dataSource9.data = this.rest.getDelayCount("ninth");
  }

  /* ----------==========     Historico de vuelos no cancelados    ==========---------- */
  drawQuery10() {

    /*this.rest.getDelayCount(arr_dep).subscribe((data: any[]) => {
      this.dataSource.data = data
      console.log(data)
    });*/

    var q10 = this.rest.getNotCancelledFlights();
    
    var dataQuery10 = {
      labels: [],
      series: [
        []
      ]
    };
    
    q10.forEach( (element) => {
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
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
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
    Query10.on('draw', function(data) {
      if(data.type === 'bar'){
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
            "stroke: rgba(232, 230, 227, 0.95);"},"style"));

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
  }

  /* ----------==========     Historico de vuelos cancelados por origen/destino    ==========---------- */
  drawQuery11() {

    /*this.rest.getCancelledFlights(arr_dep).subscribe((data: any[]) => {
      this.dataSource.data = data
      console.log(data)
    });*/

    var q11 = this.rest.getCancelledFlights();
    q11.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
    
    var dataQuery11 = {
      labels: [],
      series: [
        []
      ]
    };
    
    q11.forEach( (element) => {
      dataQuery11.labels.push(element.time);
      dataQuery11.series[0].push(element.count);
    });

    const optionsQuery11: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 250,
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    }

    var Query11 = new Chartist.Line('#Query11', dataQuery11, optionsQuery11);

    // start animation for the History of Cancelled Flights Chart - Line Chart
    this.startAnimationForLineChart(Query11);
  }

  refresh(){
    //this.displayedColumns = this.productColumns[this.inventarioItem];
    // Assign the data to the data source for the table to render
    this.dataSource8 = new MatTableDataSource();
    this.dataSource9 = new MatTableDataSource();
    this.dataSource8.paginator = this.paginator8;
    this.dataSource9.paginator = this.paginator9;
  }

}

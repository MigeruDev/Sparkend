import { Component, OnInit,ViewChild, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from "highcharts/highmaps";
import { element } from 'protractor';

declare function require(name:string);
var usaMap = require("./us-all.geo.json");
var proj4 = require('proj4').default;

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})

export class TableListComponent implements OnInit {

  panelOpenState: boolean = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";

  chartOptions: Highcharts.Options;
  chartOptions14: Highcharts.Options;

  

  constructor(public rest:RestService, private route: ActivatedRoute, 
    public dialog: MatDialog, private router: Router) {

  }


  ngOnInit() {
    this.drawQuery13();
    this.drawQuery14();
  }    

  ngAfterViewInit() {

  }

  /* ----------==========     Vuelos no cancelados según el aeropuerto de salida   ==========---------- */
  drawQuery13(){

    var q13: any;
    var dataq13 = [];

    this.rest.getAirportArr().subscribe((data: any[]) => {
      q13 = data;
      q13.forEach((element) => {
        dataq13.push({
          name: element.count,
          lat: element.lat,
          lon: element.long
        });
      });
    });

    

    this.chartOptions = {
      chart: {
        map: usaMap,
        proj4: proj4
      },
      title: {
        text: ""
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox"
        }
      },
      legend: {
        enabled: false
      },
      colorAxis: {
        min: 0
      },
      series: [
        {
          /*
          name: "Random data",
          states: {
            hover: {
              color: "#BADA55"
            }
          },*/
          dataLabels: {
            enabled: false,
            format: "{point.name}"
          },
          allAreas: false,
          data: [
            ['us-ma', 0],
            ['us-wa', 1],
            ['us-ca', 2],
            ['us-or', 3],
            ['us-wi', 4],
            ['us-me', 5],
            ['us-mi', 6],
            ['us-nv', 7],
            ['us-nm', 8],
            ['us-co', 9],
            ['us-wy', 10],
            ['us-ks', 11],
            ['us-ne', 12],
            ['us-ok', 13],
            ['us-mo', 14],
            ['us-il', 15],
            ['us-in', 16],
            ['us-vt', 17],
            ['us-ar', 18],
            ['us-tx', 19],
            ['us-ri', 20],
            ['us-al', 21],
            ['us-ms', 22],
            ['us-nc', 23],
            ['us-va', 24],
            ['us-ia', 25],
            ['us-md', 26],
            ['us-de', 27],
            ['us-pa', 28],
            ['us-nj', 29],
            ['us-ny', 30],
            ['us-id', 31],
            ['us-sd', 32],
            ['us-ct', 33],
            ['us-nh', 34],
            ['us-ky', 35],
            ['us-oh', 36],
            ['us-tn', 37],
            ['us-wv', 38],
            ['us-dc', 39],
            ['us-la', 40],
            ['us-fl', 41],
            ['us-ga', 42],
            ['us-sc', 43],
            ['us-mn', 44],
            ['us-mt', 45],
            ['us-nd', 46],
            ['us-az', 47],
            ['us-ut', 48],
            ['us-hi', 49],
            ['us-ak', 50]
          ]
        } as Highcharts.SeriesMapOptions,
        {
          // Specify points using lat/lon
          type: "mappoint",
          name: "Cantidad de Vuelos",
          marker: {
            radius: 5,
            fillColor: "tomato"
          },
          data: dataq13
        }
      ]
    };
  }

  /* ----------==========     Vuelos no cancelados segun aeropuertos de llegada   ==========---------- */
  drawQuery14(){

    var q14: any;
    var dataq14 = [];

    this.rest.getAirportDep().subscribe((data: any[]) => {
      q14 = data;
      q14.forEach((element) => {
        dataq14.push({
          name: element.count,
          lat: element.lat,
          lon: element.long
        });
      });
    });

    this.chartOptions14 = {
      chart: {
        map: usaMap,
        proj4: proj4
      },
      title: {
        text: ""
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox"
        }
      },
      legend: {
        enabled: false
      },
      colorAxis: {
        min: 0
      },
      series: [
        {
          /*
          name: "Random data",
          states: {
            hover: {
              color: "#BADA55"
            }
          },*/
          dataLabels: {
            enabled: false,
            format: "{point.name}"
          },
          allAreas: false,
          data: [
            ['us-ma', 0],
            ['us-wa', 1],
            ['us-ca', 2],
            ['us-or', 3],
            ['us-wi', 4],
            ['us-me', 5],
            ['us-mi', 6],
            ['us-nv', 7],
            ['us-nm', 8],
            ['us-co', 9],
            ['us-wy', 10],
            ['us-ks', 11],
            ['us-ne', 12],
            ['us-ok', 13],
            ['us-mo', 14],
            ['us-il', 15],
            ['us-in', 16],
            ['us-vt', 17],
            ['us-ar', 18],
            ['us-tx', 19],
            ['us-ri', 20],
            ['us-al', 21],
            ['us-ms', 22],
            ['us-nc', 23],
            ['us-va', 24],
            ['us-ia', 25],
            ['us-md', 26],
            ['us-de', 27],
            ['us-pa', 28],
            ['us-nj', 29],
            ['us-ny', 30],
            ['us-id', 31],
            ['us-sd', 32],
            ['us-ct', 33],
            ['us-nh', 34],
            ['us-ky', 35],
            ['us-oh', 36],
            ['us-tn', 37],
            ['us-wv', 38],
            ['us-dc', 39],
            ['us-la', 40],
            ['us-fl', 41],
            ['us-ga', 42],
            ['us-sc', 43],
            ['us-mn', 44],
            ['us-mt', 45],
            ['us-nd', 46],
            ['us-az', 47],
            ['us-ut', 48],
            ['us-hi', 49],
            ['us-ak', 50]
          ]
        } as Highcharts.SeriesMapOptions,
        {
          // Specify points using lat/lon
          type: "mappoint",
          name: "Cantidad de Vuelos",
          marker: {
            radius: 5,
            fillColor: "tomato"
          },
          data: dataq14
        }
      ]
    };
  }

}
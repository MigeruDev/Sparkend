import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  flights = [{
    "Year": "",
    "Month": "",
    "DayofMonth": "",
    "DayOfWeek": "",
    "DepTime": "",
    "CRSDepTime": "",
    "ArrTime": "",
    "CRSArrTime": "",
    "UniqueCarrier": "",
    "FlightNum": "",
    "TailNum": "",
    "ActualElapsedTime": "",
    "CRSElapsedTime": "",
    "AirTime": "",
    "ArrDelay": "",
    "DepDelay": "",
    "Origin": "",
    "Dest": "",
    "Distance": "",
    "TaxiIn": "",
    "TaxiOut": "",
    "Cancelled": "",
    "CancellationCode": "",
    "Diverted": "",
    "CarrierDelay": "",
    "WeatherDelay": "",
    "NASDelay": "",
    "SecurityDelay": "",
    "LateAircraftDelay": "",
  }]

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  nuevoVuelo() {
    this.flights.push({
      "Year": "",
      "Month": "",
      "DayofMonth": "",
      "DayOfWeek": "",
      "DepTime": "",
      "CRSDepTime": "",
      "ArrTime": "",
      "CRSArrTime": "",
      "UniqueCarrier": "",
      "FlightNum": "",
      "TailNum": "",
      "ActualElapsedTime": "",
      "CRSElapsedTime": "",
      "AirTime": "",
      "ArrDelay": "",
      "DepDelay": "",
      "Origin": "",
      "Dest": "",
      "Distance": "",
      "TaxiIn": "",
      "TaxiOut": "",
      "Cancelled": "",
      "CancellationCode": "",
      "Diverted": "",
      "CarrierDelay": "",
      "WeatherDelay": "",
      "NASDelay": "",
      "SecurityDelay": "",
      "LateAircraftDelay": "",
    });
  }

  quitarVuelo(flight) {
    const index = this.flights.indexOf(flight, 0);
    if (this.flights.length>1){
      if (index > -1) {
        this.flights.splice(index, 1);
      }
    }
  }

  ingresarVuelo() {
    console.log(this.flights);
    this.rest.addNewFlight(this.flights[0]).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

}

import { Component, OnInit,ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  displayedColumns = ['id', 'year','flightnum', 'origin','dest', 'deptime','cancelled', 'crud'];

  dataSource: MatTableDataSource<any>;

  animal: string;
  name: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public rest:RestService, private route: ActivatedRoute, 
    public dialog: MatDialog, private router: Router) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.getInsumos();
    this.getFlightNumber("1");
  }

  openDialog(flight): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: flight
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.rest.updateFlight(flight._id, flight).subscribe((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
    });
  }

  ngOnInit() {
    
  }    

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getFlightNumber(number) {
    this.rest.getFlightNumber(number).subscribe((data: any[]) => {
      this.dataSource.data = data
      //console.log(data)
    });
  }

  deleteFlight(flight) {
    this.rest.deleteFlight(flight._id).subscribe((data: any) => {
      console.log(data)
      /* const index = this.dataSource.data.indexOf(flight, 0);
      if (this.dataSource.data.length>1){
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
        }
      } */
    });
  }

  refresh(){
    //this.displayedColumns = this.productColumns[this.inventarioItem];
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
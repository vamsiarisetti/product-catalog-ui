import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { Flight } from './../flight';
import { FlightsService } from './../flight.service';

@Component({
  selector: 'app-my-flights',
  templateUrl: './my-flights.component.html',
  styleUrls: ['./my-flights.component.css']
})
export class MyFlightsComponent implements OnInit {
  flights: Flight[] = [];
  days: any[] = [];
  // @ViewChild('datatable') datatable: Table | undefined;

  constructor(private flightService: FlightsService) {
    this.getFlightsData();
  }

  ngOnInit() {
    // this.flights = this.flightService.getMyFlights();
    this.days = [
      { label: 'Monday', value: 'monday' },
      { label: 'Tuesday', value: 'tuesday' },
      { label: 'Wednesday', value: 'wednesday' },
      { label: 'Thursday', value: 'thursday' },
      { label: 'Friday', value: 'friday' },
      { label: 'Saturday', value: 'saturday' },
      { label: 'Sunday', value: 'sunday' }
    ]
  }

  // get the data from backend service api
  private getFlightsData() {
    this.flightService.getFlightsData().subscribe(data => {
      this.flights = data;
    });
  }

  // applyFilterGlobal($event, stringVal: any) {
  //   this.datatable?.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  // }

  getEventValue($event: any): string {
    return $event.target.value;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { Flight } from './../flight';
import { FlightsService } from './../flight.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-flights',
  templateUrl: './my-flights.component.html',
  styleUrls: ['./my-flights.component.css'],
})
export class MyFlightsComponent implements OnInit {
  flights: Flight[] = [];
  days: any[] = [];
  // @ViewChild('datatable') datatable: Table | undefined;

  // @ViewChild('datatable') datatable: Table | undefined;
  flight!: Flight;
  submitted: boolean = false;
  flightDialog: boolean = false;

  constructor(
    private flightService: FlightsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    // this.getFlightsData();
  }

  ngOnInit() {
    // this.flights = this.flightService.getMyFlights();
    this.getFlightsData();
    this.days = [
      { label: 'Monday', value: 'monday' },
      { label: 'Tuesday', value: 'tuesday' },
      { label: 'Wednesday', value: 'wednesday' },
      { label: 'Thursday', value: 'thursday' },
      { label: 'Friday', value: 'friday' },
      { label: 'Saturday', value: 'saturday' },
      { label: 'Sunday', value: 'sunday' },
    ];
  }

  // get the data from backend service api
  private getFlightsData() {
    this.flightService.getFlightsData().subscribe((data: Flight[]) => {
      this.flights = data;
    });
  }

  // applyFilterGlobal($event, stringVal: any) {
  //   this.datatable?.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  // }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  openNew() {
    this.flight = {};
    this.submitted = false;
    this.flightDialog = true;
  }

  hideDialog() {
    this.flightDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    let flightNumber = this.flight.flightNumber;
    if (flightNumber) {
      if (this.flight.id) {
        this.flights[this.findIndexById(flightNumber)] = this.flight;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Flight Updated',
          life: 3000,
        });
      } else {
        this.flight.id = this.createId(this.flights);
        this.flight.flightNumber = this.createFlightNumber();
        this.flight.origin = "NAX";
        this.flight.destination = "AHR";
        this.flight.departDay = "Wednesday";
        this.flight.departTime = "09:00";
        this.flight.arriveDay = "Thursday";
        this.flight.arriveTime = "10:00";
        this.flight.price = 100.00;

        // this.flight.image = 'product-placeholder.svg';
        this.flights.push(this.flight);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Flight Created',
          life: 3000,
        });
      }

      this.flights = [...this.flights];
      this.flightDialog = false;
      this.flight = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.flights.length; i++) {
      if (this.flights[i].flightNumber === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(flights: Flight[]): number {
    let max = 0;
    flights.forEach(aircraft => {
      let id = aircraft.id ? aircraft.id : 0;
       if (id > max) {
         max = id;
       }
    });
    max = max+1;
    return max;
  }

  createFlightNumber(): string
  {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}

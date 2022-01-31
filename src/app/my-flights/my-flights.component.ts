import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { Flight } from './../flight';
import { FlightsService } from './../flight.service';

import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';

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

  cities: any[] = [];
  selectedCountry: string | undefined;
  countries: any[] = [];
  items: SelectItem[] = [];
  item: string | undefined;

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

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
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
    if (this.flight) {
      var flightNumber = this.flight.flightNumber as string;
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
    flights.forEach((aircraft) => {
      let id = aircraft.id ? aircraft.id : 0;
      if (id > max) {
        max = id;
      }
    });
    max = max + 1;
    return max;
  }

  createFlightNumber(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var numbers = '0123456789';
    for (var i = 0; i < 3; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
      id = id.toUpperCase();
    }
    for (var j = 0; j < 2; j++) {
      id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return id;
  }
}

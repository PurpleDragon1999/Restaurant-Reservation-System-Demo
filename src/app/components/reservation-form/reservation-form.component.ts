import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { tables, tables_data } from '../../models/tables';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _router: Router
  ) { }

  table_id: number;

  table: tables_data;
  table_data: string = '';

  submitted: boolean = false;
  reservationform: FormGroup;

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.table_id = parseInt(paramMap.get('id'));
    });
    this.table = tables.filter(t => {
      if(t.id == this.table_id){ return true; }
    })[0];

    this.table_data = `${this.table.table_size} seats, ${this.table.location} Table`;

    this.reservationform = this.formBuilder.group({
      table: [{value: this.table_data, disabled: true}, [Validators.required]],
      start_slot: ['', [Validators.required]],
      end_slot: ['', [Validators.required]]
    });

  }

  get f() { return this.reservationform.controls; }

  saveReservation() {
    this.submitted = true;
    if(this.reservationform.invalid) {
      return;
    }
    tables.map(t => {
      if(t.id == this.table_id) {
        t.timeReserved.push({
          start: this.reservationform.value.start_slot,
          end: this.reservationform.value.end_slot
        })
      }
    });
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: 'auto',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/home']);
    });
  }

}

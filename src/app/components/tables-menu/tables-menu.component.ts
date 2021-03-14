import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { tables, tables_data } from '../../models/tables';

@Component({
  selector: 'app-tables-menu',
  templateUrl: './tables-menu.component.html',
  styleUrls: ['./tables-menu.component.css']
})
export class TablesMenuComponent implements OnInit {

  constructor() { }

  data: any[] = tables;
  time: string = '';
  size: string = '';

  ngOnInit(): void {
  }

  timeChanged(e: string) {
    this.filterTableList();
  }

  sizeChanged(e: any) {
    this.filterTableList();
  }

  filterTableList() {
    this.data = tables;
    this.data = this.data.filter(d => {
      if(this.time.length == 0) {
        if(d.table_size == parseInt(this.size)) return true;
      }
      else if(this.size.length == 0) {
        if(this.compareTime(d)) return true;
      }
      else {
        if(d.table_size == parseInt(this.size) && this.compareTime(d)) return true;
      }
    });
  }

  compareTime(d: tables_data): boolean {
    console.log(this.time);
    if(d.timeReserved.length == 0 || this.time.length == 0) return true;
    let valid = false;
    d.timeReserved.some(t => {
      let start = this.convertTimeToInt(t.start);
      let end = this.convertTimeToInt(t.end);
      let temp = this.convertTimeToInt(this.time);
      console.log(start, end, temp);
      if((temp+1) < start && temp > end) {
        valid = true;
        return true;
      }
    });
    return valid;
  }

  convertTimeToInt(str: string): number {
    let num = parseInt(str.split(":")[0]);
    num += parseFloat("0." + str.split(":")[1]);
    return num;
  }

}

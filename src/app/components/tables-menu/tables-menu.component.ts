import { Component, OnInit } from '@angular/core';
import { tables } from '../../models/tables';

@Component({
  selector: 'app-tables-menu',
  templateUrl: './tables-menu.component.html',
  styleUrls: ['./tables-menu.component.css']
})
export class TablesMenuComponent implements OnInit {

  constructor() { }

  data: any[] = tables;
  time: string;
  size: string;

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
      if(d.table_size == this.size) return true;
    });
  }

}

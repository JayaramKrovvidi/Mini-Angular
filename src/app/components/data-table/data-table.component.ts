import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { HistoryService } from 'src/app/services/HistoryService/history.service';
import {Router} from "@angular/router"
import 'hammerjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  providers: [HistoryService]
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;
  files: any = [];
  constructor(private historyService : HistoryService, private router: Router) { }

  displayedColumns = ['fileId','fileName', 'startTime', 'stopTime','executionTime', 'recordsCount', 'recordsPassed', 'recordsFailed',  'passPercentage'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort,this.historyService);
  }

  onRowClicked(row) {
    this.router.navigate(['/results',row.fileId]);
}
}

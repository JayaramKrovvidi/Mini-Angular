import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ExecResultsDataSource } from './exec-results-datasource';

@Component({
  selector: 'app-exec-results',
  templateUrl: './exec-results.component.html',
  styleUrls: ['./exec-results.component.css']
})
export class ExecResultsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ExecResultsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['file_id', 'line_num', 'start_time','expected_response_code','obtained_response_code','expected_response_type','obtained_response_type','result'];

  ngOnInit() {
    this.dataSource = new ExecResultsDataSource(this.paginator, this.sort);
  }
}

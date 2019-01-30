import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ExecResultsDataSource } from './exec-results-datasource';
import { ExecutionResultsService } from 'src/app/services/ExecutionResultsService/execution-results.service';


@Component({
  selector: 'app-exec-results',
  templateUrl: './exec-results.component.html',
  styleUrls: ['./exec-results.component.css'],
  providers:[ExecutionResultsService]
})
export class ExecResultsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ExecResultsDataSource;

  constructor(private resultService:ExecutionResultsService){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fileId', 'lineNo', 'startTime','endTime','expectedResponseCode','obtainedResponseCode','expectedResponseType','obtainedResponseType','result'];

  ngOnInit() {
   
    this.dataSource = new ExecResultsDataSource(this.paginator, this.sort, this.resultService);
    
   
}
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ExecResultsDataSource } from './exec-results-datasource';
import { ExecutionResultsService } from 'src/app/services/ExecutionResultsService/execution-results.service';
import { ActivatedRoute } from '@angular/router';


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
  fileId :number;
  constructor(private resultService:ExecutionResultsService, private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params => {
      this.fileId =+ params['id'];
      console.log(this.fileId); // Print the parameter to the console. 
  });
  }

  displayedColumns = ['fileId', 'lineNo', 'methodName', 'startTime','endTime','expectedResponseCode','obtainedResponseCode','expectedResponseType','obtainedResponseType','result'];

  ngOnInit() {
   
    this.dataSource = new ExecResultsDataSource(this.paginator, this.sort, this.resultService,this.fileId);
    
   
}
}

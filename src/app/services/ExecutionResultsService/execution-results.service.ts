import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExecResultsItem } from 'src/app/components/exec-results/exec-results-datasource';


@Injectable({
  providedIn: 'root'
})
export class ExecutionResultsService {
  constructor(private http : HttpClient) { }

  pushResultsToWebsite() : Observable< ExecResultsItem[] >
  {
    
    return this.http.get< ExecResultsItem[] >("/test2/results/getRecords");

    
  }

  pushOneResultToWebsite() : Observable< ExecResultsItem[] >
  {
    
    return this.http.get< ExecResultsItem[] >("/test2/results/{id}/get");

    
  }




  

}

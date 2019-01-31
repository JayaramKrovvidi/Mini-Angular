import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExecResultsItem } from 'src/app/components/exec-results/exec-results-datasource';


@Injectable({
  providedIn: 'root'
})
export class ExecutionResultsService {
  constructor(private http : HttpClient) { }

  fetchResultsFromWebsite(fileId) : Observable< ExecResultsItem[] >
  {
    return this.http.get< ExecResultsItem[] >('/test3/results/'+fileId+'/get');
  }




  

}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { DataTableItem } from 'src/app/components/data-table/data-table-datasource';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http : HttpClient) { }

  pushHistoryToWebsite() : Observable< DataTableItem[] >
  {
    
    return this.http.get< DataTableItem[] >("/test2/history/getHistory");

    
  }

}

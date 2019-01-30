import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ExecutionResultsService } from 'src/app/services/ExecutionResultsService/execution-results.service';


// TODO: Replace this with your own data model type
export interface ExecResultsItem {
    fileId :number ,  
    lineNo :number,  
    startTime :Date,
    endTime:Date,
    expectedResponseCode:number,
    obtainedResponseCode :number,
    expectedResponseType :string,
    obtainedResponseType:string,
    result :boolean,
}
//console.log(new Date(1556519730000));

// TODO: replace this with real data from your application

 


/**
 * Data source for the ExecResults view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ExecResultsDataSource extends DataSource<ExecResultsItem> {
  
  data: ExecResultsItem[] = [];
  constructor(private paginator: MatPaginator, private sort:MatSort,private resultService:ExecutionResultsService) {
    super();
    //console.log(this.resultService.pushResultsToWebsite());
    //data = this.resultService.pushResultsToWebsite();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ExecResultsItem[]> {
    console.log("here");
    return new Observable<ExecResultsItem[]>(observer => {
      this.resultService.pushResultsToWebsite().subscribe((servers) => {
        if (servers) {
          return this.applyMutations(servers).subscribe(data => {
            observer.next(data);
          });
        }
      });
    });
  }
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    applyMutations(tmpData: ExecResultsItem[]): Observable<ExecResultsItem[]>{
    const dataMutations = [
      observableOf(tmpData),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...tmpData]));
    }));
  }
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ExecResultsItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ExecResultsItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'fileId': return compare(a.fileId, b.fileId, isAsc);
        case 'lineNo': return compare(+a.lineNo, +b.lineNo, isAsc);
        case 'startTime': return compare(+a.startTime, +b.startTime, isAsc);
        case 'endTime': return compare(+a.endTime, +b.endTime, isAsc);
        case 'expectedResponseCode': return compare(+a.expectedResponseCode, +b.expectedResponseCode, isAsc);
        case 'obtainedResponseCode': return compare(+a.obtainedResponseCode, +b.obtainedResponseCode, isAsc);
        case 'expectedResponseType': return compare(+a.expectedResponseType, +b.expectedResponseType, isAsc);
        case 'obtainedResponseType': return compare(+a.obtainedResponseType, +b.obtainedResponseType, isAsc);
        case 'result': return compare(+a.result, +b.result, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

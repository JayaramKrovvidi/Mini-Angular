import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ExecResultsItem {
  file_id :number ,
    line_num :number,
    start_time :string,
    expected_response_code:number,
    obtained_response_code :number,
    expected_response_type :string,
    obtained_response_type:string,
    result :boolean,
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ExecResultsItem[] = [
  {file_id:1, line_num:1, start_time:"09:30",expected_response_code:200,obtained_response_code:200,expected_response_type:"abc",obtained_response_type:"abcd",result:true},
  {file_id:1, line_num:1, start_time:"09:30",expected_response_code:400,obtained_response_code:100,expected_response_type:"abc",obtained_response_type:"abcd",result:true},
  {file_id:1, line_num:1, start_time:"09:30",expected_response_code:643,obtained_response_code:200,expected_response_type:"abc",obtained_response_type:"abcd",result:true},
  {file_id:1, line_num:1, start_time:"09:30",expected_response_code:122,obtained_response_code:200,expected_response_type:"abc",obtained_response_type:"abcd",result:true},
  {file_id:1, line_num:1, start_time:"09:30",expected_response_code:123,obtained_response_code:600,expected_response_type:"abc",obtained_response_type:"abcd",result:true},
  {file_id:1, line_num:1, start_time:"09:30",expected_response_code:444,obtained_response_code:200,expected_response_type:"abc",obtained_response_type:"abcd",result:true},
  {file_id:1, line_num:1, start_time:"09:30",expected_response_code:333,obtained_response_code:99,expected_response_type:"abc",obtained_response_type:"abcd",result:true}
];

/**
 * Data source for the ExecResults view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ExecResultsDataSource extends DataSource<ExecResultsItem> {
  data: ExecResultsItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ExecResultsItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
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
        case 'file_id': return compare(a.file_id, b.file_id, isAsc);
        case 'line_num': return compare(+a.line_num, +b.line_num, isAsc);
        case 'start_time': return compare(+a.start_time, +b.start_time, isAsc);
        case 'expected_response_code': return compare(+a.expected_response_code, +b.expected_response_code, isAsc);
        case 'obtained_response_code': return compare(+a.obtained_response_code, +b.obtained_response_code, isAsc);
        case 'expected_response_type': return compare(+a.expected_response_type, +b.expected_response_type, isAsc);
        case 'obtained_response_type': return compare(+a.obtained_response_type, +b.obtained_response_type, isAsc);
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

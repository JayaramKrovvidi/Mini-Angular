import { Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { HistoryService } from 'src/app/services/HistoryService/history.service';

export interface DataTableItem {
  fileId:number,
  fileName: string;
  startTime: Date;
  stopTime: Date;
  executionTime: number;
  recordsCount: number;
  recordsPassed: number;
  recordsFailed: number;
  passPercentage: number;
}



export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = [];
  constructor(private paginator: MatPaginator, private sort: MatSort,private historyService:HistoryService) {
    super();
  }

  connect(): Observable<DataTableItem[]> {
    //console.log("here");
    return new Observable<DataTableItem[]>(observer => {
      this.historyService.pushHistoryToWebsite().subscribe(
        (servers) => {
          if (servers) {
            return this.applyMutations(servers).subscribe(data => {
              observer.next(data);
            });
          }
        },
        (error) => {
          window.alert(error);
        });
    });
  }
    applyMutations(tmpData: DataTableItem[]): Observable<DataTableItem[]>{
    const dataMutations = [
      observableOf(tmpData),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...tmpData]));
    }));
  }

  disconnect() {}

  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'fileName': return compare(a.fileName, b.fileName, isAsc);
        case 'fileId': return compare(+a.fileId, +b.fileId, isAsc);
        case 'startTime': return compare(a.startTime, b.startTime, isAsc);
        case 'stopTime': return compare(a.stopTime, b.stopTime, isAsc);
        case 'executionTime': return compare(+a.executionTime, +b.executionTime, isAsc);
        case 'recordsCount': return compare(+a.recordsCount, +b.recordsCount, isAsc);
        case 'recordsPassed': return compare(+a.recordsPassed, +b.recordsPassed, isAsc);
        case 'recordsFailed': return compare(+a.recordsFailed, +b.recordsFailed, isAsc);
        case 'passPercentage': return compare(+a.passPercentage, +b.passPercentage, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface DataTableItem {
  name: string;
  startTime: string;
  endTime: string;
  exTime: string;
  total: number;
  passCount: number;
  failCount: number;
  passpercen: number;
}

const EXAMPLE_DATA: DataTableItem[] = [
  { name: 'File1', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File2', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File3', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File4', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File5', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File6', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File7', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File8', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File9', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
  { name: 'File10', startTime: '12:15', endTime: '12:17', exTime: '00.02', total: 120, passCount: 100, failCount: 20, passpercen: 80},
];

export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  connect(): Observable<DataTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
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
        case 'name': return compare(a.name, b.name, isAsc);
        case 'startTime': return compare(a.startTime, b.startTime, isAsc);
        case 'endTime': return compare(a.endTime, b.endTime, isAsc);
        case 'exTime': return compare(a.exTime, b.exTime, isAsc);
        case 'total': return compare(+a.total, +b.total, isAsc);
        case 'passCount': return compare(+a.passCount, +b.passCount, isAsc);
        case 'failCount': return compare(+a.failCount, +b.failCount, isAsc);
        case 'passpercen': return compare(+a.passpercen, +b.passpercen, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

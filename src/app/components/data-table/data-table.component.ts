import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { UploadFileService } from 'src/app/services/UploadFileService/upload-file.service';
import 'hammerjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  providers: [UploadFileService]
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;
  files: any = [];

  constructor(private uploadService : UploadFileService) { }

  displayedColumns = ['name', 'startTime', 'endTime', 'exTime', 'total', 'passCount', 'failCount', 'passpercen'];

  ngOnInit() {
    /*this.uploadService.getAllFiles().subscribe((response) => {
      console.log(response);
      if(response && response.length > 0){
        this.files = response;
      }
    });
*/
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
  }
}

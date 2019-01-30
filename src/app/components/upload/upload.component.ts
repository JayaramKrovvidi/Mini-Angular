import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { UploadFileService } from 'src/app/services/UploadFileService/upload-file.service';
import { interval } from 'rxjs'
import { NgxSpinnerService } from 'ngx-spinner';

 
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadFileService]
})
export class UploadComponent implements OnInit {

  selectedFiles : FileList;
  currentUpload : File;
  executePercentage: any = 0;
  uploaded: boolean;

  constructor(private uploadService : UploadFileService, public spinner: NgxSpinnerService){}

  ngOnInit() {
    this.uploaded = false;
  }

  selectFile(event)
  {
    this.selectedFiles = event.target.files;
  }

  upload()
  {
    this.spinner.show();
    this.currentUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToWebsite(this.currentUpload).subscribe(
      response => {
        console.log(response);
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }
}

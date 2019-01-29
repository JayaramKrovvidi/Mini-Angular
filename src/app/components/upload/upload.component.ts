import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { UploadFileService } from 'src/app/services/UploadFileService/upload-file.service';
import { interval } from 'rxjs'

 
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

  constructor(private uploadService : UploadFileService){}

  ngOnInit() {
    this.uploaded = false;
  }
  
  progressTracker()
  {
    interval(50)
    .subscribe((val) => {
      if(this.executePercentage < 100)
        this.executePercentage += 1; 
    });
  }

  selectFile(event)
  {
    this.selectedFiles = event.target.files;
  }

  upload()
  {
    this.currentUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToWebsite(this.currentUpload).subscribe(response =>{
      if(response instanceof HttpResponse)
      {
        console.log("File uploaded Successfully");
        this.uploaded = true;
      }
      else if(response instanceof HttpErrorResponse)
      {
        console.log("Something went wrong");
        this.uploaded = false;
      }
    });
      this.selectedFiles = undefined;
  }
}

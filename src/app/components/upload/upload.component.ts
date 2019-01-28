import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http'
import { UploadFileService } from 'src/app/services/UploadFileService/upload-file.service';

 
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadFileService]
})
export class UploadComponent implements OnInit {

  selectedFiles : FileList;
  currentUpload : File;
  loading : boolean = false;

  constructor(private uploadService : UploadFileService){}

  ngOnInit() {
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
        console.log("File uploaded Successfully");
        this.loading = true;
      });
      this.selectedFiles = undefined;
  }

}

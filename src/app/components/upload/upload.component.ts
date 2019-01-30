import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { UploadFileService } from 'src/app/services/UploadFileService/upload-file.service';
import { interval } from 'rxjs'
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'ts-xlsx';

 
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadFileService]
})
export class UploadComponent implements OnInit {

  arrayBuffer:any;
  selectedFiles : FileList;
  currentUpload : File;
  executePercentage: any = 0;
  uploaded: boolean;
  isFileValid: boolean;

  constructor(private uploadService : UploadFileService, private spinner: NgxSpinnerService){}

  ngOnInit() {
    this.uploaded = false;
    this.isFileValid = false;
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
    this.headerValidation();
  }

  headerValidation(){
    this.currentUpload = this.selectedFiles.item(0);
    let fileReader = new FileReader();
   
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        
        if(worksheet.A1.h === "methodName" && worksheet.B1.h === "websiteUrl" && worksheet.C1.h === "optionalBody" && worksheet.D1.h === "expectedResponseCode" && worksheet.E1.h === "expectedResponseType" )
          this.isFileValid = true;
        else
          this.isFileValid = false;
    }
    fileReader.readAsArrayBuffer(this.currentUpload);
  }

  upload(event)
  {
    this.spinner.show();
    
    if(this.isFileValid){
      this.currentUpload = this.selectedFiles.item(0);
      this.uploadService.pushFileToWebsite(this.currentUpload).subscribe(response =>{
      this.spinner.hide();
  
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
    else{
      this.spinner.hide();
      alert("XLSX file headers are incorrect");
    }
  }

}

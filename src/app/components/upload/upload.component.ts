import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/UploadFileService/upload-file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router} from "@angular/router";
import { Subscription, timer, pipe, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  currentFileId : number;
  executePercentage: any = 0;
  uploaded: boolean = false;
  isFileValid: boolean;
  executeSubscription : Subscription;

  constructor(private uploadService : UploadFileService, public spinner: NgxSpinnerService, private router: Router){}

  ngOnInit() {
    this.isFileValid = false;
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
      this.uploadService.pushFileToWebsite(this.currentUpload).subscribe(
        response =>{
            this.currentFileId = response.fileId;
            this.spinner.hide();
            this.uploaded=true;
          },
          error => {
            console.log(error);
            this.spinner.hide();
          }
        );
        this.selectedFiles = undefined;
    }
    else{
      this.spinner.hide();
      alert("XLSX file headers are incorrect");
    }
  }
  execute(event)
  {
    this.spinner.show();
    //this.uploaded = false;
    this.uploadService.executeFile(this.currentFileId).subscribe(
      response =>{
        this.router.navigate(['/results',this.currentFileId]);
        this.spinner.hide();
      },
      error =>{
        this.spinner.hide();
      }
      );
      
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http : HttpClient) {}

  pushFileToWebsite(file: File) : Observable< any >
  {
    const formData : FormData = new FormData();
    formData.append('testingData', file);
    return this.http.post("/test2/upload",formData);
  }

}

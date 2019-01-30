import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UploadComponent } from 'src/app/components/upload/upload.component';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http : HttpClient) {}

  pushFileToWebsite(file: File) : Observable<any>
  {
    const formData : FormData = new FormData();
    formData.append('testingData', file);
    return this.http.post("/test2/upload",formData)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
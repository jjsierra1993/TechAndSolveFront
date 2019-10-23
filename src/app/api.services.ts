import {Injectable} from '@angular/core';
import { HttpClient, HttpEvent,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';

//Services for communicate Api
@Injectable({ providedIn: 'root' })
export class ApiServices {
    subject: string='postFileTxt';


    constructor(private http: HttpClient) { }

    //Send file to API
    fileProcess(fileProcess: File, id: number): Observable<HttpEvent<any>>{
        const headers = new HttpHeaders()
        .set("Access-Control-Allow-Origin", "*")
        .set("Access-Control-Allow-Methods", "POST");
        const formData = new FormData();
        formData.append('file', fileProcess);
        formData.append('IdDocument', id.toString());
        return this.http.post(environment.urlApi + this.subject, formData, {
            reportProgress: true,
            responseType: 'text',
            headers: headers,
            observe: 'response'
        })
    }
}

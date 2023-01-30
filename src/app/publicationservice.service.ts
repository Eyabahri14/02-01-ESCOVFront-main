import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptionServiceService } from './encryption-service.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationserviceService {
  data: any;
  token: any;
  constructor(private encryptionService: EncryptionServiceService, private http: HttpClient) {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    this.token = this.data["token"];
  }
  public Search(Data: any) {
    return this.http.post(environment.api + '/api/publications/search', Data);
  }

  public Add(Data: any) {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'id': this.token!,

    });
    return this.http.post(environment.api + '/api/publications/', Data, { headers: headers });
  }

  public latest() {
    return this.http.get(environment.api + '/api/publications/latest');
  }
  public getpub(data: any) {
    return this.http.get(environment.api + `/api/publications/${data}`);
  }
  public delete(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'id': this.token!,

    });
    return this.http.delete(environment.api + `/api/publications/${data}`, { headers: headers });
  }
  public update(id: any, data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'id': this.token!,

    });
    return this.http.put(environment.api + `/api/publications/${id}`, data, { headers: headers });
  }


}

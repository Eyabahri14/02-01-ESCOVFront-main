import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptionServiceService } from './encryption-service.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  data: any;
  token: any;
  constructor(private encryptionService: EncryptionServiceService,private http:HttpClient) { }
  public Add(Data : any){
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    this.token = this.data["token"];

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'id':  this.token!,

  });
    console.log("data");
    console.log(Data);

    return this.http.post( environment.api +'/api/newsletter/',Data, { headers: headers });
  }
}

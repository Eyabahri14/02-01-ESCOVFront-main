import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { EncryptionServiceService } from './encryption-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API = 'http://localhost:3000';
  data: any;

  constructor(private encryptionService: EncryptionServiceService, private httpclient: HttpClient) { }

  public postUser(user: any): Observable<any> {
    console.log(user);
    return this.httpclient.post('http://localhost:3000/api/users/postSocialLogin', user);
  }

  getOneUserByEmail(email: any): Observable<any> {
    return this.httpclient.get(`${this.PATH_OF_API}/api/users/getoneuser/${email}`);
  }

  getPublicationById(id: any): Observable<any> {
    return this.httpclient.get(`${this.PATH_OF_API}/api/Publications/${id}`);
  }

  getPublicationSByUserId(id: any): Observable<any> {
    return this.httpclient.get(`${this.PATH_OF_API}/api/Publications/pubU/${id}`);
  }


  getPubByEmail(): Observable<any> {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'id': this.data["token"]!,

    });
    return this.httpclient.get(`${this.PATH_OF_API}/api/users/alleq`, { headers: headers });
  }
  updateUser(data:any): Observable<any> {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    console.log(this.data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json',
      'id': this.data["token"]!,
    });
    return this.httpclient.put(`${this.PATH_OF_API}/api/users/update`,data, { headers: headers });
  }
}

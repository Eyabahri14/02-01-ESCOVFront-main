import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API = 'http://localhost:3000';


  constructor(private httpclient: HttpClient) { }

  public postUser (user:any) : Observable<any> {
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


  getPubByEmail(email:any) : Observable<any>{
    return this.httpclient.get(`${this.PATH_OF_API}/api/users/alleq/${email}`);
  }
}

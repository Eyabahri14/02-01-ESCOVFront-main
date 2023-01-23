import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http:HttpClient) { }
  public Add(Data : any){
    console.log("data");
    console.log(Data);

    return this.http.post( environment.api +'/api/newsletter/',Data);
  }
}

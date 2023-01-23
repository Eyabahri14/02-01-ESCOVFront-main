import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationserviceService {

  constructor(private http:HttpClient) { }
  public Search(Data : any){
    console.log(Data);

    return this.http.post( environment.api +'/api/publications/search',Data);
  }
  public Add(Data : any){
    console.log("data");
    console.log(Data);
    return this.http.post( environment.api +'/api/publications/',Data);
  }

  public latest(){
    return this.http.get( environment.api +'/api/publications/latest');
  }
  public getpub(data:any){
    return this.http.get( environment.api +`/api/publications/${data}`);
  }
  public delete(data:any){
    return this.http.delete( environment.api +`/api/publications/${data}`);
  }
  public update(id:any,data:any){
    return this.http.put( environment.api +`/api/publications/${id}`,data);
  }


}

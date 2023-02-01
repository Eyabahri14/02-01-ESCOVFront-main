import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EncryptionService } from 'encrypt-webstorage';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { EncryptionServiceService } from './encryption-service.service';

@Injectable({
  providedIn: 'root'
})
export class OtpguardGuard implements CanActivate {
  data: any;
  constructor(private encryptionService: EncryptionServiceService,) { };
  validateId(route: any): Boolean {
 
console.log(route["email"]);

    if (route["email"].indexOf("@esprit.tn") != -1) {
      console.log("mijoud");

      return true;
    }
    else return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(localStorage.getItem('data'));
      // slim.ayadi@esprit.tn
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    console.log(this.data["email"]);
    
    if (this.validateId(this.data["email"]) == true) {
      console.log("mrigel");
      return true;

    } else {
      console.log("mouchou mrigel");
      return false;
    }

  }

}

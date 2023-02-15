import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EncryptionService } from 'encrypt-webstorage';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import {EncryptionServiceService} from "./encryption-service.service";

@Injectable({
  providedIn: 'root'
})
export class OtpguardGuard implements CanActivate {
  data:any;
  constructor(private encryptionService: EncryptionServiceService,) { };
  validateId(route: any): Boolean {
    const secret_key = "!!34fffd99kdsdnn@as"
    console.log(route);

    let password = "mysecretkey";
    let decrypted = CryptoJS.AES.decrypt(route, password);
    console.log(decrypted.toString(CryptoJS.enc.Utf8));

    if (decrypted.toString(CryptoJS.enc.Utf8).indexOf("@esprit.tn") != -1) {
      console.log("mijoud");

      return true;
    }
    else return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    if (this.validateId(this.data["email"]) == true) {
      console.log("mrigel");
      return true;

    } else {
      console.log("mouchou mrigel");
      return false;
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../auth.service";
import { EncryptionService } from "encrypt-webstorage";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: any;
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required]),

  })
  constructor(private router: Router, private authService: AuthService, private encryptor: EncryptionService) { }

  ngOnInit(): void {
  }

  Reset() {
    this.authService.reset(this.resetForm.value).subscribe((res: any) => {
      console.log(this.resetForm.value)
      let password = "mysecretkey";
      let encrypted = CryptoJS.AES.encrypt(this.resetForm.value.email!, password);
      console.log(encrypted.toString());
      localStorage.setItem('email', encrypted.toString());

      if (res) {
        Swal.fire(
          'Félicitations!',
          'Un mail vous à été envoyé',
          'success'
        )





        this.router.navigate(['/resetPassword'])

      }

    }, (err) => {

      if (err.status == 401) {
        Swal.fire(
          'erreur!',
          'lutilisateur nexiste pas!',
          'error'
        );
      }

    })

  }

  backFct() {
    this.router.navigate(['/login-register'])
  }


}

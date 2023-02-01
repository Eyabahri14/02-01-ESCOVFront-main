import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../auth.service";
import { EncryptionService } from "encrypt-webstorage";
import * as CryptoJS from 'crypto-js';
import { EncryptionServiceService } from 'src/app/encryption-service.service';

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
  constructor(private router: Router, private authService: AuthService,private encryptionService: EncryptionServiceService) { }

  ngOnInit(): void {
  }

  Reset() {
    this.authService.reset(this.resetForm.value).subscribe((res: any) => {
      console.log(this.resetForm.value)
       
      localStorage.setItem('data', this.encryptionService.encrypt({  email: this.resetForm.value }));

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

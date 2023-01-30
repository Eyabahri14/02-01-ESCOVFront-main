import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email:any;
  resetForm= new FormGroup({
    email : new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@esprit\.tn$/)])
  })
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  Reset(){
    this.authService.reset(this.resetForm.value).subscribe((res: any) => {
      console.log(this.resetForm.value)
      localStorage.setItem('email', this.resetForm.value.email!);

      if(res) {
        Swal.fire(
          'Félicitations!',
          'Un mail vous à été envoyé',
          'success'
        )
        this.router.navigate(['/resetPassword'])

      }

    }, (err) => {
      if (err.status==400) {
        Swal.fire(
          'erreur!',
          'Cet utilisateur existe pas !',
          'error'
        );
      }

    }
    )

  }

  backFct(){
    this.router.navigate(['/login-register'])  }

}

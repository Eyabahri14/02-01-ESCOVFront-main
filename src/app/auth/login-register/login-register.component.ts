import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "../../auth.service";
import { data } from "jquery";
import { EncryptionServiceService } from 'src/app/encryption-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  public userName: any;
  public email1: any;
  public contact: any;
  public id: any;
  data: any;

  userLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@esprit\.tn$/)]),
    password: new FormControl('', [Validators.required])

  })
  userRegister = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+\.[a-zA-Z0-9]+@esprit\.tn$/)]),
    password: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)])

  })



  constructor(private router: Router, private authService: AuthService, private encryptionService: EncryptionServiceService) { }

  ngOnInit(): void {

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
      container?.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove("right-panel-active");
    });
  }

  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }


  login() {
    this.authService.login(this.userLogin.value).subscribe(
      data => {
        if ((data as { [key: string]: any })['token'].length != 0) {
          this.userName = (data as { [key: string]: any })['username'];
          this.email1 = (data as { [key: string]: any })['email'];
          this.contact = (data as { [key: string]: any })['contact'];
          this.id = (data as { [key: string]: any })['idUser'];
          localStorage.setItem('data', this.encryptionService.encrypt({ username: this.userName, email: this.email1, contact: this.contact, token: ((data as { [key: string]: any })['token']) }));
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.log(error.status);


        if (error.status == 401) {
          Swal.fire(
            'Erreur!',
            'cet utilisateur n existe pas ',
            'error'
          )

        }
        else if (error.status == 402) {
          Swal.fire(
            'Erreur!',
            'Votre mot de passe est incorrecte',
            'error'
          )

        }
        else if (error.status == 403) {
          Swal.fire(
            'Erreur!',
            'Veuillez activer votre compte ',
            'error'
          )

        }

      }
    );
  }


  Register() {
    this.authService.register(this.userRegister.value).subscribe((res: any) => {
      Swal.fire(
        'Excellent!',
        'Veuillez verifier votre email afin d activer votre compte !',
        'success'
      );
    }, (err) => {
      if (err.status == 400) {
        Swal.fire(
          'erreur!',
          'Email existant!',
          'error'
        );
      }
      else if (err.status == 402) {
        Swal.fire(
          'erreur!',
          'Veuillez indiquer votre email esprit!',
          'error'
        );
      }
    })

  }

}

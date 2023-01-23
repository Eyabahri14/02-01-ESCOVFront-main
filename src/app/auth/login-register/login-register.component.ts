import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService} from "../../auth.service";
import {data} from "jquery";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
public userName:any;
public email1:any;
public contact:any;
public id:any;
  userLogin= new FormGroup({
    email : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])

  })
  userRegister= new FormGroup({
    username : new FormControl('',[Validators.required,Validators.minLength(7),Validators.maxLength(20)]),
    email : new FormControl('',[Validators.required]),
    password :new FormControl('',[Validators.required]),
    contact : new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(8)])

  })



  constructor(private router: Router, private authService: AuthService) { }

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
    //console.log(this.userLogin.value);


      this.authService.login(this.userLogin.value).subscribe(
        data => {
          if ((data as {[key: string]: any})['token'] .length!=0){
            this.userName=(data as {[key: string]: any})['username'];
            this.email1=(data as {[key: string]: any})['email'];
            this.contact=(data as {[key: string]: any})['contact'];
            this.id=(data as {[key: string]: any})['idUser'];

            localStorage.setItem('username', this.userName);
            localStorage.setItem('token', ((data as {[key: string]: any})['token']));
            localStorage.setItem('email', this.email1);
            localStorage.setItem('contact', this.contact);
            localStorage.setItem('idUser', this.id);

            // console.log(((data as {[key: string]: any})['token']));
            console.log(data);

            this.router.navigate(['/home']);
          }

        },

        error => {
        }
      );


  }


  Register(){
    this.authService.register(this.userRegister.value).subscribe((res: any) => {
      alert('user added ');

    }, (err) => {
      console.log(err);

    })

  }

}

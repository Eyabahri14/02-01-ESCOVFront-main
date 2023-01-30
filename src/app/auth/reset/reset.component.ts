import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { EncryptionService } from 'encrypt-webstorage';
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }

  resetForm = new FormGroup({
    email: new FormControl(''),
    otp: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', matchValidator('password')
    )

  });
  otp = new FormGroup({
    otp1: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    otp2: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    otp3: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    otp4: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),

  })
  taa: string = "";
  otpverified: boolean = false;
  email: string = "";
  constructor(private router: Router, private authService: AuthService, private activtedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email')!;
   

  }

 
  otpfct() {
    this.taa = this.otp.value.otp1! + this.otp.value.otp2! + this.otp.value.otp3! + this.otp.value.otp4!;
    this.resetForm.controls.otp.setValue(this.taa);
    this.resetForm.controls.email.setValue(this.email); // to make it dynamic

    this.authService.otp(this.resetForm.value).subscribe((res: any) => {
      console.log(res);

      if (res.status == 201) {
        this.otpverified = true;
      }

    }, (err) => {
      console.log(err);
    })
  }
  ResetPassword() {

    this.resetForm.controls.email.setValue(this.email); // to make it dynamic

    this.authService.resetpassworddone(this.resetForm.value).subscribe((res: any) => {
      console.log(res);

      this.router.navigate(['/login-register'])

    }, (err) => {
      console.log(err);
    })
  }
  redirect() {
    this.router.navigate(['/reset'])

  }

}
export function matchValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl):
    ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo]
      AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value ===
      (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}

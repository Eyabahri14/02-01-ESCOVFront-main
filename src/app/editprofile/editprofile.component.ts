import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EncryptionServiceService } from '../encryption-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  public data: any;
  public token: any;
  constructor(private encryptionService: EncryptionServiceService, private route: ActivatedRoute, private router: Router, private api: UserService) { }
  add = new FormGroup({
    username: new FormControl('', Validators.required),
    contact: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),

  })
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
    this.token = this.data["token"];
  }
  addData() {
    if (this.token) {
      
      this.api.updateUser(this.add.value).subscribe(res => {
        if (res) {
          Swal.fire(
            'Excellent',
            'Vous avez bien modifié votre profile',
            'success'
          ),
            this.router.navigate(['/profile']);

        }
        else {
          this.add.setErrors({ ...this.add.errors, 'yourErrorName': true });
          return;
        }
     
      }
      
      
      );
    }
  }
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }
}

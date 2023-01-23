import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PublicationserviceService } from '../publicationservice.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-edit-cov',
  templateUrl: './edit-cov.component.html',
  styleUrls: ['./edit-cov.component.css']
})
export class EditCovComponent implements OnInit {

  step = 0;
  date2: any;
  disabled: any = false;
  disabled_texte: any = "";
  selectedItems: string[] = [];
  selectedItems2: string[] = [];
  public userId: any;
  public email: any;
  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    itemsShowLimit: 3,
    enableCheckAll: false,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  dropdownList = [
    { item_id: 1, item_text: 'esprit' },
    { item_id: 2, item_text: 'nasser' },
    { item_id: 3, item_text: 'aouina' },
    { item_id: 4, item_text: 'sokra' },
    { item_id: 5, item_text: 'jdm2' },
    { item_id: 6, item_text: 'ghazela' },
    { item_id: 7, item_text: 'ariena' },
  ];
  from: string = "";
  to: string = "";
  add = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),

    },
  )
  add2 = new FormGroup({

      from: new FormControl(this.from, Validators.required,),
      to: new FormControl(this.to, Validators.required,),

    },
  )
  add3 = new FormGroup({
      date: new FormControl('', [Validators.required]),
      nbplace: new FormControl('', [Validators.required, Validators.min(0), Validators.max(7)]),
      price: new FormControl('', Validators.required),
      description: new FormControl(''),
    },
  )
  id: any;
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router, private api: PublicationserviceService) { }
  date: any;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.params['id'];

    this.getOldData();

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);




    this.userId = localStorage.getItem('idUser');
    this.email = localStorage.getItem('email');
    this.date = new Date().toISOString().slice(0, 16);
  }

  getOldData() {
    this.api.getpub(this.id).subscribe((res: any) => {
      console.log("aaaa");

      console.log(res);
      this.add.setValue({
        name: "aaa",
        number: "95590010",

      });
      this.add2.setValue({
        from: res.from,
        to: res.to,

      });
      this.add3.setValue({
        date: res.date,
        nbplace: "29",
        price: res.prix,
        description: res.description,

      });
      this.selectedItems.push(res.from)
      this.selectedItems2.push(res.to)
      console.log(res.from);
      this.disabled = res.disable;
      if (this.disabled == true) {
        this.disabled_texte = "afficher la publication";
      }
      else {
        this.disabled_texte = "cacher la publication";
      }
    })
  }

  goBack() {
    if (this.step != 0) {
      this.step--;
    }
  }

  addData() {

    if (this.step != 2) {
      this.step++;

    } else {
      if (Array.isArray(this.add2.value.from)) {
        this.add2.value.from?.forEach((element, index) => {
          this.from = (element['item_text']);

        });
      }

      // console.log(this.from);
      if (Array.isArray(this.add2.value.to)) {
        this.add2.value.to?.forEach((element, index) => {
          this.to = (element['item_text']);

        });
      }
      let firstdate = this.add3.value.date?.substring(0, this.add3.value.date.indexOf("T"));
      let seconddate = this.add3.value.date?.substring(this.add3.value.date.indexOf("T") + 1, this.add3.value.date.length);

      this.api.update(this.id, { "from": this.from, "to": this.to, "prix": this.add3.value.price, "description": this.add3.value.description, "heure": seconddate, "date": firstdate, "user": { "_id": this.userId }, "email": this.email }).subscribe((res: any) => {
          console.log("res");
          console.log(res);
          if (res.status = 200) {
            Swal.fire(
              'Excellent!',
              'Vous avez bien modifié votre covoiturage!',
              'success'
            ),
              this.router.navigate(['/home']);

          }


        },
        err => {
          Swal.fire(
            'Vous avez dépassé la limite !',
            err["error"]["message"],
            'error'
          ),
            console.log(err["error"]["message"]);

        })





    }
  }
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }

  dateValidator(event: any) {

    if (event.target.value) {
      const date = moment(event.target.value);
      const today = moment();
      console.log(date);

      if (date.isBefore(today)) {
        console.log("hhhh");
        this.add3.controls["date"].setErrors({ ...this.add3.controls["date"].errors, 'invalidDate': true });

      }
      else {
        this.add3.controls["date"].setErrors({ ...this.add3.controls["date"].errors, 'invalidDate': false });
        this.add3.controls["date"].setErrors(null);

      }

    }
    return { 'invalidDate': true }
  }

  delete() {
    Swal.fire({
      title: "Confirmer la suppression",
      text: "Etes vous sur de vouloir supprimer la publication?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete(this.id).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Supprimé!',
            'Your file has been deleted.',
            'success'
          )
          this.router.navigate(['/home']);

        });

      }
    })
  }
  disable() {
    Swal.fire({
      title: "Confirmation",
      text: "Etes vous sur de vouloir cacher la publication?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.update(this.id, { 'disable': true }).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Cache!',
            'La publication a été caché avec succés',
            'success'
          )
          this.router.navigate(['/home']);

        });

      }
    })
  }







}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { NewsletterService } from '../newsletter.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public userId: any;
  constructor(private route: ActivatedRoute, private router: Router, private api: NewsletterService) { }
  add = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),

  })
  selectedItems = [{ item_id: Number, item_text: String }];
  from: string[] = [];
  to: string[] = [];
  dropdownList = [
    { item_id: 1, item_text: 'esprit' },
    { item_id: 2, item_text: 'nasser' },
    { item_id: 3, item_text: 'aouina' },
    { item_id: 4, item_text: 'sokra' },
    { item_id: 5, item_text: 'jdm2' },
    { item_id: 6, item_text: 'ghazela' },
    { item_id: 7, item_text: 'ariena' },
  ];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    itemsShowLimit: 3,
    enableCheckAll: false,
    allowSearchFilter: true

  };
  ngOnInit() {
    window.scrollTo(0, 0);

    this.userId = localStorage.getItem('idUser');
  }
  onItemSelect(item: any) {
    this.selectedItems.push(item);
    console.log(this.selectedItems);
  }
  onDeSelect(item: any) {

    this.selectedItems.forEach((element, index) => {
      if (element['item_id'] == item.item_id) this.selectedItems.splice(index, 1);
    });
    console.log(this.selectedItems);

  }

  addData() {

    if (Array.isArray(this.add.value.from)) {
      this.add.value.from?.forEach((element, index) => {
        this.from.push(element['item_text']);

      });
    }

    console.log(this.from);
    if (Array.isArray(this.add.value.to)) {
      this.add.value.to?.forEach((element, index) => {
        this.to.push(element['item_text']);

      });
    }

    console.log(this.to);
    if (this.add.valid) {

      this.api.Add({ "from": this.from, "to": this.to, "user": { "_id": this.userId }, "date": this.add.value.date }).subscribe((res: any) => {

        if (res) {
          Swal.fire(
            'Excellent',
            'Nous allons vous envoyer un email des qqn publie un covoiturage',
            'success'
          ),
            this.router.navigate(['/home']);

        }
      })
    } else {
      this.add.setErrors({ ...this.add.errors, 'yourErrorName': true });
      return;
    }
  }

}

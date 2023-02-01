import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { EncryptionServiceService } from '../encryption-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public username: any;
  public deconnexion: any;
  public test: any = false;

  public photoUrl: any;

  public name: any;
  public data: any;

  public showInitials = false;
  public initials: any;
  public circleColor: any;

  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2',
    '#7E811B',
    '#3F3156',
    '#543156',
    '#822552',
    '#822535',
    '#BC7771',
    '#B6BC71',
    '#9BF78E',
    '#D9F78E',
    '#F2F78E',
    '#F7C38E',
    '#F7AB8E',
    '#8EF7F1',
    '#62B2AE',
    '#8662B2',
    '#DAC9F0',
    '#91F14E',
    '#5800CA',
    '#4E87F1',
    '#BAC7E0',
    '#FFAFB3',
    '#FFAFEC',
    '#D813A9',
    '#D813A9',
  ];

  constructor(private router: Router, private encryptionService: EncryptionServiceService, private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('data') != null) {
      this.data = this.encryptionService.decrypt(localStorage.getItem('data')!);
      this.username = this.data["username"];
      this.name = this.username;

      if (this.username) {
        this.deconnexion = true
        if (!this.photoUrl) {
          this.showInitials = true;
          this.createInititals();

          // const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
          if (this.initials[0] == "A")
            this.circleColor = this.colors[0];
          else if (this.initials[0] == "B")
            this.circleColor = this.colors[1];
          else if (this.initials[0] == "C")
            this.circleColor = this.colors[2];
          else if (this.initials[0] == "D")
            this.circleColor = this.colors[3];
          else if (this.initials[0] == "E")
            this.circleColor = this.colors[4];
          else if (this.initials[0] == "F")
            this.circleColor = this.colors[5];
          else if (this.initials[0] == "G")
            this.circleColor = this.colors[6];
          else if (this.initials[0] == "H")
            this.circleColor = this.colors[7];
          else if (this.initials[0] == "I")
            this.circleColor = this.colors[8];
          else if (this.initials[0] == "J")
            this.circleColor = this.colors[9];
          else if (this.initials[0] == "K")
            this.circleColor = this.colors[10];
          else if (this.initials[0] == "L")
            this.circleColor = this.colors[11];
          else if (this.initials[0] == "M")
            this.circleColor = this.colors[12];
          else if (this.initials[0] == "N")
            this.circleColor = this.colors[13];
          else if (this.initials[0] == "O")
            this.circleColor = this.colors[14];
          else if (this.initials[0] == "P")
            this.circleColor = this.colors[15];
          else if (this.initials[0] == "Q")
            this.circleColor = this.colors[16];
          else if (this.initials[0] == "R")
            this.circleColor = this.colors[17];
          else if (this.initials[0] == "S")
            this.circleColor = this.colors[18];
          else if (this.initials[0] == "T")
            this.circleColor = this.colors[19];
          else if (this.initials[0] == "U")
            this.circleColor = this.colors[20];
          else if (this.initials[0] == "V")
            this.circleColor = this.colors[21];
          else if (this.initials[0] == "W")
            this.circleColor = this.colors[22];
          else if (this.initials[0] == "X")
            this.circleColor = this.colors[23];
          else if (this.initials[0] == "Y")
            this.circleColor = this.colors[24];
          else if (this.initials[0] == "Z")
            this.circleColor = this.colors[25];
          else {
            this.circleColor = this.colors[26];

          }
        }
      }
      else {
        this.deconnexion = false;
      }
    }

    $('.toggle').click(function () {
      "use strict";
      $('nav ul').slideToggle();
    });



  }


  private createInititals(): void {
    let initials = "";
    this.name = this.name.toUpperCase();
    for (let i = 0; i < this.name.length; i++) {
      if (this.name.charAt(i) === ' ') {
        continue;
      }

      if (this.name.charAt(i) === this.name.charAt(i).toUpperCase()) {
        initials += this.name.charAt(i);

        if (initials.length == 1) {
          break;
        }
      }
    }
    console.log(initials);


    this.initials = initials;
  }
  logoutUser() {
    localStorage.removeItem('data');
    this.deconnexion = false;
    this.router.navigate(['/home'])
  }

}

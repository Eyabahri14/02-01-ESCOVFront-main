import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'escov';

  constructor(private userService:UserService,private router:Router) {


  }
  ngOnInit(): void {

  }



}

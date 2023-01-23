import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationserviceService } from '../publicationservice.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {NgxSpinnerService} from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../about/about.component';
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
// @ts-ignore
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-displaycov',
  templateUrl: './displaycov.component.html',
  styleUrls: ['./displaycov.component.scss']
})
export class DisplaycovComponent implements OnInit {

  keyword = 'name';
  p: number = 1;
  private angular: any;
  color = ["red", "green", "orange", "purple"];
  from: string = " ";
  to: string = " ";
  frominitialvalue: string = " ";
  toinitialvalue: string = " ";
  ff: string = " ";
  tt: string = " ";
  date: string = " ";
  isloading: boolean = false;
  nodata: boolean = false;
  // username: string = " ";
  Cov: any = [];
  add = new FormGroup({
    date: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
  })
  selectedItems: string[] = [];
  selectedItems2: string[] = [];
  // selectedItems = [{ item_id: Number, item_text: String }] as const;;
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
    { item_id: 7, item_text: 'sfax' },
    { item_id: 7, item_text: 'sousse' },
    { item_id: 7, item_text: 'monastir' },
    { item_id: 7, item_text: 'ariena' },
  ];

  constructor(private route: ActivatedRoute, private router: Router, private api: PublicationserviceService,private spinner:NgxSpinnerService, public dialog: MatDialog,public breakpointObserver: BreakpointObserver) { }
  widthT:any;
  heighT:any;

  ngOnInit(): void {

    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }


    window.addEventListener("scroll", reveal);
    const target = document.querySelector('.tw')
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: '#7fc6a6'

    })

    writer
      .type('BIENVENUE A ESCOV ')
      .rest(500)
      .changeOps({ deleteSpeed: 80 })
      .remove(20)
      .type('WELCOME TO ESCOV')
      .rest(500)
      .remove(16)
      .clear()
      .start()

    this.breakpointObserver
      .observe(['(max-width: 400px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.widthT='600px'
          this.heighT='400px'
        } else {
          this.widthT='900px'
          this.heighT='650px'
        }
      });


    window.scrollTo(0,0);
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);


    this.frominitialvalue = this.route.snapshot.params['from'];
    this.toinitialvalue = this.route.snapshot.params['to'];

    this.from = this.route.snapshot.params['from'];
    this.to = this.route.snapshot.params['to'];
    this.selectedItems.push(this.from)
    this.selectedItems2.push(this.to)
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    // this.add.value.from = this.route.snapshot.params['from'];
    // this.add.value.to = this.route.snapshot.params['to'];

    this.ff = this.route.snapshot.params['from'];
    this.tt = this.route.snapshot.params['to'];

    this.date = this.route.snapshot.params['date'];
    this.loaddata();

    console.log(this.date);
    $(document).ready(function () {
      var animating = false;
      var step1 = 500;
      var step2 = 500;
      var step3 = 500;
      var reqStep1 = 600;
      var reqStep2 = 800;
      var reqClosingStep1 = 500;
      var reqClosingStep2 = 500;
      var $scrollCont = $(".phone__scroll-cont");

      function initMap($card: JQuery.PlainObject<any> | undefined) {
        // my first experience with google maps api, so I have no idea what I'm doing
        var latLngFrom = { lat: 40.7878581, lng: -73.9671309 };
        var latLngTo = { lat: 40.746433, lng: -73.9503613 };
        var latLngCenter = {
          lat: (latLngFrom.lat + latLngTo.lat) / 2,
          lng: (latLngFrom.lng + latLngTo.lng) / 2
        };
        // @ts-ignore
        var themeColor = $card.data("color");

        var map = new google.maps.Map($(".card__map__inner", $card)[0], {
          zoom: 12,
          center: latLngCenter,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        });

        map.set("styles", [
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ hue: "#00ffdd" }, { gamma: 1 }, { lightness: 100 }]
          },
          {
            featureType: "road",
            stylers: [{ lightness: 60 }, { hue: "#006eff" }]
          }
        ]);

        // @ts-ignore
        var pinImage = new google.maps.MarkerImage(
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" +
          themeColor.slice(1),
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34)
        );

        var marker = new google.maps.Marker({
          position: latLngFrom,
          map: map,
          title: "From",
          icon: pinImage
        });

        var marker = new google.maps.Marker({
          position: latLngTo,
          map: map,
          title: "To",
          icon: pinImage
        });

        var polylineOpts = new google.maps.Polyline({
          strokeColor: themeColor,
          strokeWeight: 3
        });
        var rendererOptions = {
          map: map,
          polylineOptions: polylineOpts,
          suppressMarkers: true
        };
        // @ts-ignore
        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);


        var request = {
          origin: latLngFrom,
          destination: latLngTo,
          // @ts-ignore
          // @ts-ignore
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            console.log("wtf");
          }
        });
      }

      initMap($(".card"));

      $(document).on("click", ".card:not(.active)", function () {
        if (animating) return;
        animating = true;

        var $card = $(this);
        var cardTop = $card.position().top;
        var scrollTopVal = cardTop - 30;
        $card.addClass("flip-step1 active");

        $scrollCont.animate({ scrollTop: scrollTopVal }, step1);

        setTimeout(function () {
          $scrollCont.animate({ scrollTop: scrollTopVal }, step2);
          $card.addClass("flip-step2");

          setTimeout(function () {
            $scrollCont.animate({ scrollTop: scrollTopVal }, step3);
            $card.addClass("flip-step3");

            setTimeout(function () {
              animating = false;
            }, step3);
          }, step2 * 0.5);
        }, step1 * 0.65);
      });

      $(document).on(
        "click",
        ".card:not(.req-active1) .card__header__close-btn",
        function () {
          if (animating) return;
          animating = true;

          var $card = $(this).parents(".card");
          $card.removeClass("flip-step3 active");

          setTimeout(function () {
            $card.removeClass("flip-step2");

            setTimeout(function () {
              $card.removeClass("flip-step1");

              setTimeout(function () {
                animating = false;
              }, step1);
            }, step2 * 0.65);
          }, step3 / 2);
        }
      );

      $(document).on(
        "click",
        ".card:not(.req-active1) .card__request-btn",
        function (e) {
          if (animating) return;
          animating = true;

          var $card = $(this).parents(".card");
          var cardTop = $card.position().top;
          var scrollTopVal = cardTop - 30;

          $card.addClass("req-active1 map-active");

          initMap($card);

          setTimeout(function () {
            $card.addClass("req-active2");
            $scrollCont.animate({ scrollTop: scrollTopVal }, reqStep2);

            setTimeout(function () {
              animating = false;
            }, reqStep2);
          }, reqStep1);
        }
      );

      $(document).on(
        "click",
        ".card.req-active1 .card__header__close-btn, .card.req-active1 .card__request-btn",
        function () {
          if (animating) return;
          animating = true;

          var $card = $(this).parents(".card");

          $card.addClass("req-closing1");

          setTimeout(function () {
            $card.addClass("req-closing2");

            setTimeout(function () {
              $card.addClass("no-transition hidden-hack");
              $card.css("top");
              $card.removeClass(
                "req-closing2 req-closing1 req-active2 req-active1 map-active flip-step3 flip-step2 flip-step1 active"
              );
              $card.css("top");
              $card.removeClass("no-transition hidden-hack");
              animating = false;
            }, reqClosingStep2);
          }, reqClosingStep1);
        }
      );
    });

    // angular used only for templating, I was too tired to find more lightweight solution


    var app = this.angular.module("delivcard", []);
    app.controller("DelivCtrl", [
      "$scope",
      function ($scope: { cards: { id: string; price: number; requests: number; pledge: number; weight: number; sender: string; senderImg: string; themeColor: string; themeColorHex: string; bgImgUrl: string; rating: number; ratingCount: number; fromStreet: string; fromCity: string; toStreet: string; toCity: string; delivTime: string; delivDate: string; delivDateNoun: string; reqDl: string; }[]; }) {
      }
    ]);


  }
  loaddata() {
    if (Array.isArray(this.add.value.from)) {
      this.add.value.from?.forEach((element, index) => {
        this.from = (element['item_text']);

      });
    }

    // console.log(this.from);
    if (Array.isArray(this.add.value.to)) {
      this.add.value.to?.forEach((element, index) => {
        this.to = (element['item_text']);

      });
    }
    console.log(this.from);
    console.log(this.to);
    //  console.log(this.add.value.date);
    this.api.Search({ "from": this.from, "to": this.to, "date": this.date }).subscribe((res: any) => {
      console.log(res);
      this.isloading = true;
      this.Cov = res
      this.nodata = false;

      if (this.Cov.length == 0) {
        this.nodata = true;
      }
      console.log(this.Cov.length);

    })
  }
  selectEvent(item: any) {
    // do something with selected item

    if (item.name == undefined) {
      this.from = this.frominitialvalue;
    }
    else {
      this.from = item.name;

    }

  }
  selectEvent2(item: any) {
    // do something with selected item

    if (item.name == undefined) {
      this.to = this.toinitialvalue;
    }
    else {
      this.to = item.name;

    }


  }
  SearchData() {
    this.loaddata();
  }

  open() {
    let dialogRef = this.dialog.open(AboutComponent,
      {
        height: this.heighT,
        width: this.widthT,
        autoFocus: false
      });
  }
}

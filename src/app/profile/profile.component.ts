import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "./User";
import { Publication } from "./Publication";
import { PublicationserviceService } from '../publicationservice.service';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: any;
  p: number = 1;


  public user = new User();
  public publication: any[] = [];
  public color = ['red', 'purple', 'green'];
  public className: String = "";
  card: any;
  random: any;
  public items: any;
  private angular: any;
  public userName: any;
  public email: any;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private publicationService: PublicationserviceService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
    this.id = this.route.snapshot.params['id'];

    this.userName = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.GetPubByEmail()




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



  GetPubByEmail() {
    this.userService.getPubByEmail(this.email).subscribe(res => {

      // this.user=res["user"]
      //  console.log(this.user.username);
      // console.log('liddddd')
      //  console.log(this.user._id)
      // console.log(this.user.publication[0])
      // this.userService.getPublicationSByUserId(this.user._id).subscribe(res1=> {
      this.publication = res[0]["publication"];
      // console.log("publicationsss")
      console.log(this.publication)

      //  })
    }
    )
  }
  delete(id: any) {
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
        this.publicationService.delete(id).subscribe(res => {


          console.log(res)
          Swal.fire(
            'Supprimé!',
            'Your file has been deleted.',
            'success'
          )
          this.GetPubByEmail();
        });

      }
    })



  }

}


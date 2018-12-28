///<reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule , FormsModule,FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Observable, of } from 'rxjs'

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule} from '@angular/material/autocomplete';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-venue-tab',
  templateUrl: './venue-tab.component.html',
  styleUrls: ['./venue-tab.component.scss']
})
export class VenueTabComponent implements OnInit {

	HighlightEvent: object;
	VenueDetail: object;
	name: string;
	address: string;
	city: string;
	state: string;
	phone: string;
	hour: string;
	generalrule: string;
	childrule: string;
	latitude: number;
	logitude: number;
	venueshow: boolean= false;

	row_address : boolean = false;
	row_city : boolean = false;
	row_phone : boolean = false;
	row_hour : boolean = false;
	row_general : boolean = false;
	row_child : boolean = false;
	row_map : boolean = false;

	//error control message and pgbar
  pgbar: boolean = false;
  HaveData: boolean = false;
  EmptyData: boolean = false;
  GotERR: boolean = false

  GetVenueDetail(){

  	this.pgbar = true
    this.HaveData = false
    this.EmptyData = false
    this.GotERR = false

  	  	let venuename = encodeURI(this.HighlightEvent._embedded.venues[0].name)
  	  	this.dataSeivice.VenueDetailCallServer(venuename).subscribe(
  	      (data) => {
  	      	this.pgbar = false;
  	      	//console.log(data._embedded.venues[0])
  	      	if (data != undefined){
  	      	this.VenueDetail = data._embedded.venues;
            this.SetTableValue();
          } else{
          	this.EmptyData = true
          }
      }),
          (error) => {
            console.log("error")
            this.pgbar = false;
            this.GotERR = true;
            console.log(JSON.stringify(error))
          }
    }

	SetTableValue(){

		if (this.VenueDetail != undefined){

			this.name = this.VenueDetail[0].name  ;
			this.HaveData = true;

			try{this.address = this.VenueDetail[0].address.line1 ;
				this.row_address = true;
			}catch(err){
				this.row_address = false;}

			try{this.city = this.VenueDetail[0].city.name ;
				this.state = this.VenueDetail[0].state.name ;
				this.row_city = true;
			}catch(err){
				this.row_city = false;}

			try{this.phone = this.VenueDetail[0].boxOfficeInfo.phoneNumberDetail ;
				this.row_phone = true;
			}catch(err){
				this.row_phone = false;}

			try{this.hour = this.VenueDetail[0].boxOfficeInfo.openHoursDetail  ;
				this.row_hour = true;
				console.log(this.hour)
			}catch(err){
				this.row_hour = false;}

			try{this.generalrule = this.VenueDetail[0].generalInfo.generalRule ;
				this.row_general = true;
			}catch(err){
				this.row_general = false;}

			try{this.childrule = this.VenueDetail[0].generalInfo.childRule ;
				this.row_child = true;
			}catch(err){
				this.row_child = false;}

			try{

			this.latitude = this.VenueDetail[0].location.latitude;
			this.logitude = this.VenueDetail[0].location.longitude; 
				this.InitMap();}catch(err){}
			

			this.venueshow = true ;}
	}

	@ViewChild('map') venuemap: any;
	InitMap(){
		console.log("mapppppppppppppppp")
		let map = new google.maps.Map(
			this.venuemap.nativeElement, {center: new google.maps.LatLng(this.latitude, this.logitude), zoom:15});
		let marker = new google.maps.Marker({position: new google.maps.LatLng(this.latitude, this.logitude), map: map});

	}

  constructor(private dataSeivice: DataServiceService) { }

  ngOnInit() {

  	this.dataSeivice.HighEventmessage.pipe(map(
      (res)=> res )).subscribe( (res) => {
      this.HighlightEvent = res;
      if (this.HighlightEvent != undefined){
        this.GetVenueDetail();
      }}
      )


  }

}

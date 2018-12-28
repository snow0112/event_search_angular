import { Component, OnInit} from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule , FormsModule,FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Observable, of } from 'rxjs'

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Ng2OrderModule } from 'ng2-order-pipe';
import { trigger, state, style, animate, transition, keyframes } from "@angular/animations"

const sortBy = require('sort-array');
var arraySort = require('array-sort');

@Component({
  selector: 'app-upcoming-tab',
  templateUrl: './upcoming-tab.component.html',
  styleUrls: ['./upcoming-tab.component.scss'],
  animations: [trigger("morecards",[
  	state("hide",style({opacity:0,transform:"scale(1,0)",height:0})),
  	state("show",style({opacity:1,transform:"scale(1,1)",height:1})),
  	transition("show => hide",animate('2000ms')),
  	transition("hide => show",animate('2000ms')),
  	])] //animation
})
export class UpcomingTabComponent implements OnInit {

	HighlightEvent: object;
  ArtistList : Array<object>;
  UpComingEvents: object;
	Showmore: boolean = false;
	sortForm: FormGroup;
	sortby: string = 'Default'
	reverse: boolean = false;

  //error control message and pgbar
  pgbar: boolean = false;
  HaveData: boolean = false;
  EmptyData: boolean = false;
  GotERR: boolean = false;

  GetUpComingEvent(){
    this.pgbar = true
    this.HaveData = false
    this.EmptyData = false
    this.GotERR = false

      let venuename = encodeURI(this.HighlightEvent._embedded.venues[0].name)
      this.dataSeivice.VenueIDCallServer(venuename).subscribe(
          (data) => {
            if (data != undefined){
              console.log(data);
              let venueID = data[0].id;
              this.UpComingEventsAPI(venueID);
              } else{
                this.pgbar = false;
                this.GotERR = true
              }    
            },
          (error) => {
            console.log("error")
            this.pgbar = false;
            this.GotERR = true;
            console.log(JSON.stringify(error))
          })
    }

    UpComingEventsAPI(venueID){
        this.dataSeivice.UpcomingCallServer(venueID).subscribe(
          (data) => {
            if (data != undefined){
              this.UpComingEvents = data;
              this.pgbar = false;
              this.HaveData = true;
              this.dataSeivice.changeupcoming(this.UpComingEvents);
              console.log(data);
              } else{
                this.pgbar = false;
                this.EmptyData = true;
              }    
            },
          (error) => {
            console.log("error")
            this.pgbar = false;
            this.GotERR = true;
            console.log(JSON.stringify(error))
          })
    }
	
	//animations

	statename: string = 'hide';
	showmore(){
		this.Showmore = true;
		this.statename = "show";}
	showless(){
		this.Showmore = false;
		this.statename = "hide";}


	// sort
	orderchange(){
		if(this.sortby == "Time"){
			this.UpComingEvents = arraySort(this.UpComingEvents,['start.date','start.time'],{reverse:this.reverse});
		}
		if(this.sortby == "EventName"){
			this.UpComingEvents == arraySort(this.UpComingEvents,'displayName',{reverse:this.reverse});
		}
		if(this.sortby == "Type"){
			this.UpComingEvents == arraySort(this.UpComingEvents,'type',{reverse:this.reverse});
		}
		if(this.sortby == "Artist"){
			this.UpComingEvents == arraySort(this.UpComingEvents, function(a,b){
				return a.performance[0].displayName.localeCompare(b.performance[0].displayName)}
				,{reverse:this.reverse} );
		}
	}

  constructor(private dataSeivice: DataServiceService,private Formbuild : FormBuilder) { }

  ngOnInit() {
  	this.dataSeivice.HighEventmessage.pipe(map(
      (res)=> res )).subscribe( (res) => {
      this.HighlightEvent = res;
      if (this.HighlightEvent != undefined){
        this.GetUpComingEvent();
        this.ArtistList = this.HighlightEvent._embedded.attractions;
        
      }}
      )

  	  	this.sortForm = this.Formbuild.group({
  		sortby: ['Default'],
  		ascend: ['Ascending'],
  		})

  		this.sortForm.get('sortby').valueChanges.subscribe(
  			(data) => {
  				this.sortby = data
  				if (data != 'Default' ){
  					document.getElementById("ascend").disabled = false;}
  					else{
  						document.getElementById("ascend").value = "Ascending";
  						document.getElementById("ascend").disabled = true;
              this.dataSeivice.currentupcoming.pipe(map( (res)=> res )).subscribe( (res) => { this.UpComingEvents = res;} )
          }	
  				this.orderchange();
  		})

  		this.sortForm.get('ascend').valueChanges.subscribe(
  			(data) => {
  				if (data == 'Ascending' ){this.reverse = false;
  				} else{ this.reverse = true; }
  				this.orderchange();
  				
  		})
  }

}

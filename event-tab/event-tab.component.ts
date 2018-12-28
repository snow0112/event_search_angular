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
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.scss']
})
export class EventTabComponent implements OnInit {

	EventDetail: object;
  HighlightEvent: object;

  attractions: Array<object> [];
  venue : string;
  date: string;
  time: string;
  genre: string;
  segment: string;
  Price: object;
  status: string;
  buyurl: string;
  seatmap: string;
	getevent: boolean= false ;

  row_artist: boolean= false;
  row_venue: boolean= false;
  row_time: boolean= false;
  row_category: boolean= false;
  row_price: boolean= false;
  row_status: boolean= false;
  row_buy: boolean= false;
  row_seat: boolean= false;

  //error control message and pgbar
  pgbar: boolean = false;
  HaveData: boolean = false;
  EmptyData: boolean = false;
  GotERR: boolean = false

  SetTableValue(){

    this.HaveData = false;
    this.EmptyData = true;

    console.log("set table value in event tab")
    if(this.EventDetail != undefined){

    try{
      this.attractions = this.EventDetail._embedded.attractions;
      this.row_artist = true;
      this.HaveData = true;
      this.EmptyData = false;
    }catch(err){
      this.row_artist = false;}

    try{
      this.venue = this.EventDetail._embedded.venues[0].name;
      this.row_venue = true;
      this.HaveData = true;
      this.EmptyData = false;
    }catch(err){
      this.row_venue = false;}

    try{
      this.date = this.EventDetail.dates.start.localDate;
      this.time = this.EventDetail.dates.start.localTime;
      this.row_time = true;
      this.HaveData = true;
      this.EmptyData = false;
    }catch(err){
      this.row_time = false;}

    try{
      this.genre = this.EventDetail.classifications[0].genre.name;
      this.segment = this.EventDetail.classifications[0].segment.name;
      this.row_category = true;
      this.HaveData = true;
      this.EmptyData = false;
    }catch(err){
      this.row_category = false;}

    try{
      this.Price = this.EventDetail.priceRanges[0];
      this.row_price = true;
      this.HaveData = true;
      this.EmptyData = false;
    }catch(err){
      this.row_price = false;}

    try{
      this.status = this.EventDetail.dates.status.code;
      this.row_status = true;
      this.HaveData = true;
      this.EmptyData = false;
    }catch(err){
      this.row_status = false;}

    try{
      this.buyurl = this.EventDetail.url;
      this.row_buy = true;
      this.HaveData = true;
      this.EmptyData = false;
    }catch(err){
      this.row_buy = false;}

    try{
      this.seatmap = this.EventDetail.seatmap.staticUrl;
      this.row_seat = true;
      this.HaveData = true;
      this.EmptyData = false;
    }catch(err){
      this.row_seat = true;}

    }else{}
    
  }

  GetEvevteDetail(){
    this.pgbar = true
    this.HaveData = false
    this.EmptyData = false
    this.GotERR = false
    this.dataSeivice.changedetailpage("disabledetail")

    console.log(this.HighlightEvent.id)
      this.dataSeivice.EventDetailCallServer(this.HighlightEvent.id).subscribe(
          (data) => {
            this.pgbar = false;
            console.log(data);
            this.EventDetail = data;
            this.SetTableValue();
            this.dataSeivice.changeevent(this.EventDetail);
            this.dataSeivice.changedetailpage("enabledetail")
          }),
          (error) => {
            console.log("error")
            this.pgbar = false;
            this.GotERR = true;
            console.log(JSON.stringify(error))
          }
    }

  constructor(private dataSeivice: DataServiceService) { }

  ngOnInit() {

    this.dataSeivice.HighEventmessage.pipe(map(
      (res)=> res )).subscribe( (res) => {
      this.HighlightEvent = res;
      if (this.HighlightEvent != undefined){
        this.GetEvevteDetail();
      }}
      )

  	/*this.dataSeivice.currentevent.pipe(map(
          (res)=> res )).subscribe( (res) => {
      this.EventDetail = res;
      this.SetTableValue();
  		console.log(this.EventDetail);
  	} )*/
  }

}

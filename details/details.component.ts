import { Component, OnInit, Input } from '@angular/core';
import { FirstformComponent } from '../firstform/firstform.component';
import { BehaviorSubject } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { EventTabComponent } from '../event-tab/event-tab.component';
import { ArtistTabComponent } from '../artist-tab/artist-tab.component';
import { VenueTabComponent } from '../venue-tab/venue-tab.component';
import { UpcomingTabComponent } from '../upcoming-tab/upcoming-tab.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  HighlightEvent: object;
	EventDetail: object;
	ArtistPhoto: object;
	ArtistMusic: object;
  ArtistList : Array<object>;
	VenueDetail: object;
	UpComingEvents: object;
  
  Title : string;
  HaveDetail: boolean= false;



  constructor(private dataSeivice: DataServiceService) { }

  artistteam(){
    if (window != null && window != undefined && window.innerWidth < 600) {
      return "Artist";}
      else{ return "Artist/Teams";}
  }

  upcomingevent(){
    if (window != null && window != undefined && window.innerWidth < 600) {
      return "Upcoming";}
      else{ return "Upcoming Events";}
  }




    ngOnInit() {

  	this.dataSeivice.HighEventmessage.pipe(map(
  		(res)=> res )).subscribe( (res) => {
  		this.HighlightEvent = res;
  		if (this.HighlightEvent != undefined){
        this.Title = this.HighlightEvent.name;
  		}}
  		)


  }

}

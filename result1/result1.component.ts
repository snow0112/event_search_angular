import { Component, OnInit } from '@angular/core';
import { FirstformComponent } from '../firstform/firstform.component';
import { BehaviorSubject } from 'rxjs';
import { DataServiceService } from '../data-service.service';
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { EventNamePipePipe } from '../event-name-pipe.pipe'
import { MatTooltipModule } from '@angular/material/tooltip'
import { trigger, state, style, animate, transition, keyframes } from "@angular/animations"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

var geohash = require('ngeohash');

@Component({
  selector: 'app-result1',
  templateUrl: './result1.component.html',
  styleUrls: ['./result1.component.scss'],
  //pipes :[ EventNamePipePipe ]
  animations:[
  trigger("resultstate",[
    state("hide",style({transform:"translateX(-150%)"})),
    state("show",style({transform:"translateX(0%)"})),
    transition("hide => show",animate('2000ms'))]),
  trigger("detailstate",[
    state("hide",style({transform:"translateX(150%)"})),
    state("show",style({transform:"translateX(0%)"})),
    transition("hide => show",animate('2000ms'))])
    ]
})

export class Result1Component implements OnInit {

	submittedForm: object= {
		keyword : '',	
		category: "All",
		distance: '10',
		dunit: 'miles',
		from: 'CurrentLocation',
		specifiedlocation: ''
	};

  List: string = "< List";
	
  HaveResult: boolean = false
	keyword: string;
	category: string;
	distance: string;
	dunit: string;
	from: string;
	specifiedlocation: string;
	lat : number;
	lon : number;
	geoHash: string;
	segmentID: string;
	EvevtList: Array<object> = [];
	disabledetail: boolean = true;
  FavoriteList: Array<object> = [];
  Hightlight: object;

  //error control message and pgbar
  pgbar: boolean = false;
  HaveData: boolean = false;
  EmptyData: boolean = false;
  GotERR: boolean = false


  
  oldhighlightID: string;
  detailpage: boolean = false;

  constructor(private dataSeivice: DataServiceService) { }

  GetSegmentID(){
  if (this.category == "All"){ this.segmentID = "";}
	if (this.category == "Music"){ this.segmentID = "KZFzniwnSyZfZ7v7nJ";}
	if (this.category == "Sports"){ this.segmentID = "KZFzniwnSyZfZ7v7nE";}
	if (this.category == "Arts"){ this.segmentID = "KZFzniwnSyZfZ7v7na";}
	if (this.category == "Theater"){ this.segmentID = "KZFzniwnSyZfZ7v7na";}
	if (this.category == "Film"){ this.segmentID = "KZFzniwnSyZfZ7v7nn";}
	if (this.category == "Miscellaneous"){ this.segmentID = "KZFzniwnSyZfZ7v7n1";}
  }

  GetEvevtlist(){

    console.log("searching")
  	//let url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=cnuTcFkiEMfiGIxxNrpPIAMaDpTcfzZ6&sort=date,asc&keyword="

    this.pgbar = true
    this.HaveData = false
    this.EmptyData = false
    this.GotERR = false
    this.disabledetail = true
  	
  	let forminputs = this.keyword +"&segmentId="+ this.segmentID + "&radius="+ this.distance +"&unit="+ this.dunit +"&geoPoint=" + this.geoHash;
  	console.log(forminputs)
  	this.dataSeivice.SearchEventCallServer(forminputs).subscribe(
      (data) => {
        this.pgbar = false;
        console.log(JSON.stringify(data))
        if (data._embedded != undefined){
          this.EvevtList = data._embedded.events;
          this.HaveData = true;
          
          console.log(data._embedded.events);}
          else{
          this.EmptyData = true;
          
          }
        this.HaveResult = true;
      },
      (error) => {
        this.pgbar = false;
        this.GotERR = true;
             console.log(JSON.stringify(error))
          });
  }

  Localdate(event){
    try{
      if ( event.dates.start.localDate != undefined && event.dates.start.localDate != "" ){
        return event.dates.start.localDate;
      }else{
        return "N/A"
      }
    }catch(err){
      return "N/A"
    }
  }

  Venue(event){
    try{
      if ( event._embedded.venues[0].name != undefined && event._embedded.venues[0].name != "" ){
        return event._embedded.venues[0].name;
      }else{
        return "N/A"
      }
    }catch(err){
      return "N/A"
    }
  }

  classifications(event){
    let segment
    let genre
    try{
      if ( event.classifications[0].segment.name != undefined && event.classifications[0].segment.name != "" ){
        segment = event.classifications[0].segment.name;
      }else{
        segment = "";
      }
    }catch(err){
      segment = "";
    }
    try{
      if ( event.classifications[0].genre.name != undefined && event.classifications[0].genre.name != "" ){
        genre = event.classifications[0].genre.name;
      }else{
        genre = "";
      }
    }catch(err){
      genre = "";
    }

    if (segment != "" && genre != ""){
      return segment + "-" + genre
    }
    if (segment != "" && genre == ""){
      return segment
    }
    if (segment == "" && genre != ""){
      return genre
    }
    if (segment == "" && genre == ""){
      return "N/A"
    }

  }
  
  resultstate: string = "show";
  detailstate: string = "hide";

  showdetailpage(){
    this.detailpage = true;
    this.resultstate = "hide"
    this.detailstate = "show"
  }
  gotoresult(){
    console.log("list")
    this.detailpage = false;
    this.resultstate = "show"
    this.detailstate = "hide"
  }

  highlight(evevt,id){
    this.disabledetail = true
    this.Hightlight = evevt;
  	console.log("highlight")
	  this.dataSeivice.Highlightevent(evevt);
    this.showdetailpage()
	  //TODO: find the params of event
    let text = encodeURI( "Check out " + event.name + " located at " + event._embedded.venues[0].name +". Website: " + event.url +"&hashtags=CSCI571EventSearch"  )
	  this.tweet = "check out ";
	  console.log(text);
  	//this.disabledetail = false;
  }

  Ilikeit(event,id){
    let key = event.id;
    let value = JSON.stringify(event);
    //console.log(value)
    localStorage.setItem(key, value)

    /*this.FavoriteList.push(event);
    console.log(this.FavoriteList);
    console.log("add");*/
  }

  Ihateit(event){
    let key = event.id;
    localStorage.removeItem(key);

    /*for ( var i = 0; i < this.FavoriteList.length; i++){
      if (this.FavoriteList[i].id == event.id){
        this.FavoriteList.splice(i,1);
        console.log("cut")
        console.log(this.FavoriteList);
      }}*/
    }

  favorite(event,id){
    if (!localStorage.getItem(event.id)){
      //document.getElementById(id).innerHTML = "star";
      this.Ilikeit(event,id);}
    else{
      //document.getElementById(id).innerHTML = "star_border";
      this.Ihateit(event);
    }
    //console.log(event);
    //this.dataSeivice.changefavoriate(this.FavoriteList);
  }

  Trash(event){
    this.Ihateit(event);
    /*for (var i = 0; i < this.EvevtList.length; i++){
      if (this.EvevtList[i].id == event.id){
        let id = "result-star-" + (i);
        document.getElementById(id).innerHTML = "star_border"; }}
    for ( var i = 0; i < this.FavoriteList.length; i++){
      if (this.FavoriteList[i].id == event.id){
        this.FavoriteList.splice(i,1);*/
        //console.log("cut")
        //console.log(this.FavoriteList);}}
  }

  isfav(event){
    if (!localStorage.getItem(event.id)){ return false}
      else{return true}
  }

  whichstar(event){
    if( localStorage.getItem(event.id)){ return "star"; }
      else{ return "star_border"; }  
    /*for ( var i = 0; i < this.FavoriteList.length; i++){
      if(event.id == this.FavoriteList[i].id){ return "yellow star";} }
    return "star";*/
  }

  MakeFavList(){
    console.log("click")
    let temp = [];
    var keys = Object.keys(localStorage);
    console.log(keys)
    for (var k = 0; k < keys.length ; k++ ){
      try{
      console.log( JSON.parse(localStorage.getItem(keys[k])))
      temp.push(  JSON.parse(localStorage.getItem(keys[k])) )}catch(err){console.log(localStorage.getItem(keys[k]))}
    }
    console.log(temp)
    this.FavoriteList = temp;
  }

  HaveFav(){
    
    if (this.FavoriteList.length == 0){
      return false;}
    else{
      return true;}
  }

  Ifhightlight(event){
    if (this.Hightlight != undefined && event.id == this.Hightlight.id){
      return "highlightbk";
    } else{
      return "nothing";
    }
  }

  tweet(event){
    let text = encodeURI( "Check out " + event.name + " located at " + event._embedded.venues[0].name +". Website: " + event.url +"&hashtags=CSCI571EventSearch"  )
    return text}


  ngOnInit() {

    this.dataSeivice.currentgeoHash.pipe(map(
          (geo)=> geo )).subscribe( (geo) => {this.geoHash = geo;} )

  	this.dataSeivice.currentMessage.pipe(map(
  		(res)=> res )).subscribe( (res) => {
  		this.submittedForm = res;
  		try{
        console.log("go to search")
  			this.keyword = res.keyword;
  			this.category = res.category;
  			this.distance = res.distance;
  			this.dunit = res.dunit;
      	this.from = res.from;
  			this.specifiedlocation = res.specifiedlocation;
				
  			this.GetSegmentID()
        this.GetEvevtlist();
        this.disabledetail = true
        console.log("dodo")
        }
      catch(err){}
  	})

      this.dataSeivice.currentclean.pipe(map(
          (res)=> res )).subscribe( (res) => {
        if (res == "clean"){
          this.pgbar = false;
          this.HaveData = false;
          this.EmptyData = false;
          this.GotERR = false;
          this.gotoresult();
          this.Hightlight = null;
          document.getElementById("ResultTab").classList.add("active");
          document.getElementById("FavTab").classList.remove("active");
          
        }
         } )

    this.dataSeivice.currentdetailpage.pipe(map(
          (res)=> res )).subscribe( (res) => {
        if (res == "enabledetail"){
          this.disabledetail = false;
        } 

        if (res == "disabledetail"){
          this.disabledetail = true;
        } 
          } )
    

    //this.dataSeivice.currentfavoriate.pipe(map(
    //    (res)=> res )).subscribe( (res) => {this.FavoriteList = res;} )
  }

}

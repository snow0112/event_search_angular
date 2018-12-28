import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { ipapijson } from './ipapi'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

	temp: object;
	temp2: string;
	
	private messageSource = new BehaviorSubject(this.temp);
	currentMessage = this.messageSource.asObservable();

	changeMessage(message: object) {
    this.messageSource.next(message)}

    private geoHashSource = new BehaviorSubject(this.temp2);
	currentgeoHash = this.geoHashSource.asObservable();

	changegeoHash(geoHashstring: string) {
    this.geoHashSource.next(geoHashstring)}

    private HighEventSource = new BehaviorSubject(this.temp);
	HighEventmessage = this.HighEventSource.asObservable();

  Highlightevent(message: object) {
    this.HighEventSource.next(message)}


  constructor(private http:HttpClient) { }

  fetchData(url){
  	return this.http.get(url).pipe(map(
  		(res)=> {return res} ));
  }

  AutoCompleteCallServer(AutoWord){
  	return this.http.get('/auto-complete/'+AutoWord).pipe(map(
  		res =>{return res}));
  }

  AddressCallServer(address){
  	return this.http.get('/address-find/'+address).pipe(map(
  		res =>{return res}));
  }

  SearchEventCallServer(forminputs){
  	return this.http.get('/event-search/'+forminputs).pipe(map(
  		res=>{return res}))
  }

  EventDetailCallServer(Id){
  	return this.http.get('/detail-event/'+Id).pipe(map(
  		res=>{return res}))
  }

  ArtistMusicCallServer(artistname){
  	return this.http.get('/spotify-music/'+artistname).pipe(map(
  		res=>{return res}))
  }

  ArtistPhotoCallServer(Q){
    console.log(Q);
  	return this.http.get('/custom-search/'+Q).pipe(map(
  		res=>{return res}))
  }

  VenueDetailCallServer(venuename){
  	return this.http.get('/detail-venue/'+venuename).pipe(map(
  		res=>{return res}))
  }

  VenueIDCallServer(venuename){
  	return this.http.get('/songkick-venueID/'+venuename).pipe(map(
  		res=>{return res}))
  }

  UpcomingCallServer(venueID){
  	return this.http.get('/songkick-upcoming/'+venueID).pipe(map(
  		res=>{return res}))
  }

    event: object;
	private eventSource = new BehaviorSubject(this.event);
	currentevent = this.eventSource.asObservable();
	changeevent(message: object) {
    this.eventSource.next(message)}

    artistm: any;
	private artistmSource = new BehaviorSubject(this.artistm);
	currentartistm = this.artistmSource.asObservable();
	changeartistm(message: any) {
    this.artistmSource.next(message)}

    artistp: any;
	private artistpSource = new BehaviorSubject(this.artistp);
	currentartistp = this.artistpSource.asObservable();
	changeartistp(message: any) {
    this.artistpSource.next(message)}

    artistlist: Array<object>;
  private artistlistSource = new BehaviorSubject(this.artistlist);
  currentartistlist = this.artistlistSource.asObservable();
  changeartistlist(message: Array<object>) {
    this.artistlistSource.next(message)}

    venue: object;
	private venueSource = new BehaviorSubject(this.venue);
	currentvenue = this.venueSource.asObservable();
	changevenue(message: object) {
    this.venueSource.next(message)}

    upcoming: object;
	private upcomingSource = new BehaviorSubject(this.upcoming);
	currentupcoming = this.upcomingSource.asObservable();
	changeupcoming(message: object) {
    this.upcomingSource.next(message)}

    favoriate: Array<object>;
  private favoriateSource = new BehaviorSubject(this.favoriate);
  currentfavoriate = this.favoriateSource.asObservable();
  changefavoriate(message: Array<object>) {
    this.favoriateSource.next(message)}

    detailpage: any;
  private detailpageSource = new BehaviorSubject(this.detailpage);
  currentdetailpage = this.detailpageSource.asObservable();
  changedetailpage(message: any) {
    this.detailpageSource.next(message)}

    clean: any;
  private cleanSource = new BehaviorSubject(this.clean);
  currentclean = this.cleanSource.asObservable();
  changeclean(message: any) {
    this.cleanSource.next(message)}

}

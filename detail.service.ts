import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

	event: object;
	private eventSource = new BehaviorSubject(this.event);
	currentevent = this.eventSource.asObservable();
	changeevent(message: object) {
    this.eventSource.next(message)}

    artist: object;
	private artistSource = new BehaviorSubject(this.artist);
	currentartist = this.artistSource.asObservable();
	changeartist(message: object) {
    this.artistSource.next(message)}

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

  constructor(private http:HttpClient) { }
}

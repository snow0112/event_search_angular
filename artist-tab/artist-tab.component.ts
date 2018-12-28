import { Component, OnInit } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule , FormsModule,FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Observable, of } from 'rxjs'

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-artist-tab',
  templateUrl: './artist-tab.component.html',
  styleUrls: ['./artist-tab.component.scss']
})

export class ArtistTabComponent implements OnInit {

	ArtistList: Array<object> = [];
  ArtistPhoto:  Array<object> = [];
	ArtistMusic:  Array<object> = [];
  HighlightEvent: object;
  music : boolean;

  NoRecord: boolean = false;




  constructor(private dataSeivice: DataServiceService) { }

  ngOnInit() {

    this.dataSeivice.HighEventmessage.pipe(map(
      (res)=> res )).subscribe( (res) => {
      if (res != undefined){
        this.HighlightEvent = res;
        this.ArtistList = res._embedded.attractions;
        if (this.ArtistList.length == 0){
          this.NoRecord = true;}
        if (this.HighlightEvent.classifications[0].segment.name == "Music"){
          this.music = true;} else { this.music = false; }}
          else{ this.NoRecord = true; }
    } )



  	/*
    this.dataSeivice.currentartistlist.pipe(map(
          (res)=> res )).subscribe( (res) => {
      this.ArtistList = res; 
      if (this.ArtistList != undefined){
        for (var i = 0; i < this.ArtistList.length; i++){
          console.log(this.ArtistList[i].name);
          this.GetArtistMusic(this.ArtistList[i].name)
        }
        
      }  } )*/
  	//this.dataSeivice.currentartistp.pipe(map(
    //      (res)=> res )).subscribe( (res) => {this.ArtistPhoto = res;} )

  }

}

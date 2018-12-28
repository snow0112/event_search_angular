import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-reusableartist',
  templateUrl: './reusableartist.component.html',
  styleUrls: ['./reusableartist.component.scss']
})
export class ReusableartistComponent implements OnInit {

	@Input('artistname') artistname: string ;
	@Input('music') music: boolean ;
	ArtistPhoto:  any ;
	ArtistMusic:  Array<object> = [] ;

  //error control message and pgbar
  pgbar_m: boolean = false;
  HaveData_m: boolean = false;
  EmptyData_m: boolean = false;
  GotERR_m: boolean = false;

  pgbar_p: boolean = false;
  HaveData_p: boolean = false;
  EmptyData_p: boolean = false;
  GotERR_p: boolean = false;

	GetArtistMusic(artistname){
    this.pgbar_m = true
    this.HaveData_m = false
    this.EmptyData_m = false
    this.GotERR_m = false
    artistname = encodeURI(artistname);
        this.dataSeivice. ArtistMusicCallServer(artistname).subscribe(
          (data) => {
            this.pgbar_m = false;
            if (data != undefined){
              this.HaveData_m = true;
              this.ArtistMusic = data.artists.items 
              console.log(this.ArtistMusic)           
            }
            else{
              this.EmptyData_m = true;}
          },
          (error) => {
            console.log("error")
            this.pgbar_m = false;
            this.GotERR_m = true;
            console.log(JSON.stringify(error))
          })
    }

    GetArtistPhoto(artistname){
      this.pgbar_p = true
      this.HaveData_p = false
      this.EmptyData_p = false
      this.GotERR_p = false
    artistname = encodeURI(artistname);
        this.dataSeivice.ArtistPhotoCallServer(artistname).subscribe(
          (data) => {
            this.pgbar_p = false;
            if (data != undefined){
              this.HaveData_p = true;
              console.log(data);
              this.ArtistPhoto = data;
              if (this.ArtistPhoto.length == 0){
                this.HaveData_p = false;
                this.EmptyData_p = true;
              }
              console.log(this.ArtistPhoto)
            }else{
              this.EmptyData_p = true;}},
          (error) => {
            console.log("error")
            this.pgbar_p = false;
            this.GotERR_p = true;
            console.log(JSON.stringify(error))
          })
    }


  constructor( private dataSeivice: DataServiceService ) {}


  ngOnInit() {

  	if (this.music){
  	this.GetArtistMusic(this.artistname)}

  	this.GetArtistPhoto(this.artistname)

  	//local json photo test because calling api can cost money
  	/*this.ArtistPhoto = [
  	{link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2000px-Los_Angeles_Lakers_logo.svg.png"},
  	{link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2000px-Los_Angeles_Lakers_logo.svg.png"},
  	{link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2000px-Los_Angeles_Lakers_logo.svg.png"},
  	{link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2000px-Los_Angeles_Lakers_logo.svg.png"},
  	{link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2000px-Los_Angeles_Lakers_logo.svg.png"},
  	{link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2000px-Los_Angeles_Lakers_logo.svg.png"},
  	{link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2000px-Los_Angeles_Lakers_logo.svg.png"},
  	{link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/2000px-Los_Angeles_Lakers_logo.svg.png"}
  	]*/
  }

  

} // my exportable end

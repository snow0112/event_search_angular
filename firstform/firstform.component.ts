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

var geohash = require('ngeohash');


@Component({
  selector: 'app-firstform',
  templateUrl: './firstform.component.html',
  styleUrls: ['./firstform.component.scss']
})

export class FirstformComponent implements OnInit{

	myForm : FormGroup;
  CurrentLox : object = {lat:30, lon:108};
  CurrentLat: number;
  CurrentLon: number;
  AutoOptions: [];
  AutoOptionsName: string[] = [];
  AutoWord: string ;
  Address: string;
  placeholderhide: boolean = false;
  geoHash: string;
  initialhere: boolean = true;

  submittedForm: object ;

	public submited: boolean = false;

  constructor(private Formbuild : FormBuilder, private dataSeivice: DataServiceService) {}

  onSubmit(){
    this.dataSeivice.changeclean("clean");
    this.dataSeivice.changeclean("");
    if ( this.myForm.get('from').value == "CurrentLocation" ) {
      this.geoHash = geohash.encode(this.CurrentLat, this.CurrentLon);
      this.dataSeivice.changegeoHash(this.geoHash);
      this.submittedForm = this.myForm.value;
      this.dataSeivice.changeMessage(this.submittedForm);
    } else{
      this.OtherGeoHash();}

  	}

  clean(){
    this.myForm.markAsUntouched();
    this.myForm.markAsPristine();
    this.myForm.setValue({
      keyword: '',
      category: 'All',
      distance: '10',
      dunit: 'miles',
      from : "CurrentLocation",
      specifiedlocation: ""
    })
    this.myForm.get('keyword').disable();
    this.myForm.get('keyword').enable();
    
    this.chooseHere();

    this.dataSeivice.changeclean("clean");
    this.dataSeivice.changeclean("");
    
  }

  chooseHere(){
    this.initialhere = true;
  	this.myForm.patchValue({
  		from : "CurrentLocation",
      specifiedlocation: ""
  	})
  	this.myForm.get('specifiedlocation').disable();

  }

  hereornot(){
    return this.initialhere
  }

  chooseOther(){
    this.initialhere = false
  	this.myForm.patchValue({
  		from : "OtherLocation",
  	})
  	this.myForm.get('specifiedlocation').enable();
    this.myForm.get('specifiedlocation').setValidators([Validators.required,Validators.pattern('^(?!\s*$).+')]);
    this.myForm.get('specifiedlocation').updateValueAndValidity();
  }

  OtherGeoHash(){
    this.Address = encodeURI(this.Address);
    console.log(this.Address)
    //let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.specifiedlocation +"&key=AIzaSyBkTob_KnzIQaJqz1Il01MXswqlWo-Zg8k";
    this.dataSeivice.AddressCallServer(this.Address).subscribe(
      (data) => {
        let lat = data.results[0].geometry.location.lat;
        let lon = data.results[0].geometry.location.lng; 
        this.geoHash = geohash.encode(lat, lon);
        this.dataSeivice.changegeoHash(this.geoHash);
        this.submittedForm = this.myForm.value;
        this.dataSeivice.changeMessage(this.submittedForm);
    });
  }

  Onclicktest(){
    console.log(this.CurrentLat);
    console.log(this.CurrentLon);
    console.log(this.AutoOptionsName);
    console.log(this.submittedForm);
  }

  AutoCompleteKeyword(){
    this.AutoWord = encodeURI(this.AutoWord)
    let url = 'https://app.ticketmaster.com/discovery/v2/suggest?apikey=cnuTcFkiEMfiGIxxNrpPIAMaDpTcfzZ6&keyword='+this.AutoWord;
    //this.dataSeivice.fetchData(url).subscribe(
    this.dataSeivice.AutoCompleteCallServer(this.AutoWord).subscribe(  
      data => {//console.log(data._embedded.attractions);
        if( data._embedded != undefined ){
          this.AutoOptions = data._embedded.attractions;
          let temp: string[] = []
          for (var i = 0; i < this.AutoOptions.length; i++){
            //console.log(this.AutoOptions[i].name);
            temp.push(this.AutoOptions[i].name);
          }
          this.AutoOptionsName = temp;
          //console.log(temp);
        }
        else{
          this.AutoOptionsName = [];
        }
      });
  }

  ngOnInit(){
  	this.myForm = this.Formbuild.group({
      keyword: ['',[Validators.required,Validators.pattern('^(?!\s*$).+')]],
  		category: ['All'],
  		distance: ['10'],
  		dunit: ['miles'],
  		from: ['CurrentLocation'],
  		specifiedlocation:['']
  	})

    this.dataSeivice.fetchData('http://ip-api.com/json').subscribe(
      data => {this.CurrentLox = data;
        try{
          this.CurrentLat = this.CurrentLox.lat;
          this.CurrentLon = this.CurrentLox.lon;}
          catch(err){}
        });
    //console.log(this.CurrentLat);
    //console.log(this.CurrentLon);

    this.myForm.get('keyword').valueChanges.subscribe(
      (data) => {
        if (data != "" && data != null){
        this.placeholderhide = true;
        this.AutoWord = data;
        //console.log(this.AutoWord)
        this.AutoCompleteKeyword();
        //console.log(this.AutoWord);
      }else{
        this.placeholderhide = false;
        this.AutoOptionsName = [];}
    })

    this.myForm.get('specifiedlocation').valueChanges.subscribe(
      (data)=>{
        this.Address = data;
      })

    //this.dataSeivice.currentMessage.subscribe(message => this.submittedForm = message)

  }

}

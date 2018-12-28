import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ipapijson } from './ipapi'
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { ReactiveFormsModule, FormsModule ,FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'csci571Hw8';
  public lat : number;

  myControl = new FormControl();
  Aoptions: string[] = ['One', 'Two', 'Three'];

  constructor(private http:HttpClient) {
  }

  url = 'http://ip-api.com/json';

  Callapi(){
  	//console.log("yooo")
  	//this.http.get<ipapijson>('http://ip-api.com/json').pipe(map(function(A){return A.lat})).subscribe(function(name2){console.log(this.lat)})  }
  	this.http.get(this.url).pipe(map(
  		(res)=> res )).subscribe(
  		(data)=>console.log(data));}
 }
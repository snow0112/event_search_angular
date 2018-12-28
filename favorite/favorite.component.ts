
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

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

	disabledetail: boolean = true;
	FavoriteList: Array<object> = [];

  constructor(private dataSeivice: DataServiceService) { }

  Trash(event){}

  ngOnInit() {
  	this.dataSeivice.currentfavoriate.pipe(map(
          (res)=> res )).subscribe( (res) => {this.FavoriteList = res;} )
  }

}

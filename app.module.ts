import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule ,FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FirstformComponent } from './firstform/firstform.component';
import { Result1Component } from './result1/result1.component';
import { DetailsComponent } from './details/details.component';
import { EventTabComponent } from './event-tab/event-tab.component';
import { ArtistTabComponent } from './artist-tab/artist-tab.component';
import { VenueTabComponent } from './venue-tab/venue-tab.component';
import { UpcomingTabComponent } from './upcoming-tab/upcoming-tab.component';
import { FavoriteComponent } from './favorite/favorite.component';

import { HttpClientModule} from '@angular/common/http';
import { MainserviceService } from './mainservice.service';
import { DataServiceService } from './data-service.service';
import { DetailService } from './detail.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatCardModule } from '@angular/material/card';

import { BehaviorSubject } from 'rxjs';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { SlideshowModule } from 'ng-simple-slideshow';
import { EventNamePipePipe } from './event-name-pipe.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { trigger, state, style, animate, transition, keyframes } from "@angular/animations";
import { ReusableartistComponent } from './reusableartist/reusableartist.component';

import { AgmCoreModule } from '@agm/core';
import { ProgbarComponent } from './progbar/progbar.component';
import { ErrMagComponent } from './err-mag/err-mag.component';
import { EmptydataComponent } from './emptydata/emptydata.component';



@NgModule({
  declarations: [
    AppComponent,
    FirstformComponent,
    Result1Component,
    DetailsComponent,
    EventTabComponent,
    ArtistTabComponent,
    VenueTabComponent,
    UpcomingTabComponent,
    FavoriteComponent,
    EventNamePipePipe,
    ReusableartistComponent,
    ProgbarComponent,
    ErrMagComponent,
    EmptydataComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    BrowserAnimationsModule,
    RoundProgressModule,
    SlideshowModule,
    MatTooltipModule,
    MatCardModule,
    Ng2OrderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAY2TVRizgSefUAuawxXAKGWMxPYkHbcXw'
    })
  ],

  providers: [MainserviceService, NgbModule, DataServiceService,DetailService],

  bootstrap: [AppComponent,FirstformComponent,Result1Component,DetailsComponent,
  EventTabComponent,ArtistTabComponent,VenueTabComponent,UpcomingTabComponent, 
  ProgbarComponent,ErrMagComponent, EmptydataComponent]
})
export class AppModule { }

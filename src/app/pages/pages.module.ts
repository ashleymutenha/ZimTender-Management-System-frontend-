import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TendersComponent } from './tenders/tenders.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { BiddingPageComponent } from './bidding-page/bidding-page.component';
import { TenderinfoComponent } from './tenderinfo/tenderinfo.component';
import { BidsComponent } from './bids/bids.component';


@NgModule({
  declarations: [
  
    TendersComponent,
       AuthenticationComponent,
       UserComponent,
       BiddingPageComponent,
       TenderinfoComponent,
       BidsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[TendersComponent,AuthenticationComponent,UserComponent,BiddingPageComponent,TenderinfoComponent,BidsComponent]
})
export class PagesModule { }

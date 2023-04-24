import { Component } from '@angular/core';
import { TendersService } from 'src/app/tenders-service';
@Component({
  selector: 'app-tenderinfo',
  templateUrl: './tenderinfo.component.html',
  styleUrls: ['./tenderinfo.component.scss']
})
export class TenderinfoComponent {

  tender:any

 user:any

  constructor( private api:TendersService){

  }

  ngOnInit():void{
    this.getTender()
    this.getUser()
  }


  getTender(){
   this.tender = this.api.selectedBid

   console.log(this.tender)
  }

  getUser(){
    this.api.users.map((user:any)=>{
      user.userID ==this.tender.userID? this.user =user:user =null
    })

    console.log(this.user)
  }

  placeBid(){
    this.api.currentState = "bid"
  }


  gotoHome(){
    this.api.currentState ="home"
  }



}

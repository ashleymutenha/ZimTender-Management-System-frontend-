import { Component } from '@angular/core';
import { TendersService } from 'src/app/tenders-service';
@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent {
 bids:any =[]
 acceptedBids:any=[]
 ifAccptedBid = false

  constructor(public api:TendersService){

  }

  ngOnInit():void{
   this.getBids()
   

   
  }

  getBids(){
    this.bids.length =0
    this.acceptedBids.length =0
   this.api.getBidByTenderID(this.api.selectedTenderID).subscribe((res)=>{
    
    if(res.responseCode==1){
      res.response.map((bid:any)=>{
        this.checkifBidisAccpted(bid)
      })
 
    }
   })
  
  }

  gotoAccount(){
    this.api.currentState ="user-profile"
  }


  withholdBid(bidID:any){
   this.api.updateBid(bidID,'withhold').subscribe(res=>{
    this.getBids()
    this.checkifBidAccepted()
   })
  
  
  }

 acceptBid(bidID:any){
  this.api.updateBid(bidID,'accepted').subscribe(res=>{
    this.getBids()
    this.checkifBidAccepted()
 })


 }

 checkifBidisAccpted(bid:any){
   if(bid.bidSTATUS=='accepted')
   {
    this.acceptedBids.push(bid)
   }
   this.bids.push(bid)
 }



 checkifBidAccepted(){
 
 for(var bid of this.bids){
  if(bid.bidSTATUS=="accepted"){
    this.acceptedBids.push(bid)
  }
 }
}
}

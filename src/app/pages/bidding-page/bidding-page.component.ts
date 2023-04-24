import { Component } from '@angular/core';
import { TendersService } from 'src/app/tenders-service';
@Component({
  selector: 'app-bidding-page',
  templateUrl: './bidding-page.component.html',
  styleUrls: ['./bidding-page.component.scss']
})
export class BiddingPageComponent {

  tender:any
  bidderName:any
  bidderLocation:any
  bidderPhone:any
  bidValue:any
  bidSuccessfull = false
  guestUser = false
  allBids:any =[]

  bidderUsername:any

  userNotifications:any =[]

  bidderOrgType:string = "Organisation"

  generatedUserID:any

  constructor(private api:TendersService){

  }

  ngOnInit():void{
   this.getTender()

   this.getALLBids()

   this.getUserNotifications()

  

  }

  getTender(){

    this.tender = this.api.selectedBid

  }

getALLBids(){
    this.api.getAllBids().subscribe(res=>{
      res.map((bid:any)=>{
        this.allBids.push(bid)
      })
    })
  }


  placeBid():void{
    this.getALLBids()
    let bid= {'tenderID':'', 'bidID':'',
    'bidderNAME':'','bidderLocation':'Harare', 'organisationType':'','phone':'',email:'',
    'bidValue':0,'bidSTATUS':'unviewed'}

    bid.tenderID = this.tender.tenderID
    bid.bidderNAME = this.bidderName
    bid.bidderLocation = this.bidderLocation
    bid.organisationType= this.bidderOrgType
    bid.bidValue = this.bidValue
    bid.phone = this.bidderPhone
    bid.email = this.bidderUsername
    

    

   this.api.saveBid(bid).subscribe(res=>{
    
    
    if(res.responseCode ==1){
      this.bidSuccessfull =true
      let notificationObject ={'notificationID':'',
      'title':`Bid for ${this.tender.title}`, 'content' :`${this.bidderName} placed a Bid for
      ${this.tender.title}`,
      'userID':`${this.tender.userID}`,
      'referenceID':`${this.tender.tenderID}`,
      'status':`pending`
    }
    
    this.api.generateNotification(notificationObject).subscribe(res=>{
      
      if(res.responseCode ==1){
        this.api.getUserByUsername(this.bidderUsername).subscribe((res)=>{
          if(res.responseCode ==1){
            new Promise<void>((resolve, reject) => {
            })
            console.log("userObject is", bid)
            this.createGuestUser(bid);
          }
        })
      }
       
       })
     } 
    
   })

  }


  getUserNotifications(){
    this.api.getNotifications(this.tender.userID).subscribe((res)=>{
      if(res.responseCode==1){
        res.response.map((notification:any)=>{
          this.userNotifications.push(notification)
        })
      }
    })
  }


  gotoHome(){
    this.api.currentState ="home"
  }

  tenderDetails(tender:any){
    this.api.currentState ="tender-info"

    this.api.selectedBid = tender
  }


  assignBidNumber():string{

    let idNumberArray:any =[];

   
   
    this.allBids.map((bid:any)=>{
      idNumberArray.push(Number(bid.bidID.substring(3,)))
    });

   let _idNumber = Math.max(...idNumberArray)+1;

   const bidID = "BID"+ _idNumber.toString();


   return bidID;
  
}


createGuestUser(userObject:any){
  
  let guestObject = {'userID':'','username':'','password':'','organisation':'', 'category':''}
 
  guestObject.username = userObject.email
  guestObject.password  =''
  guestObject.organisation = userObject.bidderNAME
  guestObject.category ="guest"

   
  this.api.signUp(guestObject).subscribe((res:any)=>{
    if(res.responseCode==1){
      this.guestUser =true
    }
  })
    
}

closeBidSuccessNotification(){
  this.bidSuccessfull = false
}


closeguestUserNotification(){
  this.guestUser =false
}






}

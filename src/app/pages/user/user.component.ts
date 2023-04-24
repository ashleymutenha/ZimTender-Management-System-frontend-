import { Component } from '@angular/core';
import { TendersService } from 'src/app/tenders-service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user:any
  tenders:any =[]


 

  tenderTitle:any
  tenderContent:any
  updateTenderMode:any
  addTender =false
  tenderUpdatedID:any
  userBids:any =[]

  tendersFound =false
   
  notificastions:any =[]

  constructor(private api:TendersService){

  }


  ngOnInit():void{
    this.getUser()
    this.getActiveTenders()

    this.getBids()

    this.getNotifications()
  
  }


  checkifTendersArefound(){
   if(this.tenders.length ==0){
    this.tendersFound =true
   }

   else{
    this.tendersFound =false
   }
  }

  getUser(){
  this.user = this.api.selectedUser
  }



  getActiveTenders(){
    this.api.getTendersByUserID(this.user.userID).subscribe(
      res=>{
        if(res.responseCode ==1){
          res.response.map((tender:any)=>{
            this.determineTenderBids(tender)
           
            
          });this.checkifTendersArefound()
        }
      } 
    )
  }


  getNotifications(){
    this.api.getNotifications(this.user.userID).subscribe(res=>{
      if(res.responseCode ==1){
        res.response.map((notification:any)=>{
          this.notificastions.push(notification)
        })
      }
    })


  }

  determineTenderBids(tender:any){
    let bids:any =[]
    this.api.getBidByTenderID(tender.tenderID).subscribe(res=>{
      if(res.responseCode==1){
        res.response.map((bid:any)=>{
          bids.push(bid)
        });tender.bidNo = bids.length
      }
    })
    this.tenders.push(tender)
  }


  getBids(){
      this.api.returnTendersByUserID(this.user.userID).map((tender:any)=>{
        this.api.getBidByTenderID(tender.tenderID).subscribe(res=>{
          if(
            res.responseCode ==1
          ){
            res.response.map((bid:any)=>{
              this.userBids.push(bid);
            })
          }
        })
      })
 
}


notificationNumber():number{

  let  notificationPending:any =[]

  this.notificastions.map((notification:any)=>{
   notification.status =="pending"?
   notificationPending.push(notification):null
  })


  return notificationPending.length
}


showNotificationIcon():boolean{
 let  notificationPending:any =[]

 this.notificastions.map((notification:any)=>{
  notification.status =="pending"?
  notificationPending.push(notification):null
 })

  if(notificationPending.length ==0){
     return false
  }

  else{
    return true
  }
}


  __addTender(){
    this.addTender =true
  }

  registerTender(){
    let dataObject ={'title':'','description':'','userID':'','tenderID':'','category':''}

    dataObject.title = this.tenderTitle
    dataObject.category =""
    dataObject.description = this.tenderContent
    dataObject.userID =this.user.userID
    
    
    this.api.saveTender(dataObject).subscribe(
      res=>{

       
        if(res.responseCode ==1){
          this.tenders.push(dataObject);
          this.addTender =false
        }
      }
    )
  
  }

 


  logout(){
    this.api.currentState = "auth"
  }


  deleteTender(id:any){
  
    this.api.deleteTender(id).subscribe(
      res=>{
        if(res.responseCode ==1){
          this.tenders.map((tender:any)=>{
            tender.tenderID ==id ? this.tenders.splice(this.findIndex(id)):tender
          })
        }
      }
    )

   
   
  }

  findIndex(tenderID:any){

    let index:any;
     for(var tender of this.tenders){
       if(tender.tenderID ==tenderID){
        index = this.tenders.indexOf(tender)
       
       }
     }
     
     return index
  }

  editTender(id:any){
    this.updateTenderMode =true
    this.addTender =true
    this.tenderUpdatedID = id
    this.tenders.map((tender:any)=>{tender.tenderID ==id?
    this.assignTenderEditValues(tender):null
    })


  }

  assignTenderEditValues(tender:any){
    this.tenderTitle = tender.title
    this.tenderContent =tender.description
  }

  assignTenderUpdatedValues(tender:any){
    
    tender.title = this.tenderTitle
    tender.description = this.tenderContent
  }



  updateTender(){
    this.tenders.map((tender:any)=>{
      tender.tenderID ==this.tenderUpdatedID?
      this.assignTenderUpdatedValues(tender):tender
    })
    

    let  updatedTender ={'title':'','description':'','tenderID':'','userID':'','category':''}

    updatedTender.title = this.tenderTitle
    updatedTender.description= this.tenderContent;
    updatedTender.tenderID = this.tenderUpdatedID;
    updatedTender.userID = this.user.userID;
    

    this.api.updateTender(updatedTender).subscribe((res)=>{
      if(res.responseCode==1){
        this.updateTenderMode =false
        this.addTender =false

       this.api.updateTenders(this.tenders)
      }
    })
  }

  showBids(tender:any){
    this.api.selectedTenderID = tender.tenderID
    this.api.currentState ="bids";
    this.api.selectedTenderName =tender.title 
  }
  
}

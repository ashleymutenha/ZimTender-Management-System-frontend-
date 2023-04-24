import { Component } from '@angular/core';
import { TendersService } from 'src/app/tenders-service';
@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss']
})
export class TendersComponent {
   

  tenders:any =[]
  
   
  tendersFound = false
  constructor(public api:TendersService){}


  ngOnInit():void{
   this.getTenders()

  //  
  }


  getTenders(){

    this.api.getAllTenders().subscribe(response=>
      {response.map((data:any)=>{this.tenders.push(data)}
      
      );this.checkifTendersFound()})
    

      this.api.tenders = this.tenders
      
  }

  checkifTendersFound(){
    if(this.tenders.length ==0){
      this.tendersFound = true
    }

    else{
      this.tendersFound = false
      ;
    }
  }


  getUsers(){
    
  }

  authenticate(){
    this.api.currentState ="auth"
  }


  bid(selectedTender:any){
    this.api.selectedBid = selectedTender;
    this.api.currentState = "bid"
  }


  bidDetails(selectedTender:any){

   this.api.selectedBid = selectedTender
   this.api.currentState = "tender-info"

  }
}

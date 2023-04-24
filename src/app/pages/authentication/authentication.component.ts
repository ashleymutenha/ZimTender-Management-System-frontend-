import { Component } from '@angular/core';
import { TendersService } from 'src/app/tenders-service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  currentState = "login"

  password:any
  username:any

  generatedID:any

  passwordInputStyle ="form-control correctPassword"

  userNameInputStyle = "form-control correctCredentials"

  
  passwordAgain:any
  organisation:any

  

  constructor(private api:TendersService){}


 
 
  ngOnInit():void{
  //  this.generateUserID();
   }

  gotoHome(){
    this.api.currentState ="home"
  }

  
  signup(){
    this.password =""
    this.passwordAgain =""
    this.username =""
    this.organisation =""
    this.currentState ="signup"
  }

  __signup(){
     
    
    this.registerUser()
      
    
  }

  registerUser(){
    
    let dataObject = {'userID':'','username':'','password':'','organisation':'', 'category':''}


    dataObject.organisation = this.organisation
    dataObject.username = this.username
    dataObject.password = this.password
    dataObject.category='registered'
    
    if(this.password == this.passwordAgain){
      
      
    this.api.signUp(dataObject).subscribe(res=>{
     console.log("registered user:",res);
      if(res.responseCode ==1){
        this.currentState ="login"
        this.password =""
        this.passwordAgain =""
        this.username =""
      }
    })}

   
  }
    
    
  




  signin(){
   
    let data = {'username':this.username,'password':this.password}
    this.api.signIn(data).subscribe(res=>{
      console.log(res)

      if(res.responseCode ==1){
        this.gotoUserPage(res.response)
      }

      else if(res.responseCode ==0){
         this.userNameInputStyle ="form-control wrongCredentials"
      }


      else{
         this.passwordInputStyle = "form-control wrongPassword"
      }


    }
    )

  }


  validatePassword(username:any , password:any): Boolean{
    let returnedValue:any
    this.api.users.map((user:any)=>{
      user.username ==username? user.password ==password ? returnedValue= true : returnedValue =false:user
    })

    return returnedValue
    
  }

  gotoUserPage(user:any){
    this.api.currentState = "user-profile"
    this.passwordInputStyle = "form-control correctPassword"
    this.api.selectedUser = user

  }








}

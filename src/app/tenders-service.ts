import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable
 } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendersService {

  url = "http://localhost:8080"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    }),
  };

  constructor(private http:HttpClient){

  }

  currentState ="home"

  userObject:any

  selectedUser:any

  selectedBid:any
  userTenders:any =[]
  
  users = this.returnUsers()
  tenders:any =[]

  tendersFound ="looking"

  generatedID:any
  dataObject = {'userID':'','username':'','password':'','organisation':'', 'category':''}

  selectedTenderID:any

  selectedTenderName:any;

  getUserByUsername(username:string) :Observable<any>{
    return this.http.get(`${this.url}/getUser/${username}`)
  }
  
 getTendersByUserID(userID:any): Observable<any>{
  return this.http.get(`${this.url}/getTenders/${userID}`)
    
 }

 updateBid(bidID:any , bidSTATUS:any){
  return this.http.put(`${this.url}/updatebid/${bidID}/${bidSTATUS}`,this.httpOptions)
 }


 getNotifications(userID:any): Observable<any>{
  return this.http.get(`${this.url}/getNotifications/${userID}`)
 }


 generateNotification(notification:Object):Observable<any>{
  return this.http.post(`${this.url}/generateNotification`,JSON.stringify(notification),this.httpOptions)
 }

 
 getAllTenders():Observable<any>{
  return this.http.get(`${this.url}/getTenders`)
 }



 getUsers(): Observable<any>{
  return this.http.get(`${this.url}/getUsers`)
    
 }

 getAllBids():Observable<any>{
  return this.http.get(`${this.url}/getBids`)

 }


 getBidByTenderID(tenderID:string):Observable<any>{
  return this.http.get(`${this.url}/getBidByTenderId/${tenderID}`)

 }

 saveTender(data:Object):Observable<any>{

  return this.http.post(`${this.url}/saveTender`,JSON.stringify(data), this.httpOptions)
 }

 deleteTender(tenderID:string): Observable<any>{
   return this.http.delete(`${this.url}/${tenderID}`)
 }


 signIn(data:any):Observable<any>{
  return this.http.post(`${this.url}/login`,JSON.stringify(data),this.httpOptions)
 }

 signUp(data:Object):Observable<any>{
  return this.http.post(`${this.url}/signup`,JSON.stringify(data),this.httpOptions)
 }

 saveBid(data:Object):Observable<any>{
  return this.http.post(`${this.url}/saveBid`,JSON.stringify(data),this.httpOptions)
 }

 updateTender(data:any):Observable<any>{
  return this.http.put(`${this.url}/updateTender`,JSON.stringify(data),this.httpOptions)
 }




 updateTenders(newArray:any){

  newArray.map((tender:any)=>{
    this.checkTenderExistence(tender.tenderID) ==0? this.tenders.push(tender):
    this.updateRegistredTender(tender)
  })
 

 }



 checkTenderExistence(tenderID:any){
  let count =0
  
  this.tenders.map((tender:any)=>{
    tender.tenderID ==tenderID? count++ :null
  })
   return count
 }

 updateRegistredTender(__tender:any){

  this.tenders.map((tender:any)=>{
    tender.tenderID == __tender.tenderID ?  tender = __tender
    : null
  })

 }

 returnUsers(){
  let users:any =[]
  
  this.getUsers().subscribe(response=>{

  
    response.map((user:any)=>{
    users.push(user)
      
     
    })
    })
   
  
  return users;
 
 }

 
 returnTendersByUserID(userId:any){
  let tenders:any =[]

  for(var tender of this.tenders){
    if(tender.userID == userId){
      tenders.push(tender)
    }
  }

  return tenders
 }


 

 }


 






import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

	url= "http://localhost:7000/api/";
  // url= "http://54.180.142.192:7000/api/"; //aws
  constructor(private http:HttpClient) { }

  sendMessage(data)
  	{
  		return this.http.post(this.url+'save_chats',data);
  	}

 fetchChatsCurrent(data)
  	{
  		return this.http.post(this.url+'fetch_chats_my',data);
  	}


  getReq(data)
  	{
  		return this.http.post(this.url+'get_req',data);
  	}

}


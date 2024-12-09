import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import  {ActivatedRoute} from '@angular/router'; 
import {ChatService} from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

myForm:FormGroup;
  constructor(private fb:FormBuilder, private ar:ActivatedRoute, private cser:ChatService) { }

allChats

send
other

clearMsgFetch

  ngOnInit() {
  	this.validate();
    this.send=localStorage.getItem('email');
    let receiver=''
        this.ar.params.subscribe(par=>{
        receiver=par.email;
        this.other=receiver;
        
        })

    let fetchData={
          sender:localStorage.getItem('email'),
          receiver:receiver  
        }

        this.cser.fetchChatsCurrent(fetchData)
        .subscribe(res=>
        {
          console.log(res);
          this.allChats=res;
          this.allChats=this.allChats.myChat;
          console.log(this.allChats)
        })
        
         this.clearMsgFetch = setInterval(() => {
                this.fetchChats(); 
                }, 6000);

        console.log("Send="+this.send+"\nReceiver="+this.other)
        
  }

  fetchChats()  
    {
       let receiver=this.other;

    let fetchData={
          sender:localStorage.getItem('email'),
          receiver:receiver  
        }

        this.cser.fetchChatsCurrent(fetchData)
        .subscribe(res=>
        {
          console.log(res);
          this.allChats=res;
          this.allChats=this.allChats.myChat;
          console.log(this.allChats)
        })
    }


  ngOnDestroy() {
  if (this.clearMsgFetch) {
    clearInterval(this.clearMsgFetch);
  }
}

  validate()
  	{
  		this.myForm = this.fb.group({
  			'message':['',Validators.required]
  		})
  	}

  	sendMessage()
  		{
  			let message = this.myForm.controls.message.value;
  			console.log(message)
        let receiver=''
        this.ar.params.subscribe(par=>{
        receiver=par.email;
        })
  			let data={
  				message:message,
  				sender:localStorage.getItem('email'),
  			   receiver:receiver	
  			}

  			console.log(data)
        this.cser.sendMessage(data)
        .subscribe(res=>{
          console.log(res);
          this.ngOnInit()
        })
        
  		}

}

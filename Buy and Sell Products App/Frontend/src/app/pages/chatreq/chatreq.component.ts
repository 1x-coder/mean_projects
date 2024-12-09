import { Component, OnInit } from '@angular/core';
import {ChatService} from 'src/app/services/chat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chatreq',
  templateUrl: './chatreq.component.html',
  styleUrls: ['./chatreq.component.css']
})
export class ChatreqComponent implements OnInit {

  constructor(private cser:ChatService, private router:Router) { }
resData;
resd
  ngOnInit() {

  		let myemail={
  			email:localStorage.getItem('email')
  		}
  		this.cser.getReq(myemail)
  		.subscribe(res=>{
  			console.log(res);
        this.resd=res;
        this.resd=this.resd.chats_req;


        let uniq=[];
        for(let i=0;i<this.resd.length;i++)
        {   let flag=0;
            for(let j=0;j<uniq.length;j++)
            {
              if(uniq[j]==this.resd[i].sender)
              {
                flag=1;
              }
            }
            if(flag==0)
            {
              uniq.push(this.resd[i].sender)
              console.log(this.resd[i].sender)
            }
        }
        this.resData=uniq;
        console.log('uniq'+this.resData)


  		})
  	
  }

  navigateToChat(email)
    {
      console.log(email)
      let path=/chat/+email;
      this.router.navigate([path])

    }

}

import { Component, OnInit } from '@angular/core';
import  {ActivatedRoute} from '@angular/router'; 
import {PreviewService} from 'src/app/services/preview.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(private ar:ActivatedRoute, private pser:PreviewService, private router:Router) { }
resCBData;


product_id;
img1;
img2;

imgUrl;

mobileNumberPrivacy;

loggedIn;
  ngOnInit() {
        
        
        

  		  this.ar.params.subscribe(par=>{
		  	this.product_id=par.pid;
		  	
        let id={
          id:this.product_id
        }
        // fetching preview data
        this.pser.getCarBikePreviewData(id)
        .subscribe(res=>{
          this.resCBData=res;
          this.resCBData=this.resCBData.cbData[0];
  
          this.img1=this.resCBData.img1;
          this.img2=this.resCBData.img2;
          this.imgUrl=this.img1;

          let str=""+this.resCBData.mobile;
          this.mobileNumberPrivacy=str.slice(0,2)+"*******"+str[9];
          console.log(this.mobileNumberPrivacy)

            if(localStorage.getItem('loginStat')=="true")
        {
          this.loggedIn=true;
          this.mobileNumberPrivacy=this.resCBData.mobile;

          //count visits
          let visitsData={
            id:this.product_id,
            email:localStorage.getItem('email')
          }
          this.pser.countVisits(visitsData).
          subscribe(res=>{
            console.log(res);
          })

          // end count visits

        }


        })

  })

      
  }

  changeImg(index)
    {
      if(index==1)
      {
        this.imgUrl=this.img1;
      }
      else{
        this.imgUrl=this.img2;
      }
    }

  redirectToSeller()
    {
      if(localStorage.getItem('loginStat')=='true')
      {
        let email = this.resCBData.selleremail;
        console.log(email);

        if(email == localStorage.getItem('email'))
        {
          console.log("'can't message itself'");
          Swal.fire({
                        type: 'error',
                        title: 'Invalid operation...',
                        text: "can't message itself",
                        // footer: '<a href>Why do I have this issue?</a>'
                      })
        }
        else
        {
          console.log('redirectToSeller chat')
          let path ='/chat/'+email
          this.router.navigate([path])
        }
      }

      else{
        console.log("login first")
        Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'You need to login first!',
                    
                  })
      }

    }



}

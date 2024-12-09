import { Component, OnInit } from '@angular/core';
import {FormsService} from 'src/app/services/forms.service';
import Swal from 'sweetalert2';
import {FilterService} from 'src/app/services/filter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

resData;
resDataMobLap;
  constructor(private fser:FormsService,private filterSer:FilterService) { }

  ngOnInit() {

  		this.fser.getCar_Bikes()
  		.subscribe(res=>{
  			console.log(res);
  			this.resData=res;
        this.resData = this.resData.data;
        console.log(this.resData)
        
  		})


   



  }

  countLikes(id)
    {
      console.log(id)
       if(localStorage.getItem('loginStat')=='true')
      {
        //sweetalert
        const Toast = Swal.mixin({
                            toast: true,
                            position: 'bottom-start',
                            showConfirmButton: false,
                            timer: 1000
                          })

                          Toast.fire({
                            type: 'success',
                            title: 'Liked successfully'
                          })
        //
        let likesData={
          'email':localStorage.getItem('email'),
          'ad_id':id
        }
        this.fser.countLikes(likesData)
        .subscribe(res=>{
          console.log(res);
        })
      }

      else{
        console.log('cannot like login first');

      }
    }


 filter(option)
 {  
    
    
    let data={
      option:option
    }

    console.log(data);
    this.filterSer.filterMain(data)
    .subscribe(res=>{
      console.log(res);
      this.resData=res;
      this.resData = this.resData.filterData;
    })
 }

}

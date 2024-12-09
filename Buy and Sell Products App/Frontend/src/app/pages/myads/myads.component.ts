import { Component, OnInit } from '@angular/core';
import {MyadsService} from 'src/app/services/myads.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.css']
})
export class MyadsComponent implements OnInit {

  constructor(private aser:MyadsService,private router:Router) { }

resCarBikeData;

  ngOnInit() {


  	let email={
  		email:localStorage.getItem('email')
  	}

  	this.aser.fetchMyAds(email)
  	.subscribe(res=>{
  		console.log(res);
  		this.resCarBikeData=res;
  		this.resCarBikeData=this.resCarBikeData.myads;
  	})
  }

  deleteAdCarBike(id)
  {
    let data={
      _id:id,
      email:localStorage.getItem('email')
    }
    console.log(data);

    this.aser.deleteAdCarBike(data)
    .subscribe(res=>{
      console.log(res)
      this.resCarBikeData=res
      this.resCarBikeData=this.resCarBikeData.myads

      //sweetalert
        const Toast = Swal.mixin({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 1000
                          })

                          Toast.fire({
                            type: 'success',
                            title: 'Deleted successfully'
                          })
      //
    })
  }

}

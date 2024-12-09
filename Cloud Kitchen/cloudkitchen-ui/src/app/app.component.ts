import { Component,Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent {

  loggedIn: boolean = false;
  type:any;
  type1:any;
  op: boolean=false;

  constructor(private modalService: NgbModal, private router:Router) {}

  title = 'cloudkitchen-ui';
  login(){
    const modalRef = this.modalService.open(NgbdModalContent);
  }

  ngOnInit(): void {
    this.type=sessionStorage.getItem('user_type')
    if(this.type) {
      this.loggedIn = true;
    }
    
    
  }
     openNav() {
      this.op=true
      if(this.type==='admin'){
        document.getElementById("mySidebarAd").style.width = "250px";
      }else if(this.type==='customer'){
        document.getElementById("mySidebarCust").style.width = "250px";
      }else if(this.type==='restaurant'){
        document.getElementById("mySidebarRest").style.width = "250px";
      }else if(this.type==='delivery-person'){
        document.getElementById("mySidebarDel").style.width = "250px";
      }
    }
    
     closeNav() {
      this.op=false
      if(this.type==='admin'){
        document.getElementById("mySidebarAd").style.width = "0";
      }else if(this.type==='customer'){
        document.getElementById("mySidebarCust").style.width = "0";
      }else if(this.type==='restaurant'){
        document.getElementById("mySidebarRest").style.width = "0";
      }else if(this.type==='delivery-person'){
        document.getElementById("mySidebarDel").style.width = "0";
      }
      
    }
    logout(){
      sessionStorage.clear()
      this.type=sessionStorage.getItem('user_type')
      if(!this.type) {
        this.loggedIn = false;
      }
      this.router.navigate(['/']);
    }
  
  
}
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h2 class="modal-title" style="color:#63a033">You would like to login as ?</h2>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <button type="button" (click)="cust()" class="btn btn-outline-dark">Customer</button>&nbsp;&nbsp;
    <button type="button" (click)="rest()" class="btn btn-outline-dark">Restaurant</button>&nbsp;&nbsp;
    <button type="button" (click)="delper()" class="btn btn-outline-dark">Delivery Person</button>&nbsp;&nbsp;
    <button type="button" class="btn btn-outline-danger"  (click)="admin()">Admin</button>&nbsp;&nbsp;
    </div>
    <div class="modal-footer" style="color:#63a033">
      Kindly select one to either login or register as a perticular user!!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  `
})

export class NgbdModalContent {
  constructor(public activeModal: NgbActiveModal, private router: Router) {}
  cust(){
    this.router.navigate(["/login" ]);
  }
  rest(){
    this.router.navigate(["/restaurant/login" ]);
  }
  delper(){
    this.router.navigate(["/deliveryperson/login"]);
  }
  admin(){
    this.router.navigate(["/admin/login" ]);
  }
}
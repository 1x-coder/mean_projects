import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() basic;
  @Input() movieActive;

  constructor() { }

  ngOnInit() {

    console.log(this.movieActive)
  }







}

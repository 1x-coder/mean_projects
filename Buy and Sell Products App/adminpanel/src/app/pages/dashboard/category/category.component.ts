import { Component, OnInit } from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private catser:CategoryService) { }

resData;

    
  ngOnInit() {
      this.catser.fetchCategories()
      .subscribe(res=>{
          console.log(res);
          this.resData = res;
          this.resData=this.resData.cdata;
      })
  }
    

}

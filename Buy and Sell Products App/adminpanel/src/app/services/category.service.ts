import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
    url="http://localhost:7000/api/"
    addCat(formData)
    {
        return this.http.post(this.url+"add_category",formData);
    }

    fetchCategories()
    {
        return this.http.get(this.url+'fetch_categories');
    }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
url= "http://localhost:7000/api/";
// url= "http://54.180.142.192:7000/api/"; //aws
  constructor(private http:HttpClient) { }


  getCarBikePreviewData(id)  
  	{
  		return this.http.post(this.url+'get_carbike_preview_data',id)
  	}

  countVisits(visitsData)
  	{
  		return this.http.post(this.url+'count_visits',visitsData);
  	}
}

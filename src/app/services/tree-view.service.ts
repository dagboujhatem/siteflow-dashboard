import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getNodes(){
    return this.http.get(`${this.baseURL}/nodes`);
  }
}

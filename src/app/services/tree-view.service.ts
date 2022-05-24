import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getAllNodes(){
    return this.http.get(`${this.baseURL}/nodes`);
  }

  createNewNode(data: any){
    return this.http.post(`${this.baseURL}/nodes`, data);
  }

  getNodeByID(id:number){
    return this.http.get(`${this.baseURL}/nodes/${id}`);
  }

  updateNodeByID(id:number, data:any){
    return this.http.put(`${this.baseURL}/nodes/${id}`, data);
  }

  deleteNodeByID(id:number){
    return this.http.delete(`${this.baseURL}/nodes/${id}`);
  }
}

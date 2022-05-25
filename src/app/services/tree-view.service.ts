import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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

  deleteConfirmation()
  {
    return Swal.fire({
      title: `Are you sure?`,
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4dbd74',
      cancelButtonColor: '#f86c6b',
      confirmButtonText: `<i class="fa fa-check" aria-hidden="true"></i> Yes, delete it!`,
      cancelButtonText: `<i class="fa fa-times" aria-hidden="true"></i> Cancel`
    });
  }

}

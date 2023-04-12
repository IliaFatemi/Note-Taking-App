import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Note {
  id: number;
  title: string;
  createdon: string;
  timelastmodified: string;
  notebody: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseURL:string = "http://localhost:3000/"

  constructor(private http:HttpClient) {}

  create_table(){
    return this.http.get(this.baseURL+'base', {responseType: 'text'});
  }

  getNotes(){
    return this.http.get(this.baseURL+'showNotes', {responseType:'json'});
  }

  deleteNotes(id:number){
    return this.http.delete(this.baseURL+`deleteNote/${id}`, {responseType: 'text'})
  }

  addNote(data:object){
    return this.http.post(this.baseURL+'addNote', data, {responseType:'text'})
  }

  updateNote(data:object){
    return this.http.put(this.baseURL+'updateNote', data, {responseType:'text'})
  }
}

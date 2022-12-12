import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(private http: HttpClient) { }
  
  postUser(user) {
    return this.http.post('http://127.0.0.1:5000/chatbot', user)
  }
}

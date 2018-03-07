import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  // newUserSubject = new Subject();

  constructor(private _http: HttpClient) { }

  addUser(user){
    return this._http.post('http://localhost:2000/register', user);
  }

  validateUser(user){
    return this._http.post('http://localhost:2000/login', user);
  }
}
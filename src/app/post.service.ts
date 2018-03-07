import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {

  newLikeSubject = new Subject();
  constructor(private _http: HttpClient) { }


  addPost(post){
    return this._http.post('http://localhost:2000/addNewPost', post);
  }

  validateUser(user){
    return this._http.post('http://localhost:2000/login', user);
  }

  getPosts(){
    return this._http.get('http://localhost:2000/getAllPost');
  }

  getPost(){
    return this._http.get('http://localhost:2000/getAllPost');
  }

  addLike(post){
    return this._http.post('http://localhost:2000/addLike', post);
  }

  addComment(post){
    return this._http.post('http://localhost:2000/addComment', post);
  }
}

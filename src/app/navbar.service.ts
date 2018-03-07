import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavbarService {

  private statusSubject = new Subject<boolean>();
  currentStatus = this.statusSubject.asObservable();
  
  private nameSubject = new Subject<string>();
  currentName = this.nameSubject.asObservable();
  constructor() { }

  changeStatus(status: boolean){
    status = !status;
    this.statusSubject.next(status);
  }

  saveUsername(username: string){
    this.nameSubject.next(username);
  }
}

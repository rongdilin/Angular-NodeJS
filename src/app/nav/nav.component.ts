import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NavbarService } from '../navbar.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy{
  status: boolean;
  username: string;
  constructor(private _router: Router, private _navbarService: NavbarService) { }

  ngOnInit() {
    this._navbarService.currentStatus.subscribe(status => this.status = status);
    this._navbarService.currentName.subscribe(username => this.username = username);
  }

  ngOnDestroy(){
  }

  logout(){
  }
  
}

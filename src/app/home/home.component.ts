import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data) => {
      this.username = data['username'];
    });
  }

}

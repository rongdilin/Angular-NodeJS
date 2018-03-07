import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {

  newUser: any = {};
  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
  }

  registerNewUser(){
    this._userService.addUser(this.newUser).subscribe(res => {
      if(res == "userExists"){
        alert("Username existed, please choose another one.");
      } else if(res == "userRegistered"){
        alert("Create User Successfully!");
        this._router.navigate(['/']);
      } else{
        alert(res);
      }
    });
  }
  backToLogin(){
    this._router.navigate(['/']);
  }
}

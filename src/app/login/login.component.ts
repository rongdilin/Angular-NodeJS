import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NavbarService } from'../navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any = {};
  status: boolean = false;
  constructor(private _router: Router, private _userService: UserService, 
    private _navService: NavbarService) { }

  ngOnInit() {
    
  }

  login(user){
    this._userService.validateUser(this.user).subscribe(res => {
      if(res['username'] == this.user.username){
        //alert("Log successfully!");
        this._router.navigate(['/home/' + this.user.username]);
      }
    });
    this._navService.changeStatus(this.status);
    console.log(this.status)
    this._navService.saveUsername(this.user.username);
 
  }
  register(){
    this._router.navigate(['/register']);
  }


}

// var user = {
//   "username": $scope.username,
//   "password": $scope.password,
// };
// $http.post('http://localhost:3000/login', user).success(function(data){
//   if(data.user.username == user.username){
//       $rootScope.user_type = data.user.user_type;
//       $rootScope.username = data.user.username;
//       $rootScope.flag = data.flag;
//       console.log($rootScope.flag)
//       $window.alert("Log successfully!");
//       $location.path('/home/' + user.username);
//   } else{
//       $window.alert(data);
//   }
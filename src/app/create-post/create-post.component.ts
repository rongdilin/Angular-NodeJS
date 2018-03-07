import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: any = {};
  username: string;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _postService: PostService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data) => {
      this.username = data['username'];
    });
  }

  savePost(){
    this._postService.addPost(this.post).subscribe(res => {
      if(res == "postSaved"){
        alert("Create Post Successfully!");
        this.backToHome();
      } else{
        alert(res);
      }
    });
  }
  backToHome(){
    this._router.navigate(['/home/' + this.username]);
  }
}

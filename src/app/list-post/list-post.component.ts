import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit{
  posts: any;
  comment: any= {};
  username: string;
  constructor(private _postService: PostService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });

    this._activatedRoute.params.subscribe((data) => {
      this.username = data['username'];
    });
  }

  showComments(post){
    post.showFlag = !post.showFlag;
  }
  
  increaseLike(post){
    post.like += 1;
    this._postService.addLike(post).subscribe((res) => {
      console.log(res);
    });
  }

  showAddComment(post){
    post.showAddCommentFlag = !post.showAddCommentFlag;
  }

  AddComment(post){
    post.comment = {
      user: this.username,
      message: this.comment.message
    }
    this._postService.addComment(post);
    
  }
}

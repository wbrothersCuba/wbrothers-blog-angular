import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService,UserService]
})
export class PostListComponent implements OnInit {
 @Input() posts;
 @Input() identity;
 @Input() url;
 public token;

 constructor(
   private _postService: PostService,
   private _userService: UserService
 ) {
   this.token = this._userService.getToken();
 }

  ngOnInit() {
  }

  getPost() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
        }
      }, error => {
        console.log(error);
      }
    );
  }
  
  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPost();
      },
      error => {
        console.log(error);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post';
import { PostService } from '../../Services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public identity;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.identity = this._userService.getIdentity()
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._postService.getPost(id).subscribe(
        respose => {
          if (respose.status == 'success') {
            this.post = respose.post;
          } else {
            this._router.navigate(['inicio']);
          }

        }, error => {
          console.log(error);
          this._router.navigate(['inicio']);
        }
      );
    });
  }

}

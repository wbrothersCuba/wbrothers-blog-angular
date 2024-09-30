import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../Models/category';
import { CategoryService } from '../../Services/category.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PostService } from '../../Services/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title: string;
  public category: Category;
  public posts: any;
  public url: string;
  public identity: string;
  public token: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.url = global.url;
    this.page_title = 'List of posts by category',
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getPostsByCategory();
  }

  getPostsByCategory() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._categoryService.getCategory(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.category = response.category;
            this._categoryService.getPosts(id).subscribe(
              response => {
                if (response.status == 'success') {
                  this.posts = response.posts;
                } else {
                  this._router.navigate(['/inicio']);
                }
              }, error => {
                console.log(error);
              }
            );
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        }
      )
    });
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

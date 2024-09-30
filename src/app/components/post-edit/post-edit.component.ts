import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../Services/category.service';
import { Post } from '../../Models/post';
import { global } from '../../services/global';
import { PostService } from '../../Services/post.service';


@Component({
  selector: 'post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['../post-new/post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public indentity;
  public token;
  public post: Post;
  public categories;
  public status;
  public is_edit: boolean;
  public url:string;
  public froala_options: Object = {
    charCounterCount: true,
    language: 'en',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "20",
    uploadAPI: {
      url: global.url + 'post/upload',
      method: "POST",
      headers: {
        "Authorization": this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Upload your user avatar'
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
  ) {
    this.page_title = "Editar entrada";
    this.indentity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit=true;
    this.url = global.url;
  }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.indentity.sub, 1, '', '', null, null);
    this.getPost();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  imageUpload(data) {
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }

  onSubmit(form) {
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this._router.navigate(['/entrada', this.post.id]);
        } else {
          this.status = 'error';
        }
      }, error => {
        console.log(error);
        this.status = 'error';
      }
    )
  }


  getPost() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._postService.getPost(id).subscribe(
        respose => {
          if (respose.status == 'success') {
            this.post = respose.post;
            if(this.post.user_id != this.indentity.sub)
              this._router.navigate(['inicio']);
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

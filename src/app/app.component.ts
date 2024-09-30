import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './Services/user.service';
import { global } from './Services/global';
import { CategoryService } from './Services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Wbrother\'s blog';
  public identity;
  public token;
  public url;
  public categories;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.loadUser
    this.url = global.url;
  }

  ngOnInit() {
    this.getCategories();
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }
      }, 
      error => {
        console.log(error);
      }
    );
  }

}

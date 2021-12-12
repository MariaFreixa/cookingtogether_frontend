import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public isSignedIn: boolean;
  public categories: Category[];

  constructor(private auth: AuthStateService, public router: Router, public token: TokenService, public categoryService: CategoryService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
    this.categoryService.getAllCategories().subscribe((response: Category[]) => {
      this.categories = response;
    });
  }

  selectedCategory(event) {
    let id = event.target.value;
    this.router.navigate([`categoria/${id}`]);
  }

  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { Complexity } from 'src/app/shared/models/complexity.model';
import { AuthStateService } from 'src/app/shared/services/auth-state.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ComplexityService } from 'src/app/shared/services/complexity.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../shared/services/recipe.service';

@Component({
  selector: 'app-ultimas-recetas',
  templateUrl: './ultimas-recetas.component.html',
  styleUrls: ['./ultimas-recetas.component.scss']
})
export class UltimasRecetasComponent implements OnInit {
  public recipes: Recipe[] = [];
  public isSignedIn: boolean = false;

  constructor(public recipeService: RecipeService, private sanitizer: DomSanitizer, private authStateService: AuthStateService, private token: TokenService, public categoryService: CategoryService, public complexityService: ComplexityService, public router: Router) {}

  ngOnInit(): void { 
    this.getUserAuthState();
    this.getData();
  }

  getUserAuthState() {
    this.authStateService.userAuthState.subscribe(val => {
      console.log("userAuthState: ", val);
      this.isSignedIn = val;
    });
  }

  getData() {
    this.recipeService.getLatestRecipes().subscribe((recipes) => {
      recipes.forEach(recipe => {
        let objectURL = 'data:image/jpeg;base64,' + recipe.main_image;
        recipe.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        this.recipeService.getRatings(recipe.id).subscribe((rating) => {
          recipe.rating = rating;
        });

        this.categoryService.getAllCategories().subscribe((response: Category[]) => {
          response.forEach(category => {
            if(category.id == recipe.id_category) recipe.category = category.category;
          });
        });
    
        this.complexityService.getAllComplexity().subscribe((response: Complexity[]) => {
          response.forEach(complexity => {
            if(complexity.id == recipe.id_complexity) recipe.complexity = complexity.complexity;
          });
        });
      });
      this.recipes = recipes;
    });

    if(this.isSignedIn) {
      this.recipeService.getFav().subscribe((recipesFav) => {
         recipesFav.forEach((recipeFav) => {
          this.recipes.forEach((recipe) => {
            if(recipe.id === recipeFav.id) {
              recipe.userFavorite = true;
            }
          })
        });
      });
    }
  }

  setFavorite(event : any, accion: string) {
    if(accion === "fav") {
      this.recipes.forEach((recipe) => {
        if(recipe.id == event.target.id && (recipe.userFavorite == undefined || !recipe.userFavorite)) {
          recipe.userFavorite = true;
          this.recipeService.setFavorite(event.target.id).subscribe();
        }
      });
    } else {
      this.recipes.forEach((recipe) => {
        if(recipe.id == event.target.id && recipe.userFavorite) {
          recipe.userFavorite = false;
          this.recipeService.removeFavorite(event.target.id).subscribe();
        }
      });
    }
  }

  onRateChange(event: number, RecipeId: number) {
    let newRating = {id: RecipeId, rating: event };
    if(typeof newRating.rating == "number" && isNaN(newRating.rating) == false) this.recipeService.setRating(newRating).subscribe();
  }
}

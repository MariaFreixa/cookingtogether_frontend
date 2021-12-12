import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AuthStateService } from 'src/app/shared/services/auth-state.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ComplexityService } from 'src/app/shared/services/complexity.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  public recipes: Recipe[] = [];
  public isSignedIn: boolean = false;
  public subscription;

  constructor(private route: ActivatedRoute, public recipeService: RecipeService, private sanitizer: DomSanitizer, private authStateService: AuthStateService, public categoryService: CategoryService, public complexityService: ComplexityService) {}

  ngOnInit(): void {
    this.getUserAuthState();
    this.getData();
  }

  getUserAuthState() {
    this.authStateService.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

  getData() {
    this.subscription = this.route.params.subscribe(params => {
      this.recipeService.getRecipesByCategory(params['id']).subscribe((recipes) => {
        this.recipes = recipes;
        recipes.forEach(element => {
          let objectURL = 'data:image/jpeg;base64,' + element.main_image;
          element.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.recipeService.getRatings(element.id).subscribe((rating) => {
            element.rating = rating;
          })
        });
        this.recipes = recipes;
      });
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

  //To prevent memory leak
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from 'src/app/shared/models/category.model';
import { Complexity } from 'src/app/shared/models/complexity.model';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AuthStateService } from 'src/app/shared/services/auth-state.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ComplexityService } from 'src/app/shared/services/complexity.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  filterSearchForm: FormGroup;
  public recipes: Recipe[] = [];
  public categories: Category[];
  public complexity: Complexity[];
  public isSignedIn: boolean = false;
  
  constructor(private sanitizer: DomSanitizer, private authStateService: AuthStateService, public recipeService: RecipeService, public categoryService: CategoryService, public complexityService: ComplexityService, public fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initForm();
    this.getUserAuthState();
    this.getData();
  }

  initForm() {
    this.filterSearchForm = this.fb.group({
      'name': [''],
      'diners': [''],
      'id_category': [''],
      'id_complexity': ['']
    });
  }

  getUserAuthState() {
    this.authStateService.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

  getData() {
    this.categoryService.getAllCategories().subscribe((response: Category[]) => {
      this.categories = response;
    });
    this.complexityService.getAllComplexity().subscribe((response: Complexity[]) => {
      this.complexity = response;
    });
  }

  onSubmit() {
    if(this.filterSearchForm.value.name == "") {
      this.filterSearchForm.value.name = null;
    }
    if(this.filterSearchForm.value.diners == "") {
      this.filterSearchForm.value.diners = null;
    }
    if(this.filterSearchForm.value.id_category == "") {
      this.filterSearchForm.value.id_category = null;
    }
    if(this.filterSearchForm.value.id_complexity == "") {
      this.filterSearchForm.value.id_complexity = null;
    }

    this.recipeService.searchRecipe(this.filterSearchForm.value).subscribe(response => {
      response.forEach(recipe => {
        let objectURL = 'data:image/jpeg;base64,' + recipe.main_image;
        recipe.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        this.recipeService.getRatings(recipe.id).subscribe((rating) => {
          recipe.rating = rating;
        });

        this.categories.forEach(category => {
          if(category.id == recipe.id_category) recipe.category = category.category;
        });
  
        this.complexity.forEach(complexity => {
          if(complexity.id == recipe.id_complexity) recipe.complexity = complexity.complexity;
        });
      });
      this.recipes = response;
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

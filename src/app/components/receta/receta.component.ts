import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { Complexity } from 'src/app/shared/models/complexity.model';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AuthStateService } from 'src/app/shared/services/auth-state.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ComplexityService } from 'src/app/shared/services/complexity.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit {
  public receta: Recipe = new Recipe();
  public isSignedIn: boolean = false;
  public subscription;
  public title: string;
  recipeCategory = 1;
  recipeThumb= '';
  recipeName = 'prueba'
  recipeIngredients = ['hola', 'vale', 'prueba'];
  recipeInstructions = ['hola', 'vale', 'prueba'];
  recipeYoutubeLink = '';


  constructor(private route: ActivatedRoute, public recipeService: RecipeService, private sanitizer: DomSanitizer, private authStateService: AuthStateService, public categoryService: CategoryService, public complexityService: ComplexityService) { }

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
      this.recipeService.getRecipeById(params['id']).subscribe((recipe) => {
        this.title = recipe.name;

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
        this.receta = recipe;
      });
    });
  }
}

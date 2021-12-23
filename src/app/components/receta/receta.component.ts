import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/shared/models/category.model';
import { Complexity } from 'src/app/shared/models/complexity.model';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AuthStateService } from 'src/app/shared/services/auth-state.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ComplexityService } from 'src/app/shared/services/complexity.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { Step } from '../../shared/models/step.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Comment } from '../../shared/models/comment.model';


@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit {
  public recipe: Recipe = new Recipe();
  public isSignedIn: boolean = false;
  public subscription;
  public title: string;
  public ingredients: Ingredient[] = [];
  public steps: Step[] = [];
  public comments: Comment[] = [];
  public commentForm: FormGroup;
  public errors = null;
  public recipeYoutubeLink = '';
  //pagination
  public collectionSize: number;
  public page = 1;
  public pageSize = 3;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public recipeService: RecipeService, private sanitizer: DomSanitizer, private authStateService: AuthStateService, public categoryService: CategoryService, public complexityService: ComplexityService, public commentService: CommentService) { 
    this.commentForm = this.fb.group({
      comment: []
    });
  }

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
    let recipeInfo;
    let ingredientsInfo;
    let stepsInfo;
    this.subscription = this.route.params.subscribe(params => {
      this.commentService.getCommentsByRecipeId(params['id']).subscribe((response) => {
        this.comments = response;
        this.collectionSize = response.length;
      });
      this.recipeService.getFullRecipeById(params['id']).subscribe((response) => {
        ingredientsInfo = response['ingredients'];
        stepsInfo = response['steps'];
        recipeInfo = response['recipe'];

        this.title = recipeInfo.name;

        let objectURL = 'data:image/jpeg;base64,' + recipeInfo.main_image;
        recipeInfo.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        recipeInfo.video = recipeInfo.video.replace("watch?v=", "embed/"); 

        recipeInfo.safeVideo = this.sanitizer.bypassSecurityTrustResourceUrl(recipeInfo.video);

        this.recipeService.getRatings(params['id']).subscribe((rating) => {
          recipeInfo.rating = rating;
        });

        this.categoryService.getAllCategories().subscribe((response: Category[]) => {
          response.forEach(category => {
            if(category.id == recipeInfo.id_category) recipeInfo.category = category.category;
          });
        });
    
        this.complexityService.getAllComplexity().subscribe((response: Complexity[]) => {
          response.forEach(complexity => {
            if(complexity.id == recipeInfo.id_complexity) recipeInfo.complexity = complexity.complexity;
          });
        });
        
        if(this.isSignedIn) {
          this.recipeService.getFav().subscribe((recipesFav) => {
            recipesFav.forEach((recipeFav) => {
              if(recipeInfo.id == recipeFav.id) {
                recipeInfo.userFavorite = true;
              }
            });
          });
        }

        this.recipe = recipeInfo;
        this.ingredients = ingredientsInfo;
        this.steps = stepsInfo;
      });
    });
  }

  setFavorite(event : any, accion: string) {
    if(accion === "fav") {
      if(this.recipe.id == event.target.id && (this.recipe.userFavorite == undefined || !this.recipe.userFavorite)) {
        this. recipe.userFavorite = true;
        this.recipeService.setFavorite(event.target.id).subscribe();
      }
    } else {
      if(this.recipe.id == event.target.id && this.recipe.userFavorite) {
        this.recipe.userFavorite = false;
        this.recipeService.removeFavorite(event.target.id).subscribe();
      }
    }
  }

  onRateChange(event: number) {
    let newRating = {id: this.recipe.id, rating: event };
    if(typeof newRating.rating == "number" && isNaN(newRating.rating) == false) this.recipeService.setRating(newRating).subscribe();
  }

  onSubmit() {
    let comment = {comment: this.commentForm.value.comment, id: this.recipe.id}
    this.recipeService.setComment(comment).subscribe(
      result => {
        this.actualizarComentarios();
      },
      error => {
        this.errors = error.error;
      },() => {
        this.commentForm.reset()
      }
    );
  }

  //To prevent memory leak
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  actualizarComentarios() {
    this.commentService.getCommentsByRecipeId(this.recipe.id).subscribe((response) => {
      this.comments = response;
      this.collectionSize = response.length;
    });
  }
}

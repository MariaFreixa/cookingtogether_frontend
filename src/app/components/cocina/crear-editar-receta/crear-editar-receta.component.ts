import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { Complexity } from 'src/app/shared/models/complexity.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ComplexityService } from 'src/app/shared/services/complexity.service';

@Component({
  selector: 'app-crear-editar-receta',
  templateUrl: './crear-editar-receta.component.html',
  styleUrls: ['./crear-editar-receta.component.scss']
})
export class CrearEditarRecetaComponent implements OnInit {
  public recipeForm: FormGroup;
  public errors = null;
  public editMode = false;
  public id = null;
  public categories: Category[];
  public complexity: Complexity[];
  public selectedImage: any = '';
  public disabledSubmit: boolean = false;
  //edit mode
  public recipeId = null;
  public title = '';
  public subButton = '';

  constructor(private route: ActivatedRoute, public router: Router, public fb: FormBuilder, public recipeService: RecipeService, public categoryService: CategoryService, public complexityService: ComplexityService) {}

  ngOnInit() { 
    this.getRecipeId();
    this.getData();
    this.initForm();
  }

  getRecipeId() {
    if(this.route.snapshot.paramMap.get('id')) {
      this.recipeId = this.route.snapshot.paramMap.get('id');
      this.title = 'Editar receta';
      this.subButton = 'Editar receta';
    } else {
      this.title = 'Nueva receta';
      this.subButton = 'Crear nueva receta';
    }
  }

  getData() {
    this.categoryService.getAllCategories().subscribe((response: Category[]) => {
      this.categories = response;
    });
    this.complexityService.getAllComplexity().subscribe((response: Complexity[]) => {
      this.complexity = response;
    });
  }

  private initForm() {
    let recipeIngredients = new FormArray([]);
    let steps = new FormArray([]);

    if(this.recipeId == null) {
      this.recipeForm = this.fb.group({
        'name': ['', [Validators.required]],
        'diners': ['', [Validators.required]],
        'video': ['', [Validators.required]],
        'id_category': ['', [Validators.required]],
        'id_complexity': ['', [Validators.required]],
        'ingredients': recipeIngredients,
        'steps': steps,
        'main_image': []
      });
    } else {
      const recipe = this.recipeService.getFullRecipeById(this.recipeId).subscribe((response) => {
        if (response['ingredients']) {
          for (let ingredient of response.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'ingredient': new FormControl(ingredient.ingredient, Validators.required)
              })
            );
          }
        }
  
        if (response['steps']) {
          for (let step of response.steps) {
            steps.push(
              new FormGroup({
                'step': new FormControl(step.step, Validators.required)
              })
            );
          }
        }
  
        this.recipeForm = this.fb.group({
          'name': [response.recipe.name, [Validators.required]],
          'diners': [response.recipe.diners, [Validators.required]],
          'video': [response.recipe.video, [Validators.required]],
          'id_category': [response.recipe.id_category, [Validators.required]],
          'id_complexity': [response.recipe.id_complexity, [Validators.required]],
          'ingredients': recipeIngredients,
          'steps': steps,
          'main_image': [response.recipe.main_image]
        });
      });
    }
  }

  onImageChange(event) {
    this.selectedImage = event.target.files[0];
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'ingredient': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddStep() {
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormGroup({
        'step': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }

  onSubmit() {
    var recipe = new FormData();
    recipe.append('main_image', this.selectedImage);
    recipe.append('name', this.recipeForm.value.name);
    recipe.append('diners', this.recipeForm.value.diners);
    recipe.append('video', this.recipeForm.value.video);
    recipe.append('id_category', this.recipeForm.value.id_category);
    recipe.append('id_complexity', this.recipeForm.value.id_complexity);
    console.log(this.recipeForm.value.ingredients);

    this.recipeForm.value.ingredients.forEach((ingredient, i) => {
      if(ingredient.ingredient != null && ingredient.ingredient != "") {
        recipe.append(`ingredients[${i}]`, JSON.stringify(ingredient))
      };
    });

    this.recipeForm.value.steps.forEach((step, i) => {
      if(step.step != null || step.step != "") {
        recipe.append(`steps[${i}]`, step.step)
      }
    });

    if(this.recipeId != null) {
      recipe.append('id', this.recipeId);
      this.recipeService.updateRecipe(recipe).subscribe(
        result => {
          console.log(result)
        },
        error => {
          this.errors = error.error;
        },
        () => {
          this.recipeForm.reset()
          this.router.navigate(['cocina']);
        }
      )
    } else {
      this.recipeService.newRecipe(recipe).subscribe(
        result => {
          console.log(result)
        },
        error => {
          console.log("error: ", error);
          this.errors = error.error;
        },
        () => {
          this.recipeForm.reset()
          this.router.navigate(['cocina']);
        }
      )
    }
  }
}

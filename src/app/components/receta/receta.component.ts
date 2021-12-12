import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit {
  public id: number = 1;
  public receta: Recipe;

  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.recipeService.getRecipeById(this.id).subscribe((recipe) => {
    });
  }

}

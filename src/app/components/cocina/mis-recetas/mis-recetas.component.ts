import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.component.html',
  styleUrls: ['./mis-recetas.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class MisRecetasComponent implements OnInit {
  public misRecetas: Recipe[] = [];
  public misRecetasFavoritas: Recipe[] = [];
  public recetaSeleccionada: Recipe;
  //paginacion
  pageMisRecetas = 1;
  pageSizeMisRecetas = 5;
  collectionSizeMisRecetas: number;
  pageMisRecetasFavoritas = 1;
  pageSizeMisRecetasFavoritas = 5;
  collectionSizeMisRecetasFavoritas: number;

  constructor(public recipeService: RecipeService, private modalService: NgbModal) {}

  ngOnInit(): void { 
    this.getMisRecetas();
    this.getMisRecetasFavoritas();
  }

  getMisRecetas() {
    this.recipeService.getMyRecipes().subscribe((recipes) => {
      this.misRecetas = recipes;
      this.collectionSizeMisRecetas = recipes.length;
    });
  }

  getMisRecetasFavoritas() {
    this.recipeService.getFav().subscribe((recipes) => {
      this.misRecetasFavoritas = recipes;
      this.collectionSizeMisRecetasFavoritas = recipes.length;
    });
  }

  openModal(content, item) {
    this.recetaSeleccionada = item;
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  eliminarFavoritos() {
    this.modalService.dismissAll();
    this.recipeService.removeFavorite(this.recetaSeleccionada.id).subscribe(data => {
      var i = this.misRecetasFavoritas.indexOf(this.recetaSeleccionada);
      var e = this.misRecetas.indexOf(this.recetaSeleccionada);
      if ( i !== -1 ) {
        this.misRecetasFavoritas.splice( i, 1 );
      }
      if ( e !== -1 ) {
        this.misRecetas.splice( e, 1 );
      }
    }, err => {
        console.log("error: ", err);
    });
  }

  eliminarReceta() {
    this.modalService.dismissAll();
    this.recipeService.removeRecipe(this.recetaSeleccionada.id).subscribe(data => {
      var i = this.misRecetas.indexOf(this.recetaSeleccionada);
      if ( i !== -1 ) {
        this.misRecetas.splice( i, 1 );
      }
    }, err => {
        console.log("error: ", err);
    });
  }
}

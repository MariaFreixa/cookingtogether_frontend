import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  private urlHeroku: string = "https://cookingtogether01.herokuapp.com/api/auth/";
  private urllocalhost: string = "http://127.0.0.1:8000/api/auth/";

  constructor(private http: HttpClient) { }

  // recuperamos la imagen avatar del usuario
  getLatestRecipes(): Observable<any> {
    return this.http.get(this.urllocalhost + 'latest');
  }

  //recueperamos la receta por id
  getRecipeById(id: number): Observable<any> {
    return this.http.get(this.urllocalhost + `recipe/${id}`);
  }

  //recueperamos la receta completa por id
  getFullRecipeById(id: number): Observable<any> {
    return this.http.get(this.urllocalhost + `full-recipe/${id}`);
  }

  //recuperamos las recetas favoritas del usuario
  getFav(): Observable<any> {
    return this.http.get(this.urllocalhost + `favorites`);
  }

  //recuperamos las puntuaciones de las recetas
  getRatings(id: number): Observable<any> {
    return this.http.get(this.urllocalhost + `ratings/${id}`);
  }

  //recuperamos las recetas mas puntuadas
  getMoreRated(): Observable<any> {
    return this.http.get(this.urllocalhost + `more-rated`);
  }

  //recuperamos las recetas por categoria
  getRecipesByCategory(id: number):Observable<any> {
    return this.http.get(this.urllocalhost + `recipes-category/${id}`);
  }

  //recuperamos las recetas del usuario
  getMyRecipes():Observable<any> {
    return this.http.get(this.urllocalhost + `my-recipes`);
  }

  //creamos receta nueva
  newRecipe(recipe: any):Observable<any> {
    return this.http.post(this.urllocalhost + `new-recipe`, recipe);
  }

  //actualizamos la receta
  updateRecipe(recipe: any):Observable<any> {
    return this.http.post(this.urllocalhost + `update-recipe`, recipe);
  }

  //añadimos receta a favoritos del usuario
  setFavorite(id: any):Observable<any> {
    return this.http.get(this.urllocalhost + `favorite-recipe/${id}`);
  }

  //quitamos la receta de favoritos del usuario
  removeFavorite(id: any):Observable<any> {
    return this.http.get(this.urllocalhost + `remove-favorite-recipe/${id}`);
  }

  //actualizamos la puntuacion de la receta
  setRating(recipe: any):Observable<any> {
    return this.http.post(this.urllocalhost + `set-rating`, recipe);
  }

  //Eliminamos la receta de la BDD
  removeRecipe(id: any):Observable<any> {
    return this.http.get(this.urllocalhost + `remove-recipe/${id}`);
  }

  //Buscamos una receta con filtros
  searchRecipe(filters: any):Observable<any> {
    return this.http.post(this.urllocalhost + `search-recipe`, filters);
  }
}
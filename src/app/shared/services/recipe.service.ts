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
    return this.http.get(this.urlHeroku + 'latest');
  }

  //recueperamos la receta por id
  getRecipeById(id: number): Observable<any> {
    return this.http.get(this.urlHeroku + `recipe/${id}`);
  }

  //recueperamos la receta completa por id
  getFullRecipeById(id: number): Observable<any> {
    return this.http.get(this.urlHeroku + `full-recipe/${id}`);
  }

  //recuperamos las recetas favoritas del usuario
  getFav(): Observable<any> {
    return this.http.get(this.urlHeroku + `favorites`);
  }

  //recuperamos las puntuaciones de las recetas
  getRatings(id: number): Observable<any> {
    return this.http.get(this.urlHeroku + `ratings/${id}`);
  }

  //recuperamos las recetas mas puntuadas
  getMoreRated(): Observable<any> {
    return this.http.get(this.urlHeroku + `more-rated`);
  }

  //recuperamos las recetas por categoria
  getRecipesByCategory(id: number):Observable<any> {
    return this.http.get(this.urlHeroku + `recipes-category/${id}`);
  }

  //recuperamos las recetas del usuario
  getMyRecipes():Observable<any> {
    return this.http.get(this.urlHeroku + `my-recipes`);
  }

  //creamos receta nueva
  newRecipe(recipe: any):Observable<any> {
    return this.http.post(this.urlHeroku + `new-recipe`, recipe);
  }

  //actualizamos la receta
  updateRecipe(recipe: any):Observable<any> {
    return this.http.post(this.urlHeroku + `update-recipe`, recipe);
  }

  //añadimos receta a favoritos del usuario
  setFavorite(id: any):Observable<any> {
    return this.http.get(this.urlHeroku + `favorite-recipe/${id}`);
  }

  //quitamos la receta de favoritos del usuario
  removeFavorite(id: any):Observable<any> {
    return this.http.get(this.urlHeroku + `remove-favorite-recipe/${id}`);
  }

  //actualizamos la puntuacion de la receta
  setRating(recipe: any):Observable<any> {
    return this.http.post(this.urlHeroku + `set-rating`, recipe);
  }

  //Eliminamos la receta de la BDD
  removeRecipe(id: any):Observable<any> {
    return this.http.get(this.urlHeroku + `remove-recipe/${id}`);
  }

  //Buscamos una receta con filtros
  searchRecipe(filters: any):Observable<any> {
    return this.http.post(this.urlHeroku + `search-recipe`, filters);
  }

  //Guardamos el comentario del usuario
  setComment(comment: any):Observable<any> {
    return this.http.post(this.urlHeroku + `set-comment`, comment);
  }
}
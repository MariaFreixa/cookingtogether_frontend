import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  constructor(private http: HttpClient) { }

  // recuperamos la imagen avatar del usuario
  getLatestRecipes(): Observable<any> {
    return this.http.get('https://cookingtogether01.herokuapp.com/api/auth/latest');
  }

  //recueperamos la receta por id
  getRecipeById(id: number): Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/recipe/${id}`);
  }

  //recueperamos la receta completa por id
  getFullRecipeById(id: number): Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/full-recipe/${id}`);
  }

  //recuperamos las recetas favoritas del usuario
  getFav(): Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/favorites`);
  }

  //recuperamos las puntuaciones de las recetas
  getRatings(id: number): Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/ratings/${id}`);
  }

  //recuperamos las recetas mas puntuadas
  getMoreRated(): Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/more-rated`);
  }

  //recuperamos las recetas por categoria
  getRecipesByCategory(id: number):Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/recipes-category/${id}`);
  }

  //recuperamos las recetas del usuario
  getMyRecipes():Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/my-recipes`);
  }

  //creamos receta nueva
  newRecipe(recipe: any):Observable<any> {
    return this.http.post(`https://cookingtogether01.herokuapp.com/api/auth/new-recipe`, recipe);
  }

  //actualizamos la receta
  updateRecipe(recipe: any):Observable<any> {
    return this.http.post(`https://cookingtogether01.herokuapp.com/api/auth/update-recipe/`, recipe);
  }

  //añadimos receta a favoritos del usuario
  setFavorite(id: any):Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/favorite-recipe/${id}`);
  }

  //quitamos la receta de favoritos del usuario
  removeFavorite(id: any):Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/remove-favorite-recipe/${id}`);
  }

  //actualizamos la puntuacion de la receta
  setRating(recipe: any):Observable<any> {
    return this.http.post(`https://cookingtogether01.herokuapp.com/api/auth/set-rating/`, recipe);
  }

  //Eliminamos la receta de la BDD
  removeRecipe(id: any):Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/remove-recipe/${id}`);
  }
}
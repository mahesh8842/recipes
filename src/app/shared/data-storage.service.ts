import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'
})
export class datastorageservice{
  constructor(private http: HttpClient,
              private recipeservice:RecipeService,private authservice:AuthService) { 
  }
  storerecipes() {
    const recipes = this.recipeservice.getRecipes();
    this.http.put(
      'https://recipes-36dee.firebaseio.com/recipes.json',
      recipes).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
  fetchdata() {
        return this.http.get<Recipe[]>(
          'https://recipes-36dee.firebaseio.com/recipes.json',
          
        ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        })
      }), tap(recipes => {
        this.recipeservice.setRecipes(recipes);
      })
    );  
  }
  
 }
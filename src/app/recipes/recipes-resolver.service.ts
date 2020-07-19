import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { datastorageservice } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn:'root'
})
export class recipeResolverService implements Resolve<Recipe[]>{
  constructor(private datastorage: datastorageservice,
              private recipeservice:RecipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeservice.getRecipes();
    if (recipes.length === 0) {
      return this.datastorage.fetchdata();
    } else {
      return recipes;
    }
  }
}
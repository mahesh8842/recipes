import { Recipe } from './recipe.model';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs/internal/Subject';


@Injectable()
export class RecipeService{

  recipechanged = new Subject<Recipe[]>();

  //private recipes: Recipe[] = [
    /**  new Recipe(' Wings & Fries',
      'delicious wings with crunchy fries with yummy sauce',
      'https://c1.wallpaperflare.com/preview/636/54/477/chicken-nuggets-fries-dip-sauce.jpg',
      [
        new Ingredient('fries', 20),
        new Ingredient('wings',10)
    ]),
    new Recipe('Hamburger',
      'delicious burger with stuffed meat',
      'https://live.staticflickr.com/65535/48436448591_9dc8a78ee2_b.jpg',
      [
        new Ingredient('buns', 2),
        new Ingredient('meat', 2),
        new Ingredient('spinach',4)
    ])
  ];*/
  private recipes: Recipe[] = [];
  constructor(private shoppingservice: ShoppingService) { }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addingredientstoshoppinglist(ingredients: Ingredient[]) {
    this.shoppingservice.addingredients(ingredients);
  }
  addrecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipechanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipechanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipechanged.next(this.recipes.slice());
  }
  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipechanged.next(this.recipes.slice());
  }
}
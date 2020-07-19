import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
export class ShoppingService{
  ingredientschanged = new Subject<Ingredient[]>();
  itemedited = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('apples',5),new Ingredient('tomato',10)
  ];
  getingredient() {
    return this.ingredients.slice();
  }
  addingredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientschanged.next(this.ingredients.slice());
  }
  addingredients(ingredients:Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientschanged.next(this.ingredients.slice());
    
  }
  get_Ingredient(index:number) {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientschanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientschanged.next(this.ingredients.slice());
  }
}
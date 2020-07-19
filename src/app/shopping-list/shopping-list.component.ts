import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[];
  private sub :Subscription;
  
  constructor(private shoppingservice:ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingservice.getingredient();
    this.sub=this.shoppingservice.ingredientschanged
      .subscribe((ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
    })
  }
  onedititem(index:number) {
    this.shoppingservice.itemedited.next(index);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

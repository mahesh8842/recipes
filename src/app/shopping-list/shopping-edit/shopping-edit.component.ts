import { Component, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  editingmode = false;
  editingItemIndex: number;
  editingItem: Ingredient;
  @ViewChild('f') shoppingform: NgForm;

  constructor(private shoppingservice:ShoppingService) { }

  ngOnInit(): void {
    this.shoppingservice.itemedited.subscribe(
      (index: number) =>{
      this.editingmode = true;
      this.editingItemIndex = index;
        this.editingItem = this.shoppingservice.get_Ingredient(index);
        this.shoppingform.setValue({
          name: this.editingItem.name,
          amount:this.editingItem.amount
        })
  } );
  }
  oningredientadded(form: NgForm) {
    const value = form.value;
    const newingredient = new Ingredient(value.name, value.amount);
    if (this.editingmode) {
      this.shoppingservice.updateIngredient(this.editingItemIndex, newingredient);
    }
    else {
      this.shoppingservice.addingredient(newingredient);
    }
    this.shoppingform.reset();
    this.editingmode = false;
  }
  onclear() {
    this.shoppingform.reset();
    this.editingmode = false;
  }
  ondelete() {
    this.shoppingservice.deleteIngredient(this.editingItemIndex);
    this.onclear();
    
    
  }
  }
  

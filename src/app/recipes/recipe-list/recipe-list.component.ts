import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  @Output() sendingrecipe = new EventEmitter<Recipe>();
  subscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeservice: RecipeService,
    private route: Router,
    private routes:ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription=this.recipeservice.recipechanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    );
    this.recipes = this.recipeservice.getRecipes();
  }
  onrecipeselected(recipe:Recipe) {
    this.sendingrecipe.emit(recipe)
  }
  onnewrecipe() {
    this.route.navigate(['new'], { relativeTo:this.routes});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

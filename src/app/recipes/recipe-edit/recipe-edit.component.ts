import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm : FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeservice:RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.editmode = param['id'] != null;
        this.initForm();
      }
    );
  }
  onsubmit() {
    //const newRecipe = new Recipe(
     // this.recipeForm.value['name'],
     // this.recipeForm.value['description'],
      //this.recipeForm.value['imagePath'],
      //this.recipeForm.value['Ingredients']
    //);
    //here instead of creating a new recipe we can send theh whole form
    //since it has the same parameters 
    if (this.editmode) {
      this.recipeservice.updateRecipe(this.id,this.recipeForm.value)
    } else {
      this.recipeservice.addrecipe(this.recipeForm.value);
    }
    console.log(this.recipeForm.value['ingredients'])
    this.oncancel();
  }
  onaddingredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount':new FormControl(null,
          [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
    )
  }
  ondeleteingredient(index:number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  oncancel() {
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  private initForm() {
    let recipeName = '';
    let recipeImgpath = '';
    let Description = '';
    let recipeIngredients = new FormArray([]);
    if (this.editmode) {
      const recipe = this.recipeservice.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgpath = recipe.imagePath;
      Description = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          console.log(ingredient.name, ingredient.amount);
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,
              [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        } 
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImgpath,Validators.required),
      'description':new FormControl(Description,Validators.required),
      'ingredients':recipeIngredients
    })
    
  }
  getcontrols() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}

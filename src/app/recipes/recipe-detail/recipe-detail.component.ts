import { Component ,OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeservice: RecipeService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
  
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.recipe = this.recipeservice.getRecipe(this.id);
        //console.log('after editing',this.recipe.ingredients);
      }
    );
    
  }

  onaddtoshoppinglist() {
    this.recipeservice.addingredientstoshoppinglist(this.recipe.ingredients);
  }
  oneditrecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  ondeleteRecipe() {
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}

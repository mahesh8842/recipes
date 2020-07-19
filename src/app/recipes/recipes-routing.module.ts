import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeBlankComponent } from './recipe-blank/recipe-blank.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { recipeResolverService } from './recipes-resolver.service';

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', component: RecipeBlankComponent },
      {path:'new',component:RecipeEditComponent},
      { path: ':id', component: RecipeDetailComponent,resolve:[recipeResolverService] },
      {path:':id/edit',component:RecipeEditComponent,resolve:[recipeResolverService]}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class RecipesRoutingModule{

}
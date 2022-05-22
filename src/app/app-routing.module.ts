import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'tree-view',
    pathMatch: 'full'
  },
  {
    path:'tree-view',
    component: TreeViewComponent
  },
  {
    path:'**',
    component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

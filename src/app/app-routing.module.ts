import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNodeComponent } from './components/add-node/add-node.component';
import { Page404Component } from './components/page404/page404.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { UpdateNodeComponent } from './components/update-node/update-node.component';

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
    path:'add-new-node',
    component: AddNodeComponent
  },
  {
    path:'update-node/:id',
    component: UpdateNodeComponent
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageProductsComponent } from './pages/page-products/page-products.component';

const routes: Routes = [
  {path :"",component:PageProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

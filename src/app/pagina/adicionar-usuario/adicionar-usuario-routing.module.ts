import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarUsuarioPage } from './adicionar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarUsuarioPageRoutingModule {}

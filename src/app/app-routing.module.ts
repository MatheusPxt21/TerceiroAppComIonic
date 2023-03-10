import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pagina/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./pagina/sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'adicionar-usuario',
    loadChildren: () => import('./pagina/adicionar-usuario/adicionar-usuario.module').then( m => m.AdicionarUsuarioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pagina/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

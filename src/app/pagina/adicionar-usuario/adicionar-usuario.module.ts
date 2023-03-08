import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarUsuarioPageRoutingModule } from './adicionar-usuario-routing.module';

import { AdicionarUsuarioPage } from './adicionar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarUsuarioPageRoutingModule
  ],
  declarations: [AdicionarUsuarioPage]
})
export class AdicionarUsuarioPageModule {}

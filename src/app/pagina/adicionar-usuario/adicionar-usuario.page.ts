import { ClienteService } from './../../servico/cliente.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.page.html',
  styleUrls: ['./adicionar-usuario.page.scss'],
})
export class AdicionarUsuarioPage implements OnInit {

  constructor(private modalCtrl: ModalController,
    private service: ClienteService) { }

  ngOnInit() {
  }

  fecharModal(){
    this.modalCtrl.dismiss();
  }

  cadastrar(form: NgForm){
    const cliente = form.value;
    this.service.create(cliente).subscribe(response => {
      this.modalCtrl.dismiss(response);
    });
  }

}

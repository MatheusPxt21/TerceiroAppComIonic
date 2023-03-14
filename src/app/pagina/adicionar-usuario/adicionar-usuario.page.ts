import { Cliente, ClienteService } from './../../servico/cliente.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.page.html',
  styleUrls: ['./adicionar-usuario.page.scss'],
})
export class AdicionarUsuarioPage implements OnInit {

  @Input() c!: Cliente;
  atualizar = false;
  dados = {
    nome: '',
    cidade: '',
    email: '',
    senha_original: '',
  }

  constructor(private modalCtrl: ModalController,
    private service: ClienteService) { }

  ngOnInit() {
    //console.log("Entrou no atualizar")
    //console.log(this.c);
    if(this.c){
      //console.log("Atualizar");
      this.atualizar = true;
      this.dados = this.c;


    }else{
      //console.log("Novo usuario");
    }
  }

  fecharModal(){
    this.modalCtrl.dismiss();
  }

  cadastrar(form: NgForm){
    const cliente = form.value;
    if(this.atualizar){
      this.service.update(cliente, this.c.id).subscribe(response => {
        this.modalCtrl.dismiss(response);
      })
    }else{
      this.service.create(cliente).subscribe(response => {
        this.modalCtrl.dismiss(response);
    });
  }
  }

}

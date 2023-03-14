import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Cliente, ClienteService } from 'src/app/servico/cliente.service';
import { AdicionarUsuarioPage } from '../adicionar-usuario/adicionar-usuario.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Input() c!: Cliente;
  clientes!: Cliente[];

  usuario : string = "";
  senha : string = "";


  constructor(private router: Router,
              private service: ClienteService,
              public toast: ToastController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  Cadastrar(){
    this.modalCtrl.create({
      component: AdicionarUsuarioPage
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({data}) => {
      this.service.getAll().subscribe(response => {
        this.clientes = response;
      });
    });
  }


  async login(){

    console.log('usuario:', this.usuario, 'senha:', this.senha)

    if(this.usuario == ""){
      const toast = await this.toast.create({
        message: 'Preencha o Usuário',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    if(this.senha == ""){
      const toast = await this.toast.create({
        message: 'Preencha a Senha',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    if(this.usuario === 'teste' && this.senha === '123' ){
      this.router.navigateByUrl('/folder/home');
    }else{
      const toast = await this.toast.create({
        message: 'Usuário/Senha incompatíveis ou ainda nao cadastrados',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    //this.service.login().subscribe(response =>{
      //this.c = response;
      //console.log(this.c, this.senha);
      //console.log(response);
      //if(this.usuario === this. && this.senha === ){

      //}

    //});


    //this.router.navigateByUrl('/folder/home');





  }

}




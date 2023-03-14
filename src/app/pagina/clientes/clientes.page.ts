import { AdicionarUsuarioPage } from './../adicionar-usuario/adicionar-usuario.page';
import { Cliente, ClienteService } from './../../servico/cliente.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes!: Cliente[];

  constructor(private service: ClienteService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.clientes = response;
    });
  }

/* Foi implementado dentro do presentDELETEAlert
  remover(id: any){
    this.service.remove(id).subscribe(() =>{
      this.service.getAll().subscribe(response => {
        this.clientes = response;
      });
    });
  }
*/

async presentDELETEToast(name: any) {
  const toast = await this.toastController.create({
    message: 'Usuário ' + name + ' Deletado!',
    duration: 2000,
    icon: 'trash',
    color: 'danger'
  });

  await toast.present();
}

  async presentDELETEAlert(c: Cliente){
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Realmente deseja DELETAR esse usuário?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        },
        {
          text: 'SIM!',
          role: 'confirm',
          handler: () => {
            this.service.remove(c.id).subscribe(() =>{
              this.service.getAll().subscribe(response => {
                this.clientes = response;
              });
            });
            this.presentDELETEToast(c.nome);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  editar(c: Cliente){
    console.log(c);
    this.modalCtrl.create({
      component: AdicionarUsuarioPage,
      componentProps: {c}
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({data}) => {
      this.service.getAll().subscribe(response => {
        this.clientes = response;
      });
    });
  }

  novoCliente(){
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

}

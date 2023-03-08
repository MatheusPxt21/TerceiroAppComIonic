import { Cliente, ClienteService } from './../../servico/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes!: Cliente[];

  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.clientes = response;
    });
  }

  remover(id: any){
    this.service.remove(id).subscribe(() =>{
      this.service.getAll().subscribe(response => {
        this.clientes = response;
      });
    });
  }

}

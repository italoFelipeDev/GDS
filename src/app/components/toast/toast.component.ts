import { Component, Input, OnInit } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {


  toast: any;

  tituloToast: string;

  descricaoToast: string;

  ngOnInit(): void {

  }


  mostrarToast(tituloToast: string, descricaoToast: string): void {
    this.tituloToast = tituloToast;
    this.descricaoToast = descricaoToast;
    this.toast = new Toast('#toastComponent');
    this.toast.show();
  }
}

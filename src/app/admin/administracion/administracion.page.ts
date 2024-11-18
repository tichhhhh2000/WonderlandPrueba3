import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {

  constructor(private router: Router, private toast: ToastServiceService) { }

  
  toastAlbum() {
    this.toast.GenerarToast('Cerraste Sesión', 3000, 'bottom');
  } 

  ngOnInit() {
  }

  

}

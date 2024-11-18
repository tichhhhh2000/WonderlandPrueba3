import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstrenoService } from 'src/app/services/estreno.service';

@Component({
  selector: 'app-detalle-estreno',
  templateUrl: './detalle-estreno.page.html',
  styleUrls: ['./detalle-estreno.page.scss'],
})
export class DetalleEstrenoPage implements OnInit {
  estreno: any; // Variable para almacenar los datos del disco

  constructor(
    private route: ActivatedRoute,
    private estrenoService: EstrenoService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtener ID de la ruta
    this.cargarEstreno(id); // Cargar los detalles del estreno
  }

  cargarEstreno(id: number) {
    this.estrenoService.getEstrenoById(id).subscribe(
      (data) => {
        this.estreno = data; // Asignar los datos del estreno
        console.log('Detalle del estreno:', data);
      },
      (error) => {
        console.error('Error al cargar el detalle del estreno:', error);
      }
    );
  }
}

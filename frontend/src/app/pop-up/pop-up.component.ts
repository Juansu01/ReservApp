import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../types';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  order: any;
  id: string;
  form = new FormGroup({
    nombres: new FormControl(null, Validators.required),
    apellidos: new FormControl(null, Validators.required),
    tipo_de_documento: new FormControl(null, Validators.required),
    identificacion: new FormControl(null, Validators.required),
    fecha_de_reserva: new FormControl(null, Validators.required),
    tipo_de_reserva: new FormControl(null, Validators.required),
    cantidad_de_personas: new FormControl(null, Validators.required),
    descripcion_observaciones: new FormControl(null, Validators.required),
  });
  orderDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private authService: AuthService,
    public datepipe: DatePipe
  ) {
    this.id = data;
    this.authService.getOrderById(this.id).subscribe((res) => {
      this.order = res;
    });
  }

  ngOnInit() {}

  onSubmit() {}

  confirmOrder(id: string) {
    this.authService.confirmOrder(id).subscribe(
      (response) => {
        if (response.ok) {
          alert('Se confirmó la orden!');
        }
      },
      (err) => {
        if (err.status === 400) {
          alert('La orden ya está confirmada');
        }
      }
    );
  }
}

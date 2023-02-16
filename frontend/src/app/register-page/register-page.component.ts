import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    nombres: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    apellidos: new FormControl(null, Validators.required),
    tipo_de_documento: new FormControl(null, Validators.required),
    identificacion: new FormControl(null, Validators.required),
    fecha_de_reserva: new FormControl(null, Validators.required),
    tipo_de_reserva: new FormControl(null, Validators.required),
    cantidad_de_personas: new FormControl(null, Validators.required),
    descripcion_observaciones: new FormControl(null, Validators.required),
  });

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    console.log(+this.form.get('cantidad_de_personas')?.value!);
    this.authService
      .registerNewUser(
        this.form.get('email')?.value!,
        this.form.get('password')?.value!,
        this.form.get('nombres')?.value!,
        this.form.get('apellidos')?.value!,
        this.form.get('tipo_de_documento')?.value!,
        this.form.get('identificacion')?.value!,
        this.form.get('fecha_de_reserva')?.value!,
        this.form.get('tipo_de_reserva')?.value!,
        +this.form.get('cantidad_de_personas')?.value!
      )
      .subscribe((respose) => {
        console.log(respose);
      });
  }
}

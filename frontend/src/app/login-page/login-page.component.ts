import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
  onSubmit(): void {
    this.authService
      .logUserIn(
        this.form.get('email')?.value,
        this.form.get('password')?.value
      )
      .subscribe((res: any) => {
        if (res.ok) {
          const rol = res.body.user_rol;
          const name = res.body.nombres;
          console.log('LOGGED IN');
          this.authService.setRoleAndName(rol, name);
          localStorage.setItem('email', res.body.email);
          localStorage.setItem('rol', res.body.rol);
          localStorage.setItem('names', res.body.nombres);
          if ((rol && rol === 'admin') || (rol && rol === 'superuser')) {
            this.router.navigateByUrl('/dashboard');
          }
        }
      });
  }
}

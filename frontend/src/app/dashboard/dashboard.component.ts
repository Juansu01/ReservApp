import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Order } from '../types';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  orders: Order[] = [];
  currentRol: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const rol = this.authService.getRole();
    console.log(rol);
    if (rol === 'superuser' || rol === 'admin') {
      this.authService
        .getAllOrders()
        .subscribe((orders) => (this.orders = orders));
    } else {
      this.router.navigateByUrl('/');
    }
  }

  displayPopUp(uuid: string): void {
    this.dialogRef.open(PopUpComponent, {
      data: uuid,
    });
  }
}

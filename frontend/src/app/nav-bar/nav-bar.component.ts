import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  userRol: string;
  userNames: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userNames = this.authService.userName;
    this.userRol = this.authService.userRol;
  }

  onLogOut() {
    this.authService.setRoleAndName('', '');
    this.router.navigateByUrl('/');
  }
}

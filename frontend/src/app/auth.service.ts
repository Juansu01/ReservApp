import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order, ResponseSuccess } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userRol: string;
  public userName: string;

  constructor(private http: HttpClient) {}

  logUserIn(email: any, password: any) {
    return this.http.post(
      '/api/login',
      {
        email,
        password,
      },
      { observe: 'response' }
    );
  }

  getOrderById(id: string) {
    return this.http.get(`/api/booking/${id}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/booking/all');
  }

  updateOrder(orderId: string, newAttributes: any) {
    return this.http.put(`/api/booking/${orderId}`, newAttributes, {});
  }

  setRoleAndName(role: string, name: string) {
    this.userRol = role;
    this.userName = name;
  }

  getRole(): string {
    return this.userRol;
  }

  confirmOrder(id: string) {
    return this.http.put(
      `/api/booking/confirmation/${id}`,
      {},
      { observe: 'response' }
    );
  }

  registerNewUser(
    email: string,
    password: string,
    nombres: string,
    apellidos: string,
    tipo_de_documento: string,
    identificacion: string,
    fecha_de_reserva: string,
    tipo_de_reserva: string,
    cantidad_de_personas: number
  ): Observable<ResponseSuccess> {
    console.log(cantidad_de_personas);
    return this.http.post<ResponseSuccess>('/api/register', {
      email,
      password,
      nombres,
      apellidos,
      tipo_de_documento,
      identificacion,
      fecha_de_reserva,
      tipo_de_reserva,
      cantidad_de_personas,
    });
  }
}

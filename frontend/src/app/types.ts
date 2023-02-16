export interface Order {
  id: string;
  nombres: string;
  apellidos: string;
  tipo_de_documento: string;
  identificacion: string;
  email: string;
  fecha_de_reserva: string;
  tipo_de_reserva: string;
  descripcion_observaciones: string;
  usuario_id: string;
  confirmada: string;
  cantidad_de_personas: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseSuccess {
  message: string;
}

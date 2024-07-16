export interface Ticket {
  id:             number;
  asunto:         string;
  descripcion:    string;
  canal:          string;
  grupo:          string;
  creado_el:      Date;
  actualizado_el: Date;
  estado:         string;
  usuario:        number;
  agente: number;
  pedido: number
}

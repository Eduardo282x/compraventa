import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public setCarrito = signal<number[]>([]);
  public getCarrito = computed<number[]>(() => this.setCarrito());

  constructor() { }



}

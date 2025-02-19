import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  httpClient = inject(HttpClient);
  // base_api_url = 'https://r31q79nx-3000.use2.devtunnels.ms';  
  base_api_url = 'http://localhost:3000';  

  constructor() { }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  httpClient = inject(HttpClient);
  base_api_url = 'http://localhost:3000';  

  constructor() { }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public salvar(categoria: Categoria) : Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/categorias`, categoria);
  }

  public listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }
}

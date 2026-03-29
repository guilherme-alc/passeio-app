import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from './lugar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  apiUrl: string = environment.apiUrl;

  constructor(private client: HttpClient) { }

  public salvar(lugar: Lugar) : Observable<Lugar> {
    return this.client.post<Lugar>(`${this.apiUrl}/lugares`, lugar);
  }

  public listar() : Observable<Lugar[]> {
    return this.client.get<Lugar[]>(`${this.apiUrl}/lugares`);
  }

  public listarComFiltros(categoria: number | null, lugar: string) : Observable<Lugar[]> {
    let parametros = new HttpParams();

    if (categoria) {
      parametros = parametros.set('categoriaId', categoria);
    }

    if (lugar) {
      parametros = parametros.set('nome_like', lugar);
    }
    return this.client.get<Lugar[]>(`${this.apiUrl}/lugares`, { params: parametros });
  }
}

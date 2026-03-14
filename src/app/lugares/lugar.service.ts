import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from './lugar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private client: HttpClient) { }

  public salvar(lugar: Lugar) : Observable<Lugar> {
    return this.client.post<Lugar>('http://localhost:3000/lugares', lugar);
  }

  public listar() : Observable<Lugar[]> {
    return this.client.get<Lugar[]>('http://localhost:3000/lugares');
  }

  public listarComFiltros(categoria: number | null, lugar: string) : Observable<Lugar[]> {
    let parametros = new HttpParams();

    if (categoria) {
      parametros = parametros.set('categoriaId', categoria);
    }

    if (lugar) {
      parametros = parametros.set('nome_like', lugar);
    }
    return this.client.get<Lugar[]>('http://localhost:3000/lugares', { params: parametros });
  }
}

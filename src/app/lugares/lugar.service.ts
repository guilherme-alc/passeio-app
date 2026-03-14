import { HttpClient } from '@angular/common/http';
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
}

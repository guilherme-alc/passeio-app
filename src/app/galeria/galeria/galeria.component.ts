import { LugarService } from './../../lugares/lugar.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../categorias/categoria';
import { Lugar } from '../../lugares/lugar';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  protected categorias: Categoria[] = []
  protected lugaresFiltro: Lugar[] = []

  protected categoriasMap = new Map<number, Categoria>();

  protected filtroCategoria: number | null = null;
  protected filtroLugar: string = '';

  constructor(private categoriaService: CategoriaService, private lugarService: LugarService) { }

  ngOnInit(): void {
    this.categoriaService.listar().subscribe(categorias => {
      this.categorias = categorias

      categorias.forEach(c => {
        this.categoriasMap.set(c.id, c);
      });

    });

    this.lugarService.listar().subscribe(lugares => {
      this.lugaresFiltro = lugares
    });
  }

  protected nomeCategoria(id: number): string {
    return this.categoriasMap.get(id)?.nome ?? 'Categoria desconhecida';
  }

  protected obterAvaliacao(avaliacao: number): string {
    return '&#9733;'.repeat(avaliacao) + '&#9734;'.repeat(5 - avaliacao);
  }

  protected listarComFiltros(): void {
    this.lugarService.listarComFiltros(this.filtroCategoria || null, this.filtroLugar).subscribe(lugares => {
      this.lugaresFiltro = lugares
    });
  }
}

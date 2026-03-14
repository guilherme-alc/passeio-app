import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LugarService } from '../lugar.service';
import { Categoria } from '../../categorias/categoria';
import { Lugar } from '../lugar';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  protected form: FormGroup;
  protected categorias: Categoria[] = [];

  constructor(private lugarService: LugarService, private categoriaService: CategoriaService) {
    this.form = new FormGroup({
      nome: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(150) ]),
      descricao: new FormControl('', [ Validators.maxLength(255) ]),
      categoriaId: new FormControl('', [ Validators.required ]),
      localizacao: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(150) ]),
      urlFoto: new FormControl(''),
      avaliacao: new FormControl('', [ Validators.required, Validators.min(0), Validators.max(5) ])
    });
  }

  protected salvar(): void {
    this.form.markAllAsTouched();

    if(this.form.invalid) {
      return;
    }

    this.lugarService.salvar(this.form.value as Lugar)
      .subscribe({
        next: lugarSalvo => this.resetarFormulario(),
        error: erro => console.error('Erro ao salvar lugar', erro)
      })
  }

  protected seCampoInvalido(nomeCampo: string, validacao: string): boolean {
    const campo = this.form.get(nomeCampo) as FormControl;

    if (campo) {
      return campo.hasError(validacao) && campo.touched;
    }

    return false;
  }

  protected resetarFormulario(): void {
    this.form.reset();
  }

  ngOnInit(): void {
    this.categoriaService.listar()
      .subscribe({
        next: categorias => {
          this.categorias = categorias;
          console.log('Categorias listadas com sucesso', categorias);
        },
        error: erro => {
          console.error('Erro ao listar categorias', erro);
        }
      });

  }
}

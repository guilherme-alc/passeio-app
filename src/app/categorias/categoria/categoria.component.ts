import { Categoria } from './../categoria';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  protected form: FormGroup;

  constructor(private categoriaService: CategoriaService) {
    this.form = new FormGroup({
        nome: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]),
        descricao: new FormControl('', [ Validators.maxLength(255) ])
    });
  }

  protected salvar(): void {
    this.form.markAllAsTouched();

    if(this.form.invalid) {
      return;
    }

    const categoria = this.form.value as Categoria;

    this.categoriaService
      .salvar(categoria)
      .subscribe({
        next: categoriaSalva => {
        console.log('Categoria salva com sucesso', categoriaSalva);
        this.resetarFormulario();
      },
      error: erro => {
        console.error('Erro ao salvar categoria', erro);
      }
    });
  }

  protected seCampoInvalido(nome: string, validacao:string): boolean {
    const campo = this.form.get(nome) as FormControl;

    if (campo) {
      return campo.hasError(validacao) && campo.touched;
    }

    return false;
  }

  protected resetarFormulario(): void {
    this.form.reset();
  }
}

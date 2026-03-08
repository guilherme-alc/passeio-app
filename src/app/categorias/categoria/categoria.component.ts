import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  protected form: FormGroup;

  constructor() {
    this.form = new FormGroup({
        nome: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]),
        descricao: new FormControl('', [ Validators.maxLength(255) ])
    });
  }

  protected salvar(): void {
    this.form.markAllAsTouched();

    this.form.reset();
  }

  protected seCampoInvalido(nome: string, validacao:string): boolean {
    const campo = this.form.get(nome) as FormControl;

    if (campo) {
      return campo.hasError(validacao) && campo.touched;
    }

    return false;
  }
}

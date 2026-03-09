import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LugarService } from '../lugar.service';
import { Categoria } from '../../categorias/categoria';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent {

  protected form: FormGroup;
  protected categorias: Categoria[] = [];

  constructor(private lugarService: LugarService) {
    this.form = new FormGroup({
      nome: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(150) ]),
      categoria: new FormControl('', [ Validators.required ]),
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
  }

  protected seCampoInvalido(campo: string, validacao: string): boolean {
    return false;
  }
}

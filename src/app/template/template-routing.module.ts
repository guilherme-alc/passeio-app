import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'categorias',
        pathMatch: 'full'
      },
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module')
          .then(m => m.CategoriasModule),
        data: { titulo: 'Categorias', subtitulo: 'Realize o cadastro de novas categorias' }
      },
      {
        path: 'lugares',
        loadChildren: () => import('../lugares/lugares.module')
          .then(m => m.LugaresModule),
        data: { titulo: 'Lugares', subtitulo: 'Realize o cadastro de novos lugares' }
      },
      {
        path: "galeria",
        loadChildren: () => import('../galeria/galeria.module')
        .then(m => m.GaleriaModule),
        data: { titulo: 'Galeria', subtitulo: 'Descubra os melhores lugares para conhecer' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }

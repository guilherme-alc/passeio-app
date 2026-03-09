import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    RouterModule
  ]
})
export class TemplateModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TitleComponent } from './components/title/title.component';


@NgModule({
  declarations: [
    NavBarComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    NavBarComponent,
    TitleComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';


import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';

@NgModule({
  exports: [
    MessagesModule,
    TableModule,
    TagModule,
    MenubarModule,
    AvatarModule,
    BadgeModule,
    InputTextModule,
    RippleModule,
    ToastModule,
    DividerModule,
    CardModule,
    ButtonModule,
    ButtonGroupModule
  ]
})

export class PrimeNgModule { }
